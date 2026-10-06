import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Plus } from 'lucide-react'
import { Link } from '../router'
import { Mock } from '../components/ui'
import { Contact } from '../components/Chrome'
import { PROJECTS, UNIVERSE, BIZ_SERVICES, FYP, FAQS } from '../data'

gsap.registerPlugin(ScrollTrigger)

const statusClass = s => (s === 'Live' ? '' : s === 'Beta' || s === 'Demo' ? ' demo' : ' other')

/* ─── Hero: the work itself is the image ─── */
const STRIP = [
  { slug: 'montage-events', src: '/shots/montage-hero.webp', label: 'Montage Events', note: 'booking system' },
  { slug: 'harnovacare', src: '/shots/care-hero.webp', label: 'HarnovaCare', note: 'clinic software' },
  { slug: 'masterliqours', src: '/shots/masterliqours-vault.webp', label: 'Masterliqours', note: 'online store' },
  { slug: 'i-rimba', src: '/shots/irimba-home.webp', label: 'I-Rimba', note: 'money app', phone: true },
]

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <h1 className="t-display">Websites and software for Malaysian businesses.</h1>
        <div className="hero-row">
          <p className="lead">HarNova is a small studio in Melaka. We've built clinic systems, online stores, booking platforms and money apps, and {UNIVERSE.length} of them are running right now. You can open every one of them on this page.</p>
          <div className="hero-actions">
            <Link to="#work" className="btn btn-primary">See our work</Link>
            <Link to="#contact" className="btn btn-line">Get a quote</Link>
          </div>
        </div>
      </div>
      <div className="strip">
        {STRIP.map(s => (
          <figure key={s.slug}>
            <Link to={`/work/${s.slug}`} aria-label={`${s.label} case study`}>
              <div className={`shot${s.phone ? ' phone' : ''}`}><img src={s.src} alt={`${s.label}, ${s.note}`} /></div>
            </Link>
            <figcaption><Link to={`/work/${s.slug}`}>{s.label}</Link>, {s.note}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

/* ─── Work: pinned horizontal gallery ─── */
function Work() {
  const pin = useRef(null)
  const track = useRef(null)
  const bar = useRef(null)
  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 861px) and (prefers-reduced-motion: no-preference)', () => {
      const dist = () => track.current.scrollWidth - window.innerWidth
      gsap.to(track.current, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: {
          trigger: pin.current, start: 'top top', end: () => `+=${dist()}`, pin: true, scrub: 0.6, invalidateOnRefresh: true,
          onUpdate: self => { if (bar.current) bar.current.style.transform = `scaleX(${self.progress})` },
        },
      })
    })
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    return () => { mm.revert(); window.removeEventListener('load', refresh) }
  }, [])
  return (
    <section className="work" id="work">
      <div className="wrap work-head">
        <div className="section-intro" style={{ marginBottom: 0 }}>
          <h2 className="t-1">{PROJECTS.length} projects, all shipped.</h2>
          <p className="lead">Retail, healthcare, events, fintech, education and IoT. Scroll through them, then open any project to see what it does and how it was built.</p>
        </div>
      </div>
      <div className="pin" ref={pin}>
        <div className="track" ref={track}>
          {PROJECTS.map((p, i) => (
            <Link key={p.slug} to={`/work/${p.slug}`} className="panel">
              <div className={`panel-shot${p.portrait ? ' portrait' : ''}`}>
                {p.cover ? <img src={p.cover} alt={`${p.name} screenshot`} loading="lazy" /> : <Mock kind={p.mock} />}
              </div>
              <div className="panel-text">
                <div className="panel-meta"><span>{i + 1} of {PROJECTS.length}</span><span className={`status${statusClass(p.status)}`}>{p.status}</span></div>
                <h3 className="t-1">{p.name}</h3>
                <p style={{ color: 'var(--on-dark)' }}>{p.category}</p>
                <p>{p.summary}</p>
                <span className="panel-cta">Read the case study</span>
              </div>
            </Link>
          ))}
          <div className="work-end">
            <h3 className="t-1">Yours could be next.</h3>
            <p>Tell us what you're building and you'll have a fixed written quote within 24 hours.</p>
            <Link to="#contact" className="btn btn-light">Start a project</Link>
          </div>
        </div>
        <div className="gallery-bar" aria-hidden="true"><i ref={bar} /></div>
      </div>
    </section>
  )
}

