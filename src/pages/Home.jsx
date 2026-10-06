import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check, Layers, Wallet, ShieldCheck, Code2, Rocket, RefreshCw, Plus } from 'lucide-react'
import { Link, useRouter } from '../router'
import { NovaMark, Reveal, SplitHeading, Counter, Mock, Arrow, ArrowUR, reduced } from '../components/ui'
import { Contact } from '../components/Chrome'
import { PROJECTS, UNIVERSE, BIZ_SERVICES, FYP, FAQS } from '../data'

gsap.registerPlugin(ScrollTrigger)

/* ═══ HERO ════════════════════════════════════════════════════════════ */
const STAGE = [
  { src: '/shots/montage-hero.webp', url: 'montageevents.my', s: { left: '0%', top: '4%', width: '60%', height: '50%' }, z: -40, ry: 14, rx: 4 },
  { src: '/shots/care-hero.webp', url: 'care.harnova.my', s: { right: '0%', top: '12%', width: '52%', height: '46%' }, z: 30, ry: -10, rx: 2 },
  { src: '/shots/masterliqours-vault.webp', url: 'masterliqours.my', s: { left: '8%', bottom: '2%', width: '48%', height: '44%' }, z: 90, ry: 10, rx: -4 },
  { src: '/shots/irimba-home.webp', url: 'irimba.harnova.my', s: { right: '8%', bottom: '0%', width: '25%', height: '56%' }, z: 160, ry: -14, rx: -2, phone: true },
]

function Stage() {
  const rot = useRef(null)
  const cards = useRef([])
  useEffect(() => {
    if (reduced()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(cards.current, { opacity: 0, y: 120, rotateX: -25 }, { opacity: 1, y: 0, rotateX: 0, duration: 1.6, ease: 'expo.out', stagger: 0.12, delay: 0.35 })
      cards.current.forEach((c, i) => gsap.to(c.querySelector('.float-inner'), { y: i % 2 ? 14 : -14, duration: 3.6 + i * 0.5, ease: 'sine.inOut', yoyo: true, repeat: -1 }))
      gsap.to(rot.current, { yPercent: -10, ease: 'none', scrollTrigger: { trigger: rot.current, start: 'top top', end: 'bottom top', scrub: true } })
    })
    const move = e => {
      if (window.matchMedia('(pointer: coarse)').matches) return
      const x = e.clientX / window.innerWidth - 0.5, y = e.clientY / window.innerHeight - 0.5
      rot.current.style.transform = `rotateY(${x * 12}deg) rotateX(${-y * 9}deg)`
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => { ctx.revert(); window.removeEventListener('mousemove', move) }
  }, [])
  return (
    <div className="stage" aria-hidden="true">
      <div className="stage-rot" ref={rot}>
        {STAGE.map((c, i) => (
          <div key={c.url} ref={el => (cards.current[i] = el)} style={{ position: 'absolute', ...c.s, transformStyle: 'preserve-3d', transform: `translateZ(${c.z}px) rotateY(${c.ry}deg) rotateX(${c.rx}deg)` }}>
            <div className="float-inner" style={{ width: '100%', height: '100%' }}>
              {c.phone ? (
                <div className="float-card" style={{ width: '100%', height: '100%', borderRadius: 28, border: '6px solid #111' }}>
                  <img src={c.src} alt="" style={{ height: '100%' }} />
                </div>
              ) : (
                <div className="float-card" style={{ width: '100%', height: '100%' }}>
                  <div className="bar"><i /><i /><i /><em>{c.url}</em></div>
                  <img src={c.src} alt="" />
                </div>
              )}
            </div>
          </div>
        ))}
        <div className="float-tag" style={{ left: '-2%', top: '58%', transform: 'translateZ(200px)' }}><span className="dot" /> {UNIVERSE.length} products live</div>
        <div className="float-tag" style={{ right: '28%', top: '2%', transform: 'translateZ(180px)' }}><NovaMark size={16} /> Made in Melaka</div>
      </div>
    </div>
  )
}

