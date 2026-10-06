import { useEffect } from 'react'
import { Link } from '../router'
import { Label, Split, Frame, Arrow, Out, NovaMark } from '../components/ui'
import { PROJECTS, getProject } from '../data'

export default function Project({ slug, onPick }) {
  const p = getProject(slug)
  useEffect(() => { document.title = p ? `${p.name}: ${p.category} · HarNova` : 'Page not found · HarNova' }, [p])

  if (!p) {
    return (
      <main className="p-hero"><div className="wrap">
        <h1 className="h-lg">We couldn't find that project.</h1>
        <p className="lede" style={{ marginTop: 18 }}>It may have been renamed. Everything we've built is on the home page.</p>
        <Link to="/#work" className="btn btn-ink" style={{ marginTop: 28 }}>See all work <Arrow /></Link>
      </div></main>
    )
  }

  const list = PROJECTS.filter(x => x.group === p.group)
  const next = list[(list.indexOf(p) + 1) % list.length]
  const more = p.shots.slice(1)
  const ask = () => onPick(p.group === 'work' ? 'Not sure yet' : 'Custom web app, SaaS or AI')
  const dot = p.status === 'Live' ? 'dot' : p.status === 'Beta' || p.status === 'Demo' ? 'dot violet' : 'dot amber'

  return (
    <main>
      <section className="p-hero">
        <div className="hero-light" aria-hidden="true" style={{ top: '-55%', opacity: .7, background: `conic-gradient(from 200deg, ${p.tint}40, rgba(109,74,255,.18), ${p.tint}30, ${p.tint}40)` }} />
        <div className="wrap" style={{ position: 'relative' }}>
          <Link to={p.group === 'work' ? '/#work' : '/#products'} className="back"><span style={{ display: 'inline-flex', transform: 'scaleX(-1)' }}><Arrow size={15} /></span>{p.group === 'work' ? 'All client work' : 'All products'}</Link>
          <div className="p-kind"><span className="st"><span className={dot} />{p.status}</span><span>{p.kind}</span><span>{p.category}</span></div>
          <Split as="h1" className="p-title" now lines={[p.name]} />
          <p className="p-tag">{p.tagline}</p>
          <div className="p-actions">
            {p.url && <a href={p.url} target="_blank" rel="noreferrer" className="btn btn-ink">Open {p.name} <Out /></a>}
            <button className="btn btn-ghost" onClick={ask}>Ask us for something similar</button>
          </div>
          <dl className="facts">
            <div><dt>Type</dt><dd>{p.kind}</dd></div>
            <div><dt>Sector</dt><dd>{p.category}</dd></div>
            <div><dt>{p.url ? 'Address' : 'Recognition'}</dt><dd>{p.domain}</dd></div>
            <div><dt>Built with</dt><dd>{p.stack.slice(0, 3).join(', ')}</dd></div>
          </dl>
        </div>
      </section>

      <div className="wrap"><Frame project={p} src={p.cover} eager /></div>

      <section className="section">
        <div className="wrap">
          <div className="story"><h2>The <span className="serif">problem</span></h2><p>{p.challenge}</p></div>
          <div className="story"><h2>What we <span className="serif">built</span></h2><p>{p.built}</p></div>
        </div>
      </section>

      <div className="wrap"><div className="p-stats">{p.stats.map(([v, l]) => <div key={l}><b>{v}</b><span>{l}</span></div>)}</div></div>

      <section className="section">
        <div className="wrap">
          <div className="section-head"><div><Label>Inside {p.name}</Label><Split className="h-md" lines={['What it does,', <span className="serif nova-ink">feature by feature.</span>]} /></div></div>
          <div className="feat-grid">{p.features.map(([t, d]) => <div className="feat" key={t}><NovaMark size={20} core={false} /><h4>{t}</h4><p>{d}</p></div>)}</div>
          <p className="built-with">Built with {p.stack.join(', ')}.</p>
        </div>
      </section>

      {more.length > 0 && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <Label>More from the live product</Label>
            <div className="more" style={{ marginTop: 10 }}>{more.map(src => <Frame key={src} project={p} src={src} />)}</div>
          </div>
        </section>
      )}

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="cta-card on-dark">
            <div className="contact-light" aria-hidden="true" style={{ width: 520, height: 520, left: 'auto', right: '-10%', bottom: '-60%' }} />
            <div style={{ position: 'relative' }}>
              <h3 className="h-md">Need something <span className="serif nova-ink">like this?</span></h3>
              <p className="lede">Tell us about your business and you'll have a fixed written quote within 24 hours.</p>
            </div>
            <button className="btn btn-light" style={{ position: 'relative' }} onClick={ask}>Get a quote <Arrow /></button>
          </div>
        </div>
      </section>

      <Link to={`/work/${next.slug}`} className="next">
        <div className="wrap">
          <span className="k">Next {p.group === 'work' ? 'project' : 'product'}</span>
          <div className="t">{next.name}</div>
        </div>
        {next.cover && <div className="next-img"><img src={next.cover} alt="" /></div>}
      </Link>
    </main>
  )
}
