import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import PublicNav from '../components/PublicNav'
import Reveal from '../components/Reveal'

const features = [
  {
    title: 'Live runway',
    copy: 'See months of cash left as invoices, payroll, and spend move — not after the books close.',
    image: '/images/analytics.jpg',
    alt: 'Laptop showing financial charts on a desk',
  },
  {
    title: 'Collections that nudge',
    copy: 'Friendly reminders go out on your voice. Aging buckets stop hiding in a spreadsheet tab.',
    image: '/images/desk.jpg',
    alt: 'Notebook and coffee beside a planning session',
  },
  {
    title: 'Board snapshots',
    copy: 'One page your investors actually finish: revenue, margin, burn, and the story behind the delta.',
    image: '/images/meeting.jpg',
    alt: 'Team reviewing numbers together in a meeting',
  },
  {
    title: 'Shared workspace',
    copy: 'Finance, founders, and operators look at the same numbers without exporting another CSV.',
    image: '/images/team.jpg',
    alt: 'Colleagues collaborating around a table',
  },
]

const stories = [
  {
    quote: 'We stopped arguing about which spreadsheet was current. Capital Finance is the room we meet in.',
    name: 'Priya Shah',
    role: 'CFO, Lumen Freight',
    image: '/images/priya.jpg',
  },
  {
    quote: 'Collections used to be a Friday chore. Now the queue clears itself and I only step in for the odd one.',
    name: 'Jonah Hale',
    role: 'Controller, Fieldnote',
    image: '/images/jonah.jpg',
  },
  {
    quote: 'The runway view changed how we hire. We can see the month a role becomes expensive.',
    name: 'Maya Chen',
    role: 'COO, Northwind Studio',
    image: '/images/maya.jpg',
  },
]

const brands = ['Lumen Freight', 'Fieldnote', 'Northwind', 'Harbor & Co', 'Atlas Ledger', 'Kin Studio']

