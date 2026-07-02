import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Menu, X, ArrowUpRight, Sparkles, Globe, Cpu, HeartPulse, Wine, Clapperboard, Leaf, Code2, Rocket, ShieldCheck, RefreshCw } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ─── Global styles ───────────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@300;400;500;600;700;800&family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #04040A; color: #F4F4FA; font-family: 'Outfit', sans-serif; overflow-x: hidden; }
  ::selection { background: #6366F1; color: #fff; }
  a { text-decoration: none; color: inherit; }
  .display { font-family: 'Unbounded', sans-serif; }
  .mono { font-family: 'JetBrains Mono', monospace; }

  .nova-text {
    background: linear-gradient(100deg, #818CF8 0%, #C084FC 45%, #22D3EE 100%);
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }
  .gold-text { color: #F5C542; }

  .tilt-card { transform-style: preserve-3d; transition: transform 0.18s ease-out, border-color 0.3s ease, box-shadow 0.3s ease; will-change: transform; }
  .tilt-card:hover { border-color: rgba(255,255,255,0.22) !important; }

  .glass-btn { transition: all 0.3s cubic-bezier(0.22,1,0.36,1); }
  .glass-btn:hover { transform: translateY(-2px); }

  .nova-btn {
    background: linear-gradient(100deg, #6366F1, #A855F7 55%, #22D3EE 130%);
    box-shadow: 0 8px 32px rgba(124,93,250,0.35);
    transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
  }
  .nova-btn:hover { transform: translateY(-2px); box-shadow: 0 14px 44px rgba(124,93,250,0.55); }

  .work-link { transition: gap 0.25s ease, color 0.25s ease; }
  .work-card:hover .work-link { color: #fff; }

  .marquee-track { display: flex; gap: 56px; width: max-content; animation: hnMarquee 30s linear infinite; }
  @keyframes hnMarquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }

  @keyframes hnPulse { 0%,100% { opacity: 1; transform: scale(1) } 50% { opacity: 0.55; transform: scale(0.92) } }
  @keyframes hnBlink { 0%,100% { opacity: 1 } 50% { opacity: 0 } }
  @keyframes hnFlowDash { to { stroke-dashoffset: -24 } }
  @keyframes hnRise { from { opacity: 0; transform: translateY(26px) } to { opacity: 1; transform: translateY(0) } }

  @media (max-width: 768px) {
    .hide-mobile { display: none !important; }
    .hamburger-btn { display: flex !important; }
    .work-grid { grid-template-columns: 1fr !important; }
    .build-grid { grid-template-columns: 1fr !important; }
    .steps-grid { grid-template-columns: 1fr !important; }
    .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
    .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
  }
  @media (min-width: 769px) { .hamburger-btn { display: none !important; } }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.15s !important; }
    html { scroll-behavior: auto; }
  }
  :focus-visible { outline: 2px solid #22D3EE; outline-offset: 3px; border-radius: 4px; }
`

const W = { maxWidth: 1180, margin: '0 auto', padding: '0 clamp(18px,4vw,44px)' }

/* ─── Nova star mark ──────────────────────────────────────────────── */
function NovaMark({ size = 26, pulse = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true"
      style={pulse ? { animation: 'hnPulse 3.2s ease-in-out infinite' } : undefined}>
      <defs>
        <linearGradient id="novaGrad" x1="0" y1="0" x2="40" y2="40">
          <stop offset="0%" stopColor="#818CF8" />
          <stop offset="55%" stopColor="#C084FC" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      <path d="M20 1 C21.8 12.5 27.5 18.2 39 20 C27.5 21.8 21.8 27.5 20 39 C18.2 27.5 12.5 21.8 1 20 C12.5 18.2 18.2 12.5 20 1 Z" fill="url(#novaGrad)" />
      <circle cx="20" cy="20" r="3.2" fill="#fff" opacity="0.9" />
    </svg>
  )
}

/* ─── Helpers ─────────────────────────────────────────────────────── */
function useCounter(ref, target, suffix = '', duration = 1400) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const trig = ScrollTrigger.create({
      trigger: el, start: 'top 88%', once: true,
      onEnter: () => {
        if (reduced || !/^\d+$/.test(String(target))) { el.textContent = target + suffix; return }
        const end = parseInt(target, 10); let start = null
        const tick = ts => {
          if (!start) start = ts
          const p = Math.min((ts - start) / duration, 1)
          el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suffix
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
    })
    return () => trig.kill()
  }, [ref, target, suffix, duration])
}

function Reveal({ children, delay = 0, y = 30, style = {} }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    gsap.fromTo(el, { opacity: 0, y }, {
      opacity: 1, y: 0, duration: 0.9, delay, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    })
  }, [delay, y])
  return <div ref={ref} style={{ opacity: 0, ...style }}>{children}</div>
}

function TiltCard({ children, style = {}, className = '' }) {
  const ref = useRef(null)
  const onMove = e => {
    const el = ref.current, r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(900px) rotateY(${px * 7}deg) rotateX(${-py * 7}deg) translateY(-4px)`
  }
  const onLeave = () => { ref.current.style.transform = 'perspective(900px) rotateY(0) rotateX(0) translateY(0)' }
  return (
    <div ref={ref} className={`tilt-card ${className}`} onMouseMove={onMove} onMouseLeave={onLeave} style={style}>
      {children}
    </div>
  )
}

/* ─── Cursor glow ─────────────────────────────────────────────────── */
function CursorGlow() {
  const ref = useRef(null)
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const el = ref.current
    const move = e => {
      gsap.to(el, { x: e.clientX, y: e.clientY, duration: 0.6, ease: 'power3.out' })
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [])
  return (
    <div ref={ref} aria-hidden="true" style={{
      position: 'fixed', top: -260, left: -260, width: 520, height: 520, zIndex: 1,
      borderRadius: '50%', pointerEvents: 'none',
      background: 'radial-gradient(circle, rgba(124,93,250,0.10) 0%, rgba(34,211,238,0.05) 40%, transparent 70%)',
    }} />
  )
}

/* ─── Starfield + nova canvas ─────────────────────────────────────── */
function Starfield() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current, ctx = canvas.getContext('2d')
    let raf, w, h, stars = []
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const resize = () => {
      w = canvas.width = canvas.offsetWidth * devicePixelRatio
      h = canvas.height = canvas.offsetHeight * devicePixelRatio
      stars = Array.from({ length: Math.min(190, (w * h) / 22000) }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        r: Math.random() * 1.4 * devicePixelRatio + 0.3,
        tw: Math.random() * Math.PI * 2, sp: 0.008 + Math.random() * 0.02,
        hue: Math.random() < 0.12 ? '245,197,66' : Math.random() < 0.5 ? '129,140,248' : '244,244,250',
      }))
    }
    resize()
    window.addEventListener('resize', resize)
    let t = 0
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      t += 1
      for (const s of stars) {
        s.tw += s.sp
        const a = reduced ? 0.7 : 0.35 + Math.abs(Math.sin(s.tw)) * 0.6
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${s.hue},${a})`
        ctx.fill()
      }
      if (!reduced) raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
}

/* ─── Nav ─────────────────────────────────────────────────────────── */
const NAV_LINKS = [
  ['Work', '#work'],
  ['HarNova Build', '#build'],
  ['Services', '#services'],
  ['Contact', '#contact'],
]

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, padding: '15px 0',
      background: scrolled ? 'rgba(4,4,10,0.78)' : 'transparent',
      backdropFilter: scrolled ? 'blur(22px) saturate(160%)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
      transition: 'all 0.35s ease',
    }}>
      <div style={{ ...W, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="#" className="display" style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 700, fontSize: '1rem', letterSpacing: '0.02em' }}>
          <NovaMark />
          HARNOVA
        </a>
        <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 34 }}>
          {NAV_LINKS.map(([label, href]) => (
            <a key={href} href={href} style={{ fontSize: '0.92rem', fontWeight: 500, color: '#B9B9CC' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = '#B9B9CC')}>{label}</a>
          ))}
          <a href="#build" className="nova-btn" style={{ padding: '9px 20px', borderRadius: 99, fontWeight: 600, fontSize: '0.9rem', color: '#fff' }}>
            Host your site — RM10/mo
          </a>
        </div>
        <button className="hamburger-btn" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(o => !o)}
          style={{ display: 'none', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, width: 40, height: 40, color: '#fff', cursor: 'pointer', alignItems: 'center', justifyContent: 'center' }}>
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>
      {open && (
        <div style={{ background: 'rgba(6,6,14,0.97)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '10px 0 22px' }}>
          {NAV_LINKS.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}
              style={{ display: 'block', padding: '13px clamp(18px,4vw,44px)', fontSize: '1.02rem', fontWeight: 500, color: '#E6E6F2' }}>{label}</a>
          ))}
          <div style={{ padding: '10px clamp(18px,4vw,44px) 0' }}>
            <a href="#build" onClick={() => setOpen(false)} className="nova-btn" style={{ display: 'inline-block', padding: '11px 22px', borderRadius: 99, fontWeight: 600, color: '#fff' }}>
              Host your site — RM10/mo
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

/* ─── Hero ────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <header style={{ position: 'relative', minHeight: '100svh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      <Starfield />
      <div aria-hidden="true" style={{
        position: 'absolute', top: '-22%', left: '50%', transform: 'translateX(-50%)',
        width: 900, height: 900, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.16) 0%, rgba(168,85,247,0.08) 35%, transparent 65%)',
        filter: 'blur(10px)', pointerEvents: 'none',
      }} />
      <div style={{ ...W, position: 'relative', zIndex: 2, width: '100%', paddingTop: 120, paddingBottom: 80 }}>
        <div style={{ animation: 'hnRise 0.9s cubic-bezier(0.22,1,0.36,1) both 0.1s', display: 'inline-flex', alignItems: 'center', gap: 10, padding: '7px 16px', borderRadius: 99, border: '1px solid rgba(255,255,255,0.14)', background: 'rgba(255,255,255,0.04)', fontSize: '0.8rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#B9B9CC', marginBottom: 30 }}>
          <NovaMark size={15} pulse />
          HarNova Technology · Melaka, Malaysia
        </div>
        <h1 className="display" style={{ animation: 'hnRise 0.9s cubic-bezier(0.22,1,0.36,1) both 0.22s', fontSize: 'clamp(2.2rem, 6.4vw, 4.6rem)', fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.01em', maxWidth: 900 }}>
          Software that ships.<br />
          <span className="nova-text">Built under one star.</span>
        </h1>
        <p style={{ animation: 'hnRise 0.9s cubic-bezier(0.22,1,0.36,1) both 0.34s', marginTop: 26, fontSize: 'clamp(1rem, 1.6vw, 1.2rem)', lineHeight: 1.7, color: '#B9B9CC', maxWidth: 620, fontWeight: 300 }}>
          A Malaysian product studio building e-commerce platforms, client websites and IoT systems that run in production — and <strong style={{ color: '#F4F4FA', fontWeight: 600 }}>HarNova Build</strong>, hosting for your AI-generated site at RM10 a month.
        </p>
        <div style={{ animation: 'hnRise 0.9s cubic-bezier(0.22,1,0.36,1) both 0.46s', display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 40 }}>
          <a href="#work" className="nova-btn" style={{ padding: '14px 30px', borderRadius: 99, fontWeight: 600, fontSize: '1rem', color: '#fff', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            See the work <ArrowUpRight size={17} />
          </a>
          <a href="#build" className="glass-btn" style={{ padding: '14px 30px', borderRadius: 99, fontWeight: 600, fontSize: '1rem', border: '1px solid rgba(255,255,255,0.18)', background: 'rgba(255,255,255,0.04)', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <Sparkles size={16} className="gold-text" /> Host your AI site
          </a>
        </div>
      </div>
      <div aria-hidden="true" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 160, background: 'linear-gradient(to bottom, transparent, #04040A)' }} />
    </header>
  )
}

/* ─── Stack marquee ───────────────────────────────────────────────── */
const STACK = ['React', 'Vite', 'FastAPI', 'PostgreSQL', 'Supabase', 'Cloudflare Pages', 'Cloudflare R2', 'Cloudflare Workers', 'Groq AI', 'ESP32', 'Render', 'WebSockets']

function StackMarquee() {
  return (
    <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '22px 0', overflow: 'hidden', position: 'relative', zIndex: 2 }}>
      <div className="marquee-track" aria-hidden="true">
        {[...STACK, ...STACK].map((s, i) => (
          <span key={i} className="mono" style={{ fontSize: '0.85rem', letterSpacing: '0.1em', color: '#6E6E85', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: 56 }}>
            {s} <span style={{ color: '#F5C542', fontSize: '0.6rem' }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ─── Stats ───────────────────────────────────────────────────────── */
function Stat({ value, suffix, label }) {
  const ref = useRef(null)
  useCounter(ref, value, suffix)
  return (
    <div style={{ textAlign: 'center', padding: '10px 0' }}>
      <div className="display" style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700 }}>
        <span ref={ref} className="nova-text">0</span>
      </div>
      <div style={{ marginTop: 8, fontSize: '0.85rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8A8AA0' }}>{label}</div>
    </div>
  )
}

function Stats() {
  return (
    <section style={{ padding: '76px 0 30px', position: 'relative', zIndex: 2 }}>
      <div style={{ ...W }}>
        <Reveal>
          <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
            <Stat value="4" suffix="+" label="Platforms in production" />
            <Stat value="689" suffix="" label="Products on Masterliqours" />
            <Stat value="1" suffix="st" label="Place — AI Planter, UTeM" />
            <Stat value="100" suffix="%" label="Deployed on the edge" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ─── Work / case studies ─────────────────────────────────────────── */
const PROJECTS = [
  {
    icon: Wine, tint: '#FF007F', tint2: '#00F0FF',
    tag: 'E-COMMERCE PLATFORM', name: 'Masterliqours',
    url: 'https://masterliqours.my', domain: 'masterliqours.my',
    blurb: 'Premium liquor delivery for KL & Klang Valley. Cinematic dark storefront, four role-based portals, AI-assisted staff assignment and a WhatsApp-native checkout flow.',
    stats: [['689', 'products'], ['10', 'categories'], ['4', 'role portals']],
    stack: ['React', 'FastAPI', 'Supabase', 'R2', 'Groq'],
    art: 'ml',
  },
  {
    icon: Clapperboard, tint: '#22D3EE', tint2: '#A855F7',
    tag: 'CLIENT WEBSITE', name: 'Montage Events',
    url: 'https://montageevents.my', domain: 'montageevents.my',
    blurb: 'Event production house in Malaysia. Motion-rich brand site with scroll reveals, 3D tilt galleries, animated counters and a full media library served from Cloudflare R2.',
    stats: [['7', 'service lines'], ['3D', 'tilt galleries'], ['R2', 'media CDN']],
    stack: ['React', 'GSAP', 'Cloudflare Pages', 'R2'],
    art: 'montage',
  },
  {
    icon: Leaf, tint: '#39FF14', tint2: '#22D3EE',
    tag: 'IOT SYSTEM · AWARD WINNER', name: 'AI Planter',
    url: null, domain: 'ESP32-S3 · PWA dashboard',
    blurb: 'Smart greenhouse on an ESP32-S3 — live sensor telemetry, relay-controlled pump and fan, Groq-powered growing advice, bilingual EN/BM dashboard. First place at UTeM.',
    stats: [['1st', 'place, UTeM'], ['2', 'languages'], ['24/7', 'telemetry']],
    stack: ['ESP32', 'FastAPI', 'React PWA', 'Groq'],
    art: 'planter',
  },
  {
    icon: HeartPulse, tint: '#F5C542', tint2: '#6366F1',
    tag: 'HEALTH PLATFORM', name: 'MediLink',
    url: null, domain: 'Hybrid-cloud EHR',
    blurb: 'High-availability electronic health records for Malaysian clinics. Manchester Triage AI, camera-based IC scanning, DuitNow & TnG payments, real-time WebSocket sync.',
    stats: [['HA', 'hybrid cloud'], ['AI', 'triage engine'], ['MY', 'payments built-in']],
    stack: ['PostgreSQL', 'FastAPI', 'React', 'Groq', 'Docker'],
    art: 'medi',
  },
]

/* Stylised mini-mockup art for each case study */
function CardArt({ kind, tint, tint2 }) {
  const frame = {
    borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden',
    background: '#08080F', height: 190, position: 'relative',
  }
  const chrome = (
    <div style={{ display: 'flex', gap: 5, padding: '9px 12px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
      {[0, 1, 2].map(i => <span key={i} style={{ width: 7, height: 7, borderRadius: 99, background: 'rgba(255,255,255,0.16)' }} />)}
    </div>
  )
  const bar = (w, c, h = 8) => <div style={{ width: w, height: h, borderRadius: 99, background: c }} />
  const dim = 'rgba(255,255,255,0.10)'
  return (
    <div style={frame} aria-hidden="true">
      {chrome}
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 80% 20%, ${tint}22, transparent 55%), radial-gradient(circle at 15% 90%, ${tint2}1c, transparent 50%)` }} />
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10, position: 'relative' }}>
        {kind === 'ml' && (<>
          {bar('42%', tint, 12)}{bar('68%', dim)}{bar('55%', dim)}
          <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
            {[0, 1, 2, 3].map(i => (
              <div key={i} style={{ flex: 1, height: 64, borderRadius: 8, border: '1px solid rgba(255,255,255,0.09)', background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'flex-end', padding: 6 }}>
                {bar('70%', i === 1 ? tint : dim, 5)}
              </div>
            ))}
          </div>
        </>)}
        {kind === 'montage' && (<>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ flex: 2, height: 96, borderRadius: 8, background: `linear-gradient(135deg, ${tint}33, ${tint2}26)`, border: '1px solid rgba(255,255,255,0.1)' }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ flex: 1, borderRadius: 8, background: 'rgba(255,255,255,0.05)' }} />
              <div style={{ flex: 1, borderRadius: 8, background: 'rgba(255,255,255,0.05)' }} />
            </div>
          </div>
          {bar('50%', tint, 10)}{bar('72%', dim)}
        </>)}
        {kind === 'planter' && (<>
          <div style={{ display: 'flex', gap: 8 }}>
            {[['28°C', tint], ['64%', tint2], ['ON', tint]].map(([v, c], i) => (
              <div key={i} style={{ flex: 1, borderRadius: 8, border: '1px solid rgba(255,255,255,0.09)', padding: '10px 8px', background: 'rgba(255,255,255,0.03)' }}>
                <div className="mono" style={{ fontSize: '0.8rem', color: c, fontWeight: 500 }}>{v}</div>
                <div style={{ marginTop: 6 }}>{bar('80%', dim, 5)}</div>
              </div>
            ))}
          </div>
          <svg viewBox="0 0 240 46" style={{ width: '100%', height: 46 }}>
            <polyline points="0,36 30,30 60,33 90,20 120,24 150,12 180,17 210,8 240,12" fill="none" stroke={tint} strokeWidth="2" strokeLinecap="round" opacity="0.85" />
          </svg>
        </>)}
        {kind === 'medi' && (<>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ width: 34, height: 34, borderRadius: 99, background: `linear-gradient(135deg, ${tint}55, ${tint2}44)` }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>{bar('55%', dim)}{bar('35%', dim, 6)}</div>
            <div className="mono" style={{ fontSize: '0.68rem', color: tint, border: `1px solid ${tint}55`, padding: '3px 8px', borderRadius: 99 }}>TRIAGE P2</div>
          </div>
          <svg viewBox="0 0 240 40" style={{ width: '100%', height: 40 }}>
            <polyline points="0,20 40,20 52,20 60,6 70,34 80,20 130,20 142,20 150,8 160,32 170,20 240,20" fill="none" stroke={tint} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
          </svg>
          {bar('66%', dim)}
        </>)}
      </div>
    </div>
  )
}

