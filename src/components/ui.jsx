import { useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function NovaMark({ size = 24, light = false }) {
  const id = `ng${size}${light ? 'l' : ''}`
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="40" y2="40">
          <stop offset="0%" stopColor="#FF3D8B" />
          <stop offset="45%" stopColor="#7C4DFF" />
          <stop offset="100%" stopColor="#22B8E6" />
        </linearGradient>
      </defs>
      <path d="M20 1 C21.8 12.5 27.5 18.2 39 20 C27.5 21.8 21.8 27.5 20 39 C18.2 27.5 12.5 21.8 1 20 C12.5 18.2 18.2 12.5 20 1 Z" fill={`url(#${id})`} />
      <circle cx="20" cy="20" r="3" fill={light ? '#0D0D12' : '#fff'} opacity="0.95" />
    </svg>
  )
}

/* Fade-up on scroll */
export function Reveal({ children, delay = 0, y = 40, as: Tag = 'div', className, style }) {
  const ref = useRef(null)
  useEffect(() => {
    if (reduced()) { ref.current.style.opacity = 1; return }
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current, { opacity: 0, y }, {
        opacity: 1, y: 0, duration: 1.1, delay, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 90%', once: true },
      })
    })
    return () => ctx.revert()
  }, [delay, y])
  return <Tag ref={ref} className={className} style={{ opacity: 0, ...style }}>{children}</Tag>
}

/* Headline whose lines slide up from a mask */
export function SplitHeading({ lines, className = 'h-lg', as: Tag = 'h2', immediate = false, delay = 0 }) {
  const ref = useRef(null)
  useLayoutEffect(() => {
    if (reduced()) return
    const spans = ref.current.querySelectorAll('.ln > span')
    const ctx = gsap.context(() => {
      gsap.fromTo(spans, { yPercent: 110 }, {
        yPercent: 0, duration: 1.15, ease: 'power4.out', stagger: 0.09, delay,
        scrollTrigger: immediate ? undefined : { trigger: ref.current, start: 'top 90%', once: true },
      })
    })
    return () => ctx.revert()
  }, [immediate, delay])
  return (
    <Tag ref={ref} className={className}>
      {lines.map((l, i) => (
        <span className="ln" key={i} style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.1em', marginBottom: '-0.1em' }}>
          <span style={{ display: 'inline-block' }}>{l}</span>
        </span>
      ))}
    </Tag>
  )
}

/* Number that counts up when it scrolls into view */
export function Counter({ value }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    const m = String(value).match(/^([^\d]*)(\d[\d,]*)(.*)$/)
    if (!m || reduced()) { el.textContent = value; return }
    const [, pre, num, post] = m
    const end = parseInt(num.replace(/,/g, ''), 10)
    const obj = { v: 0 }
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        v: end, duration: 1.8, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        onUpdate: () => { el.textContent = pre + Math.round(obj.v).toLocaleString('en-MY') + post },
      })
    })
    el.textContent = pre + '0' + post
    return () => ctx.revert()
  }, [value])
  return <span ref={ref}>{value}</span>
}

/* Browser frame around a screenshot or a designed mock */
export function Frame({ project, src, className = '' }) {
  const portrait = project.portrait && src
  return (
    <div className={`frame ${className}`}>
      <div className="frame-bar">
        <i /><i /><i />
        <span className="url">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
          {project.url ? project.domain : project.name.toLowerCase()}
        </span>
      </div>
      <div className={`frame-img${portrait ? ' portrait' : ''}`}>
        {src ? <img src={src} alt={`${project.name} — screenshot of the live product`} loading="lazy" /> : <Mock kind={project.mock} tint={project.tint} />}
      </div>
    </div>
  )
}

