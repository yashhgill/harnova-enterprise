import { useEffect, useState } from 'react'
import { Menu, X, MessageCircle, Mail, Globe, GraduationCap } from 'lucide-react'
import { Link, useRouter } from '../router'
import { NovaMark, ArrowUR, Arrow } from './ui'
import { CONTACT, PROJECTS, UNIVERSE, SERVICE_OPTIONS, BUDGETS } from '../data'

const waLink = msg => `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`

const NAV = [['Work', '/#work'], ['Products', '/#universe'], ['Services', '/#services'], ['FYP', '/#fyp'], ['FAQ', '/#faq']]

/* ─── Nav ─── */
export function Nav() {
  const { path } = useRouter()
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 40)
    fn(); window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  useEffect(() => { setOpen(false) }, [path])
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    open ? window.__lenis?.stop() : window.__lenis?.start()
  }, [open])
  const href = h => (path === '/' ? h.replace('/', '') : h)
  return (
    <>
      <nav className={`nav${solid || open ? ' solid' : ''}`} aria-label="Main">
        <div className="wrap nav-in">
          <Link to="/" className="brand" aria-label="HarNova home"><NovaMark size={26} /> HARNOVA</Link>
          <div className="nav-links">
            {NAV.map(([l, h]) => <Link key={l} to={href(h)}>{l}</Link>)}
          </div>
          <Link to={href('/#contact')} className="btn btn-ink nav-cta">Get a free quote <Arrow size={15} /></Link>
          <button className="burger" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(o => !o)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="mobile-menu">
          {NAV.map(([l, h]) => <Link key={l} to={href(h)} className="big" onClick={() => setOpen(false)}>{l}</Link>)}
          <Link to={href('/#contact')} className="btn btn-ink" style={{ marginTop: 26, alignSelf: 'flex-start' }} onClick={() => setOpen(false)}>Get a free quote <Arrow size={15} /></Link>
        </div>
      )}
    </>
  )
}