function Hero() {
  const sub = useRef(null)
  useEffect(() => {
    if (reduced()) return
    const ctx = gsap.context(() => {
      gsap.from(sub.current.children, { opacity: 0, y: 24, duration: 1, ease: 'power3.out', stagger: 0.1, delay: 0.75 })
    })
    return () => ctx.revert()
  }, [])
  return (
    <header className="hero" id="top">
      <div className="hero-bg">
        <div className="hero-grid" />
        <div className="blob" style={{ width: 520, height: 520, left: '-8%', top: '-10%', background: '#FFD6E8' }} />
        <div className="blob" style={{ width: 560, height: 560, right: '-10%', top: '10%', background: '#DCD4FF' }} />
        <div className="blob" style={{ width: 480, height: 480, left: '30%', bottom: '-20%', background: '#CDEFFA' }} />
      </div>
      <div className="wrap hero-in">
        <div>
          <span className="chip" style={{ marginBottom: 28 }}><span className="dot" /> Melaka · taking new projects</span>
          <SplitHeading as="h1" className="h-xl" immediate delay={0.1}
            lines={['We build the', 'software', <>Malaysia <span className="serif nova-ink" style={{ whiteSpace: 'nowrap' }}>runs on.</span></>]} />
          <div ref={sub}>
            <p className="lede hero-sub">Websites, booking systems, online stores and AI products — designed, built and shipped by HarNova. {UNIVERSE.length} of them are live right now. Yours could be next.</p>
            <div className="hero-ctas">
              <Link to="#work" className="btn btn-ink">See the work <Arrow /></Link>
              <Link to="#contact" className="btn btn-ghost">Get a free quote</Link>
            </div>
            <div className="hero-proof">
              {['Websites from RM2,500', 'Replies within 24h', 'English & BM', 'You own the code'].map(t => <span key={t}><Check size={15} strokeWidth={2.6} /> {t}</span>)}
            </div>
          </div>
        </div>
        <Stage />
      </div>
      <div className="scroll-cue"><i />SCROLL</div>
    </header>
  )
}

/* ═══ MARQUEE ═════════════════════════════════════════════════════════ */
function Marquee() {
  const items = ['HarnovaCare', 'Masterliqours', 'Montage Events', 'I-Rimba', 'Nestly', 'HarNova Build', 'MediLink', 'AI Planter']
  const row = items.map((t, i) => (
    <span className="marquee-item" key={i}>{i % 2 ? <span className="serif">{t}</span> : t}<NovaMark size={20} /></span>
  ))
  return <div className="marquee" aria-hidden="true"><div className="marquee-track">{row}{row}</div></div>
}