/* ─── Products: an index you can actually use ─── */
function Products() {
  const [peek, setPeek] = useState(null)
  const shotFor = slug => PROJECTS.find(p => p.slug === slug)?.cover
  const move = e => setPeek(p => (p ? { ...p, x: e.clientX + 24, y: e.clientY - 110 } : p))
  return (
    <section className="section" id="products">
      <div className="wrap">
        <div className="section-intro">
          <h2 className="t-1">Open them yourself.</h2>
          <p className="lead">Every product below is live on the web. Hover a row to preview it, select the name for the case study, or open the address in a new tab.</p>
        </div>
        <table className="ptable" onMouseMove={move} onMouseLeave={() => setPeek(null)}>
          <thead><tr><th>Product</th><th>What it does</th><th>Address</th><th>Status</th></tr></thead>
          <tbody>
            {UNIVERSE.map(u => {
              const p = PROJECTS.find(x => x.slug === u.slug)
              return (
                <tr key={u.url} className="row" onMouseEnter={e => setPeek({ src: shotFor(u.slug), x: e.clientX + 24, y: e.clientY - 110 })}>
                  <td><Link to={`/work/${u.slug}`} className="name">{u.name}</Link></td>
                  <td className="what">{u.what}</td>
                  <td className="addr"><a href={u.url} target="_blank" rel="noreferrer">{u.url.replace('https://', '')}</a></td>
                  <td className="st"><span className={`status${statusClass(p?.status)}`}>{p?.status}</span></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {peek?.src && <div className="peek on" style={{ left: peek.x, top: peek.y }} aria-hidden="true"><img src={peek.src} alt="" /></div>}
    </section>
  )
}

/* ─── Pricing ─── */
function Pricing({ onPick }) {
  return (
    <section className="section" id="pricing" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="section-intro">
          <h2 className="t-1">What it costs.</h2>
          <p className="lead">Starting prices for the work we do most. Before anything starts you get a fixed written quote, so the number doesn't move.</p>
        </div>
        <div className="price-list">
          {BIZ_SERVICES.map(s => (
            <div className="price-row" key={s.name}>
              <h3 className="t-3">{s.name}</h3>
              <p className="d">{s.text}</p>
              <span className="time">{s.time}</span>
              <span className="p">{s.price}{s.unit && <span>{s.unit}</span>}</span>
              <button onClick={() => onPick(s.pick)}>Ask about this</button>
            </div>
          ))}
          <div className="price-row">
            <h3 className="t-3">Maintenance and hosting</h3>
            <p className="d">Updates, backups, fixes and small changes for a site or system you already have.</p>
            <span className="time">Monthly</span>
            <span className="p">RM150–500<span>/month</span></span>
            <button onClick={() => onPick('Maintenance & hosting')}>Ask about this</button>
          </div>
        </div>
        <div className="promises">
          <div><h3 className="t-3">A fixed quote</h3><p>The price in your written quote is the price you pay. Changes in scope are quoted separately before we do them.</p></div>
          <div><h3 className="t-3">Two rounds of revisions</h3><p>You review on a live preview link as we build, and two rounds of changes are included.</p></div>
          <div><h3 className="t-3">The code is yours</h3><p>After the final payment we hand over the full source code and every account. No lock-in.</p></div>
        </div>
      </div>
    </section>
  )
}

/* ─── FYP coaching ─── */
function Fyp({ onPick }) {
  return (
    <section className="section fyp" id="fyp">
      <div className="wrap">
        <div className="section-intro">
          <div>
            <h2 className="t-1">Stuck on your final year project?</h2>
            <div className="integrity">
              <h3 className="t-3">You build it. We make sure you can.</h3>
              <p>We coach, debug and explain. We don't write your project or your report, because that breaks your university's academic integrity rules and leaves you unable to defend it at viva.</p>
            </div>
          </div>
          <p className="lead">Coaching from a final-year UTeM student who has shipped production systems, including AI Planter, which took first place in its UTeM course.</p>
        </div>
        <div className="price-list">
          {FYP.map(f => (
            <div className="price-row" key={f.name}>
              <h3 className="t-3">{f.name}</h3>
              <p className="d">{f.text}</p>
              <span className="time">{f.unit || ''}</span>
              <span className="p">{f.price}</span>
              <button onClick={() => onPick(f.pick)}>Ask about this</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── HarNova Build ─── */
function Build() {
  return (
    <section className="section" id="build">
      <div className="wrap">
        <div className="section-intro">
          <h2 className="t-1">Made a website with AI? We'll host it.</h2>
          <p className="lead">HarNova Build puts the site ChatGPT or Claude wrote for you on the internet, with a real address and SSL. No terminal, no GitHub.</p>
        </div>
        <div className="build-grid">
          <div className="term" role="img" aria-label="Example of publishing a site on HarNova Build">
            <div className="c">Paste the code your AI wrote:</div>
            <div>{'<section class="hero">'}</div>
            <div>{'  <h1>Nasi Lemak Corner</h1>'}</div>
            <div>{'  <p>Open daily, Melaka</p>'}</div>
            <div>{'</section>'}</div>
            <br />
            <div>Validating code… <span className="ok">done</span></div>
            <div>Deploying to the edge… <span className="ok">done</span></div>
            <div>Issuing SSL certificate… <span className="ok">done</span></div>
            <br />
            <div>Live at nasilemakcorner.harnova.my</div>
          </div>
          <div className="buildbox">
            <span className="muted">Per site, per month</span>
            <span className="big">RM300</span>
            <ul>
              <li>Your own address on harnova.my</li>
              <li>Fast hosting with SSL included</li>
              <li>Sign in with Google, manage all your sites</li>
              <li>Pay by DuitNow QR, active the same day</li>
              <li>Renew monthly, or let it lapse</li>
            </ul>
            <a href="https://build.harnova.my" target="_blank" rel="noreferrer" className="btn btn-primary">Open HarNova Build</a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Process (a real sequence, so it's numbered) ─── */
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
        <h2 className="t-1" style={{ marginBottom: 'clamp(40px,6vw,72px)' }}>How a project runs.</h2>
        <ol className="steps">{S.map(([t, d]) => <li key={t}><h3 className="t-3">{t}</h3><p>{d}</p></li>)}</ol>
        <p className="terms"><strong>Payment.</strong> Projects under RM10,000 are paid 50% upfront and 50% before handover. Larger projects are paid in three parts: 40%, 30% and 30%. We take DuitNow and bank transfer.</p>
      </div>
    </section>
  )
}

function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section className="section" id="faq" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <h2 className="t-1" style={{ marginBottom: 40 }}>Common questions.</h2>
        <div className="faq">
          {FAQS.map(([q, a], i) => (
            <div className="faq-item" key={q}>
              <button className="faq-q" aria-expanded={open === i} aria-controls={`fa-${i}`} onClick={() => setOpen(open === i ? -1 : i)}>{q}<Plus size={20} /></button>
              <div className="faq-a" id={`fa-${i}`} hidden={open !== i}><p>{a}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home({ pick, onPick }) {
  useEffect(() => { document.title = 'HarNova · Websites and software for Malaysian businesses' }, [])
  return (
    <main>
      <Hero />
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
