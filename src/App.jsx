import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Globe, Cloud, Sparkles, ShoppingCart, Layers, Compass,
  Search, PenTool, Rocket, LifeBuoy,
  ScanLine, BrainCircuit, Pill, WifiOff, CreditCard, ShieldCheck,
  Building2, LayoutDashboard, UploadCloud,
  Handshake,
  Store, BarChart3, Bot,
  Stethoscope, Zap, CheckCircle2,
  Mail, MapPin, Menu, X,
} from 'lucide-react'

const SERVICES = [
  { icon: Globe, name: 'Web Development', desc: 'Fast, modern web apps built for Malaysian users. Portals, dashboards, landing pages — mobile-first.', color: '#4F46E5', bg: '#EEF2FF' },
  { icon: Cloud, name: 'Cloud Infrastructure', desc: 'Architecture, deployment, and management across major cloud providers. Designed for reliability and scale.', color: '#06B6D4', bg: '#ECFEFF' },
  { icon: Sparkles, name: 'AI-Powered Products', desc: 'Custom AI features — triage engines, document processors, intelligent assistants — built into your systems.', color: '#8B5CF6', bg: '#F5F3FF' },
  { icon: ShoppingCart, name: 'E-Commerce Solutions', desc: 'Full e-commerce with DuitNow, FPX, and TnG. Inventory, orders, delivery — no foreign gateways.', color: '#10B981', bg: '#ECFDF5' },
  { icon: Layers, name: 'SaaS Platforms', desc: 'Multi-tenant SaaS from scratch — auth, billing, onboarding, dashboards. You run the business, we build the platform.', color: '#F59E0B', bg: '#FFFBEB' },
  { icon: Compass, name: 'IT Consulting', desc: 'Tech stack decisions, cloud cost reviews, architecture audits. Honest advice, no vendor lock-in.', color: '#F43F5E', bg: '#FFF1F2' },
]

const PROCESS = [
  { n: '01', icon: Search, title: 'Discover', desc: 'We learn your business, your customers, and what "done" actually looks like for you.' },
  { n: '02', icon: PenTool, title: 'Design & Plan', desc: 'Wireframes, architecture, and a clear scope — so there are no surprises later.' },
  { n: '03', icon: Rocket, title: 'Build & Ship', desc: 'Regular check-ins as we build, and we ship straight to production — not a slide deck.' },
  { n: '04', icon: LifeBuoy, title: 'Support & Scale', desc: "We stay on after launch to fix, tune, and grow the system as you grow." },
]

const MEDILINK_FEATURES = [
  'MyKad IC kiosk self check-in — patients served in under 60 seconds',
  'Manchester Triage System AI — real clinical scoring, not a chatbot',
  'DuitNow QR, TnG eWallet, FPX, and cash payment support',
  'Pharmacy inventory with low-stock and expiry alerts',
  '99% uptime SLA — clinic keeps running even when internet drops',
  'Full audit logging — every patient data access tracked',
  'Multi-facility record sharing with consent-gated access',
  'Real-time queue broadcast to all staff dashboards',
]

const HIGHLIGHTS = [
  { icon: ScanLine, title: 'Smart Check-In', desc: 'Walk-in patients scan IC and get a queue ticket in under 60 seconds.', color: '#4F46E5', bg: '#EEF2FF' },
  { icon: BrainCircuit, title: 'AI Triage', desc: 'Real-time clinical urgency scoring based on symptoms and vitals.', color: '#8B5CF6', bg: '#F5F3FF' },
  { icon: Pill, title: 'Pharmacy', desc: 'Automatic dispense queue, stock tracking, and expiry warnings.', color: '#10B981', bg: '#ECFDF5' },
  { icon: WifiOff, title: 'Works Offline', desc: 'System stays fully operational even without internet.', color: '#06B6D4', bg: '#ECFEFF' },
  { icon: CreditCard, title: 'Local Payments', desc: 'DuitNow QR, TnG eWallet, FPX, and cash — all supported.', color: '#F59E0B', bg: '#FFFBEB' },
  { icon: ShieldCheck, title: 'Audit Logs', desc: 'Every patient data access is logged automatically.', color: '#F43F5E', bg: '#FFF1F2' },
  { icon: Building2, title: 'Multi-Facility', desc: 'Doctors share patient records across facilities securely.', color: '#4F46E5', bg: '#EEF2FF' },
  { icon: LayoutDashboard, title: 'Live Dashboard', desc: 'Reception, doctors, and pharmacy each get a real-time view.', color: '#8B5CF6', bg: '#F5F3FF' },
  { icon: UploadCloud, title: 'Cloud Backup', desc: 'Patient data syncs to cloud automatically — nothing lost.', color: '#10B981', bg: '#ECFDF5' },
]