/* ─── Contact ─── */
export function Contact({ pick }) {
  const [who, setWho] = useState('business')
  const [form, setForm] = useState({ name: '', contact: '', org: '', service: SERVICE_OPTIONS.business[0], budget: BUDGETS.business[0], deadline: '', details: '' })
  const [sent, setSent] = useState(false)

  useEffect(() => {
    if (!pick?.value) return
    const w = pick.value.startsWith('FYP') ? 'student' : 'business'
    setWho(w)
    setForm(f => ({ ...f, service: pick.value, budget: BUDGETS[w][0] }))
  }, [pick])

  const switchWho = w => { setWho(w); setForm(f => ({ ...f, service: SERVICE_OPTIONS[w][0], budget: BUDGETS[w][0] })) }
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))
  const summary = () => [
    `Hi HarNova! I'm ${form.name || '(name)'}${form.org ? ` from ${form.org}` : ''}.`,
    `I'm interested in: ${form.service}`,
    `Budget: ${form.budget}`,
    form.deadline && `Deadline: ${form.deadline}`,
    form.details && `\n${form.details}`,
    `\nReach me at: ${form.contact || '(contact)'}`,
  ].filter(Boolean).join('\n')
  const submit = e => {
    e.preventDefault()
    const subject = `${who === 'student' ? 'FYP coaching' : 'Project enquiry'} — ${form.service} — ${form.name}`
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(summary())}`
    setSent(true)
  }
  const st = who === 'student'

  return (
    <section id="contact" className="section contact">
      <div className="wrap contact-in">
        <div>
          <span className="eyebrow">Get a free quote</span>
          <h2 className="h-lg" style={{ marginTop: 22 }}>Let's build<br /><span className="serif nova-ink">your thing.</span></h2>
          <p className="lede" style={{ marginTop: 22 }}>Tell us a little about what you need. We reply within 24 hours with questions or a quote — no obligation.</p>
          <div className="contact-links">
            {CONTACT.whatsapp && <a href={waLink('Hi HarNova! I\'d like to ask about a project.')} target="_blank" rel="noreferrer" className="btn btn-wa"><MessageCircle size={18} /> Chat on WhatsApp</a>}
            <a href={`mailto:${CONTACT.email}`} className="btn btn-ghost"><Mail size={17} /> {CONTACT.email}</a>
          </div>
          <p style={{ marginTop: 30, fontSize: '.86rem', color: 'rgba(255,255,255,.45)' }}>Melaka-based · clients across Malaysia · English & Bahasa Malaysia</p>
        </div>
        <form className="form" onSubmit={submit}>
          <div className="seg" role="group" aria-label="I am">
            <button type="button" aria-pressed={!st} onClick={() => switchWho('business')}><Globe size={15} /> I'm a business</button>
            <button type="button" aria-pressed={st} onClick={() => switchWho('student')}><GraduationCap size={15} /> I'm a student</button>
          </div>
          <div className="row2">
            <div><label className="lab" htmlFor="f-name">Your name</label><input id="f-name" className="field" required value={form.name} onChange={set('name')} placeholder="Aisyah" autoComplete="name" /></div>
            <div><label className="lab" htmlFor="f-contact">WhatsApp or email</label><input id="f-contact" className="field" required value={form.contact} onChange={set('contact')} placeholder="012-345 6789" /></div>
          </div>
          <div className="row2">
            <div><label className="lab" htmlFor="f-org">{st ? 'University & course' : 'Business name'}</label><input id="f-org" className="field" value={form.org} onChange={set('org')} placeholder={st ? 'UTeM · BITC' : 'Kedai Kek Melaka'} /></div>
            <div><label className="lab" htmlFor="f-deadline">Deadline (if any)</label><input id="f-deadline" className="field" value={form.deadline} onChange={set('deadline')} placeholder={st ? 'Demo on 12 Jan' : 'Before Raya'} /></div>
          </div>
          <div className="row2">
            <div><label className="lab" htmlFor="f-service">{st ? 'What help do you need?' : 'What do you need?'}</label>
              <select id="f-service" className="field" value={form.service} onChange={set('service')}>{SERVICE_OPTIONS[who].map(o => <option key={o}>{o}</option>)}</select></div>
            <div><label className="lab" htmlFor="f-budget">Budget</label>
              <select id="f-budget" className="field" value={form.budget} onChange={set('budget')}>{BUDGETS[who].map(o => <option key={o}>{o}</option>)}</select></div>
          </div>
          <div><label className="lab" htmlFor="f-details">{st ? 'Project title & where you\'re stuck' : 'Tell us a bit more'}</label>
            <textarea id="f-details" className="field" rows={4} value={form.details} onChange={set('details')} style={{ resize: 'vertical' }}
              placeholder={st ? 'e.g. Smart parking system — my ESP32 data isn\'t reaching Firebase.' : 'e.g. We run 2 cake shops and want customers to order and pay online for pickup.'} /></div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            <button type="submit" className="btn btn-ink"><Mail size={17} /> Send by email</button>
            {CONTACT.whatsapp && <a href={waLink(summary())} target="_blank" rel="noreferrer" className="btn btn-wa"><MessageCircle size={17} /> Send on WhatsApp</a>}
          </div>
          <p aria-live="polite" className={`form-note${sent ? ' ok' : ''}`}>
            {sent ? 'Your email app should have opened with everything filled in — just hit send. We\'ll reply within 24 hours.' : 'Opens your email app with your details filled in. Nothing is sent until you press send.'}
          </p>
        </form>
      </div>
    </section>
  )
}

/* ─── Footer ─── */
export function Footer() {
  const { path } = useRouter()
  const h = x => (path === '/' ? x.replace('/', '') : x)
  const socials = [
    CONTACT.instagram && ['Instagram', `https://instagram.com/${CONTACT.instagram}`],
    CONTACT.tiktok && ['TikTok', `https://www.tiktok.com/@${CONTACT.tiktok}`],
    CONTACT.whatsapp && ['WhatsApp', `https://wa.me/${CONTACT.whatsapp}`],
  ].filter(Boolean)
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <Link to="/" className="brand" style={{ color: '#fff' }}><NovaMark size={24} /> HARNOVA</Link>
            <p style={{ marginTop: 16, maxWidth: 320, lineHeight: 1.65, fontSize: '.93rem' }}>Websites, systems and AI products for Malaysian businesses — plus FYP coaching for students. Made in Melaka.</p>
            <a href={`mailto:${CONTACT.email}`} className="link-u" style={{ display: 'inline-block', marginTop: 18, color: '#fff' }}>{CONTACT.email}</a>
            {socials.length > 0 && <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>{socials.map(([l, u]) => <a key={l} href={u} target="_blank" rel="noreferrer" className="link-u">{l}</a>)}</div>}
          </div>
          <div>
            <h5>WORK</h5>
            {PROJECTS.slice(0, 6).map(p => <Link key={p.slug} to={`/work/${p.slug}`} className="fl">{p.name}</Link>)}
          </div>
          <div>
            <h5>OPEN A PRODUCT</h5>
            {UNIVERSE.map(u => <a key={u.host} href={u.url} target="_blank" rel="noreferrer" className="fl">{u.host} ↗</a>)}
          </div>
          <div>
            <h5>STUDIO</h5>
            {[['Services & pricing', '/#services'], ['FYP coaching', '/#fyp'], ['How it works', '/#process'], ['FAQ', '/#faq'], ['Get a quote', '/#contact']].map(([l, u]) => <Link key={l} to={h(u)} className="fl">{l}</Link>)}
          </div>
        </div>
        <div className="footer-word" aria-hidden="true">HARNOVA</div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} HarNova Technology · Melaka, Malaysia</span>
          <span className="mono">Built under one star ✦</span>
        </div>
      </div>
    </footer>
  )
}

export function Fab() {
  if (!CONTACT.whatsapp) return null
  return <a className="fab" href={waLink('Hi HarNova! I\'d like to ask about a project.')} target="_blank" rel="noreferrer" aria-label="Chat with HarNova on WhatsApp"><MessageCircle size={25} /></a>
}

export { ArrowUR }
