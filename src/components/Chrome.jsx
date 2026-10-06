import { useEffect, useState } from 'react'
import { Menu, X, MessageCircle } from 'lucide-react'
import { Link, useRouter } from '../router'
import { NovaMark, Label, Split, Arrow } from './ui'
import { CONTACT, WORK, PRODUCTS, SERVICE_OPTIONS, BUDGETS } from '../data'

const waLink = msg => `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`
const NAV = [['Work', '/#work'], ['Products', '/#products'], ['Pricing', '/#pricing'], ['FYP coaching', '/#fyp'], ['FAQ', '/#faq']]

export function Nav() {
  const { path } = useRouter()
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 30)
    fn(); window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  useEffect(() => { setOpen(false) }, [path])
  useEffect(() => { open ? window.__lenis?.stop() : window.__lenis?.start() }, [open])
  const h = x => (path === '/' ? x.slice(1) : x)
  return (
    <>
      <header className={`nav${solid || open ? ' solid' : ''}`}>
        <div className="wrap nav-in">
          <Link to="/" className="brand" aria-label="HarNova home"><NovaMark size={26} />HARNOVA</Link>
          <nav className="nav-links" aria-label="Main">{NAV.map(([l, u]) => <Link key={l} to={h(u)}>{l}</Link>)}</nav>
          <Link to={h('/#contact')} className="btn btn-ink">Get a quote <Arrow size={15} /></Link>
          <button className="burger" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(o => !o)}>{open ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </header>
      {open && (
        <nav className="mnav" aria-label="Mobile">
          {NAV.map(([l, u]) => <Link key={l} to={h(u)} className="big" onClick={() => setOpen(false)}>{l}</Link>)}
          <Link to={h('/#contact')} className="btn btn-ink" onClick={() => setOpen(false)}>Get a quote <Arrow size={15} /></Link>
        </nav>
      )}
    </>
  )
}