const WHY = [
  { icon: '🇲🇾', title: 'Built for Malaysia, not copied from the West', desc: 'DuitNow QR, TnG eWallet, MyKad IC, FPX — every product works natively with Malaysian payment and identity systems.' },
  { icon: Rocket, title: 'We ship, not just consult', desc: "Every engagement ends with working, deployed software — not a 50-slide deck. We stay until it's live." },
  { icon: ShieldCheck, title: 'Security and uptime by design', desc: 'Role-based access, encrypted connections, audit logs, and redundant architecture baked in from day one.' },
  { icon: Handshake, title: 'Long-term partner, not a one-off vendor', desc: 'We build with the next 3 years in mind. Scalable infrastructure and clean codebases that survive us.' },
]

const STAGES = ['Planning', 'Design', 'Build', 'Launch']
const COMING = [
  { icon: Store, name: 'HarNova Store', desc: 'White-label e-commerce SaaS for Malaysian SMEs with DuitNow, FPX, and marketplace sync.', stage: 2 },
  { icon: BarChart3, name: 'HarNova Analytics', desc: 'Business intelligence for SMEs — sales, inventory, and customer data in one place.', stage: 1 },
  { icon: Bot, name: 'HarNova AI Agents', desc: 'Plug-in AI agents for customer support, data extraction, and workflow automation.', stage: 0 },
]

const QUEUE = [
  ['#01', 'Arjun Rao', 'In Progress', '#4F46E5', '#EEF2FF'],
  ['#02', 'Mei Lin Chong', 'Pharmacy', '#06B6D4', '#ECFEFF'],
  ['#03', 'Hafiz Rahman', 'Checked In', '#10B981', '#ECFDF5'],
  ['#04', 'Priya Nair', 'Waiting', '#F59E0B', '#FFFBEB'],
]

// ── Mesh background ──────────────────────────────────────────────────────────
function MeshBg() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.12, 0.18, 0.12] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: '-20%', right: '-10%', width: 'clamp(300px,50vw,700px)', height: 'clamp(300px,50vw,700px)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)' }} />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.16, 0.1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        style={{ position: 'absolute', top: '20%', left: '-15%', width: 'clamp(200px,35vw,500px)', height: 'clamp(200px,35vw,500px)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.10) 0%, transparent 70%)' }} />
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.03 }} xmlns="http://www.w3.org/2000/svg">
        <defs><pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M 48 0 L 0 0 0 48" fill="none" stroke="#4F46E5" strokeWidth="1"/></pattern></defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  )
}

// ── Scroll reveal ─────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, style = {}, id }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; obs.unobserve(el) }
    }, { threshold: 0.08 })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return <div ref={ref} id={id} style={{ opacity: 0, transform: 'translateY(24px)', transition: `opacity .65s ease ${delay}s, transform .65s ease ${delay}s`, ...style }}>{children}</div>
}

function Eyebrow({ label, color = '#4F46E5' }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', background: color + '12', border: `1px solid ${color}30`, borderRadius: 999, marginBottom: 14 }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: color, display: 'inline-block' }} />
      <span style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color }}>{label}</span>
    </div>
  )
}

