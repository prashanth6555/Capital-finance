import { Link } from 'react-router-dom'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="w-full border-t border-line bg-elev">
      <div className="page-pad grid w-full gap-8 py-10 sm:grid-cols-2 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-3 max-w-sm text-sm leading-6 text-muted">
            Cashflow, collections, and board-ready reporting for teams that would rather decide than reconcile.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold">Product</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li><a className="hover:text-ink" href="/#features">Features</a></li>
            <li><a className="hover:text-ink" href="/#stories">Stories</a></li>
            <li><Link className="hover:text-ink" to="/dashboard">Dashboard</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold">Account</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li><Link className="hover:text-ink" to="/login">Log in</Link></li>
            <li><Link className="hover:text-ink" to="/profile">Profile</Link></li>
            <li><Link className="hover:text-ink" to="/settings">Settings</Link></li>
          </ul>
        </div>
      </div>
      <div className="page-pad flex w-full flex-col gap-2 border-t border-line py-4 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Capital Finance Labs. Demo frontend — no backend.</p>
        <p>Light and dark themes stay in sync across every page.</p>
      </div>
    </footer>
  )
}
