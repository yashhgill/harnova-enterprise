import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link, useRouter } from '../router'
import { Reveal, SplitHeading, Counter, Frame, Arrow, ArrowUR, reduced } from '../components/ui'
import { PROJECTS, getProject } from '../data'

gsap.registerPlugin(ScrollTrigger)

export default function Project({ slug, onPick }) {
  const p = getProject(slug)
  const { navigate } = useRouter()
  const media = useRef(null)

  useEffect(() => {
    document.title = p ? `${p.name} — ${p.category} · HarNova` : 'Not found · HarNova'
  }, [p])

  useEffect(() => {
    if (!p || reduced()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(media.current, { scale: 0.88, borderRadius: 40 }, {
        scale: 1, ease: 'none', scrollTrigger: { trigger: media.current, start: 'top 95%', end: 'top 25%', scrub: true },
      })
      gsap.from('.p-hero .fade', { opacity: 0, y: 30, duration: 1, ease: 'power3.out', stagger: 0.08, delay: 0.35 })
    })
    return () => ctx.revert()
  }, [p])

  if (!p) {
    return (
      <main className="p-hero"><div className="wrap">
        <h1 className="h-lg">That page drifted out of orbit.</h1>
        <p className="lede" style={{ marginTop: 20 }}>The project you're looking for isn't here.</p>
        <Link to="/" className="btn btn-ink" style={{ marginTop: 30 }}>Back home <Arrow /></Link>
      </div></main>
    )
  }

  const idx = PROJECTS.indexOf(p)
  const next = PROJECTS[(idx + 1) % PROJECTS.length]
  const gallery = p.shots.length > 1 ? p.shots.slice(1) : []
  const ask = () => onPick(p.kind === 'Client project' ? 'Not sure yet' : 'Custom web app / SaaS / AI')

  return (
    <main>
      <section className="p-hero">
        <div className="wrap">
          <Link to="/#work" className="back"><span style={{ display: 'inline-flex', transform: 'scaleX(-1)' }}><Arrow size={15} className="" /></span> All work</Link>
          <div className="fade" style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 26 }}>
            <span className="chip"><span className={`dot${p.status === 'Live' ? '' : p.status === 'Beta' || p.status === 'Demo' ? ' violet' : ' amber'}`} /> {p.status}</span>
            <span className="chip">{p.kind}</span>
            <span className="chip">{p.category}</span>
          </div>
          <SplitHeading as="h1" className="p-title" immediate lines={[p.name]} />
          <p className="p-tag fade">{p.tagline}</p>
          <div className="fade" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 34 }}>
            {p.url && <a href={p.url} target="_blank" rel="noreferrer" className="btn btn-ink">Visit {p.domain} <ArrowUR /></a>}
            <button className="btn btn-ghost" onClick={ask}>Build something like this</button>
          </div>
          <div className="p-meta fade">
            <div><div className="k">Type</div><div className="v">{p.kind}</div></div>
            <div><div className="k">Sector</div><div className="v">{p.category}</div></div>
            <div><div className="k">{p.url ? 'Live at' : 'Recognition'}</div><div className="v">{p.domain}</div></div>
            <div><div className="k">Stack</div><div className="v">{p.stack.slice(0, 3).join(' · ')}</div></div>
          </div>
        </div>
      </section>

      <div className="wrap p-media">
        <div ref={media} style={{ transformOrigin: 'center top' }}>
          <Frame project={p} src={p.cover} />
        </div>
      </div>

      <section className="section">
        <div className="wrap">
          <Reveal className="p-split">
            <h2>The <span className="serif">challenge</span></h2>
            <p>{p.challenge}</p>
          </Reveal>
          <Reveal className="p-split">
            <h2>What we <span className="serif">built</span></h2>
            <p>{p.built}</p>
          </Reveal>
        </div>
      </section>

      <div className="wrap">
        <div className="p-stats">
          {p.stats.map(([v, l]) => <div key={l}><div className="v"><Counter value={v} /></div><div className="l">{l}</div></div>)}
        </div>
      </div>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div><span className="eyebrow">Inside {p.name}</span><SplitHeading className="h-md" lines={['What it does,', <span className="serif nova-ink">feature by feature.</span>]} /></div>
          </div>
          <Reveal>
            <div className="feat-grid">
              {p.features.map(([t, d], i) => <div className="feat" key={t}><span className="i">{String(i + 1).padStart(2, '0')}</span><h4>{t}</h4><p>{d}</p></div>)}
            </div>
          </Reveal>
          <Reveal style={{ marginTop: 26 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
              <span className="mono" style={{ fontSize: '.74rem', color: 'var(--muted)', marginRight: 6 }}>BUILT WITH</span>
              {p.stack.map(s => <span key={s} className="chip">{s}</span>)}
            </div>
          </Reveal>
        </div>
      </section>

      {gallery.length > 0 && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <span className="eyebrow" style={{ marginBottom: 24 }}>More from the live product</span>
            <div className="gallery" style={{ marginTop: 24 }}>
              {gallery.map(src => <Reveal key={src}><Frame project={p} src={src} /></Reveal>)}
            </div>
          </div>
        </section>
      )}

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal>
            <div style={{ borderRadius: 28, background: 'var(--paper)', border: '1px solid var(--line)', padding: 'clamp(28px,5vw,64px)', display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h3 className="h-md">Want something <span className="serif nova-ink">like this?</span></h3>
                <p className="lede" style={{ marginTop: 14 }}>Tell us about your business. Fixed written quote within 24 hours.</p>
              </div>
              <button className="btn btn-ink" onClick={ask}>Get a free quote <Arrow /></button>
            </div>
          </Reveal>
        </div>
      </section>

      <a href={`/work/${next.slug}`} className="next" onClick={e => { e.preventDefault(); navigate(`/work/${next.slug}`) }}>
        <div className="wrap">
          <span className="k">NEXT PROJECT</span>
          <div className="t">{next.name} <Arrow size={64} className="" /></div>
          <p style={{ color: 'rgba(255,255,255,.55)', marginTop: 16, fontSize: '1.05rem' }}>{next.category}</p>
        </div>
        {next.cover && <div className="next-img"><img src={next.cover} alt="" /></div>}
      </a>
    </main>
  )
}