// ── Animated stat (counts up the first time it scrolls into view) ────────────
function Stat({ value, style = {} }) {
  const match = /^(\d+)(.*)$/.exec(value)
  const ref = useRef(null)
  const [n, setN] = useState(0)
  const done = useRef(false)

  useEffect(() => {
    if (!match) return
    const target = parseInt(match[1], 10)
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true
        const start = performance.now()
        const dur = 1100
        const tick = (t) => {
          const p = Math.min(1, (t - start) / dur)
          const eased = 1 - Math.pow(1 - p, 3)
          setN(Math.round(target * eased))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
        obs.disconnect()
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [match])

  if (!match) return <span style={style}>{value}</span>
  return <span ref={ref} style={style}>{n}{match[2]}</span>
}

// ── Dashboard mockup ──────────────────────────────────────────────────────────
function Mockup() {
  return (
    <div style={{ background: '#fff', border: '1px solid #E4E8FF', borderRadius: 16, overflow: 'hidden', boxShadow: '0 24px 60px rgba(79,70,229,0.12)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 14px', borderBottom: '1px solid #F1F5F9', background: '#FAFBFF' }}>
        {['#FF5F57','#FFBD2E','#28C840'].map(c => <span key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c, display: 'inline-block' }} />)}
        <span style={{ marginLeft: 8, fontSize: 9, color: '#94A3B8', fontWeight: 500 }}>MediLink — Reception</span>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 3 }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
          <span style={{ fontSize: 8, color: '#10B981', fontWeight: 700 }}>LIVE</span>
        </div>
      </div>
      <div style={{ padding: 12 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 10 }}>
          {[['Queue','14','#4F46E5','#EEF2FF'],['Active','3','#F59E0B','#FFFBEB'],['Sync','Live','#10B981','#ECFDF5']].map(([l,v,c,bg]) => (
            <div key={l} style={{ background: bg, border: `1px solid ${c}20`, borderRadius: 8, padding: '8px 10px' }}>
              <div style={{ fontSize: 7, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 2, fontWeight: 600 }}>{l}</div>
              <div style={{ fontFamily: 'Syne,sans-serif', fontSize: '1rem', fontWeight: 800, color: c }}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#FAFBFF', border: '1px solid #E4E8FF', borderRadius: 8, overflow: 'hidden', marginBottom: 8 }}>
          <div style={{ padding: '6px 10px', fontSize: 7, textTransform: 'uppercase', letterSpacing: '.1em', color: '#94A3B8', borderBottom: '1px solid #F1F5F9', fontWeight: 600 }}>Live Queue</div>
          {QUEUE.map(([n,name,status,c,bg]) => (
            <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '6px 10px', borderBottom: '1px solid #F8FAFF', fontSize: 8 }}>
              <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, color: '#4F46E5', width: 20 }}>{n}</span>
              <span style={{ color: '#0F172A', flex: 1, fontWeight: 500 }}>{name}</span>
              <span style={{ padding: '2px 6px', borderRadius: 5, fontSize: 7, fontWeight: 700, background: bg, color: c }}>{status}</span>
            </div>
          ))}
        </div>
        <div style={{ background: 'linear-gradient(135deg,#FFF7ED,#FFFBEB)', border: '1px solid #FED7AA', borderRadius: 8, padding: '8px 10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 7, color: '#D97706', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 4 }}>
            <Zap size={9} /> AI Triage — #03
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ padding: '2px 6px', background: '#FEF3C7', border: '1px solid #FCD34D', borderRadius: 5, fontSize: 7, fontWeight: 800, color: '#92400E' }}>URGENT · Yellow</span>
            <span style={{ fontSize: 7, color: '#78716C' }}>60 min target</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Nav ───────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [['Services','#services'],['Products','#products'],['Why Us','#why'],['Contact','#contact']]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        ::selection{background:#C7D2FE;color:#3730A3}
        *{box-sizing:border-box}
        @keyframes fadeIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}
      `}</style>
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '14px 0', background: scrolled ? 'rgba(255,255,255,0.95)' : 'transparent', backdropFilter: scrolled ? 'blur(20px)' : 'none', borderBottom: scrolled ? '1px solid #E4E8FF' : '1px solid transparent', transition: 'all .3s' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-.03em', color: '#0F172A' }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: 'linear-gradient(135deg,#4F46E5,#8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#fff', display: 'inline-block' }} />
            </div>
            HarNova
          </a>
          {/* Desktop links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 28 }} className="hide-mobile">
            {links.map(([l,h]) => (
              <a key={l} href={h} style={{ fontSize: '.875rem', fontWeight: 500, color: '#475569', transition: 'color .2s' }}
                onMouseEnter={e => e.target.style.color='#4F46E5'} onMouseLeave={e => e.target.style.color='#475569'}>{l}</a>
            ))}
            <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} href="mailto:hello@harnova.my" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 20px', background: 'linear-gradient(135deg,#4F46E5,#6366F1)', borderRadius: 10, fontSize: '.875rem', fontWeight: 600, color: '#fff', boxShadow: '0 4px 12px rgba(79,70,229,0.3)' }}>
              Get in touch →
            </motion.a>
          </div>
          {/* Mobile hamburger */}
          <button aria-label={mobileOpen ? 'Close menu' : 'Open menu'} className="show-mobile" onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, color: '#0F172A', display: 'flex' }}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {/* Mobile menu */}
        {mobileOpen && (
          <div style={{ background: '#fff', borderTop: '1px solid #E4E8FF', padding: '16px 20px', animation: 'fadeIn .2s ease' }} className="show-mobile">
            {links.map(([l,h]) => (
              <a key={l} href={h} onClick={() => setMobileOpen(false)}
                style={{ display: 'block', padding: '12px 0', fontSize: '1rem', fontWeight: 500, color: '#475569', borderBottom: '1px solid #F1F5F9' }}>{l}</a>
            ))}
            <a href="mailto:hello@harnova.my" style={{ display: 'block', marginTop: 16, padding: '12px 20px', background: 'linear-gradient(135deg,#4F46E5,#6366F1)', borderRadius: 10, fontSize: '.9rem', fontWeight: 600, color: '#fff', textAlign: 'center' }}>
              Get in touch →
            </a>
          </div>
        )}
      </nav>
    </>
  )
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const W = { maxWidth: 1160, margin: '0 auto', padding: '0 20px' }
  const btnP = { display:'inline-flex',alignItems:'center',gap:8,padding:'13px 26px',background:'linear-gradient(135deg,#4F46E5,#6366F1)',borderRadius:12,fontWeight:700,fontSize:'.95rem',color:'#fff',boxShadow:'0 4px 18px rgba(79,70,229,0.35)',transition:'box-shadow .2s' }
  const btnS = { display:'inline-flex',alignItems:'center',gap:8,padding:'13px 26px',border:'2px solid #E4E8FF',borderRadius:12,fontWeight:600,fontSize:'.95rem',color:'#475569',background:'#fff',transition:'border-color .2s' }
  const tap = { whileHover: { scale: 1.03 }, whileTap: { scale: 0.97 }, transition: { type: 'spring', stiffness: 400, damping: 17 } }

  return <>
    <Nav />

    {/* ── HERO ─────────────────────────────────────────────────────────── */}
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: 'clamp(100px,15vw,140px) 0 clamp(60px,8vw,100px)', position: 'relative', overflow: 'hidden', background: 'linear-gradient(160deg,#F8F9FF 0%,#EEF2FF 50%,#F0FDFF 100%)' }}>
      <MeshBg />
      <div style={{ ...W, position: 'relative', zIndex: 1, width: '100%' }}>
        {/* Two-col on desktop, stacked on mobile */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,420px), 1fr))', gap: 'clamp(32px,5vw,64px)', alignItems: 'center' }}>
          <Reveal>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', background: '#fff', border: '1px solid #C7D2FE', borderRadius: 999, marginBottom: 22, boxShadow: '0 2px 8px rgba(79,70,229,0.08)' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
              <span style={{ fontSize: '.72rem', fontWeight: 700, color: '#4F46E5', letterSpacing: '.06em' }}>Malaysian Tech Startup · KL</span>
            </div>
            <h1 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 'clamp(2.2rem,5.5vw,4.2rem)', lineHeight: 1.08, letterSpacing: '-.03em', marginBottom: 18, color: '#0F172A' }}>
              The operating system<br />for{' '}
              <span style={{ background: 'linear-gradient(135deg,#4F46E5 0%,#8B5CF6 50%,#06B6D4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Malaysian</span><br />
              businesses.
            </h1>
            <p style={{ fontSize: 'clamp(.95rem,2vw,1.1rem)', color: '#475569', maxWidth: 480, lineHeight: 1.75, marginBottom: 32 }}>
              HarNova builds cloud platforms, AI products, and digital systems for Malaysian businesses — from clinics to SMEs. Your local Salesforce, without the enterprise price tag.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 48 }}>
              <motion.a {...tap} href="#products" style={btnP}>See our products →</motion.a>
              <motion.a {...tap} href="mailto:hello@harnova.my" style={btnS}>Talk to us</motion.a>
            </div>
            <div style={{ display: 'flex', gap: 'clamp(24px,4vw,40px)', flexWrap: 'wrap', paddingTop: 32, borderTop: '1px solid #E4E8FF' }}>
              {[['99%','Uptime SLA'],['6+','Solutions shipped'],['🇲🇾','Malaysia-first']].map(([n,l]) => (
                <div key={l}>
                  <div style={{ fontFamily:'Syne,sans-serif', fontSize:'clamp(1.3rem,3vw,1.6rem)', fontWeight:800, color:'#4F46E5', lineHeight:1 }}><Stat value={n} /></div>
                  <div style={{ fontSize:'.78rem', color:'#94A3B8', marginTop:3, fontWeight:500 }}>{l}</div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Hero right — floating cards (hidden on very small screens) */}
          <Reveal delay={0.1}>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'relative', height: 'clamp(360px,50vw,520px)', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {/* Main MediLink card */}
              <div style={{ background:'#fff', border:'1px solid #E4E8FF', borderRadius:16, padding:18, boxShadow:'0 8px 32px rgba(79,70,229,0.10)' }}>
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
                  <div style={{ width:34, height:34, borderRadius:10, background:'linear-gradient(135deg,#4F46E5,#8B5CF6)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <Stethoscope size={17} color="#fff" />
                  </div>
                  <div>
                    <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'.88rem', color:'#0F172A' }}>MediLink</div>
                    <div style={{ fontSize:'.68rem', color:'#94A3B8' }}>Healthcare EHR Platform</div>
                  </div>
                  <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:4 }}>
                    <span style={{ width:6, height:6, borderRadius:'50%', background:'#10B981', display:'inline-block' }} />
                    <span style={{ fontSize:'.65rem', color:'#10B981', fontWeight:700 }}>LIVE</span>
                  </div>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8 }}>
                  {[['14','Patients today','#4F46E5','#EEF2FF'],['99%','Uptime','#10B981','#ECFDF5'],['<60s','Check-in','#8B5CF6','#F5F3FF']].map(([v,l,c,bg]) => (
                    <div key={l} style={{ background:bg, borderRadius:10, padding:'10px 12px', border:`1px solid ${c}20` }}>
                      <div style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'.95rem', color:c }}><Stat value={v} /></div>
                      <div style={{ fontSize:'.62rem', color:'#94A3B8', marginTop:2, fontWeight:500 }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* AI triage + payment row */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                <div style={{ background:'#fff', border:'1px solid #FED7AA', borderRadius:14, padding:14 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:4, fontSize:'.65rem', color:'#D97706', fontWeight:700, textTransform:'uppercase', letterSpacing:'.07em', marginBottom:6 }}>
                    <Zap size={11} /> AI Triage
                  </div>
                  <div style={{ fontWeight:600, fontSize:'.8rem', color:'#0F172A', marginBottom:5 }}>Hafiz Rahman</div>
                  <span style={{ padding:'3px 8px', background:'#FEF3C7', border:'1px solid #FCD34D', borderRadius:6, fontSize:'.68rem', fontWeight:700, color:'#92400E' }}>🟡 URGENT</span>
                </div>
                <div style={{ background:'#fff', border:'1px solid #D1FAE5', borderRadius:14, padding:14 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:4, fontSize:'.65rem', color:'#059669', fontWeight:700, textTransform:'uppercase', letterSpacing:'.07em', marginBottom:6 }}>
                    <CheckCircle2 size={11} /> Payment
                  </div>
                  <div style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'1.1rem', color:'#10B981' }}>RM 50.00</div>
                  <div style={{ fontSize:'.65rem', color:'#94A3B8', marginTop:3 }}>via DuitNow QR</div>
                </div>
              </div>
              {/* Sync badge */}
              <div style={{ background:'#fff', border:'1px solid #E4E8FF', borderRadius:14, padding:'12px 14px', display:'flex', alignItems:'center', gap:10 }}>
                <div style={{ width:30, height:30, borderRadius:8, background:'#ECFDF5', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <Cloud size={15} color="#10B981" />
                </div>
                <div>
                  <div style={{ fontSize:'.75rem', fontWeight:700, color:'#10B981' }}>Synced to cloud</div>
                  <div style={{ fontSize:'.65rem', color:'#94A3B8' }}>2 seconds ago · 0 conflicts</div>
                </div>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>

    {/* ── SERVICES ─────────────────────────────────────────────────────── */}
    <section id="services" style={{ padding: 'clamp(64px,8vw,100px) 0', background: '#fff' }}>
      <div style={W}>
        <Reveal style={{ textAlign:'center', marginBottom:'clamp(36px,5vw,56px)' }}>
          <Eyebrow label="What we do" />
          <h2 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'clamp(1.6rem,4vw,2.6rem)', letterSpacing:'-.02em', color:'#0F172A', marginBottom:10 }}>
            Everything your business<br className="hide-mobile" /> needs to go digital
          </h2>
          <p style={{ color:'#475569', fontSize:'1rem', maxWidth:460, margin:'0 auto', lineHeight:1.7 }}>
            From a landing page to a full cloud system with AI — one team, no vendor juggling.
          </p>
        </Reveal>
        <Reveal delay={.05}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap:16 }}>
            {SERVICES.map(s => (
              <div key={s.name}
                style={{ background:'#FAFBFF', border:'1px solid #E4E8FF', borderRadius:14, padding:'24px 20px', transition:'all .2s', cursor:'default' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor=s.color+'50'; e.currentTarget.style.boxShadow=`0 8px 24px ${s.color}12`; e.currentTarget.style.transform='translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='#E4E8FF'; e.currentTarget.style.boxShadow='none'; e.currentTarget.style.transform='none' }}>
                <div style={{ width:44, height:44, borderRadius:12, background:s.bg, border:`1px solid ${s.color}20`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:14 }}>
                  <s.icon size={20} color={s.color} strokeWidth={2} />
                </div>
                <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'1rem', marginBottom:7, color:'#0F172A' }}>{s.name}</div>
                <div style={{ fontSize:'.875rem', color:'#64748B', lineHeight:1.65 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>

    {/* ── HOW WE WORK ──────────────────────────────────────────────────── */}
    <section id="process" style={{ padding: 'clamp(56px,7vw,90px) 0', background: 'linear-gradient(160deg,#F8F9FF,#EEF2FF)' }}>
      <div style={W}>
        <Reveal style={{ textAlign:'center', marginBottom:'clamp(32px,5vw,52px)' }}>
          <Eyebrow label="How we work" color="#06B6D4" />
          <h2 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'clamp(1.6rem,4vw,2.4rem)', letterSpacing:'-.02em', color:'#0F172A' }}>
            From conversation to production, in four steps
          </h2>
        </Reveal>
        <Reveal delay={.05}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,230px),1fr))', gap:20 }}>
            {PROCESS.map(p => (
              <div key={p.title}>
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
                  <div style={{ width:40, height:40, borderRadius:11, background:'#fff', border:'1px solid #E4E8FF', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 14px rgba(79,70,229,0.08)' }}>
                    <p.icon size={18} color="#4F46E5" strokeWidth={2} />
                  </div>
                  <span style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'.8rem', color:'#C7D2FE' }}>{p.n}</span>
                </div>
                <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'1rem', marginBottom:6, color:'#0F172A' }}>{p.title}</div>
                <div style={{ fontSize:'.85rem', color:'#64748B', lineHeight:1.65 }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>

    {/* ── PRODUCTS ─────────────────────────────────────────────────────── */}
    <section id="products" style={{ padding:'clamp(64px,8vw,100px) 0', background:'#fff' }}>
      <div style={W}>
        <Reveal style={{ textAlign:'center', marginBottom:'clamp(36px,5vw,56px)' }}>
          <Eyebrow label="Our products" color="#8B5CF6" />
          <h2 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'clamp(1.6rem,4vw,2.6rem)', letterSpacing:'-.02em', color:'#0F172A' }}>
            Platforms we've built and shipped
          </h2>
        </Reveal>

        {/* MediLink — responsive two-col */}
        <Reveal delay={.05} style={{ marginBottom:24 }}>
          <div style={{ background:'#fff', border:'1px solid #E4E8FF', borderRadius:20, padding:'clamp(28px,5vw,56px)', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,340px),1fr))', gap:'clamp(28px,5vw,56px)', alignItems:'center', boxShadow:'0 12px 48px rgba(79,70,229,0.07)' }}>
            <div>
              <div style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'4px 12px', background:'#ECFDF5', border:'1px solid #6EE7B7', borderRadius:999, fontSize:'.7rem', fontWeight:700, color:'#059669', letterSpacing:'.08em', textTransform:'uppercase', marginBottom:18 }}>
                <span style={{ width:5, height:5, borderRadius:'50%', background:'#10B981', display:'inline-block' }} /> Live · Healthcare
              </div>
              <h3 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'clamp(1.8rem,4vw,2.8rem)', letterSpacing:'-.03em', marginBottom:10, color:'#0F172A' }}>MediLink</h3>
              <p style={{ fontSize:'clamp(.875rem,2vw,1rem)', color:'#475569', lineHeight:1.75, marginBottom:24 }}>
                A high-availability hybrid cloud EHR platform for Malaysian clinics and hospitals. Runs fully offline when internet drops. Syncs to cloud when it's back up.
              </p>
              <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:9, marginBottom:28 }}>
                {MEDILINK_FEATURES.map(f => (
                  <li key={f} style={{ display:'flex', alignItems:'flex-start', gap:9, fontSize:'.875rem', color:'#475569' }}>
                    <span style={{ width:18, height:18, borderRadius:'50%', background:'linear-gradient(135deg,#4F46E5,#8B5CF6)', display:'inline-flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1, color:'#fff', fontSize:9, fontWeight:700 }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
                <motion.a {...tap} href="mailto:hello@harnova.my?subject=MediLink Demo" style={btnP}>Request a demo →</motion.a>
                <motion.a {...tap} href="#highlights" style={btnS}>See it in action</motion.a>
              </div>
            </div>
            <Mockup />
          </div>
        </Reveal>

        {/* Feature highlights */}
        <Reveal delay={.1} style={{ marginBottom:24 }} id="highlights">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,220px),1fr))', gap:12 }}>
            {HIGHLIGHTS.map(h => (
              <div key={h.title}
                style={{ background:'#fff', border:'1px solid #E4E8FF', borderRadius:12, padding:16, display:'flex', gap:12, alignItems:'flex-start', transition:'all .2s', boxShadow:'0 2px 8px rgba(0,0,0,0.03)', cursor:'default' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor=h.color+'40'; e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow=`0 8px 20px ${h.color}10` }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='#E4E8FF'; e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 2px 8px rgba(0,0,0,0.03)' }}>
                <div style={{ width:34, height:34, borderRadius:9, background:h.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, border:`1px solid ${h.color}20` }}>
                  <h.icon size={16} color={h.color} strokeWidth={2} />
                </div>
                <div>
                  <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'.875rem', color:'#0F172A', marginBottom:2 }}>{h.title}</div>
                  <div style={{ fontSize:'.75rem', color:'#64748B', lineHeight:1.55 }}>{h.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Roadmap */}
        <Reveal delay={.15}>
          <div style={{ marginBottom: 18 }}>
            <span style={{ fontSize:'.78rem', fontWeight:700, color:'#94A3B8', textTransform:'uppercase', letterSpacing:'.08em' }}>On the roadmap</span>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,240px),1fr))', gap:14 }}>
            {COMING.map(p => (
              <div key={p.name} style={{ background:'#fff', border:'1px solid #E4E8FF', borderRadius:14, padding:'22px 20px', position:'relative' }}>
                <div style={{ width:38, height:38, borderRadius:10, background:'#F5F3FF', border:'1px solid #E4E8FF', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:14 }}>
                  <p.icon size={18} color="#8B5CF6" strokeWidth={2} />
                </div>
                <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'.95rem', marginBottom:5, color:'#0F172A' }}>{p.name}</div>
                <div style={{ fontSize:'.8rem', color:'#64748B', lineHeight:1.6, marginBottom:16 }}>{p.desc}</div>
                <div style={{ display:'flex', gap:4, marginBottom:8 }}>
                  {STAGES.map((s,i) => (
                    <div key={s} style={{ flex:1, height:4, borderRadius:2, background: i <= p.stage ? '#8B5CF6' : '#E4E8FF' }} />
                  ))}
                </div>
                <div style={{ fontSize:'.68rem', fontWeight:700, color:'#8B5CF6', textTransform:'uppercase', letterSpacing:'.06em' }}>{STAGES[p.stage]} stage</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>

    {/* ── WHY ──────────────────────────────────────────────────────────── */}
    <section id="why" style={{ padding:'clamp(64px,8vw,100px) 0', background:'#fff' }}>
      <div style={W}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,340px),1fr))', gap:'clamp(40px,6vw,80px)', alignItems:'center' }}>
          <Reveal>
            <Eyebrow label="Why HarNova" />
            <h2 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'clamp(1.6rem,4vw,2.4rem)', letterSpacing:'-.02em', marginBottom:32, color:'#0F172A' }}>
              We're not an agency.<br />We're a product studio.
            </h2>
            <div style={{ display:'flex', flexDirection:'column', gap:24 }}>
              {WHY.map(w => (
                <div key={w.title} style={{ display:'flex', gap:14 }}>
                  <div style={{ width:42, height:42, borderRadius:11, background:'linear-gradient(135deg,#EEF2FF,#F5F3FF)', border:'1px solid #C7D2FE', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.1rem', flexShrink:0 }}>
                    {typeof w.icon === 'string' ? w.icon : <w.icon size={18} color="#4F46E5" strokeWidth={2} />}
                  </div>
                  <div>
                    <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'.95rem', marginBottom:3, color:'#0F172A' }}>{w.title}</div>
                    <div style={{ fontSize:'.875rem', color:'#475569', lineHeight:1.7 }}>{w.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={.1}>
            <div style={{ background:'linear-gradient(135deg,#4F46E5 0%,#7C3AED 50%,#06B6D4 100%)', borderRadius:20, padding:'clamp(28px,5vw,40px)', color:'#fff', position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', top:-60, right:-60, width:180, height:180, borderRadius:'50%', background:'rgba(255,255,255,0.06)', pointerEvents:'none' }} />
              <div style={{ position:'relative', zIndex:1 }}>
                <div style={{ fontSize:'.68rem', fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:'rgba(255,255,255,.7)', marginBottom:10 }}>Our vision</div>
                <h3 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'clamp(1.2rem,3vw,1.55rem)', letterSpacing:'-.02em', marginBottom:14, lineHeight:1.25 }}>
                  Malaysia's own Salesforce — but actually affordable.
                </h3>
                <p style={{ fontSize:'.875rem', color:'rgba(255,255,255,.8)', lineHeight:1.7, marginBottom:24 }}>
                  MediLink is just the first. HarNova is building a suite of cloud-native platforms designed specifically for Malaysian industries.
                </p>
                <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                  {['Healthcare — MediLink (Live now)','Retail & E-Commerce — HarNova Store (Soon)','Analytics & BI — HarNova Analytics (Soon)','AI Automation — HarNova Agents (Soon)'].map((item,i) => (
                    <div key={i} style={{ display:'flex', alignItems:'center', gap:10, fontSize:'.85rem', color:'rgba(255,255,255,.85)' }}>
                      <span style={{ width:18, height:18, borderRadius:'50%', background:i===0?'#10B981':'rgba(255,255,255,.2)', display:'inline-flex', alignItems:'center', justifyContent:'center', fontSize:9, flexShrink:0 }}>{i===0?'✓':'·'}</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>

    {/* ── CTA ──────────────────────────────────────────────────────────── */}
    <section id="contact" style={{ padding:'clamp(64px,8vw,100px) 0', background:'linear-gradient(160deg,#F8F9FF,#EEF2FF)' }}>
      <div style={W}>
        <Reveal>
          <div style={{ background:'#fff', border:'1px solid #E4E8FF', borderRadius:24, padding:'clamp(36px,6vw,72px) clamp(24px,5vw,72px)', textAlign:'center', position:'relative', overflow:'hidden', boxShadow:'0 20px 60px rgba(79,70,229,0.08)' }}>
            <div style={{ position:'absolute', top:0, left:'50%', transform:'translateX(-50%)', width:200, height:3, background:'linear-gradient(90deg,#4F46E5,#8B5CF6,#06B6D4)', borderRadius:'0 0 4px 4px' }} />
            <Eyebrow label="Let's build together" />
            <h2 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'clamp(1.6rem,4vw,2.6rem)', letterSpacing:'-.02em', marginBottom:14, color:'#0F172A' }}>
              Ready to build something real?
            </h2>
            <p style={{ fontSize:'1rem', color:'#475569', marginBottom:32, maxWidth:440, margin:'0 auto 32px' }}>
              Tell us what you're trying to solve. We'll figure out the rest together.
            </p>
            <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap', marginBottom:32 }}>
              <motion.a {...tap} href="mailto:hello@harnova.my" style={btnP}>Email us →</motion.a>
              <motion.a {...tap} href="https://wa.me/60182085097" target="_blank" rel="noopener" style={btnS}>💬 WhatsApp</motion.a>
            </div>
            <div style={{ display:'flex', gap:'clamp(16px,4vw,32px)', justifyContent:'center', flexWrap:'wrap' }}>
              {[[Mail,'hello@harnova.my','mailto:hello@harnova.my'],[Globe,'harnova.my','https://harnova.my'],[MapPin,'Kuala Lumpur, Malaysia',null]].map(([Icon,text,href]) => (
                <div key={text} style={{ display:'flex', alignItems:'center', gap:6, fontSize:'.875rem', color:'#94A3B8' }}>
                  <Icon size={14} />{href ? <a href={href} style={{ color:'#4F46E5', fontWeight:500 }}>{text}</a> : text}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>

    {/* ── FOOTER ───────────────────────────────────────────────────────── */}
    <footer style={{ borderTop:'1px solid #E4E8FF', padding:'clamp(28px,4vw,40px) 0', background:'#fff' }}>
      <div style={{ ...W, display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:16 }}>
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:8, fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'1.05rem', letterSpacing:'-.03em', marginBottom:4, color:'#0F172A' }}>
            <div style={{ width:20, height:20, borderRadius:5, background:'linear-gradient(135deg,#4F46E5,#8B5CF6)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <span style={{ width:5, height:5, borderRadius:'50%', background:'#fff', display:'inline-block' }} />
            </div>
            HarNova
          </div>
          <div style={{ fontSize:'.76rem', color:'#94A3B8' }}>© 2025 HarNova Technology · harnova.my</div>
        </div>
        <div style={{ display:'flex', gap:'clamp(16px,3vw,28px)', flexWrap:'wrap' }}>
          {[['Services','#services'],['Products','#products'],['Contact','#contact']].map(([l,h]) => (
            <a key={l} href={h} style={{ fontSize:'.8rem', color:'#94A3B8', transition:'color .2s' }}
              onMouseEnter={e => e.target.style.color='#4F46E5'} onMouseLeave={e => e.target.style.color='#94A3B8'}>{l}</a>
          ))}
        </div>
      </div>
    </footer>
  </>
}
