import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

const STAR = 'M20 1 C21.8 12.5 27.5 18.2 39 20 C27.5 21.8 21.8 27.5 20 39 C18.2 27.5 12.5 21.8 1 20 C12.5 18.2 18.2 12.5 20 1 Z'

/* The nova star — HarNova's mark and the brand's bullet. */
export function NovaMark({ size = 24, core = true }) {
  const id = `nv${size}${core ? 'c' : ''}`
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF3D8B" />
          <stop offset="48%" stopColor="#6D4AFF" />
          <stop offset="100%" stopColor="#22B8E6" />
        </linearGradient>
      </defs>
      <path d={STAR} fill={`url(#${id})`} />
      {core && <circle cx="20" cy="20" r="2.8" fill="#fff" />}
    </svg>
  )
}

export function Label({ children }) {
  return <div className="label"><NovaMark size={14} core={false} />{children}</div>
}

/* Headline whose lines slide up from a mask, once, when they come into view. */
export function Split({ lines, className = 'h-lg', as: Tag = 'h2', now = false, delay = 0 }) {
  const ref = useRef(null)
  useLayoutEffect(() => {
    if (reduced()) return
    const spans = ref.current.querySelectorAll('.ln > span')
    const ctx = gsap.context(() => {
      gsap.fromTo(spans, { yPercent: 110 }, {
        yPercent: 0, duration: 1.1, ease: 'power4.out', stagger: 0.08, delay,
        scrollTrigger: now ? undefined : { trigger: ref.current, start: 'top 88%', once: true },
      })
    })
    return () => ctx.revert()
  }, [now, delay])
  return (
    <Tag ref={ref} className={className}>
      {lines.map((l, i) => (
        <span className="ln" key={i} style={{ display: 'block', overflow: 'hidden', paddingBottom: '.1em', marginBottom: '-.1em' }}>
          <span style={{ display: 'inline-block' }}>{l}</span>
        </span>
      ))}
    </Tag>
  )
}

export const Arrow = ({ size = 16 }) => (
  <svg className="arr" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
)
export const Out = ({ size = 15 }) => (
  <svg className="arr" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
)

export function Frame({ project, src, eager = false }) {
  const portrait = project.portrait && src
  return (
    <div className="frame">
      <div className="frame-bar"><i /><i /><i /><span className="url">{project.url ? project.domain : project.name}</span></div>
      <div className={`frame-img${portrait ? ' portrait' : ''}`}>
        {src ? <img src={src} alt={`${project.name}, screenshot of the live product`} loading={eager ? 'eager' : 'lazy'} /> : <Mock kind={project.mock} tint={project.tint} />}
      </div>
    </div>
  )
}

/* Previews for projects with no public screenshot. Content mirrors what each one does. */
export function Mock({ kind, tint = '#6D4AFF' }) {
  const bg = { background: `radial-gradient(circle at 85% 10%, ${tint}55, transparent 52%), radial-gradient(circle at 5% 100%, ${tint}30, transparent 55%), #121219` }
  if (kind === 'nestly') return (
    <div className="mock" style={bg} aria-hidden="true">
      <div className="mock-card"><div className="k">Net balance</div><div className="big">RM 4,812.40</div>
        <svg viewBox="0 0 300 50" style={{ width: '100%', height: 50, marginTop: 8 }}><path d="M0 40 C40 34 60 44 90 30 S150 24 180 18 240 22 300 6" fill="none" stroke={tint} strokeWidth="3" strokeLinecap="round" /></svg></div>
      <div className="mock-row">
        <div className="mock-card"><div className="k">Bills due</div><div className="v">3 this week</div></div>
        <div className="mock-card"><div className="k">Pay later</div><div className="v">RM 412</div></div>
        <div className="mock-card"><div className="k">Travel goal</div><div className="v">42%</div></div>
      </div>
      <div className="mock-card"><div className="k">Ask the planner</div><div className="v">Can I afford a trip in December?</div></div>
    </div>
  )
  if (kind === 'build') return (
    <div className="mock" style={bg} aria-hidden="true">
      <code>{'<section class="hero">'}<br />{'  <h1>Nasi Lemak Corner</h1>'}<br />{'</section>'}</code>
      <code>Validating code… <span style={{ color: '#6BD69A' }}>done</span><br />Deploying to the edge… <span style={{ color: '#6BD69A' }}>done</span><br />Issuing SSL… <span style={{ color: '#6BD69A' }}>done</span></code>
      <div className="mock-card"><div className="k">Live at</div><div className="v">nasilemakcorner.harnova.my</div></div>
    </div>
  )
  if (kind === 'medi') return (
    <div className="mock" style={bg} aria-hidden="true">
      <div className="mock-card"><div className="k">Patient A-019, IC scanned</div><div className="v">Triage: yellow, urgent</div></div>
      <div className="mock-card"><svg viewBox="0 0 300 56" style={{ width: '100%', height: 64 }}><polyline points="0,28 50,28 64,28 74,6 86,50 98,28 160,28 174,28 184,10 196,46 206,28 300,28" fill="none" stroke={tint} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
      <div className="mock-row">
        <div className="mock-card"><div className="k">Queue</div><div className="v">6 waiting</div></div>
        <div className="mock-card"><div className="k">Pharmacy</div><div className="v">412 in stock</div></div>
        <div className="mock-card"><div className="k">Payment</div><div className="v">DuitNow</div></div>
      </div>
    </div>
  )
  return (
    <div className="mock" style={bg} aria-hidden="true">
      <div className="mock-row">
        <div className="mock-card"><div className="k">Temperature</div><div className="big">28.4°C</div></div>
        <div className="mock-card"><div className="k">Humidity</div><div className="big">64%</div></div>
        <div className="mock-card"><div className="k">Mister</div><div className="big" style={{ color: '#6BD69A' }}>On</div></div>
      </div>
      <div className="mock-card"><svg viewBox="0 0 300 60" style={{ width: '100%', height: 70 }}><path d="M0 50 L30 44 L60 46 L90 32 L120 36 L150 22 L180 26 L210 14 L240 18 L270 8 L300 12" fill="none" stroke={tint} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
      <div className="mock-card"><div className="k">Growing advice</div><div className="v">Humidity is in range. The mister runs again automatically when it drops.</div></div>
    </div>
  )
}