function WorkCard({ p, i }) {
  const Icon = p.icon
  return (
    <Reveal delay={i * 0.08}>
      <TiltCard className="work-card" style={{
        borderRadius: 20, border: '1px solid rgba(255,255,255,0.09)', padding: 24,
        background: 'linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.012))',
        height: '100%', display: 'flex', flexDirection: 'column', gap: 18,
      }}>
        <CardArt kind={p.art} tint={p.tint} tint2={p.tint2} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: `${p.tint}1f`, border: `1px solid ${p.tint}45`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon size={16} color={p.tint} />
          </div>
          <span className="mono" style={{ fontSize: '0.68rem', letterSpacing: '0.16em', color: '#8A8AA0' }}>{p.tag}</span>
        </div>
        <div>
          <h3 className="display" style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: 10 }}>{p.name}</h3>
          <p style={{ fontSize: '0.94rem', lineHeight: 1.65, color: '#B9B9CC', fontWeight: 300 }}>{p.blurb}</p>
        </div>
        <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
          {p.stats.map(([v, l]) => (
            <div key={l}>
              <div className="display" style={{ fontSize: '1.05rem', fontWeight: 600, color: p.tint }}>{v}</div>
              <div style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6E6E85' }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {p.stack.map(s => (
            <span key={s} className="mono" style={{ fontSize: '0.7rem', padding: '4px 10px', borderRadius: 99, border: '1px solid rgba(255,255,255,0.12)', color: '#B9B9CC' }}>{s}</span>
          ))}
        </div>
        <div style={{ marginTop: 'auto', paddingTop: 6 }}>
          {p.url ? (
            <a href={p.url} target="_blank" rel="noreferrer" className="work-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontWeight: 600, fontSize: '0.92rem', color: '#B9B9CC' }}>
              <Globe size={15} /> {p.domain} <ArrowUpRight size={15} />
            </a>
          ) : (
            <span className="work-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontWeight: 500, fontSize: '0.92rem', color: '#8A8AA0' }}>
              <Cpu size={15} /> {p.domain}
            </span>
          )}
        </div>
      </TiltCard>
    </Reveal>
  )
}

