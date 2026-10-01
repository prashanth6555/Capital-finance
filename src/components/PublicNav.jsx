import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logo from './Logo'
import ThemeToggle from './ThemeToggle'

const links = [
  { href: '/#features', label: 'Features' },
  { href: '/#stories', label: 'Stories' },
  { href: '/#pricing', label: 'Pricing' },
]

export default function PublicNav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b border-line bg-bg/90 backdrop-blur-md">
      <div className="page-pad flex w-full items-center justify-between gap-3 py-3">
        <Link to="/" aria-label="Capital Finance home" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-muted hover:text-ink">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Link to="/login" className="rounded-full px-4 py-2 text-sm font-medium text-ink hover:text-accent">
            Log in
          </Link>
          <Link
            to="/login"
            className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-ink hover:opacity-90"
          >
            Open workspace
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-card"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              {open ? (
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" className="page-pad w-full border-t border-line bg-elev py-4 md:hidden" aria-label="Mobile">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-medium hover:bg-card"
              >
                {link.label}
              </a>
            ))}
            <NavLink to="/login" onClick={() => setOpen(false)} className="mt-2 rounded-full bg-accent px-4 py-3 text-center font-semibold text-accent-ink">
              Log in
            </NavLink>
          </div>
        </nav>
      )}
    </header>
  )
}
