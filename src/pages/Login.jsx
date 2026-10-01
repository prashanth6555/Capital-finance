import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import ThemeToggle from '../components/ThemeToggle'
import { useAuth } from '../context/AuthContext'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [notice, setNotice] = useState('')

  const validateLogin = () => {
    const next = {}
    if (!email.trim()) next.email = 'Email is required.'
    else if (!emailPattern.test(email.trim())) next.email = 'Enter a valid email address.'
    if (!password) next.password = 'Password is required.'
    else if (password.length < 8) next.password = 'Use at least 8 characters.'
    return next
  }

  const submitLogin = (event) => {
    event.preventDefault()
    const next = validateLogin()
    setErrors(next)
    setNotice('')
    if (Object.keys(next).length) return
    login({ email: email.trim(), remember })
    navigate('/dashboard')
  }

  const submitReset = (event) => {
    event.preventDefault()
    const next = {}
    if (!email.trim()) next.email = 'Email is required.'
    else if (!emailPattern.test(email.trim())) next.email = 'Enter a valid email address.'
    setErrors(next)
    if (Object.keys(next).length) return
    setNotice(`If ${email.trim()} is on file, a reset link is on its way. This demo does not send email.`)
  }

  const fillDemo = () => {
    setMode('login')
    setEmail('alex@Capital Finance.app')
    setPassword('Capital Finance1')
    setErrors({})
    setNotice('')
  }

  return (
    <div className="grid min-h-dvh w-full lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <section className="relative hidden min-h-dvh overflow-hidden lg:block">
        <img src="/images/meeting.jpg" alt="" className="ken absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/60" />
        <div className="relative z-10 flex h-full min-h-dvh flex-col justify-between p-8 text-[#f7f4ee]">
          <Link to="/" aria-label="Back to home">
            <Logo light />
          </Link>
          <div className="rise">
            <p className="font-display text-4xl leading-tight">The numbers your Monday meeting already agrees on.</p>
            <p className="mt-4 max-w-md text-sm leading-6 text-white/85">
              Sign in to the demo workspace. Remember me keeps you signed in on this browser.
            </p>
          </div>
          <p className="text-sm text-white/75">Demo password hint: 8+ characters. Try Capital Finance1.</p>
        </div>
      </section>

      <section className="flex w-full flex-col bg-bg">
        <div className="relative h-40 overflow-hidden lg:hidden">
          <img src="/images/meeting.jpg" alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-ink/45" />
        </div>
        <div className="page-pad flex w-full items-center justify-between py-4">
          <Link to="/" className="lg:hidden" aria-label="Back to home">
            <Logo />
          </Link>
          <span className="hidden text-sm text-muted lg:inline">Need the marketing site?</span>
          <div className="flex items-center gap-3">
            <Link to="/" className="hidden text-sm font-medium hover:text-accent lg:inline">
              Home
            </Link>
            <ThemeToggle />
          </div>
        </div>

        <div className="page-pad flex w-full flex-1 items-center py-6">
          <div className="w-full max-w-xl">
            <h1 className="font-display text-4xl">{mode === 'login' ? 'Welcome back' : 'Reset password'}</h1>
            <p className="mt-2 text-sm text-muted">
              {mode === 'login'
                ? 'Use your work email. This demo accepts any valid address.'
                : 'We will pretend to send a reset link. No account is stored on a server.'}
            </p>

            <form className="mt-8 grid w-full gap-4" onSubmit={mode === 'login' ? submitLogin : submitReset} noValidate>
              <label className="grid gap-1.5 text-sm font-medium">
                Email
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className="w-full rounded-2xl border border-line bg-card px-4 py-3 text-base outline-none focus:border-accent"
                  placeholder="you@company.com"
                />
                {errors.email && (
                  <span id="email-error" className="text-sm font-normal text-danger">
                    {errors.email}
                  </span>
                )}
              </label>

              {mode === 'login' && (
                <label className="grid gap-1.5 text-sm font-medium">
                  Password
                  <span className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      aria-invalid={Boolean(errors.password)}
                      aria-describedby={errors.password ? 'password-error' : undefined}
                      className="w-full rounded-2xl border border-line bg-card px-4 py-3 pr-20 text-base outline-none focus:border-accent"
                      placeholder="At least 8 characters"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted hover:text-ink"
                      onClick={() => setShowPassword((value) => !value)}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </span>
                  {errors.password && (
                    <span id="password-error" className="text-sm font-normal text-danger">
                      {errors.password}
                    </span>
                  )}
                </label>
              )}

              {mode === 'login' && (
                <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(event) => setRemember(event.target.checked)}
                      className="h-4 w-4 accent-[var(--accent)]"
                    />
                    Remember me
                  </label>
                  <button
                    type="button"
                    className="font-semibold text-accent hover:opacity-80"
                    onClick={() => {
                      setMode('reset')
                      setErrors({})
                      setNotice('')
                    }}
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {notice && (
                <p className="rounded-2xl border border-line bg-elev px-4 py-3 text-sm" role="status">
                  {notice}
                </p>
              )}

              <button type="submit" className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-ink hover:opacity-90">
                {mode === 'login' ? 'Log in' : 'Send reset link'}
              </button>
            </form>

            <div className="mt-4 flex flex-wrap gap-3">
              {mode === 'login' ? (
                <button type="button" onClick={fillDemo} className="rounded-full border border-line bg-card px-4 py-2 text-sm font-semibold hover:border-accent">
                  Fill demo account
                </button>
              ) : (
                <button
                  type="button"
                  className="text-sm font-semibold text-accent"
                  onClick={() => {
                    setMode('login')
                    setErrors({})
                    setNotice('')
                  }}
                >
                  Back to login
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
