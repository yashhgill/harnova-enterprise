import { useEffect } from 'react'
import { Link } from '../router'
import { Browser } from '../components/ui'
import { PROJECTS, getProject } from '../data'

export default function Project({ slug, onPick }) {
  const p = getProject(slug)
  useEffect(() => { document.title = p ? `${p.name}: ${p.category} · HarNova` : 'Page not found · HarNova' }, [p])

  if (!p) {
    return (
      <main className="p-head"><div className="wrap">
        <h1 className="t-1">We couldn't find that project.</h1>
        <p className="lead" style={{ marginTop: 16 }}>It may have been renamed. All of our work is listed on the home page.</p>
        <Link to="/#work" className="btn btn-primary" style={{ marginTop: 28 }}>See all work</Link>
      </div></main>
    )
  }

  const next = PROJECTS[(PROJECTS.indexOf(p) + 1) % PROJECTS.length]
  const more = p.shots.slice(1)
  const ask = () => onPick(p.kind === 'Client project' ? 'Not sure yet' : 'Custom web app, SaaS or AI')

  return (
    <main>
      <section className="p-head">
        <div className="wrap">
          <Link to="/#work" className="back">Back to all work</Link>
          <h1 className="t-display">{p.name}</h1>
          <p className="lead">{p.tagline}</p>
          <div className="p-actions">
            {p.url && <a href={p.url} target="_blank" rel="noreferrer" className="btn btn-primary">Open {p.name}</a>}
            <button className="btn btn-line" onClick={ask}>Ask us for something similar</button>
          </div>
          <dl className="facts">
            <div><dt>Type</dt><dd>{p.kind}</dd></div>
            <div><dt>Sector</dt><dd>{p.category}</dd></div>
            <div><dt>Status</dt><dd>{p.status}{p.url ? '' : `, ${p.domain}`}</dd></div>
            <div><dt>Built with</dt><dd>{p.stack.slice(0, 3).join(', ')}</dd></div>
          </dl>
        </div>
      </section>

      <div className="wrap"><Browser project={p} src={p.cover} eager /></div>

      <section className="section">
        <div className="wrap">
          <div className="story"><h2 className="t-2">The problem</h2><p>{p.challenge}</p></div>
          <div className="story"><h2 className="t-2">What we built</h2><p>{p.built}</p></div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <h2 className="t-2" style={{ marginBottom: 32 }}>What it does</h2>
          <div className="feat">{p.features.map(([t, d]) => <div key={t}><h3 className="t-3">{t}</h3><p>{d}</p></div>)}</div>
          <p className="stack">Built with {p.stack.join(', ')}.</p>
        </div>
      </section>

      {more.length > 0 && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <h2 className="t-2" style={{ marginBottom: 32 }}>More from the live product</h2>
            <div className="more">{more.map(src => <Browser key={src} project={p} src={src} />)}</div>
          </div>
        </section>
      )}

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap section-intro" style={{ marginBottom: 0 }}>
          <h2 className="t-1">Need something like {p.name}?</h2>
          <div><p className="lead">Tell us about your business and we'll send a fixed written quote within 24 hours.</p>
            <button className="btn btn-primary" style={{ marginTop: 24 }} onClick={ask}>Get a quote</button></div>
        </div>
      </section>

      <Link to={`/work/${next.slug}`} className="next">
        <div className="wrap">
          <span className="muted">Next project</span>
          <div className="t-display">{next.name}</div>
          <span className="muted">{next.category}</span>
        </div>
      </Link>
    </main>
  )
}
