export default function Logo({ light = false }) {
  return (
    <span className={`inline-flex items-center gap-2.5 font-display text-xl tracking-tight ${light ? 'text-white' : 'text-ink'}`}>
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent text-accent-ink" aria-hidden="true">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16.5 9.2 8l3.2 5 4.2-7L20 16.5" />
        </svg>
      </span>
      Capital Finance
    </span>
  )
}