function Work() {
  return (
    <section id="work" style={{ padding: '90px 0', position: 'relative', zIndex: 2 }}>
      <div style={{ ...W }}>
        <Reveal>
          <div className="mono" style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: '#F5C542', marginBottom: 16 }}>✦ SELECTED WORK</div>
          <h2 className="display" style={{ fontSize: 'clamp(1.7rem,4vw,2.7rem)', fontWeight: 700, maxWidth: 720, lineHeight: 1.15 }}>
            Platforms running in production, <span className="nova-text">right now.</span>
          </h2>
        </Reveal>
        <div className="work-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 26, marginTop: 52 }}>
          {PROJECTS.map((p, i) => <WorkCard key={p.name} p={p} i={i} />)}
        </div>
      </div>
    </section>
  )
}

/* ─── HarNova Build ───────────────────────────────────────────────── */
const CODE_LINES = [
  ['<span style="color:#8A8AA0">// paste what your AI built</span>'],
  ['<span style="color:#C084FC">&lt;section</span> <span style="color:#22D3EE">class</span>=<span style="color:#F5C542">"hero"</span><span style="color:#C084FC">&gt;</span>'],
  ['&nbsp;&nbsp;<span style="color:#C084FC">&lt;h1&gt;</span>Nasi Lemak Corner<span style="color:#C084FC">&lt;/h1&gt;</span>'],
  ['&nbsp;&nbsp;<span style="color:#C084FC">&lt;p&gt;</span>Open daily · Melaka<span style="color:#C084FC">&lt;/p&gt;</span>'],
  ['<span style="color:#C084FC">&lt;/section&gt;</span>'],
]

