/* The HarNova star — the brand mark, kept as the one gradient on the site. */
export function NovaMark({ size = 24 }) {
  const id = `ng${size}`
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="40" y2="40">
          <stop offset="0%" stopColor="#FF3D8B" />
          <stop offset="50%" stopColor="#5B3DF5" />
          <stop offset="100%" stopColor="#22B8E6" />
        </linearGradient>
      </defs>
      <path d="M20 1 C21.8 12.5 27.5 18.2 39 20 C27.5 21.8 21.8 27.5 20 39 C18.2 27.5 12.5 21.8 1 20 C12.5 18.2 18.2 12.5 20 1 Z" fill={`url(#${id})`} />
    </svg>
  )
}

/* A screenshot in a plain browser frame; falls back to a designed preview. */
export function Browser({ project, src, eager = false }) {
  const portrait = project.portrait && src
  return (
    <div className="browser">
      <div className="browser-bar"><i /><i /><i /><span>{project.url ? project.domain : project.name}</span></div>
      <div className={`browser-img${portrait ? ' portrait' : ''}`}>
        {src ? <img src={src} alt={`${project.name}, screenshot of the live product`} loading={eager ? "eager" : "lazy"} /> : <Mock kind={project.mock} />}
      </div>
    </div>
  )
}

/* Previews for projects that have no public screenshot. Content mirrors what each product does. */
export function Mock({ kind }) {
  if (kind === 'nestly') return (
    <div className="mock" aria-hidden="true">
      <div className="mock-card"><div className="k">Net balance</div><div className="big">RM 4,812.40</div></div>
      <div className="mock-row">
        <div className="mock-card"><div className="k">Bills due</div><div className="v">3 this week</div></div>
        <div className="mock-card"><div className="k">Pay later</div><div className="v">RM 412</div></div>
        <div className="mock-card"><div className="k">Travel goal</div><div className="v">42%</div></div>
      </div>
      <div className="mock-card"><div className="k">Ask the planner</div><div className="v">Can I afford a trip in December?</div></div>
    </div>
  )
  if (kind === 'build') return (
    <div className="mock" aria-hidden="true">
      <code>{'<section class="hero">'}<br />{'  <h1>Nasi Lemak Corner</h1>'}<br />{'</section>'}</code>
      <code>Validating code… done<br />Deploying to the edge… done<br />Issuing SSL… done</code>
      <div className="mock-card"><div className="k">Live at</div><div className="v">nasilemakcorner.harnova.my</div></div>
    </div>
  )
  if (kind === 'medi') return (
    <div className="mock" aria-hidden="true">
      <div className="mock-card"><div className="k">Patient A-019, IC scanned</div><div className="v">Triage: yellow, urgent</div></div>
      <div className="mock-row">
        <div className="mock-card"><div className="k">Queue</div><div className="v">6 waiting</div></div>
        <div className="mock-card"><div className="k">Pharmacy</div><div className="v">412 in stock</div></div>
        <div className="mock-card"><div className="k">Payment</div><div className="v">DuitNow</div></div>
      </div>
      <div className="mock-card"><div className="k">Sync</div><div className="v">Clinic and cloud up to date</div></div>
    </div>
  )
  return (
    <div className="mock" aria-hidden="true">
      <div className="mock-row">
        <div className="mock-card"><div className="k">Temperature</div><div className="big">28.4°C</div></div>
        <div className="mock-card"><div className="k">Humidity</div><div className="big">64%</div></div>
        <div className="mock-card"><div className="k">Mister</div><div className="big">On</div></div>
      </div>
      <div className="mock-card"><div className="k">Growing advice</div><div className="v">Humidity is in range. The mister will run again automatically when it drops.</div></div>
    </div>
  )
}