/* Designed previews for projects without a public screenshot */
export function Mock({ kind, tint = '#6D4AFF' }) {
  const bar = (w, c = 'rgba(255,255,255,.12)', h = 8) => <div className="mock-bar" style={{ width: w, height: h, background: c }} />
  const wrap = { background: `radial-gradient(circle at 85% 10%, ${tint}55, transparent 50%), radial-gradient(circle at 10% 100%, ${tint}33, transparent 55%), #101018` }
  if (kind === 'nestly') return (
    <div className="mock" style={wrap} aria-hidden="true">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#fff' }}>
        <div><div style={{ fontSize: '.8rem', opacity: .6 }}>Good evening</div><div style={{ fontWeight: 600, fontSize: '1.2rem' }}>Your nest</div></div>
        <div style={{ width: 38, height: 38, borderRadius: 99, background: tint }} />
      </div>
      <div className="mock-card" style={{ color: '#fff' }}>
        <div style={{ fontSize: '.74rem', opacity: .6 }}>NET BALANCE</div>
        <div style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 600, letterSpacing: '-.04em' }}>RM 4,812.40</div>
        <svg viewBox="0 0 300 60" style={{ width: '100%', height: 60, marginTop: 8 }}><path d="M0 48 C40 40 60 52 90 36 S150 30 180 22 240 28 300 8" fill="none" stroke={tint} strokeWidth="3" strokeLinecap="round" /></svg>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
        {[['Bills', '3 due'], ['Pay later', 'RM 412'], ['Goal: Travel', '42%']].map(([a, b]) => (
          <div key={a} className="mock-card" style={{ color: '#fff' }}><div style={{ fontSize: '.7rem', opacity: .6 }}>{a}</div><div style={{ fontWeight: 600, marginTop: 4 }}>{b}</div></div>
        ))}
      </div>
      <div className="mock-card" style={{ color: '#fff', display: 'flex', gap: 10, alignItems: 'center' }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: '#F5C542' }} />
        <div style={{ fontSize: '.85rem', opacity: .75 }}>Ask: “Can I afford a trip in December?”</div>
      </div>
    </div>
  )
  if (kind === 'build') return (
    <div className="mock" style={{ ...wrap, fontFamily: 'var(--mono)', fontSize: '.82rem', color: '#C9C9D6', lineHeight: 1.9 }} aria-hidden="true">
      <div style={{ color: '#7A7A8C' }}>// paste what your AI built</div>
      <div><span style={{ color: '#C084FC' }}>&lt;section</span> <span style={{ color: '#22D3EE' }}>class</span>=<span style={{ color: '#F5C542' }}>"hero"</span><span style={{ color: '#C084FC' }}>&gt;</span></div>
      <div>&nbsp;&nbsp;<span style={{ color: '#C084FC' }}>&lt;h1&gt;</span>Nasi Lemak Corner<span style={{ color: '#C084FC' }}>&lt;/h1&gt;</span></div>
      <div><span style={{ color: '#C084FC' }}>&lt;/section&gt;</span></div>
      <div style={{ marginTop: 10 }}>→ validating code <span style={{ color: '#3FCF6A' }}>✓</span></div>
      <div>→ deploying to the edge <span style={{ color: '#3FCF6A' }}>✓</span></div>
      <div>→ issuing SSL <span style={{ color: '#3FCF6A' }}>✓</span></div>
      <div style={{ marginTop: 8, color: '#fff', fontSize: '.95rem' }}>✦ Live at <b>nasilemakcorner.harnova.my</b></div>
    </div>
  )
  if (kind === 'medi') return (
    <div className="mock" style={wrap} aria-hidden="true">
      <div className="mock-card" style={{ display: 'flex', gap: 14, alignItems: 'center', color: '#fff' }}>
        <div style={{ width: 44, height: 44, borderRadius: 99, background: `linear-gradient(135deg, ${tint}, #6D4AFF)` }} />
        <div style={{ flex: 1 }}><div style={{ fontWeight: 600 }}>Patient #A-019</div><div style={{ fontSize: '.78rem', opacity: .6 }}>IC scanned · 34 y/o</div></div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: '.7rem', padding: '5px 10px', borderRadius: 99, border: '1px solid #E8A317', color: '#F5C542' }}>TRIAGE · YELLOW</div>
      </div>
      <div className="mock-card"><svg viewBox="0 0 300 60" style={{ width: '100%', height: 70 }}><polyline points="0,30 50,30 64,30 74,8 86,52 98,30 160,30 174,30 184,12 196,48 206,30 300,30" fill="none" stroke={tint} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <div className="mock-card" style={{ color: '#fff' }}><div style={{ fontSize: '.7rem', opacity: .6 }}>PHARMACY</div><div style={{ fontWeight: 600, marginTop: 4 }}>Paracetamol · 412 in stock</div></div>
        <div className="mock-card" style={{ color: '#fff' }}><div style={{ fontSize: '.7rem', opacity: .6 }}>PAYMENT</div><div style={{ fontWeight: 600, marginTop: 4 }}>DuitNow · RM 45.00</div></div>
      </div>
      {bar('60%')}{bar('40%')}
    </div>
  )
  // planter
  return (
    <div className="mock" style={wrap} aria-hidden="true">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
        {[['TEMP', '28.4°C'], ['HUMIDITY', '64%'], ['PUMP', 'ON']].map(([k, v], i) => (
          <div key={k} className="mock-card" style={{ color: '#fff' }}><div style={{ fontSize: '.68rem', opacity: .6, fontFamily: 'var(--mono)' }}>{k}</div><div style={{ fontWeight: 600, fontSize: '1.4rem', marginTop: 4, color: i === 2 ? '#3FCF6A' : '#fff' }}>{v}</div></div>
        ))}
      </div>
      <div className="mock-card"><svg viewBox="0 0 300 70" style={{ width: '100%', height: 80 }}><path d="M0 56 L30 50 L60 52 L90 38 L120 42 L150 26 L180 30 L210 18 L240 22 L270 12 L300 16" fill="none" stroke={tint} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
      <div className="mock-card" style={{ color: '#fff', fontSize: '.86rem' }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: '.68rem', opacity: .6, marginBottom: 6 }}>AI ADVICE · BM / EN</div>
        Humidity is ideal. Water again in ~6 hours — the pump will handle it automatically.
      </div>
    </div>
  )
}

export const Arrow = ({ size = 16, className = 'arr' }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
)
export const ArrowUR = ({ size = 16, className = 'arr' }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
)
