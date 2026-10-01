const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const revenue = [42, 48, 45, 58, 62, 60, 71, 76, 74, 88, 92, 97]
const collected = [30, 36, 34, 44, 50, 48, 55, 61, 58, 70, 74, 80]

export function RevenueChart() {
  const width = 640
  const height = 240
  const pad = 28
  const max = 110
  const step = (width - pad * 2) / (revenue.length - 1)

  const toPath = (series) =>
    series
      .map((value, index) => {
        const x = pad + index * step
        const y = height - pad - (value / max) * (height - pad * 2)
        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
      })
      .join(' ')

  const area = `${toPath(revenue)} L ${pad + (revenue.length - 1) * step} ${height - pad} L ${pad} ${height - pad} Z`

  return (
    <figure className="w-full">
      <figcaption className="mb-3 flex items-center justify-between gap-3">
        <span className="text-sm font-semibold">Revenue vs collected</span>
        <span className="flex items-center gap-3 text-xs text-muted">
          <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-accent" /> Revenue</span>
          <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-gold" /> Collected</span>
        </span>
      </figcaption>
      <svg viewBox={`0 0 ${width} ${height}`} className="h-56 w-full" role="img" aria-label="Line chart of revenue and collections over twelve months">
        {[0, 1, 2, 3].map((row) => (
          <line
            key={row}
            x1={pad}
            x2={width - pad}
            y1={pad + row * ((height - pad * 2) / 3)}
            y2={pad + row * ((height - pad * 2) / 3)}
            stroke="currentColor"
            className="text-line"
            strokeWidth="1"
          />
        ))}
        <path d={area} className="fill-accent/15" />
        <path d={toPath(revenue)} fill="none" className="draw stroke-accent" strokeWidth="2.5" strokeLinejoin="round" />
        <path d={toPath(collected)} fill="none" className="draw stroke-gold" strokeWidth="2.5" strokeLinejoin="round" style={{ animationDelay: '0.25s' }} />
        {months.map((month, index) => (
          <text key={month} x={pad + index * step} y={height - 8} textAnchor="middle" className="fill-muted" fontSize="11">
            {month}
          </text>
        ))}
      </svg>
    </figure>
  )
}

export function MixChart() {
  const slices = [
    { label: 'Subscriptions', value: 46, color: 'var(--accent)' },
    { label: 'Services', value: 28, color: 'var(--gold)' },
    { label: 'Usage', value: 18, color: '#7aa2ff' },
    { label: 'Other', value: 8, color: '#d17a6a' },
  ]
  const total = slices.reduce((sum, slice) => sum + slice.value, 0)
  let cursor = 0
  const gradient = slices
    .map((slice) => {
      const start = (cursor / total) * 100
      cursor += slice.value
      const end = (cursor / total) * 100
      return `${slice.color} ${start}% ${end}%`
    })
    .join(', ')

  return (
    <figure className="flex w-full flex-col gap-4 sm:flex-row sm:items-center">
      <div
        className="mx-auto grid h-36 w-36 shrink-0 place-items-center rounded-full"
        style={{ background: `conic-gradient(${gradient})` }}
        role="img"
        aria-label="Revenue mix donut chart"
      >
        <div className="grid h-[5.4rem] w-[5.4rem] place-items-center rounded-full bg-card text-center text-xs font-semibold">
          Mix
        </div>
      </div>
      <ul className="grid flex-1 gap-2">
        {slices.map((slice) => (
          <li key={slice.label} className="flex items-center justify-between text-sm">
            <span className="inline-flex items-center gap-2 text-muted">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: slice.color }} />
              {slice.label}
            </span>
            <span className="font-semibold">{slice.value}%</span>
          </li>
        ))}
      </ul>
    </figure>
  )
}
