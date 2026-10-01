import { createContext, useContext, useMemo, useState } from 'react'

const AuthContext = createContext(null)
const USER_KEY = 'Capital Finance-user'
const SESSION_KEY = 'Capital Finance-session'

const defaultProfile = {
  name: 'Alex Rivera',
  email: 'alex@Capital Finance.app',
  role: 'Head of Finance',
  company: 'Northwind Studio',
  phone: '+1 (415) 555-0148',
  bio: 'I keep runway honest and collections boring — in the best way.',
  timezone: 'America/Los_Angeles',
  currency: 'USD',
  language: 'English',
  notifications: {
    invoices: true,
    runway: true,
    weekly: false,
    product: true,
  },
  density: 'comfortable',
}

function readUser() {
  const raw = localStorage.getItem(USER_KEY) || sessionStorage.getItem(SESSION_KEY)
  if (!raw) return null
  try {
    return { ...defaultProfile, ...JSON.parse(raw) }
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readUser)

  const value = useMemo(
    () => ({
      user,
      login({ email, remember }) {
        const next = {
          ...defaultProfile,
          ...(user || {}),
          email,
          name: user?.name || defaultProfile.name,
        }
        const store = remember ? localStorage : sessionStorage
        const other = remember ? sessionStorage : localStorage
        other.removeItem(remember ? SESSION_KEY : USER_KEY)
        if (remember) {
          localStorage.setItem(USER_KEY, JSON.stringify(next))
          sessionStorage.removeItem(SESSION_KEY)
        } else {
          sessionStorage.setItem(SESSION_KEY, JSON.stringify(next))
          localStorage.removeItem(USER_KEY)
        }
        store.setItem(remember ? USER_KEY : SESSION_KEY, JSON.stringify(next))
        setUser(next)
      },
      logout() {
        localStorage.removeItem(USER_KEY)
        sessionStorage.removeItem(SESSION_KEY)
        setUser(null)
      },
      updateUser(patch) {
        setUser((current) => {
          const next = { ...defaultProfile, ...current, ...patch }
          if (localStorage.getItem(USER_KEY)) {
            localStorage.setItem(USER_KEY, JSON.stringify(next))
          } else {
            sessionStorage.setItem(SESSION_KEY, JSON.stringify(next))
          }
          return next
        })
      },
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