/* ═══ HORIZONTAL GALLERY ══════════════════════════════════════════════ */
function Gallery() {
  const { navigate } = useRouter()
  const pin = useRef(null)
  const track = useRef(null)
  const bar = useRef(null)
  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 861px)', () => {
      const dist = () => track.current.scrollWidth - window.innerWidth
      gsap.to(track.current, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: {
          trigger: pin.current, start: 'top top', end: () => `+=${dist()}`, pin: true, scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1,
          onUpdate: self => { if (bar.current) bar.current.style.transform = `scaleX(${self.progress})` },
        },
      })
      track.current.querySelectorAll('.panel-media img').forEach(img => {
        gsap.fromTo(img, { xPercent: -6, scale: 1.12 }, { xPercent: 6, scale: 1.12, ease: 'none', scrollTrigger: { trigger: pin.current, start: 'top top', end: () => `+=${dist()}`, scrub: true } })
      })
    })
    return () => mm.revert()
  }, [])
  return (
    <section className="hgal" id="work">
      <div className="wrap hgal-head">
        <div className="section-head" style={{ marginBottom: 0 }}>
          <div>
            <span className="eyebrow">Selected work · {String(PROJECTS.length).padStart(2, '0')} projects</span>
            <SplitHeading className="h-lg" lines={['Real platforms,', <span className="serif nova-ink">running right now.</span>]} />
          </div>
          <p className="lede" style={{ maxWidth: 400 }}>Healthcare, retail, events, fintech and IoT. Scroll through — then open any project for the full story.</p>
        </div>
      </div>
      <div className="hgal-pin" ref={pin}>
        <div className="hgal-track" ref={track}>
          {PROJECTS.map((p, i) => (
            <article key={p.slug} className="panel" onClick={() => navigate(`/work/${p.slug}`)} style={{ cursor: 'pointer' }}>
              <div className={`panel-media${p.portrait ? ' portrait' : ''}`} style={p.portrait ? { background: `radial-gradient(circle at 50% 40%, ${p.tint}55, #0F0F15 70%)` } : undefined}>
                {p.cover ? <img src={p.cover} alt={`${p.name} screenshot`} loading="lazy" /> : <Mock kind={p.mock} tint={p.tint} />}
              </div>
              <div className="panel-body">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
                  <span className="panel-num">{String(i + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}</span>
                  <span className="chip"><span className={`dot${p.status === 'Live' ? '' : p.status === 'Beta' || p.status === 'Demo' ? ' violet' : ' amber'}`} /> {p.status}</span>
                </div>
                <span className="mono" style={{ fontSize: '.74rem', letterSpacing: '.12em', color: p.tint, textTransform: 'uppercase', filter: 'brightness(1.5)' }}>{p.category}</span>
                <h3>{p.name}</h3>
                <p>{p.summary}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{p.stack.slice(0, 4).map(s => <span key={s} className="chip">{s}</span>)}</div>
                <div className="panel-foot">
                  <span className="panel-cta">View case study <Arrow /></span>
                  {p.url && <a href={p.url} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} className="link-u" style={{ fontSize: '.88rem', color: 'rgba(255,255,255,.75)' }}>{p.domain} ↗</a>}
                </div>
              </div>
              <div className="panel-glow" style={{ background: p.tint }} />
            </article>
          ))}
          <div className="panel-end">
            <h3 className="h-md">Your project<br /><span className="serif nova-ink">goes here.</span></h3>
            <p style={{ color: 'rgba(255,255,255,.62)', fontSize: '1.05rem', lineHeight: 1.6 }}>Tell us what you're building. You'll get a fixed written quote within 24 hours.</p>
            <Link to="#contact" className="btn btn-light" style={{ alignSelf: 'flex-start' }}>Start a project <Arrow /></Link>
          </div>
        </div>
        <div className="hgal-progress"><i ref={bar} /></div>
      </div>
    </section>
  )
}

