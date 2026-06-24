import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import StoryScroll from './StoryScroll'
import { Menu, X, Mail, MapPin, Globe, Stethoscope, Zap, CheckCircle2, Cloud } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ─── Global fonts + reset ────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #fff; color: #0F172A; font-family: 'DM Sans', sans-serif; overflow-x: hidden; }
  ::selection { background: #C7D2FE; color: #3730A3; }
  @media (max-width: 768px) {
    .hide-mobile { display: none !important; }
    .show-mobile { display: block !important; }
    .hamburger-btn { display: flex !important; }
  }
  @media (min-width: 769px) {
    .show-mobile { display: none !important; }
    .hamburger-btn { display: none !important; }
  }
  a { text-decoration: none; color: inherit; }
  @keyframes hnHeroFloat {
    0%,100% { transform: translateY(0) }
    50%      { transform: translateY(-12px) }
  }
  @keyframes hnPulse {
    0%,100% { opacity: 1 }
    50%      { opacity: 0.4 }
  }
  @keyframes hnSpin {
    from { transform: rotate(0deg) }
    to   { transform: rotate(360deg) }
  }
`

/* ─── Helpers ─────────────────────────────────────────────────────── */
const W = { maxWidth: 1160, margin: '0 auto', padding: '0 clamp(16px,4vw,40px)' }

function counter(el, target, suffix = '') {
  const isNum = /^\d+$/.test(String(target))
  if (!isNum) { el.textContent = target + suffix; return }
  const end = parseInt(target, 10)
  let start = null
  const tick = ts => {
    if (!start) start = ts
    const p = Math.min((ts - start) / 1000, 1)
    const e = 1 - Math.pow(1 - p, 3)
    el.textContent = Math.round(end * e) + suffix
    if (p < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

/* ─── Nav ─────────────────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      padding: '16px 0',
      background: scrolled ? 'rgba(255,255,255,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : '1px solid transparent',
      transition: 'all 0.35s ease',
    }}>
      <div style={{ ...W, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 9, fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: '1.15rem', letterSpacing: '-0.03em', color: '#0F172A' }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg,#4F46E5,#8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff', display: 'inline-block' }} />
          </div>
          HarNova
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="hide-mobile">
          {[['Products','#medilink'],['Services','#services'],['Contact','#contact']].map(([l,h]) => (
            <a key={l} href={h} style={{ fontSize: '.875rem', fontWeight: 500, color: '#64748B', transition: 'color .2s' }}
              onMouseEnter={e => e.target.style.color='#4F46E5'}
              onMouseLeave={e => e.target.style.color='#64748B'}>{l}</a>
          ))}
          <a href="mailto:hello@harnova.my" style={{
            padding: '9px 22px', background: '#0F172A', borderRadius: 99,
            fontSize: '.875rem', fontWeight: 600, color: '#fff',
            transition: 'background .2s, transform .15s',
          }}
            onMouseEnter={e => { e.target.style.background='#4F46E5'; e.target.style.transform='scale(1.03)' }}
            onMouseLeave={e => { e.target.style.background='#0F172A'; e.target.style.transform='none' }}>
            Get in touch
          </a>
        </div>

        <button className="hamburger-btn" onClick={() => setMobileOpen(!mobileOpen)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, color: '#0F172A', display: 'none' }}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div style={{ background: '#fff', padding: '12px 20px 20px', borderTop: '1px solid #F1F5F9' }}>
          {[['Products','#medilink'],['Services','#services'],['Contact','#contact']].map(([l,h]) => (
            <a key={l} href={h} onClick={() => setMobileOpen(false)}
              style={{ display: 'block', padding: '13px 0', fontSize: '1rem', fontWeight: 500, color: '#475569', borderBottom: '1px solid #F8FAFC' }}>{l}</a>
          ))}
          <a href="mailto:hello@harnova.my" style={{ display: 'block', marginTop: 14, padding: '12px', background: '#0F172A', borderRadius: 10, fontSize: '.9rem', fontWeight: 600, color: '#fff', textAlign: 'center' }}>
            Get in touch
          </a>
        </div>
      )}
    </nav>
  )
}

/* ─── Hero ────────────────────────────────────────────────────────── */
function Hero() {
  const heroRef  = useRef(null)
  const headRef  = useRef(null)
  const subRef   = useRef(null)
  const chipsRef = useRef(null)
  const ctasRef  = useRef(null)
  const orb1Ref  = useRef(null)
  const orb2Ref  = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial entrance — elements reveal on load
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.hn-hero-line',    { clipPath: 'inset(0 0 100% 0)', y: 10, duration: 0.9, stagger: 0.12 }, 0.2)
        .from(subRef.current,     { opacity: 0, y: 20, duration: 0.7 }, 0.90)
        .from(ctasRef.current.children, { opacity: 0, y: 16, stagger: 0.1, duration: 0.6 }, 1.0)
        .from('.hn-chip',         { opacity: 0, scale: 0.8, y: 12, stagger: 0.08, duration: 0.5 }, 1.1)

      // Scroll-driven parallax
      gsap.to(headRef.current,  { y: -90, opacity: 0.3, ease: 'none', scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true } })
      gsap.to(subRef.current,   { y: -50, opacity: 0,   ease: 'none', scrollTrigger: { trigger: heroRef.current, start: 'top top', end: '60% top',    scrub: true } })
      gsap.to(ctasRef.current,  { y: -40, opacity: 0,   ease: 'none', scrollTrigger: { trigger: heroRef.current, start: 'top top', end: '50% top',    scrub: true } })
      gsap.to(chipsRef.current, { y: -60, opacity: 0,   ease: 'none', scrollTrigger: { trigger: heroRef.current, start: 'top top', end: '55% top',    scrub: true } })

      // Orb parallax
      gsap.to(orb1Ref.current, { y: -120, x: 40,  ease: 'none', scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true } })
      gsap.to(orb2Ref.current, { y:  -80, x: -30, ease: 'none', scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true } })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} id="hero" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      padding: 'clamp(110px,14vw,160px) 0 clamp(60px,8vw,100px)',
      position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(170deg, #ECEEF8 0%, #E8ECFA 50%, #EBE8F7 100%)',
      borderBottom: '1px solid rgba(79,70,229,0.10)',
    }}>
      {/* Mesh grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(79,70,229,0.07) 1px, transparent 1px)', backgroundSize: '44px 44px', pointerEvents: 'none' }} />

      {/* Ambient orbs */}
      <div ref={orb1Ref} style={{ position: 'absolute', top: '-8%', right: '-5%', width: 'clamp(300px,45vw,640px)', height: 'clamp(300px,45vw,640px)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.14) 0%, transparent 70%)', pointerEvents: 'none', animation: 'hnHeroFloat 10s ease-in-out infinite' }} />
      <div ref={orb2Ref} style={{ position: 'absolute', bottom: '10%', left: '-8%', width: 'clamp(200px,30vw,440px)', height: 'clamp(200px,30vw,440px)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)', pointerEvents: 'none', animation: 'hnHeroFloat 13s ease-in-out infinite 1s' }} />

      <div style={{ ...W, position: 'relative', zIndex: 1, width: '100%', textAlign: 'center' }}>
        {/* Headline */}
        <div ref={headRef}>
          <div style={{ overflow: 'hidden', marginBottom: 4 }}>
            <h1 className="hn-hero-line" style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 'clamp(3rem,9vw,9rem)', lineHeight: 1.0, letterSpacing: '-0.04em', color: '#0F172A', clipPath: 'inset(0 0 0% 0)', display: 'block' }}>
              One platform.
            </h1>
          </div>
          <div style={{ overflow: 'hidden', marginBottom: 20 }}>
            <h1 className="hn-hero-line" style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 'clamp(3rem,9vw,9rem)', lineHeight: 1.0, letterSpacing: '-0.04em', clipPath: 'inset(0 0 0% 0)', display: 'block', background: 'linear-gradient(135deg, #4F46E5 0%, #8B5CF6 45%, #06B6D4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Every business.
            </h1>
          </div>
        </div>

        {/* Sub */}
        <p ref={subRef} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 'clamp(1rem,2vw,1.25rem)', color: '#64748B', maxWidth: 540, margin: '0 auto 36px', lineHeight: 1.7 }}>
          From clinics in KL to hawker stalls in Penang to shops in JB — HarNova builds the digital infrastructure that runs Malaysian businesses.
        </p>

        {/* CTAs */}
        <div ref={ctasRef} style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 52 }}>
          <a href="#medilink" style={{ padding: '14px 30px', background: '#0F172A', borderRadius: 99, fontWeight: 700, fontSize: '1rem', color: '#fff', transition: 'background .2s, transform .15s' }}
            onMouseEnter={e => { e.target.style.background='#4F46E5'; e.target.style.transform='translateY(-2px)' }}
            onMouseLeave={e => { e.target.style.background='#0F172A'; e.target.style.transform='none' }}>
            See MediLink →
          </a>
          <a href="mailto:hello@harnova.my" style={{ padding: '14px 30px', border: '1.5px solid #E2E8F0', borderRadius: 99, fontWeight: 600, fontSize: '1rem', color: '#475569', background: '#fff', transition: 'border-color .2s, color .2s, transform .15s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='#4F46E5'; e.currentTarget.style.color='#4F46E5'; e.currentTarget.style.transform='translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='#E2E8F0'; e.currentTarget.style.color='#475569'; e.currentTarget.style.transform='none' }}>
            Talk to us
          </a>
        </div>

        {/* Industry chips */}
        <div ref={chipsRef} style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          {[['🏥','Healthcare','#0EA5E9'],['🍜','Local Vendors','#F59E0B'],['🏪','Small Business','#A78BFA']].map(([icon, label, color]) => (
            <div key={label} className="hn-chip" style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 16px', background: '#fff', border: `1px solid ${color}33`, borderRadius: 99, boxShadow: `0 2px 16px ${color}18` }}>
              <span style={{ fontSize: 16 }}>{icon}</span>
              <span style={{ fontSize: '.8rem', fontWeight: 600, color: '#475569', fontFamily: "'DM Sans',sans-serif" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── MediLink spotlight ──────────────────────────────────────────── */
function MediLink() {
  const secRef   = useRef(null)
  const statRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Dark section reveal
      gsap.from('.hn-ml-tag',  { opacity: 0, y: 20, scrollTrigger: { trigger: secRef.current, start: 'top 75%', toggleActions: 'play none none none' } })
      gsap.from('.hn-ml-head', {
        opacity: 0, y: 40, duration: 1, ease: 'power3.out', stagger: 0.12,
        scrollTrigger: { trigger: secRef.current, start: 'top 68%', toggleActions: 'play none none none' },
      })
      gsap.from('.hn-ml-sub', { opacity: 0, y: 20, duration: 0.8, delay: 0.3, scrollTrigger: { trigger: secRef.current, start: 'top 65%', toggleActions: 'play none none none' } })
      gsap.from('.hn-ml-stat', { opacity: 0, y: 30, scale: 0.9, stagger: 0.12, duration: 0.7, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: secRef.current, start: 'top 58%', toggleActions: 'play none none none' } })
      gsap.from('.hn-ml-mock', { opacity: 0, x: 60, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: secRef.current, start: 'top 60%', toggleActions: 'play none none none' } })
      gsap.from('.hn-ml-cta',  { opacity: 0, y: 16, duration: 0.6, delay: 0.5,
        scrollTrigger: { trigger: secRef.current, start: 'top 60%', toggleActions: 'play none none none' } })

      // Stat counters on reveal
      ScrollTrigger.create({
        trigger: secRef.current,
        start: 'top 55%',
        onEnter() {
          const data = [['99','%'],['60','s'],['0','ms']]
          statRefs.current.forEach((el, i) => { if (el) counter(el, data[i][0], data[i][1]) })
        },
      })
    }, secRef)
    return () => ctx.revert()
  }, [])

  const QUEUE = [['#01','Arjun Rao','In Progress','#4F46E5'],['#02','Mei Lin','Pharmacy','#06B6D4'],['#03','Hafiz','Checked In','#10B981']]

  return (
    <section ref={secRef} id="medilink" style={{
      padding: 'clamp(80px,10vw,130px) 0',
      background: 'linear-gradient(170deg, #060D1A 0%, #0A1628 60%, #0D0520 100%)',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Ambient glows */}
      <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: 800, height: 400, background: 'radial-gradient(ellipse, rgba(79,70,229,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-5%', right: '10%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ ...W, position: 'relative', zIndex: 1, width: '100%' }}>
        {/* Two columns */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,440px),1fr))', gap: 'clamp(40px,6vw,80px)', alignItems: 'center' }}>

          {/* Left */}
          <div>
            <div className="hn-ml-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 99, marginBottom: 22 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#10B981', display: 'inline-block', animation: 'hnPulse 2s infinite' }} />
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', color: '#10B981', fontFamily: "'DM Sans',sans-serif" }}>Live · Healthcare</span>
            </div>

            <h2 className="hn-ml-head" style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 'clamp(2.8rem,7vw,7rem)', letterSpacing: '-0.04em', lineHeight: 1.0, color: '#fff', marginBottom: 6 }}>
              MediLink
            </h2>
            <h3 className="hn-ml-head" style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 'clamp(1rem,2.2vw,1.5rem)', letterSpacing: '-0.01em', lineHeight: 1.3, color: 'rgba(255,255,255,0.55)', marginBottom: 24 }}>
              Malaysia's clinical operating system.
            </h3>

            <p className="hn-ml-sub" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 'clamp(.95rem,1.6vw,1.1rem)', color: 'rgba(255,255,255,0.42)', lineHeight: 1.75, marginBottom: 36, maxWidth: 400 }}>
              Fully offline-capable EHR for Malaysian clinics. IC kiosk check-in, AI triage scoring, DuitNow payments — all in one system.
            </p>

            {/* Stats row */}
            <div style={{ display: 'flex', gap: 'clamp(16px,3vw,32px)', marginBottom: 36, flexWrap: 'wrap' }}>
              {[
                { ref: 0, label: 'Uptime SLA' },
                { ref: 1, label: 'Avg check-in' },
                { ref: 2, label: 'Sync lag' },
              ].map((s, i) => (
                <div key={i} className="hn-ml-stat" style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 'clamp(1.8rem,3.5vw,3rem)', letterSpacing: '-0.03em', lineHeight: 1, color: '#fff' }}>
                    <span ref={el => { statRefs.current[i] = el }}>—</span>
                  </div>
                  <div style={{ fontSize: '.72rem', fontWeight: 600, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '.1em', marginTop: 4, fontFamily: "'DM Sans',sans-serif" }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div className="hn-ml-cta" style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <a href="mailto:hello@harnova.my?subject=MediLink Demo" style={{ padding: '12px 26px', background: '#fff', borderRadius: 99, fontWeight: 700, fontSize: '.95rem', color: '#0F172A', transition: 'transform .2s, background .2s' }}
                onMouseEnter={e => { e.target.style.background='#EEF2FF'; e.target.style.transform='translateY(-2px)' }}
                onMouseLeave={e => { e.target.style.background='#fff'; e.target.style.transform='none' }}>
                Request a demo
              </a>
              <a href="#contact" style={{ padding: '12px 26px', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 99, fontWeight: 600, fontSize: '.95rem', color: 'rgba(255,255,255,0.6)', transition: 'border-color .2s, color .2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.4)'; e.currentTarget.style.color='#fff' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.15)'; e.currentTarget.style.color='rgba(255,255,255,0.6)' }}>
                Learn more
              </a>
            </div>
          </div>

          {/* Right — dashboard mockup */}
          <div className="hn-ml-mock" style={{ position: 'relative' }}>
            {/* Glow behind card */}
            <div style={{ position: 'absolute', inset: -30, background: 'radial-gradient(ellipse, rgba(79,70,229,0.20) 0%, transparent 70%)', pointerEvents: 'none', borderRadius: '50%' }} />
            <div style={{ position: 'relative', background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: 20, overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,0.4)' }}>
              {/* Window bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.03)' }}>
                {['#FF5F57','#FFBD2E','#28C840'].map(c => <span key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, display: 'inline-block' }} />)}
                <span style={{ marginLeft: 10, fontSize: 10, color: 'rgba(255,255,255,0.3)', fontFamily: "'DM Sans',sans-serif", fontWeight: 500 }}>MediLink — Reception Dashboard</span>
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', display: 'inline-block', animation: 'hnPulse 2s infinite' }} />
                  <span style={{ fontSize: 9, color: '#10B981', fontWeight: 700, fontFamily: "'DM Sans',sans-serif" }}>LIVE</span>
                </div>
              </div>
              <div style={{ padding: 16 }}>
                {/* Stat cards */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 14 }}>
                  {[['Queue','14','#4F46E5'],['Urgent','2','#F59E0B'],['Done','31','#10B981']].map(([l,v,c]) => (
                    <div key={l} style={{ background: `${c}14`, border: `1px solid ${c}25`, borderRadius: 10, padding: '10px 12px' }}>
                      <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 4, fontFamily: "'DM Sans',sans-serif", fontWeight: 600 }}>{l}</div>
                      <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '1.3rem', fontWeight: 800, color: c }}>{v}</div>
                    </div>
                  ))}
                </div>
                {/* Queue list */}
                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, overflow: 'hidden', marginBottom: 12 }}>
                  <div style={{ padding: '7px 12px', fontSize: 8, textTransform: 'uppercase', letterSpacing: '.1em', color: 'rgba(255,255,255,0.25)', borderBottom: '1px solid rgba(255,255,255,0.05)', fontFamily: "'DM Sans',sans-serif", fontWeight: 600 }}>Live Queue</div>
                  {QUEUE.map(([n,name,status,c]) => (
                    <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, color: '#4F46E5', fontSize: 9, width: 24 }}>{n}</span>
                      <span style={{ color: 'rgba(255,255,255,0.7)', flex: 1, fontSize: 9, fontFamily: "'DM Sans',sans-serif", fontWeight: 500 }}>{name}</span>
                      <span style={{ padding: '2px 8px', borderRadius: 5, fontSize: 8, fontWeight: 700, background: `${c}20`, color: c, fontFamily: "'DM Sans',sans-serif" }}>{status}</span>
                    </div>
                  ))}
                </div>
                {/* AI Triage alert */}
                <div style={{ background: 'rgba(245,158,11,0.10)', border: '1px solid rgba(245,158,11,0.22)', borderRadius: 10, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Zap size={12} color="#F59E0B" />
                  <div>
                    <div style={{ fontSize: 8, color: '#F59E0B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', fontFamily: "'DM Sans',sans-serif" }}>AI Triage · #03 Hafiz</div>
                    <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', marginTop: 2, fontFamily: "'DM Sans',sans-serif" }}>Urgency: Yellow · 60 min target</div>
                  </div>
                  <span style={{ marginLeft: 'auto', padding: '2px 7px', background: 'rgba(245,158,11,0.2)', borderRadius: 4, fontSize: 8, fontWeight: 800, color: '#F59E0B', fontFamily: "'DM Sans',sans-serif" }}>URGENT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Services (3 only) ───────────────────────────────────────────── */
function Services() {
  const secRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hn-sv-head', { clipPath: 'inset(0 0 100% 0)', y: 10, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: secRef.current, start: 'top 72%', toggleActions: 'play none none none' } })
      gsap.from('.hn-sv-sub', { opacity: 0, y: 18, duration: 0.7, delay: 0.2,
        scrollTrigger: { trigger: secRef.current, start: 'top 68%', toggleActions: 'play none none none' } })
      gsap.from('.hn-sv-card', { opacity: 0, y: 50, scale: 0.95, stagger: 0.14, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: secRef.current, start: 'top 62%', toggleActions: 'play none none none' } })
    }, secRef)
    return () => ctx.revert()
  }, [])

  const SVCS = [
    {
      icon: Globe,
      title: 'Web & Mobile',
      line: 'Fast, modern apps — portals, dashboards, and storefronts. Built for Malaysian users, mobile-first.',
      accent: '#4F46E5',
      bg: '#EEF2FF',
    },
    {
      icon: Cloud,
      title: 'Cloud Infrastructure',
      line: 'Architecture and deployment across major providers. Designed for reliability, scale, and local compliance.',
      accent: '#0EA5E9',
      bg: '#F0F9FF',
    },
    {
      icon: Zap,
      title: 'AI & Automation',
      line: 'Custom AI features built into your systems — triage engines, document processors, intelligent assistants.',
      accent: '#8B5CF6',
      bg: '#F5F3FF',
    },
  ]

  return (
    <section ref={secRef} id="services" style={{ padding: 'clamp(80px,10vw,130px) 0', background: '#F4F5FA', borderTop: '1px solid #E4E6F0', borderBottom: '1px solid #E4E6F0' }}>
      <div style={{ ...W, width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(40px,6vw,64px)' }}>
          <div style={{ overflow: 'hidden', display: 'inline-block', marginBottom: 16 }}>
            <h2 className="hn-sv-head" style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 'clamp(2rem,5vw,4rem)', letterSpacing: '-0.03em', color: '#0F172A', clipPath: 'inset(0 0 0% 0)', display: 'block' }}>
              What we build.
            </h2>
          </div>
          <p className="hn-sv-sub" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 'clamp(.95rem,1.8vw,1.1rem)', color: '#64748B', maxWidth: 420, margin: '0 auto' }}>
            One team. No vendor juggling.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: 16 }}>
          {SVCS.map((s, i) => (
            <div key={s.title} className="hn-sv-card" style={{
              padding: 'clamp(28px,4vw,40px)',
              border: '1px solid #DDE0EE',
              borderRadius: 20,
              transition: 'border-color .25s, box-shadow .25s, transform .25s',
              cursor: 'default',
              background: '#FAFBFF',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor=s.accent+'33'; e.currentTarget.style.boxShadow=`0 16px 48px ${s.accent}10`; e.currentTarget.style.transform='translateY(-4px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='#F1F5F9'; e.currentTarget.style.boxShadow='none'; e.currentTarget.style.transform='none' }}>
              <div style={{ width: 50, height: 50, borderRadius: 14, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, border: `1px solid ${s.accent}18` }}>
                <s.icon size={22} color={s.accent} strokeWidth={2} />
              </div>
              <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: '1.3rem', letterSpacing: '-0.02em', marginBottom: 10, color: '#0F172A' }}>{s.title}</h3>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '.9rem', color: '#64748B', lineHeight: 1.7 }}>{s.line}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Contact + Footer ────────────────────────────────────────────── */
function ContactFooter() {
  const secRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hn-ct-line', { clipPath: 'inset(0 0 100% 0)', y: 10, duration: 1, ease: 'power3.out', stagger: 0.12,
        scrollTrigger: { trigger: secRef.current, start: 'top 70%', toggleActions: 'play none none none' } })
      gsap.from('.hn-ct-sub',  { opacity: 0, y: 20, duration: 0.7, delay: 0.3,
        scrollTrigger: { trigger: secRef.current, start: 'top 67%', toggleActions: 'play none none none' } })
      gsap.from('.hn-ct-btn',  { opacity: 0, y: 16, scale: 0.94, stagger: 0.1, duration: 0.6, ease: 'back.out(1.2)', delay: 0.45,
        scrollTrigger: { trigger: secRef.current, start: 'top 65%', toggleActions: 'play none none none' } })
      gsap.from('.hn-ct-info', { opacity: 0, y: 12, stagger: 0.08, duration: 0.5, delay: 0.6,
        scrollTrigger: { trigger: secRef.current, start: 'top 63%', toggleActions: 'play none none none' } })
    }, secRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={secRef} id="contact" style={{ background: '#0A0A0F', padding: 'clamp(80px,10vw,130px) 0 0' }}>
      <div style={{ ...W, width: '100%', textAlign: 'center' }}>

        {/* Headline */}
        <div style={{ marginBottom: 'clamp(36px,5vw,52px)' }}>
          <div style={{ overflow: 'hidden', marginBottom: 6 }}>
            <h2 className="hn-ct-line" style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 'clamp(2.8rem,8vw,8rem)', letterSpacing: '-0.04em', lineHeight: 1.0, color: '#fff', clipPath: 'inset(0 0 0% 0)', display: 'block' }}>
              Ready to build?
            </h2>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <h2 className="hn-ct-line" style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 'clamp(2.8rem,8vw,8rem)', letterSpacing: '-0.04em', lineHeight: 1.0, clipPath: 'inset(0 0 0% 0)', display: 'block', background: 'linear-gradient(135deg,#4F46E5,#8B5CF6,#06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Let's talk.
            </h2>
          </div>
        </div>

        <p className="hn-ct-sub" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 'clamp(1rem,2vw,1.2rem)', color: 'rgba(255,255,255,0.38)', maxWidth: 420, margin: '0 auto 40px', lineHeight: 1.7 }}>
          Tell us what you're trying to solve. We'll figure out the rest.
        </p>

        {/* CTA buttons */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 52 }}>
          <a className="hn-ct-btn" href="mailto:hello@harnova.my" style={{ padding: '15px 34px', background: '#fff', borderRadius: 99, fontWeight: 700, fontSize: '1rem', color: '#0F172A', transition: 'transform .2s, background .2s' }}
            onMouseEnter={e => { e.target.style.background='#EEF2FF'; e.target.style.transform='translateY(-3px)' }}
            onMouseLeave={e => { e.target.style.background='#fff'; e.target.style.transform='none' }}>
            Email us →
          </a>
          <a className="hn-ct-btn" href="https://wa.me/60182085097" target="_blank" rel="noopener" style={{ padding: '15px 34px', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: 99, fontWeight: 600, fontSize: '1rem', color: 'rgba(255,255,255,0.65)', transition: 'border-color .2s, color .2s, transform .2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.4)'; e.currentTarget.style.color='#fff'; e.currentTarget.style.transform='translateY(-3px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.15)'; e.currentTarget.style.color='rgba(255,255,255,0.65)'; e.currentTarget.style.transform='none' }}>
            💬 WhatsApp
          </a>
        </div>

        {/* Contact details */}
        <div style={{ display: 'flex', gap: 'clamp(20px,4vw,40px)', justifyContent: 'center', flexWrap: 'wrap', marginBottom: 'clamp(60px,8vw,100px)' }}>
          {[
            [Mail, 'hello@harnova.my', 'mailto:hello@harnova.my'],
            [Globe, 'harnova.my', 'https://harnova.my'],
            [MapPin, 'Kuala Lumpur, Malaysia', null],
          ].map(([Icon, text, href]) => (
            <div key={text} className="hn-ct-info" style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: '.875rem', color: 'rgba(255,255,255,0.3)', fontFamily: "'DM Sans',sans-serif" }}>
              <Icon size={14} />
              {href
                ? <a href={href} style={{ color: 'rgba(255,255,255,0.5)', transition: 'color .2s' }}
                    onMouseEnter={e => e.target.style.color='#fff'}
                    onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.5)'}>{text}</a>
                : text}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '24px 0' }}>
        <div style={{ ...W, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: '.95rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '-0.02em' }}>
            <div style={{ width: 20, height: 20, borderRadius: 5, background: 'linear-gradient(135deg,#4F46E5,#8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#fff', display: 'inline-block' }} />
            </div>
            HarNova
          </div>
          <span style={{ fontSize: '.75rem', color: 'rgba(255,255,255,0.2)', fontFamily: "'DM Sans',sans-serif" }}>© 2025 HarNova Technology · harnova.my</span>
          <div style={{ display: 'flex', gap: 20 }}>
            {[['Products','#medilink'],['Services','#services'],['Contact','#contact']].map(([l,h]) => (
              <a key={l} href={h} style={{ fontSize: '.78rem', color: 'rgba(255,255,255,0.22)', fontFamily: "'DM Sans',sans-serif", transition: 'color .2s' }}
                onMouseEnter={e => e.target.style.color='rgba(255,255,255,0.6)'}
                onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.22)'}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Root ────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <Nav />
      <Hero />
      <StoryScroll />
      <MediLink />
      <Services />
      <ContactFooter />
    </>
  )
}