function BuildTerminal() {
  const [stage, setStage] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const trig = ScrollTrigger.create({
      trigger: ref.current, start: 'top 75%', once: true,
      onEnter: () => {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (reduced) { setStage(4); return }
        let s = 0
        const iv = setInterval(() => { s += 1; setStage(s); if (s >= 4) clearInterval(iv) }, 900)
      },
    })
    return () => trig.kill()
  }, [])
  return (
    <div ref={ref} style={{ borderRadius: 18, border: '1px solid rgba(255,255,255,0.12)', background: '#08080F', overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.5)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        {[0, 1, 2].map(i => <span key={i} style={{ width: 9, height: 9, borderRadius: 99, background: 'rgba(255,255,255,0.16)' }} />)}
        <span className="mono" style={{ marginLeft: 8, fontSize: '0.72rem', color: '#6E6E85' }}>build.harnova.my</span>
      </div>
      <div className="mono" style={{ padding: '18px 20px', fontSize: '0.82rem', lineHeight: 1.9, minHeight: 235 }}>
        {CODE_LINES.map((l, i) => <div key={i} dangerouslySetInnerHTML={{ __html: l[0] }} />)}
        <div style={{ marginTop: 14, color: '#8A8AA0' }}>
          {stage >= 1 && <div>→ validating code <span style={{ color: '#39FF14' }}>✓</span></div>}
          {stage >= 2 && <div>→ deploying to the edge <span style={{ color: '#39FF14' }}>✓</span></div>}
          {stage >= 3 && <div>→ issuing SSL <span style={{ color: '#39FF14' }}>✓</span></div>}
          {stage >= 4 && (
            <div style={{ marginTop: 8, color: '#F4F4FA' }}>
              ✦ Live at <span className="nova-text" style={{ fontWeight: 600 }}>nasilemakcorner.harnova.my</span>
              <span style={{ animation: 'hnBlink 1.1s step-end infinite' }}>▌</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const BUILD_STEPS = [
  { icon: ShieldCheck, title: 'Sign in with Google', text: 'One tap. No forms, no passwords to remember — your account and your sites, secured.' },
  { icon: Code2, title: 'Paste your AI code', text: 'Built a landing page with ChatGPT, Claude or v0? Paste the HTML or React straight in.' },
  { icon: Rocket, title: 'Live in seconds', text: 'We deploy it to the edge with SSL on your own harnova.my subdomain, worldwide.' },
  { icon: RefreshCw, title: 'RM10 keeps it live', text: 'Each site runs for 30 days. Renew to keep it up, or spin up a fresh one anytime.' },
]

function Build() {
  return (
    <section id="build" style={{ padding: '90px 0', position: 'relative', zIndex: 2 }}>
      <div aria-hidden="true" style={{ position: 'absolute', top: '10%', right: '-10%', width: 640, height: 640, borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,211,238,0.07), transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ ...W, position: 'relative' }}>
        <Reveal>
          <div className="mono" style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: '#F5C542', marginBottom: 16 }}>✦ HARNOVA BUILD</div>
          <h2 className="display" style={{ fontSize: 'clamp(1.7rem,4vw,2.7rem)', fontWeight: 700, lineHeight: 1.15, maxWidth: 760 }}>
            Vibe-coded a website?<br /><span className="nova-text">Paste it. We host it.</span>
          </h2>
          <p style={{ marginTop: 20, fontSize: '1.05rem', lineHeight: 1.7, color: '#B9B9CC', maxWidth: 620, fontWeight: 300 }}>
            AI can write your site in minutes — then it just sits in a chat window. HarNova Build puts it on the internet: real domain, SSL, edge hosting. No terminal, no GitHub, no DevOps.
          </p>
        </Reveal>

        <div className="build-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 40, marginTop: 56, alignItems: 'center' }}>
          <Reveal><BuildTerminal /></Reveal>
          <Reveal delay={0.12}>
            <div style={{ borderRadius: 22, border: '1px solid rgba(255,255,255,0.14)', padding: 'clamp(26px,3vw,38px)', background: 'linear-gradient(160deg, rgba(99,102,241,0.14), rgba(168,85,247,0.07) 55%, rgba(34,211,238,0.06))', position: 'relative', overflow: 'hidden' }}>
              <div aria-hidden="true" style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,197,66,0.16), transparent 70%)' }} />
              <div className="mono" style={{ fontSize: '0.72rem', letterSpacing: '0.18em', color: '#B9B9CC' }}>PER SITE · PER MONTH</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, margin: '14px 0 6px' }}>
                <span className="display" style={{ fontSize: 'clamp(2.6rem,5vw,3.6rem)', fontWeight: 700 }}>RM10</span>
                <span style={{ color: '#8A8AA0', fontSize: '0.95rem' }}>/ 30 days</span>
              </div>
              <ul style={{ listStyle: 'none', marginTop: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {['Your own harnova.my subdomain', 'Edge hosting + free SSL', 'Google sign-in, manage all your sites', 'Renew monthly — or let it lapse, no lock-in', 'New site? Another RM10, live in seconds'].map(f => (
                  <li key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: '0.95rem', color: '#DCDCE8', fontWeight: 300 }}>
                    <span className="gold-text" style={{ lineHeight: 1.5 }}>✦</span> {f}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="nova-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 26, padding: '13px 28px', borderRadius: 99, fontWeight: 600, color: '#fff' }}>
                Get early access <ArrowUpRight size={16} />
              </a>
              <div style={{ marginTop: 14, fontSize: '0.78rem', color: '#8A8AA0' }}>Launching soon · early users get their first month on us.</div>
            </div>
          </Reveal>
        </div>

        <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20, marginTop: 56 }}>
          {BUILD_STEPS.map((s, i) => {
            const Icon = s.icon
            return (
              <Reveal key={s.title} delay={i * 0.08}>
                <div style={{ borderRadius: 16, border: '1px solid rgba(255,255,255,0.09)', padding: 22, background: 'rgba(255,255,255,0.025)', height: '100%' }}>
                  <div style={{ width: 38, height: 38, borderRadius: 11, background: 'rgba(129,140,248,0.12)', border: '1px solid rgba(129,140,248,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                    <Icon size={17} color="#818CF8" />
                  </div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ fontSize: '0.87rem', lineHeight: 1.6, color: '#8A8AA0', fontWeight: 300 }}>{s.text}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ─── Services ────────────────────────────────────────────────────── */
const SERVICES = [
  { icon: Globe, title: 'Websites for Malaysian SMEs', text: 'Motion-rich brand sites like Montage Events — built, deployed and maintained. RM1,000 build, ongoing care plans.' },
  { icon: Cpu, title: 'Full product platforms', text: 'E-commerce, dashboards and role-based portals like Masterliqours — FastAPI backends, Supabase data, edge frontends.' },
  { icon: Sparkles, title: 'AI-powered features', text: 'Groq-backed assistants, triage engines and smart automation woven into your product, not bolted on.' },
]

function Services() {
  return (
    <section id="services" style={{ padding: '30px 0 90px', position: 'relative', zIndex: 2 }}>
      <div style={{ ...W }}>
        <Reveal>
          <div className="mono" style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: '#F5C542', marginBottom: 16 }}>✦ STUDIO SERVICES</div>
          <h2 className="display" style={{ fontSize: 'clamp(1.6rem,3.6vw,2.4rem)', fontWeight: 700, lineHeight: 1.15 }}>
            Need it custom? <span className="nova-text">We build that too.</span>
          </h2>
        </Reveal>
        <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22, marginTop: 44 }}>
          {SERVICES.map((s, i) => {
            const Icon = s.icon
            return (
              <Reveal key={s.title} delay={i * 0.09}>
                <TiltCard style={{ borderRadius: 18, border: '1px solid rgba(255,255,255,0.09)', padding: 26, background: 'linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.01))', height: '100%' }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(245,197,66,0.1)', border: '1px solid rgba(245,197,66,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                    <Icon size={19} color="#F5C542" />
                  </div>
                  <h3 style={{ fontSize: '1.08rem', fontWeight: 600, marginBottom: 10 }}>{s.title}</h3>
                  <p style={{ fontSize: '0.92rem', lineHeight: 1.65, color: '#8A8AA0', fontWeight: 300 }}>{s.text}</p>
                </TiltCard>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ─── Footer / contact ────────────────────────────────────────────── */
function Footer() {
  return (
    <footer id="contact" style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '70px 0 36px', position: 'relative', zIndex: 2, background: 'linear-gradient(180deg, transparent, rgba(99,102,241,0.05))' }}>
      <div style={{ ...W }}>
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 48 }}>
          <div>
            <a href="#" className="display" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontWeight: 700, fontSize: '1.05rem' }}>
              <NovaMark size={24} /> HARNOVA
            </a>
            <p style={{ marginTop: 16, fontSize: '0.93rem', lineHeight: 1.7, color: '#8A8AA0', maxWidth: 340, fontWeight: 300 }}>
              A Malaysian technology studio building production software under one star. Melaka, Malaysia.
            </p>
            <a href="mailto:hello@harnova.my" className="glass-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 22, padding: '11px 24px', borderRadius: 99, border: '1px solid rgba(255,255,255,0.16)', background: 'rgba(255,255,255,0.04)', fontWeight: 600, fontSize: '0.92rem' }}>
              hello@harnova.my <ArrowUpRight size={15} />
            </a>
          </div>
          <div>
            <div className="mono" style={{ fontSize: '0.72rem', letterSpacing: '0.18em', color: '#6E6E85', marginBottom: 16 }}>WORK</div>
            {[['Masterliqours', 'https://masterliqours.my'], ['Montage Events', 'https://montageevents.my'], ['AI Planter', '#work'], ['MediLink', '#work']].map(([l, h]) => (
              <a key={l} href={h} target={h.startsWith('http') ? '_blank' : undefined} rel="noreferrer" style={{ display: 'block', padding: '6px 0', fontSize: '0.92rem', color: '#B9B9CC' }}>{l}</a>
            ))}
          </div>
          <div>
            <div className="mono" style={{ fontSize: '0.72rem', letterSpacing: '0.18em', color: '#6E6E85', marginBottom: 16 }}>COMPANY</div>
            {[['HarNova Build', '#build'], ['Services', '#services'], ['harnova.my', 'https://harnova.my']].map(([l, h]) => (
              <a key={l} href={h} target={h.startsWith('http') ? '_blank' : undefined} rel="noreferrer" style={{ display: 'block', padding: '6px 0', fontSize: '0.92rem', color: '#B9B9CC' }}>{l}</a>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 54, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between', fontSize: '0.8rem', color: '#6E6E85' }}>
          <span>© {new Date().getFullYear()} HarNova Technology. All rights reserved.</span>
          <span className="mono" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>Built under one star <span className="gold-text">✦</span></span>
        </div>
      </div>
    </footer>
  )
}

/* ─── App ─────────────────────────────────────────────────────────── */
export default function App() {
  useEffect(() => { ScrollTrigger.refresh() }, [])
  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <CursorGlow />
      <Nav />
      <main>
        <Hero />
        <StackMarquee />
        <Stats />
        <Work />
        <Build />
        <Services />
      </main>
      <Footer />
    </>
  )
}
