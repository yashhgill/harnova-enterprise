import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Plus } from 'lucide-react'
import { Link, useRouter } from '../router'
import { NovaMark, Label, Split, Mock, Arrow, Out, reduced } from '../components/ui'
import { Contact } from '../components/Chrome'
import { WORK, PRODUCTS, UNIVERSE, BIZ_SERVICES, FYP, FAQS } from '../data'

gsap.registerPlugin(ScrollTrigger)

const dotClass = s => (s === 'Live' ? 'dot' : s === 'Beta' || s === 'Demo' ? 'dot violet' : 'dot amber')

/* ═══ Hero ═══ */
const STAGE = [
  { src: '/shots/montage-hero.webp', url: 'montageevents.my', s: { left: '0%', top: '8%', width: '62%' }, z: -40, ry: 14, rx: 4 },
  { src: '/shots/care-hero.webp', url: 'care.harnova.my', s: { right: '0%', top: '40%', width: '56%' }, z: 40, ry: -10, rx: 2 },
  { src: '/shots/build-hero.webp', url: 'build.harnova.my', s: { left: '4%', bottom: '0%', width: '50%' }, z: 100, ry: 10, rx: -4 },
  { src: '/shots/irimba-home.webp', url: 'irimba.harnova.my', s: { right: '3%', top: '-2%', width: '22%', height: '50%' }, z: 170, ry: -14, rx: -2, phone: true },
]

function Stage() {
  const rot = useRef(null)
  const cards = useRef([])
  useEffect(() => {
    if (reduced()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(cards.current, { opacity: 0, y: 110, rotateX: -22 }, { opacity: 1, y: 0, rotateX: 0, duration: 1.5, ease: 'expo.out', stagger: 0.1, delay: 0.25 })
      cards.current.forEach((c, i) => gsap.to(c.firstChild, { y: i % 2 ? 12 : -12, duration: 4 + i * 0.6, ease: 'sine.inOut', yoyo: true, repeat: -1 }))
    })
    const move = e => {
      if (window.matchMedia('(pointer: coarse)').matches) return
      const x = e.clientX / window.innerWidth - 0.5, y = e.clientY / window.innerHeight - 0.5
      rot.current.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 7}deg)`
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => { ctx.revert(); window.removeEventListener('mousemove', move) }
  }, [])
  return (
    <div className="stage" aria-hidden="true">
      <div className="stage-rot" ref={rot}>
        {STAGE.map((c, i) => (
          <div key={c.url} className={`card3d${c.phone ? '' : ' browser'}`} ref={el => (cards.current[i] = el)} style={{ ...c.s, transform: `translateZ(${c.z}px) rotateY(${c.ry}deg) rotateX(${c.rx}deg)` }}>
            <div style={{ width: '100%', height: '100%' }}>
              {c.phone
                ? <div className="float-card phone"><img src={c.src} alt="" /></div>
                : <div className="float-card"><div className="bar"><i /><i /><i /><em>{c.url}</em></div><img src={c.src} alt="" /></div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Hero() {
  return (
    <header className="hero" id="top">
      <div className="hero-paper" aria-hidden="true" />
      <div className="hero-light" aria-hidden="true" />
      <div className="wrap hero-in">
        <div>
          <div className="status-pill"><span className="dot" />Taking on new projects</div>
          <Split as="h1" className="h-xl" now lines={['We build the', 'software that', <span className="serif nova-ink">Malaysia runs on.</span>]} />
          <p className="lede">Websites, booking systems, online stores and AI products, designed and built by HarNova. Our own products and our clients' platforms are running right now, and you can open every one of them here.</p>
          <div className="hero-ctas">
            <Link to="#work" className="btn btn-ink">See the work <Arrow /></Link>
            <Link to="#contact" className="btn btn-ghost">Get a quote</Link>
          </div>
        </div>
        <Stage />
      </div>
    </header>
  )
}

function Proof() {
  const facts = [['10', 'Platforms designed, built and shipped'], ['5', 'HarNova products live on the web'], ['689', 'Products sold on Masterliqours'], ['1st', 'Place at UTeM for AI Planter']]
  return (
    <section className="proof" aria-label="HarNova in numbers">
      <div className="wrap proof-in">{facts.map(([v, l]) => <div key={l}><b>{v}</b><span>{l}</span></div>)}</div>
    </section>
  )
}

/* ═══ Client work: pinned horizontal gallery ═══ */
function Work() {
  const pin = useRef(null)
  const track = useRef(null)
  const rail = useRef(null)
  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 861px) and (prefers-reduced-motion: no-preference)', () => {
      const dist = () => track.current.scrollWidth - window.innerWidth
      gsap.to(track.current, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: {
          trigger: pin.current, start: 'top top', end: () => `+=${dist()}`, pin: true, scrub: 0.7, invalidateOnRefresh: true, anticipatePin: 1,
          onUpdate: self => { if (rail.current) rail.current.style.transform = `scaleX(${self.progress})` },
        },
      })
    })
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    return () => { mm.revert(); window.removeEventListener('load', refresh) }
  }, [])
  return (
    <section className="dark on-dark" id="work">
      <div className="wrap work-head">
        <div className="section-head" style={{ marginBottom: 0 }}>
          <div>
            <Label>Client work</Label>
            <Split className="h-lg" lines={['Built for clients,', <span className="serif nova-ink">running right now.</span>]} />
          </div>
          <p className="lede">Retail, events, home services, healthcare and IoT. Scroll through, then open any project for the full story.</p>
        </div>
      </div>
      <div className="pin" ref={pin}>
        <div className="track" ref={track}>
          {WORK.map((p, i) => (
            <Link key={p.slug} to={`/work/${p.slug}`} className="panel">
              <div className={`panel-media${p.cover ? ' framed' : ''}`} style={p.cover ? { background: `radial-gradient(circle at 30% 20%, ${p.tint}55, transparent 60%), radial-gradient(circle at 90% 100%, ${p.tint}33, transparent 55%), #101017` } : undefined}>
                {p.cover ? <div className="shot"><div className="shot-bar"><i /><i /><i /><em>{p.domain}</em></div><img src={p.cover} alt={`${p.name} screenshot`} loading="lazy" /></div> : <Mock kind={p.mock} tint={p.tint} />}
              </div>
              <div className="panel-body">
                <div className="panel-top"><span>{String(i + 1).padStart(2, '0')} / {String(WORK.length).padStart(2, '0')}</span><span className="st"><span className={dotClass(p.status)} />{p.status}</span></div>
                <span className="cat" style={{ color: p.tint, filter: 'brightness(1.45) saturate(1.1)' }}>{p.category}</span>
                <div className="panel-id"><img className="app-icon lg" src={p.icon} alt="" /><h3>{p.name}</h3></div>
                <p>{p.summary}</p>
                <span className="stack">{p.stack.join('  /  ')}</span>
                <div className="panel-foot">
                  <span className="panel-cta">Read the case study <Arrow size={15} /></span>
                  {p.url && <span className="u" style={{ fontSize: '.88rem', color: 'rgba(255,255,255,.72)' }}>{p.domain}</span>}
                </div>
              </div>
              <div className="panel-glow" style={{ background: p.tint }} />
            </Link>
          ))}
          <div className="panel-end">
            <h3 className="h-md">Your project <span className="serif nova-ink">goes here.</span></h3>
            <p>Tell us what you're building. You'll have a fixed written quote within 24 hours.</p>
            <Link to="#contact" className="btn btn-light" style={{ alignSelf: 'flex-start' }}>Start a project <Arrow /></Link>
          </div>
        </div>
        <div className="rail" aria-hidden="true"><i ref={rail} /></div>
      </div>
    </section>
  )
}