export default function Landing() {
  return (
    <div className="w-full overflow-x-hidden bg-bg text-ink">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink">
        Skip to content
      </a>
      <PublicNav />
      <main id="main" className="w-full">
        <section className="relative page-pad grid w-full items-center gap-10 overflow-hidden py-10 lg:grid-cols-2 lg:py-16">
          <div className="blob pointer-events-none absolute -left-16 top-8 h-56 w-56 rounded-full bg-accent/20 blur-3xl" aria-hidden="true" />
          <div className="blob pointer-events-none absolute right-0 top-24 h-48 w-48 rounded-full bg-gold/25 blur-3xl" style={{ animationDelay: '1.2s' }} aria-hidden="true" />
          <div className="rise relative z-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Finance OS</p>
            <h1 className="mt-3 font-display text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
              Cash you can trust before the month closes.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
              Capital Finance keeps runway, collections, and board reporting in one calm workspace — built for teams who are done reconciling in the dark.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link to="/login" className="rounded-full bg-accent px-5 py-3 text-center text-sm font-semibold text-accent-ink hover:-translate-y-0.5 hover:opacity-90">
                Start with the demo
              </Link>
              <a href="#features" className="rounded-full border border-line bg-card px-5 py-3 text-center text-sm font-semibold hover:-translate-y-0.5 hover:border-accent">
                See how it works
              </a>
            </div>
            <div className="mt-8 flex items-center gap-3">
              <div className="flex -space-x-3">
                {stories.map((story) => (
                  <img key={story.name} src={story.image} alt="" className="h-10 w-10 rounded-full border-2 border-bg object-cover" />
                ))}
              </div>
              <p className="text-sm text-muted">Finance leads at 140+ teams already close here.</p>
            </div>
          </div>

          <div className="relative z-10 pb-8 sm:pb-10">
            <div className="img-zoom relative h-72 overflow-hidden rounded-[2rem] shadow-[var(--shadow)] sm:h-96">
              <img src="/images/hero.jpg" alt="Close-up of a calculator and notebook used for monthly close" className="ken h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
            </div>
            <article className="float relative z-10 -mt-16 ml-auto w-[min(100%,20rem)] rounded-3xl border border-line bg-card/95 p-4 shadow-[var(--shadow)] backdrop-blur sm:mr-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">This week</p>
                <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">+12.4%</span>
              </div>
              <p className="mt-3 font-display text-4xl">$1.84M</p>
              <p className="text-sm text-muted">Cash on hand · 14.2 months runway</p>
              <div className="mt-4 flex h-16 items-end gap-1.5" aria-hidden="true">
                {[40, 55, 48, 70, 64, 82, 76, 90, 84, 96].map((height, index) => (
                  <span
                    key={height + index}
                    className="bar-grow flex-1 rounded-t-md bg-accent"
                    style={{ height: `${height}%`, animationDelay: `${index * 70}ms` }}
                  />
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="w-full overflow-hidden border-y border-line bg-elev py-4">
          <p className="page-pad text-center text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Trusted by finance teams who want one source of truth
          </p>
          <div className="mt-3 flex overflow-hidden">
            <div className="marquee-track flex min-w-max gap-10 pr-10">
              {[...brands, ...brands].map((name, index) => (
                <span key={`${name}-${index}`} className="font-display text-xl text-ink/70">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="page-pad w-full py-14">
          <Reveal>
            <h2 className="font-display text-3xl sm:text-4xl">Everything the close used to hide</h2>
          </Reveal>
          <div className="mt-8 grid w-full gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {features.map((feature, index) => (
              <Reveal key={feature.title} delay={index * 90}>
                <article className="card-lift img-zoom h-full overflow-hidden rounded-3xl border border-line bg-card">
                  <img src={feature.image} alt={feature.alt} className="h-40 w-full object-cover" />
                  <div className="p-5">
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{feature.copy}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="page-pad w-full pb-4">
          <div className="relative grid overflow-hidden rounded-[2rem] lg:grid-cols-2">
            <img src="/images/team.jpg" alt="Finance team talking through a forecast" className="h-64 w-full object-cover lg:h-full" />
            <div className="flex flex-col justify-center bg-ink px-6 py-8 text-[#f7f4ee] sm:px-10">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">Inside the product</p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl text-blue-500">A workspace that feels like the meeting, not the spreadsheet.</h2>
              <p className="mt-3 text-sm leading-6 text-blue-500">
                Photos, charts, and the people behind the numbers stay on one screen. Hover a card, switch themes, and the same layout holds from a phone to a wide monitor.
              </p>
            </div>
          </div>
        </section>

        <section id="pricing" className="page-pad w-full bg-elev py-14">
          <Reveal>
            <h2 className="font-display text-3xl sm:text-4xl">Simple seats, serious books</h2>
          </Reveal>
          <div className="mt-8 grid w-full gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              ['Starter', '$49', 'For a founder still closing in sheets', ['2 seats', 'Runway + invoices', 'Email support']],
              ['Studio', '$149', 'The workspace most teams stay on', ['10 seats', 'Collections + snapshots', 'Shared comments']],
              ['Scale', 'Talk', 'Multi-entity groups and audit trails', ['Unlimited seats', 'SSO-ready roles', 'Priority review']],
            ].map(([name, price, blurb, points], index) => (
              <Reveal key={name} delay={index * 80}>
                <article className={`card-lift h-full rounded-3xl border p-6 ${index === 1 ? 'border-accent bg-card shadow-[var(--shadow)]' : 'border-line bg-card'}`}>
                  <h3 className="text-lg font-semibold">{name}</h3>
                  <p className="mt-2 font-display text-4xl">{price}<span className="text-base text-muted">{price.startsWith('$') ? '/mo' : ''}</span></p>
                  <p className="mt-2 text-sm text-muted">{blurb}</p>
                  <ul className="mt-4 space-y-2 text-sm">
                    {points.map((point) => (
                      <li key={point}>· {point}</li>
                    ))}
                  </ul>
                  <Link to="/login" className="mt-6 inline-flex rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-ink hover:-translate-y-0.5 hover:opacity-90">
                    Continue
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="stories" className="page-pad w-full py-14">
          <Reveal>
            <h2 className="font-display text-3xl sm:text-4xl">From the people who close the books</h2>
          </Reveal>
          <div className="mt-8 grid w-full gap-4 md:grid-cols-2 lg:grid-cols-3">
            {stories.map((story, index) => (
              <Reveal key={story.name} delay={index * 90}>
                <blockquote className="card-lift h-full rounded-3xl border border-line bg-card p-6">
                  <img src={story.image} alt="" className="h-14 w-14 rounded-full object-cover" />
                  <p className="mt-4 font-display text-xl leading-snug">“{story.quote}”</p>
                  <footer className="mt-5 text-sm">
                    <p className="font-semibold">{story.name}</p>
                    <p className="text-muted">{story.role}</p>
                  </footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="w-full">
          <div className="page-pad flex w-full flex-col items-start justify-between gap-6 bg-accent py-10 text-accent-ink sm:flex-row sm:items-center">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl">Open the workspace.</h2>
              <p className="mt-2 max-w-xl text-sm opacity-90">No backend, no credit card. Sign in with any valid email and look around the demo.</p>
            </div>
            <Link to="/login" className="rounded-full bg-card px-5 py-3 text-sm font-semibold text-ink hover:-translate-y-0.5 hover:opacity-90">
              Go to login
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
