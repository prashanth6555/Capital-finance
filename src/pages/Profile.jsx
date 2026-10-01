import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import AppShell from '../components/AppShell'
import { useAuth } from '../context/AuthContext'

const fields = [
  ['name', 'Full name', 'text'],
  ['email', 'Email', 'email'],
  ['role', 'Role', 'text'],
  ['company', 'Company', 'text'],
  ['phone', 'Phone', 'tel'],
]

export default function Profile() {
  const { user, updateUser } = useAuth()
  const [form, setForm] = useState(() => ({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || '',
    company: user?.company || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
  }))
  const [errors, setErrors] = useState({})
  const [saved, setSaved] = useState(false)

  if (!user) return <Navigate to="/login" replace />

  const initials = form.name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'M'

  const onSubmit = (event) => {
    event.preventDefault()
    const next = {}
    if (!form.name.trim()) next.name = 'Name is required.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = 'Enter a valid email.'
    if (form.phone && !/^[0-9+().\-\s]{7,}$/.test(form.phone)) next.phone = 'Enter a valid phone number.'
    setErrors(next)
    setSaved(false)
    if (Object.keys(next).length) return
    updateUser({
      name: form.name.trim(),
      email: form.email.trim(),
      role: form.role.trim(),
      company: form.company.trim(),
      phone: form.phone.trim(),
      bio: form.bio.trim(),
    })
    setSaved(true)
  }

  return (
    <AppShell title="Profile">
      <form onSubmit={onSubmit} className="grid w-full gap-4 lg:grid-cols-[16rem_minmax(0,1fr)]" noValidate>
        <aside className="h-fit rounded-3xl border border-line bg-card p-5 text-center">
          <div className="relative mx-auto h-28 w-28">
            <img src="/images/alex.jpg" alt="" className="h-28 w-28 rounded-full object-cover ring-4 ring-accent/30" />
            <span className="absolute -bottom-1 -right-1 grid h-8 w-8 place-items-center rounded-full bg-accent text-xs font-semibold text-accent-ink">
              {initials}
            </span>
          </div>
          <p className="mt-3 font-semibold">{form.name || 'Your name'}</p>
          <p className="text-sm text-muted">{form.role || 'Role'}</p>
          <p className="mt-1 text-sm text-muted">{form.company}</p>
        </aside>

        <div className="rounded-3xl border border-line bg-card p-5">
          <h2 className="font-display text-2xl">Profile settings</h2>
          <p className="mt-1 text-sm text-muted">Updates stay in this browser. Nothing is sent to a server.</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {fields.map(([key, label, type]) => (
              <label key={key} className="grid gap-1.5 text-sm font-medium">
                {label}
                <input
                  type={type}
                  value={form[key]}
                  onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))}
                  aria-invalid={Boolean(errors[key])}
                  className="w-full rounded-2xl border border-line bg-bg px-4 py-3 outline-none focus:border-accent"
                />
                {errors[key] && <span className="font-normal text-danger">{errors[key]}</span>}
              </label>
            ))}
            <label className="grid gap-1.5 text-sm font-medium sm:col-span-2">
              Bio
              <textarea
                rows={4}
                value={form.bio}
                onChange={(event) => setForm((current) => ({ ...current, bio: event.target.value }))}
                className="w-full resize-y rounded-2xl border border-line bg-bg px-4 py-3 outline-none focus:border-accent"
              />
            </label>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button type="submit" className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-ink hover:opacity-90">
              Save profile
            </button>
            {saved && <p className="text-sm text-accent" role="status">Profile saved on this device.</p>}
          </div>
        </div>
      </form>
    </AppShell>
  )
}