/* ═══ UNIVERSE ════════════════════════════════════════════════════════ */
function Universe() {
  const { navigate } = useRouter()
  const [sel, setSel] = useState(0)
  const u = UNIVERSE[sel]
  // three on the inner ring, three on the outer
  const place = i => {
    const inner = i % 2 === 0
    const r = inner ? 30 : 46
    const step = 720 / UNIVERSE.length
    const a = ((inner ? i / 2 : (i - 1) / 2) * step + (inner ? -90 : -90 + step / 2)) * Math.PI / 180
    return { left: `${50 + r * Math.cos(a)}%`, top: `${50 + r * Math.sin(a)}%` }
  }
  return (
    <section className="section universe" id="universe">
      <div className="wrap uni-in">
        <div>
          <span className="eyebrow">The HarNova universe</span>
          <SplitHeading className="h-lg" lines={['Everything we', 'built, one click', <span className="serif nova-ink">away.</span>]} />
          <p className="lede" style={{ marginTop: 22 }}>Don't take our word for it — open the real products. Each one is live on the web right now.</p>
          <div className="uni-detail" style={{ marginTop: 30 }} aria-live="polite">
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span className="orb" style={{ width: 44, height: 44, borderRadius: 99, background: `radial-gradient(circle at 32% 30%, #fff, ${u.color} 45%, ${u.color})`, boxShadow: 'inset -5px -7px 12px rgba(0,0,0,.2)' }} />
              <div><div style={{ fontWeight: 600, fontSize: '1.3rem', letterSpacing: '-.02em' }}>{u.name}</div><div className="mono" style={{ fontSize: '.78rem', color: 'var(--muted)' }}>{u.host}</div></div>
            </div>
            <p style={{ marginTop: 16, color: 'var(--ink-2)', fontSize: '1.02rem' }}>{u.what}.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 20 }}>
              <a href={u.url} target="_blank" rel="noreferrer" className="btn btn-ink" style={{ padding: '12px 20px' }}>Open {u.host} <ArrowUR /></a>
              <button onClick={() => navigate(`/work/${u.slug}`)} className="btn btn-ghost" style={{ padding: '12px 20px' }}>Case study</button>
            </div>
          </div>
          <div className="uni-list">
            {UNIVERSE.map((x, i) => (
              <a key={x.host} href={x.url} target="_blank" rel="noreferrer" className={`uni-item${i === sel ? ' on' : ''}`} onMouseEnter={() => setSel(i)} onFocus={() => setSel(i)}>
                <span className="orb" style={{ background: `radial-gradient(circle at 32% 30%, #fff, ${x.color} 50%)` }} />
                <span style={{ minWidth: 0 }}><b>{x.name}</b><small>{x.host} ↗</small></span>
              </a>
            ))}
          </div>
        </div>
        <Reveal>
          <div className="orbit-wrap">
            <div className="orbit-ring" style={{ width: '60%', height: '60%' }} />
            <div className="orbit-ring" style={{ width: '92%', height: '92%' }} />
            <div className="core"><NovaMark size={34} /><span>HARNOVA</span></div>
            <div className="orbit-spin">
              {UNIVERSE.map((x, i) => (
                <div key={x.host} className="planet" style={place(i)}>
                  <div className="planet-in">
                    <div className="planet-rot">
                      <button className={`planet-btn${i === sel ? ' on' : ''}`} onMouseEnter={() => setSel(i)} onClick={() => setSel(i)} aria-label={`${x.name} — ${x.what}`}>
                        <span className="orb" style={{ background: `radial-gradient(circle at 32% 30%, #fff, ${x.color} 50%)` }} />{x.name}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ═══ SERVICES ════════════════════════════════════════════════════════ */
function Services({ onPick }) {
  return (
    <section className="section" id="services">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="eyebrow">Services & pricing</span>
            <SplitHeading className="h-lg" lines={['Clear prices.', <span className="serif nova-ink">No agency markup.</span>]} />
          </div>
          <p className="lede" style={{ maxWidth: 420 }}>Typical agency quotes for the same work start at RM8,000+. Every project gets a fixed written quote before we start.</p>
        </div>
        <Reveal>
          <div className="svc-grid">
            {BIZ_SERVICES.map((s, i) => (
              <div key={s.name} className={`svc${s.featured ? ' featured' : ''}`}>
                <span className="n">{String(i + 1).padStart(2, '0')}</span>
                {s.featured && <span className="chip badge">Most asked</span>}
                <h3>{s.name}</h3>
                <div className="price">{s.price}{s.unit && <small>{s.unit}</small>}</div>
                <p>{s.text}</p>
                <div className="svc-foot">
                  <span className="t">⏱ {s.time}</span>
                  <button className="svc-ask" onClick={() => onPick(s.pick)}>Ask about this <Arrow size={15} className="" /></button>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal>
          <div className="upkeep">
            <span style={{ color: 'var(--muted)' }}>Already have a site or system? <b style={{ color: 'var(--ink)' }}>Maintenance & hosting from RM150–500/month.</b></span>
            <button className="btn btn-ghost" style={{ padding: '11px 20px' }} onClick={() => onPick('Maintenance & hosting')}>Ask about upkeep <Arrow size={15} /></button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Band() {
  return (
    <div className="wrap">
      <div className="band">
        {[[String(UNIVERSE.length), 'Products live on the web'], ['689', 'Products on Masterliqours'], ['280+', 'Events hosted by our client Montage'], ['1st', 'Place — AI Planter, UTeM']].map(([v, l]) => (
          <div key={l}><div className="v"><Counter value={v} /></div><div className="l">{l}</div></div>
        ))}
      </div>
    </div>
  )
}

function Why() {
  const W = [
    { icon: Layers, t: 'Built on proven parts', d: 'Checkout, logins, bookings, AI chat — we reuse modules already running in our live products. You pay for your business logic, not for reinventing the wheel. That\'s why we ship in weeks.' },
    { icon: Wallet, t: 'Made for Malaysia', d: 'DuitNow, FPX and Touch \'n Go payments, WhatsApp-first ordering and bilingual EN/BM interfaces come standard — not as expensive add-ons.' },
    { icon: ShieldCheck, t: 'Yours, fully', d: 'A fixed written quote before we start, two revision rounds included, and the complete source code handed over at the end. No lock-in.' },
  ]
  return (
    <section className="section" style={{ paddingTop: 'clamp(60px,8vw,110px)' }}>
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="eyebrow">Why HarNova</span>
            <SplitHeading className="h-md" lines={['Agency-grade work,', <span className="serif nova-ink">studio-level prices.</span>]} />
          </div>
        </div>
        <div className="why-grid">
          {W.map(({ icon: I, t, d }, i) => (
            <Reveal key={t} delay={i * 0.08}><div className="why"><div className="ic"><I size={20} /></div><h3>{t}</h3><p>{d}</p></div></Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══ FYP ═════════════════════════════════════════════════════════════ */
function Fyp({ onPick }) {
  return (
    <section className="section fyp" id="fyp">
      <div className="wrap fyp-in">
        <div>
          <span className="eyebrow">FYP coaching</span>
          <SplitHeading className="h-lg" lines={['Stuck on your FYP?', <span className="serif" style={{ color: '#9CFFAB' }}>Let's unblock it.</span>]} />
          <p className="lede" style={{ marginTop: 22 }}>Coaching from a final-year student who has shipped real production systems — and won first place at UTeM along the way.</p>
          <div className="fyp-note">
            <b><ShieldCheck size={17} color="#9CFFAB" /> You build it. We make sure you can.</b>
            <p>We coach, debug and explain — we don't write your project or report for you. That keeps you safe under your university's academic integrity rules, and means you can actually defend your work at viva.</p>
          </div>
          <button className="btn btn-light" style={{ marginTop: 28 }} onClick={() => onPick('FYP — not sure yet')}>Tell us where you're stuck <Arrow /></button>
        </div>
        <div className="fyp-list">
          {FYP.map(f => (
            <button key={f.name} className="fyp-row" onClick={() => onPick(f.pick)}>
              <div><h4>{f.name}{f.featured && <span className="chip">Best value</span>}</h4><p>{f.text}</p></div>
              <div className="p">{f.price}{f.unit && <small>{f.unit}</small>}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══ BUILD ═══════════════════════════════════════════════════════════ */
function Build() {
  const [stage, setStage] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    let iv
    const t = ScrollTrigger.create({
      trigger: ref.current, start: 'top 75%', once: true,
      onEnter: () => { if (reduced()) { setStage(4); return } let s = 0; iv = setInterval(() => { s += 1; setStage(s); if (s >= 4) clearInterval(iv) }, 850) },
    })
    return () => { t.kill(); clearInterval(iv) }
  }, [])
  const steps = [[Code2, 'Paste your AI code', 'HTML or React from ChatGPT, Claude or v0.'], [Rocket, 'Live in seconds', 'Edge hosting + SSL on your subdomain.'], [ShieldCheck, 'Google sign-in', 'One tap, no passwords.'], [RefreshCw, 'RM300 keeps it live', '30 days per payment, no lock-in.']]
  return (
    <section className="section" id="build">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="eyebrow">HarNova Build · DIY hosting</span>
            <SplitHeading className="h-lg" lines={['Made a site with AI?', <span className="serif nova-ink">Paste it. It's live.</span>]} />
          </div>
          <p className="lede" style={{ maxWidth: 400 }}>A real domain, SSL and edge hosting for the website ChatGPT or Claude wrote for you. No terminal, no GitHub.</p>
        </div>
        <div className="build-in">
          <Reveal>
            <div className="term" ref={ref}>
              <div className="term-bar"><i /><i /><i /><span className="mono" style={{ marginLeft: 10, fontSize: '.72rem', color: 'rgba(255,255,255,.4)' }}>build.harnova.my</span></div>
              <div className="term-body">
                <div style={{ color: '#7A7A8C' }}>// paste what your AI built</div>
                <div><span style={{ color: '#C084FC' }}>&lt;section</span> <span style={{ color: '#22D3EE' }}>class</span>=<span style={{ color: '#F5C542' }}>"hero"</span><span style={{ color: '#C084FC' }}>&gt;</span></div>
                <div>&nbsp;&nbsp;<span style={{ color: '#C084FC' }}>&lt;h1&gt;</span>Nasi Lemak Corner<span style={{ color: '#C084FC' }}>&lt;/h1&gt;</span></div>
                <div>&nbsp;&nbsp;<span style={{ color: '#C084FC' }}>&lt;p&gt;</span>Open daily · Melaka<span style={{ color: '#C084FC' }}>&lt;/p&gt;</span></div>
                <div><span style={{ color: '#C084FC' }}>&lt;/section&gt;</span></div>
                <div style={{ marginTop: 14, color: '#9A9AA6' }}>
                  {stage >= 1 && <div>→ validating code <span style={{ color: '#3FCF6A' }}>✓</span></div>}
                  {stage >= 2 && <div>→ deploying to the edge <span style={{ color: '#3FCF6A' }}>✓</span></div>}
                  {stage >= 3 && <div>→ issuing SSL <span style={{ color: '#3FCF6A' }}>✓</span></div>}
                  {stage >= 4 && <div style={{ marginTop: 8, color: '#fff' }}>✦ Live at <span className="nova-ink" style={{ fontWeight: 600 }}>nasilemakcorner.harnova.my</span></div>}
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="price-box">
              <span className="mono" style={{ fontSize: '.72rem', letterSpacing: '.14em', color: 'var(--muted)' }}>PER SITE · PER MONTH</span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 12 }}><span className="big">RM300</span><span style={{ color: 'var(--muted)' }}>/ 30 days</span></div>
              <div className="steps4">{steps.map(([I, t, d]) => <div key={t}><b><I size={16} /> {t}</b><span>{d}</span></div>)}</div>
              <a href="https://build.harnova.my" target="_blank" rel="noreferrer" className="btn btn-ink" style={{ alignSelf: 'flex-start', marginTop: 'auto' }}>Launch your site <ArrowUR /></a>
              <span style={{ marginTop: 12, fontSize: '.8rem', color: 'var(--muted)' }}>Pay by DuitNow QR, activated the same day.</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ═══ PROCESS + FAQ ═══════════════════════════════════════════════════ */
function Process() {
  const S = [['Tell us what you need', 'Fill in the form or message us. A few lines is enough to start.'], ['Free scoping & fixed quote', 'We reply within 24 hours, clarify the details, then send a written quote and timeline.'], ['We build, you review', 'Regular previews on a live link. Two rounds of revisions included.'], ['Launch & handover', 'We deploy it, show you how to run it, and hand over the full source code.']]
  return (
    <section className="section" id="process" style={{ paddingTop: 'clamp(60px,8vw,110px)' }}>
      <div className="wrap">
        <div className="section-head"><div><span className="eyebrow">How it works</span><SplitHeading className="h-md" lines={['From first message', <span className="serif nova-ink">to launch day.</span>]} /></div></div>
        <div className="proc">{S.map(([t, d], i) => <Reveal key={t} delay={i * 0.08}><span className="k">0{i + 1}</span><h4>{t}</h4><p>{d}</p></Reveal>)}</div>
        <Reveal><div className="terms"><b>Payment terms</b><span>Under RM10k: <b>50% deposit, 50% before handover</b></span><span>RM10k and above: <b>40 / 30 / 30</b></span><span>DuitNow or bank transfer</span></div></Reveal>
      </div>
    </section>
  )
}

function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section className="section" id="faq" style={{ paddingTop: 'clamp(40px,6vw,80px)' }}>
      <div className="wrap" style={{ maxWidth: 980 }}>
        <span className="eyebrow">FAQ</span>
        <SplitHeading className="h-md" lines={['Questions we get', <span className="serif nova-ink">every week.</span>]} />
        <div style={{ marginTop: 40, borderTop: '1px solid var(--line)' }}>
          {FAQS.map(([q, a], i) => (
            <div className="faq-item" key={q}>
              <button className="faq-q" aria-expanded={open === i} aria-controls={`fa-${i}`} onClick={() => setOpen(open === i ? -1 : i)}>{q}<span className="pm"><Plus size={16} /></span></button>
              <div className="faq-a" id={`fa-${i}`} hidden={open !== i}><p>{a}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══ PAGE ════════════════════════════════════════════════════════════ */
export default function Home({ pick, onPick }) {
  useEffect(() => { document.title = 'HarNova — Websites, systems & AI for Malaysian businesses' }, [])
  return (
    <main>
      <Hero />
      <Marquee />
      <Gallery />
      <Universe />
      <Services onPick={onPick} />
      <Band />
      <Why />
      <Fyp onPick={onPick} />
      <Build />
      <Process />
      <Faq />
      <Contact pick={pick} />
    </main>
  )
}