/* ═══ Our products: orbit + index ═══ */
function Products() {
  const { navigate } = useRouter()
  const [sel, setSel] = useState(0)
  const u = UNIVERSE[sel]
  const proj = PRODUCTS.find(p => p.slug === u.slug)
  const place = i => {
    const a = (i * (360 / UNIVERSE.length) - 90) * Math.PI / 180
    return { left: `${50 + 41 * Math.cos(a)}%`, top: `${50 + 41 * Math.sin(a)}%` }
  }
  return (
    <section className="section products" id="products">
      <div className="wrap prod-in">
        <div>
          <Label>Our products</Label>
          <Split className="h-lg" lines={['Products we build', <>and <span className="serif nova-ink">run ourselves.</span></>]} />
          <p className="lede" style={{ marginTop: 22 }}>Alongside client work, HarNova runs its own software. All five are live on the web, so you can try them before you talk to us.</p>
          <div className="prod-detail" aria-live="polite">
            <div className="thumb">{proj?.cover ? <img src={proj.cover} alt="" /> : <div style={{ position: 'relative', height: '100%', minHeight: 140 }}><Mock kind={proj?.mock} tint={u.color} /></div>}</div>
            <div className="txt">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><img className="app-icon" src={u.icon} alt="" /><b>{u.name}</b></div>
              <p>{u.what}.</p>
              <div className="links">
                <a href={u.url} target="_blank" rel="noreferrer" className="u" style={{ color: 'var(--violet)' }}>Open {u.host} <Out /></a>
                <button onClick={() => navigate(`/work/${u.slug}`)} className="u">Read the case study</button>
              </div>
            </div>
          </div>
          <div className="prod-list">
            {UNIVERSE.map((x, i) => (
              <a key={x.url} href={x.url} target="_blank" rel="noreferrer" className={`prod-item${i === sel ? ' on' : ''}`} onMouseEnter={() => setSel(i)} onFocus={() => setSel(i)}>
                <img className="app-icon" src={x.icon} alt="" />
                <span style={{ minWidth: 0 }}><b>{x.name}</b><small>{x.host}</small></span>
              </a>
            ))}
          </div>
        </div>
        <div className="orbit" aria-hidden="true">
          <div className="ring" style={{ width: '82%', height: '82%' }} />
          <div className="ring" style={{ width: '52%', height: '52%', borderStyle: 'solid', borderColor: 'var(--line)' }} />
          <div className="core"><NovaMark size={36} /><span>HARNOVA</span></div>
          <div className="spin">
            {UNIVERSE.map((x, i) => (
              <div key={x.url} className="planet" style={place(i)}>
                <div className="planet-pos"><div className="unspin">
                  <button tabIndex={-1} className={`planet-btn${i === sel ? ' on' : ''}`} onMouseEnter={() => setSel(i)} onClick={() => setSel(i)}>
                    <img className="app-icon" src={x.icon} alt="" />{x.name}
                  </button>
                </div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══ Pricing ═══ */
function Pricing({ onPick }) {
  const promises = [
    ['A fixed quote', 'The price in your written quote is the price you pay. Scope changes are quoted before we do them.'],
    ['Two rounds of revisions', 'You follow progress on a live preview link, and two rounds of changes are included.'],
    ['The code is yours', 'After the final payment we hand over the full source code and every account. No lock-in.'],
  ]
  return (
    <section className="section" id="pricing">
      <div className="wrap">
        <div className="section-head">
          <div><Label>Pricing</Label><Split className="h-lg" lines={['Clear prices,', <span className="serif nova-ink">fixed quotes.</span>]} /></div>
          <p className="lede">Starting prices for the work we do most. Agencies typically quote RM8,000 and up for the same jobs.</p>
        </div>
        <div className="svc-grid">
          {BIZ_SERVICES.map(s => (
            <div key={s.name} className={`svc${s.featured ? ' feature' : ''}`}>
              <h3>{s.name}</h3>
              <div className="price">{s.price}{s.unit && <small>{s.unit}</small>}</div>
              <p>{s.text}</p>
              <div className="svc-foot"><span>{s.time}</span><button className="u" onClick={() => onPick(s.pick)}>Ask about this</button></div>
            </div>
          ))}
        </div>
        <div className="upkeep">
          <span style={{ color: 'var(--muted)' }}>Already have a site or system? <b style={{ color: 'var(--ink)' }}>Maintenance and hosting from RM150 to RM500 a month.</b></span>
          <button className="btn btn-ghost" style={{ height: 44 }} onClick={() => onPick('Maintenance & hosting')}>Ask about upkeep</button>
        </div>
        <div className="promise">{promises.map(([t, d]) => <div key={t}><NovaMark size={22} core={false} /><h4>{t}</h4><p>{d}</p></div>)}</div>
      </div>
    </section>
  )
}

/* ═══ FYP coaching ═══ */
function Fyp({ onPick }) {
  return (
    <section className="section fyp on-dark" id="fyp">
      <div className="wrap fyp-in">
        <div>
          <Label>FYP coaching</Label>
          <Split className="h-lg" lines={['Stuck on your', <span className="serif" style={{ color: '#9CFFAB' }}>final year project?</span>]} />
          <p className="lede" style={{ marginTop: 22 }}>Coaching from a final-year UTeM student who has shipped production systems, including AI Planter, which took first place in its UTeM course.</p>
          <div className="fyp-note">
            <b>You build it. We make sure you can.</b>
            <p>We coach, debug and explain. We don't write your project or your report, because that breaks your university's academic integrity rules and leaves you unable to defend it at viva.</p>
          </div>
          <button className="btn btn-light" style={{ marginTop: 28 }} onClick={() => onPick('FYP: not sure yet')}>Tell us where you're stuck <Arrow /></button>
        </div>
        <div>
          {FYP.map(f => (
            <button key={f.name} className="fyp-row" onClick={() => onPick(f.pick)}>
              <div><h4>{f.name}</h4><p>{f.text}</p></div>
              <div className="p">{f.price}{f.unit && <small>{f.unit}</small>}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══ HarNova Build ═══ */
function Build() {
  const [stage, setStage] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    let iv
    const t = ScrollTrigger.create({
      trigger: ref.current, start: 'top 75%', once: true,
      onEnter: () => { if (reduced()) { setStage(4); return } let s = 0; iv = setInterval(() => { s += 1; setStage(s); if (s >= 4) clearInterval(iv) }, 800) },
    })
    return () => { t.kill(); clearInterval(iv) }
  }, [])
  return (
    <section className="section" id="build">
      <div className="wrap">
        <div className="section-head">
          <div><Label>HarNova Build</Label><Split className="h-lg" lines={['Made a site with AI?', <span className="serif nova-ink">Paste it. It's live.</span>]} /></div>
          <p className="lede">A real address, SSL and fast hosting for the website ChatGPT or Claude wrote for you. No terminal, no GitHub.</p>
        </div>
        <div className="build-in">
          <div className="term" ref={ref}>
            <div className="term-bar"><i /><i /><i /><span>build.harnova.my</span></div>
            <div className="term-body">
              <div style={{ color: '#7A7A8C' }}>Paste what your AI built:</div>
              <div><span style={{ color: '#C084FC' }}>&lt;section</span> <span style={{ color: '#22D3EE' }}>class</span>=<span style={{ color: '#F5C542' }}>"hero"</span><span style={{ color: '#C084FC' }}>&gt;</span></div>
              <div>&nbsp;&nbsp;<span style={{ color: '#C084FC' }}>&lt;h1&gt;</span>Nasi Lemak Corner<span style={{ color: '#C084FC' }}>&lt;/h1&gt;</span></div>
              <div>&nbsp;&nbsp;<span style={{ color: '#C084FC' }}>&lt;p&gt;</span>Open daily from 7am<span style={{ color: '#C084FC' }}>&lt;/p&gt;</span></div>
              <div><span style={{ color: '#C084FC' }}>&lt;/section&gt;</span></div>
              <div style={{ marginTop: 14, color: '#9A9AA6' }}>
                {stage >= 1 && <div>Validating code… <span style={{ color: '#6BD69A' }}>done</span></div>}
                {stage >= 2 && <div>Deploying to the edge… <span style={{ color: '#6BD69A' }}>done</span></div>}
                {stage >= 3 && <div>Issuing SSL certificate… <span style={{ color: '#6BD69A' }}>done</span></div>}
                {stage >= 4 && <div style={{ marginTop: 8, color: '#fff' }}>Live at <span className="nova-ink" style={{ fontWeight: 600 }}>nasilemakcorner.harnova.my</span></div>}
              </div>
            </div>
          </div>
          <div className="price-box">
            <span style={{ color: 'var(--muted)' }}>Per site, per month</span>
            <span className="big">RM300</span>
            <ul>
              <li>Your own address on harnova.my</li>
              <li>Fast hosting with SSL included</li>
              <li>Sign in with Google and manage all your sites</li>
              <li>Pay by DuitNow QR, active the same day</li>
            </ul>
            <a href="https://build.harnova.my" target="_blank" rel="noreferrer" className="btn btn-ink">Launch your site <Out /></a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══ Process (a real sequence, so it's numbered) ═══ */
function Process() {
  const S = [
    ['Tell us what you need', 'Use the form or message us. A few lines is enough to start.'],
    ['Scoping and a fixed quote', 'We reply within 24 hours, ask what we need to know, then send a written quote and timeline.'],
    ['We build, you review', 'You follow progress on a live preview link. Two rounds of revisions are included.'],
    ['Launch and handover', 'We put it live, show you how to run it and hand over the full source code.'],
  ]
  return (
    <section className="section" id="process" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="section-head"><div><Label>How it works</Label><Split className="h-md" lines={['From first message', <span className="serif nova-ink">to launch day.</span>]} /></div></div>
        <ol className="steps">{S.map(([t, d]) => <li key={t}><h4>{t}</h4><p>{d}</p></li>)}</ol>
        <p className="terms"><b>Payment.</b> Projects under RM10,000 are paid 50% upfront and 50% before handover. Larger projects are paid in three parts: 40%, 30% and 30%. We take DuitNow and bank transfer.</p>
      </div>
    </section>
  )
}

function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section className="section" id="faq" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <Label>FAQ</Label>
        <Split className="h-md" lines={['Questions we', <span className="serif nova-ink">get every week.</span>]} />
        <div className="faq" style={{ marginTop: 40 }}>
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

export default function Home({ pick, onPick }) {
  useEffect(() => { document.title = 'HarNova · We build the software Malaysia runs on' }, [])
  return (
    <main>
      <Hero />
      <Proof />
      <Work />
      <Products />
      <Pricing onPick={onPick} />
      <Fyp onPick={onPick} />
      <Build />
      <Process />
      <Faq />
      <Contact pick={pick} />
    </main>
  )
}
