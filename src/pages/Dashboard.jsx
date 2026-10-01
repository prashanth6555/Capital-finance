import { Navigate } from 'react-router-dom'
import AppShell from '../components/AppShell'
import { MixChart, RevenueChart } from '../components/Charts'
import { useAuth } from '../context/AuthContext'

const stats = [
  { label: 'Cash on hand', value: '$1.84M', delta: '+4.1% vs last month' },
  { label: 'Monthly burn', value: '$132k', delta: '−2.4% vs plan' },
  { label: 'Runway', value: '14.2 mo', delta: 'Stable this quarter' },
  { label: 'Open invoices', value: '$91k', delta: '18 waiting on payment' },
]

const activity = [
  { title: 'Harbor & Co paid invoice 1842', time: '22 min ago', amount: '+$18,400', image: '/images/priya.jpg' },
  { title: 'Payroll draft posted for October', time: '1 hr ago', amount: '−$64,200', image: '/images/jonah.jpg' },
  { title: 'Fieldnote moved to 15-day terms', time: '3 hr ago', amount: 'Terms', image: '/images/maya.jpg' },
  { title: 'Board snapshot shared with Maya', time: 'Yesterday', amount: 'Report', image: '/images/alex.jpg' },
  { title: 'Usage revenue crossed plan', time: 'Yesterday', amount: '+$6,120', image: '/images/analytics.jpg' },
]

export default function Dashboard() {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />

  return (
    <AppShell title="Overview">
      <section className="relative overflow-hidden rounded-3xl">
        <img src="/images/desk.jpg" alt="" className="h-40 w-full object-cover sm:h-48" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/45 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-5 text-white sm:p-6">
          <p className="text-sm text-white/80">Workspace · Northwind Studio</p>
          <h2 className="font-display text-2xl sm:text-3xl">Good to see you, {user.name.split(' ')[0]}.</h2>
        </div>
      </section>
      <section className="mt-4 grid w-full gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <article key={stat.label} className="card-lift rounded-3xl border border-line bg-card p-4">
            <p className="text-sm text-muted">{stat.label}</p>
            <p className="mt-2 font-display text-3xl">{stat.value}</p>
            <p className="mt-2 text-xs font-medium text-accent">{stat.delta}</p>
          </article>
        ))}
      </section>

      <section className="mt-4 grid w-full gap-4 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,0.8fr)]">
        <article className="rounded-3xl border border-line bg-card p-4 sm:p-5">
          <RevenueChart />
        </article>
        <article className="rounded-3xl border border-line bg-card p-4 sm:p-5">
          <h2 className="text-sm font-semibold">Where revenue comes from</h2>
          <div className="mt-4">
            <MixChart />
          </div>
        </article>
      </section>

      <section className="mt-4 w-full rounded-3xl border border-line bg-card">
        <div className="flex items-center justify-between px-4 py-4 sm:px-5">
          <h2 className="text-sm font-semibold">Recent activity</h2>
          <span className="text-xs text-muted">Live sample</span>
        </div>
        <ul className="divide-y divide-line">
          {activity.map((item) => (
            <li key={item.title} className="flex items-center justify-between gap-4 px-4 py-3 transition-colors hover:bg-elev sm:px-5">
              <div className="flex min-w-0 items-center gap-3">
                <img src={item.image} alt="" className="h-10 w-10 shrink-0 rounded-full object-cover" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-muted">{item.time}</p>
                </div>
              </div>
              <span className="shrink-0 text-sm font-semibold">{item.amount}</span>
            </li>
          ))}
        </ul>
      </section>
    </AppShell>
  )
}