export function Contact({ pick }) {
  const [who, setWho] = useState('business')
  const [form, setForm] = useState({ name: '', contact: '', org: '', service: SERVICE_OPTIONS.business[0], budget: BUDGETS.business[0], deadline: '', details: '' })
  const [sent, setSent] = useState(false)
  const [seen, setSeen] = useState(null)
  if (pick && pick !== seen) {
    setSeen(pick)
    const w = pick.value.startsWith('FYP') ? 'student' : 'business'
    setWho(w)
    setForm(f => ({ ...f, service: pick.value, budget: BUDGETS[w][0] }))
  }
  const switchWho = w => { setWho(w); setForm(f => ({ ...f, service: SERVICE_OPTIONS[w][0], budget: BUDGETS[w][0] })) }
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))
  const summary = () => [
    `Hi HarNova, I'm ${form.name || '(name)'}${form.org ? ` from ${form.org}` : ''}.`,
    `I'm interested in: ${form.service}`,
    `Budget: ${form.budget}`,
    form.deadline && `Deadline: ${form.deadline}`,
    form.details && `\n${form.details}`,
    `\nReach me at: ${form.contact || '(contact)'}`,
  ].filter(Boolean).join('\n')
  const submit = e => {
    e.preventDefault()
    const subject = `${who === 'student' ? 'FYP coaching' : 'Project enquiry'}: ${form.service} (${form.name})`
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(summary())}`
    setSent(true)
  }
  const st = who === 'student'
  return (
    <section id="contact" className="section dark contact on-dark">
      <div className="contact-light" aria-hidden="true" />
      <div className="wrap contact-in">
        <div>
          <Label>Get a quote</Label>
          <Split className="h-lg" lines={['Tell us what', <>you're <span className="serif nova-ink">building.</span></>]} />
          <p className="lede" style={{ marginTop: 22 }}>A few lines is enough. We reply within 24 hours, usually with a couple of questions, then a fixed written quote.</p>
          <div className="contact-links">
            {CONTACT.whatsapp && <a href={waLink('Hi HarNova, I\'d like to ask about a project.')} target="_blank" rel="noreferrer" className="btn btn-wa"><MessageCircle size={18} /> Message us on WhatsApp</a>}
            <a href={`mailto:${CONTACT.email}`} className="mail u">{CONTACT.email}</a>
            <span style={{ color: 'rgba(255,255,255,.5)', fontSize: '.93rem' }}>Working with businesses and students across Malaysia, in English or Bahasa Malaysia.</span>
          </div>
        </div>
        <form className="form" onSubmit={submit}>
          <div className="seg" role="group" aria-label="I'm enquiring as">
            <button type="button" aria-pressed={!st} onClick={() => switchWho('business')}>I'm a business</button>
            <button type="button" aria-pressed={st} onClick={() => switchWho('student')}>I'm a student</button>
          </div>
          <div className="two">
            <div><label className="lab" htmlFor="f-name">Your name</label><input id="f-name" className="field" required value={form.name} onChange={set('name')} autoComplete="name" /></div>
            <div><label className="lab" htmlFor="f-contact">WhatsApp number or email</label><input id="f-contact" className="field" required value={form.contact} onChange={set('contact')} /></div>
          </div>
          <div className="two">
            <div><label className="lab" htmlFor="f-org">{st ? 'University and course' : 'Business name'}</label><input id="f-org" className="field" value={form.org} onChange={set('org')} /></div>
            <div><label className="lab" htmlFor="f-deadline">Deadline, if you have one</label><input id="f-deadline" className="field" value={form.deadline} onChange={set('deadline')} /></div>
          </div>
          <div className="two">
            <div><label className="lab" htmlFor="f-service">{st ? 'Help you need' : 'What you need'}</label>
              <select id="f-service" className="field" value={form.service} onChange={set('service')}>{SERVICE_OPTIONS[who].map(o => <option key={o}>{o}</option>)}</select></div>
            <div><label className="lab" htmlFor="f-budget">Budget</label>
              <select id="f-budget" className="field" value={form.budget} onChange={set('budget')}>{BUDGETS[who].map(o => <option key={o}>{o}</option>)}</select></div>
          </div>
          <div><label className="lab" htmlFor="f-details">{st ? 'Your project title and where you\'re stuck' : 'About the project'}</label>
            <textarea id="f-details" className="field" rows={4} value={form.details} onChange={set('details')} style={{ resize: 'vertical' }}
              placeholder={st ? 'For example: smart parking system, my ESP32 readings aren\'t reaching the database.' : 'For example: we run two cake shops and want customers to order and pay online for pickup.'} /></div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            <button type="submit" className="btn btn-ink">Send by email <Arrow size={15} /></button>
            {CONTACT.whatsapp && <a href={waLink(summary())} target="_blank" rel="noreferrer" className="btn btn-wa">Send on WhatsApp</a>}
          </div>
          <p aria-live="polite" className={`form-note${sent ? ' ok' : ''}`}>{sent ? 'Your email app has opened with everything filled in. Press send there and we\'ll reply within 24 hours.' : 'This opens your email app with your details filled in. Nothing is sent until you press send.'}</p>
        </form>
      </div>
    </section>
  )
}

export function Footer() {
  const { path } = useRouter()
  const h = x => (path === '/' ? x.slice(1) : x)
  const socials = [
    CONTACT.instagram && ['Instagram', `https://instagram.com/${CONTACT.instagram}`],
    CONTACT.tiktok && ['TikTok', `https://www.tiktok.com/@${CONTACT.tiktok}`],
    CONTACT.whatsapp && ['WhatsApp', `https://wa.me/${CONTACT.whatsapp}`],
  ].filter(Boolean)
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <Link to="/" className="brand"><NovaMark size={24} />HARNOVA</Link>
            <p style={{ marginTop: 16, maxWidth: '24em', lineHeight: 1.65 }}>Websites, systems and AI products for Malaysian businesses, plus coaching for students on their final year projects.</p>
            <a href={`mailto:${CONTACT.email}`} className="u" style={{ display: 'inline-block', marginTop: 16, color: '#fff', fontWeight: 600 }}>{CONTACT.email}</a>
            {socials.length > 0 && <div style={{ display: 'flex', gap: 18, marginTop: 14 }}>{socials.map(([l, u]) => <a key={l} href={u} target="_blank" rel="noreferrer" className="u">{l}</a>)}</div>}
          </div>
          <div><h4>Work</h4>{WORK.map(p => <Link key={p.slug} to={`/work/${p.slug}`} className="fl">{p.name}</Link>)}</div>
          <div><h4>Products</h4>{PRODUCTS.map(p => <Link key={p.slug} to={`/work/${p.slug}`} className="fl">{p.name}</Link>)}</div>
          <div><h4>Studio</h4>{[['Pricing', '/#pricing'], ['FYP coaching', '/#fyp'], ['HarNova Build', '/#build'], ['How we work', '/#process'], ['FAQ', '/#faq'], ['Get a quote', '/#contact']].map(([l, u]) => <Link key={l} to={h(u)} className="fl">{l}</Link>)}</div>
        </div>
        <div className="foot-word" aria-hidden="true">HARNOVA</div>
        <div className="foot-base"><span>© {new Date().getFullYear()} HarNova Technology</span><span>Built under one star</span></div>
      </div>
    </footer>
  )
}

export function Fab() {
  if (!CONTACT.whatsapp) return null
  return <a className="fab" href={waLink('Hi HarNova, I\'d like to ask about a project.')} target="_blank" rel="noreferrer" aria-label="Message HarNova on WhatsApp"><MessageCircle size={24} /></a>
}
