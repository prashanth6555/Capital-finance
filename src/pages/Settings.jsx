import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import AppShell from '../components/AppShell'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

const toggles = [
  ['invoices', 'Invoice reminders'],
  ['runway', 'Runway alerts'],
  ['weekly', 'Weekly digest'],
  ['product', 'Product updates'],
]

export default function Settings() {
  const { user, updateUser } = useAuth()
  const { theme, setTheme } = useTheme()
  const [saved, setSaved] = useState(false)

  if (!user) return <Navigate to="/login" replace />

  const setNote = (patch) => {
    updateUser(patch)
    setSaved(true)
  }

  return (
    <AppShell title="Settings">
      <div className="grid w-full gap-4 xl:grid-cols-2">
        <section className="rounded-3xl border border-line bg-card p-5">
          <h2 className="font-display text-2xl">Appearance</h2>
          <p className="mt-1 text-sm text-muted">Theme applies to the marketing site and the workspace.</p>
          <div className="mt-4 grid grid-cols-3 gap-2" role="radiogroup" aria-label="Theme">
            {['light', 'dark', 'system'].map((option) => (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={theme === option}
                onClick={() => setTheme(option)}
                className={`rounded-2xl border px-3 py-3 text-sm font-semibold capitalize ${
                  theme === option ? 'border-accent bg-accent text-accent-ink' : 'border-line bg-bg hover:border-accent'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-line bg-card p-5">
          <h2 className="font-display text-2xl">Account preferences</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5 text-sm font-medium">
              Currency
              <select
                value={user.currency}
                onChange={(event) => setNote({ currency: event.target.value })}
                className="rounded-2xl border border-line bg-bg px-4 py-3"
              >
                {['USD', 'EUR', 'GBP', 'INR'].map((code) => (
                  <option key={code}>{code}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-1.5 text-sm font-medium">
              Language
              <select
                value={user.language}
                onChange={(event) => setNote({ language: event.target.value })}
                className="rounded-2xl border border-line bg-bg px-4 py-3"
              >
                {['English', 'Spanish', 'French', 'German'].map((language) => (
                  <option key={language}>{language}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-1.5 text-sm font-medium sm:col-span-2">
              Timezone
              <select
                value={user.timezone}
                onChange={(event) => setNote({ timezone: event.target.value })}
                className="rounded-2xl border border-line bg-bg px-4 py-3"
              >
                {['America/Los_Angeles', 'America/New_York', 'Europe/London', 'Asia/Kolkata'].map((zone) => (
                  <option key={zone}>{zone}</option>
                ))}
              </select>
            </label>
          </div>
        </section>

        <section className="rounded-3xl border border-line bg-card p-5">
          <h2 className="font-display text-2xl">Notifications</h2>
          <ul className="mt-4 divide-y divide-line">
            {toggles.map(([key, label]) => (
              <li key={key} className="flex items-center justify-between gap-4 py-3">
                <span className="text-sm font-medium">{label}</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={user.notifications[key]}
                  aria-label={label}
                  onClick={() =>
                    setNote({
                      notifications: { ...user.notifications, [key]: !user.notifications[key] },
                    })
                  }
                  className={`relative h-7 w-12 rounded-full ${user.notifications[key] ? 'bg-accent' : 'bg-line'}`}
                >
                  <span
                    className={`absolute top-0.5 h-6 w-6 rounded-full bg-card shadow transition-transform ${
                      user.notifications[key] ? 'translate-x-5' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-3xl border border-line bg-card p-5">
          <h2 className="font-display text-2xl">Workspace density</h2>
          <p className="mt-1 text-sm text-muted">Choose how roomy cards feel. Saved with your account on this device.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {['comfortable', 'compact'].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setNote({ density: option })}
                className={`rounded-full border px-4 py-2 text-sm font-semibold capitalize ${
                  user.density === option ? 'border-accent bg-accent text-accent-ink' : 'border-line hover:border-accent'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          {saved && <p className="mt-4 text-sm text-accent" role="status">Preferences saved on this device.</p>}
        </section>
      </div>
    </AppShell>
  )
}
