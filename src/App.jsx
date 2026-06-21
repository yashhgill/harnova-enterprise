import { useEffect, useRef, useState } from 'react'

// ── Data ─────────────────────────────────────────────────────────────────────
const SERVICES = [
  { icon: '🌐', name: 'Web Development', desc: 'Fast, modern web apps built for Malaysian users. Portals, dashboards, landing pages — mobile-first.', color: '#4F46E5', bg: '#EEF2FF' },
  { icon: '☁️', name: 'Cloud Infrastructure', desc: 'Architecture, deployment, and management across major cloud providers. Designed for reliability and scale.', color: '#06B6D4', bg: '#ECFEFF' },
  { icon: '🤖', name: 'AI-Powered Products', desc: 'Custom AI features — triage engines, document processors, intelligent assistants — built into your systems.', color: '#8B5CF6', bg: '#F5F3FF' },
  { icon: '🛒', name: 'E-Commerce Solutions', desc: 'Full e-commerce with DuitNow, FPX, and TnG. Inventory, orders, delivery — no foreign gateways.', color: '#10B981', bg: '#ECFDF5' },
  { icon: '📦', name: 'SaaS Platforms', desc: 'Multi-tenant SaaS from scratch — auth, billing, onboarding, dashboards. You run the business, we build the platform.', color: '#F59E0B', bg: '#FFFBEB' },
  { icon: '🧭', name: 'IT Consulting', desc: 'Tech stack decisions, cloud cost reviews, architecture audits. Honest advice, no vendor lock-in agenda.', color: '#F43F5E', bg: '#FFF1F2' },
]

const MEDILINK_FEATURES = [
  'MyKad IC kiosk self check-in — patients served in under 60 seconds',
  'Manchester Triage System AI — real clinical scoring, not a chatbot',
  'DuitNow QR, TnG eWallet, FPX, and cash payment support',
  'Pharmacy inventory with low-stock and expiry alerts',
  '99% uptime SLA — the clinic keeps running even when internet drops',
  'Full audit logging — every patient data access tracked',
  'Multi-facility record sharing with consent-gated access',
  'Real-time queue broadcast to all staff dashboards',
]

const HIGHLIGHTS = [
  { icon: '🏥', title: 'Smart Check-In', desc: 'Walk-in patients scan their IC and get a queue ticket in under 60 seconds.', color: '#4F46E5', bg: '#EEF2FF' },
  { icon: '🧠', title: 'AI Triage', desc: 'Real-time clinical urgency scoring based on symptoms and vitals.', color: '#8B5CF6', bg: '#F5F3FF' },
  { icon: '💊', title: 'Pharmacy', desc: 'Automatic dispense queue, stock tracking, and expiry warnings.', color: '#10B981', bg: '#ECFDF5' },
  { icon: '📡', title: 'Works Offline', desc: 'The system stays fully operational even without internet.', color: '#06B6D4', bg: '#ECFEFF' },
  { icon: '💳', title: 'Local Payments', desc: 'DuitNow QR, TnG eWallet, FPX, and cash — all supported.', color: '#F59E0B', bg: '#FFFBEB' },
  { icon: '🔒', title: 'Audit Logs', desc: 'Every patient data access is logged automatically.', color: '#F43F5E', bg: '#FFF1F2' },
  { icon: '🏢', title: 'Multi-Facility', desc: 'Doctors share patient records across facilities securely.', color: '#4F46E5', bg: '#EEF2FF' },
  { icon: '📊', title: 'Live Dashboard', desc: 'Reception, doctors, and pharmacy each get a real-time view.', color: '#8B5CF6', bg: '#F5F3FF' },
  { icon: '☁️', title: 'Cloud Backup', desc: 'Patient data syncs to the cloud automatically — nothing is lost.', color: '#10B981', bg: '#ECFDF5' },
]

const WHY = [
  { icon: '🇲🇾', title: 'Built for Malaysia, not copied from the West', desc: 'DuitNow QR, TnG eWallet, MyKad IC, FPX — every product works natively with Malaysian payment and identity systems.' },
  { icon: '⚡', title: 'We ship, not just consult', desc: "Every engagement ends with working, deployed software — not a 50-slide deck. We stay until it's live." },
  { icon: '🔐', title: 'Security and uptime by design', desc: 'Role-based access, encrypted connections, audit logs, and redundant architecture baked in from day one.' },
  { icon: '📈', title: 'Long-term partner, not a one-off vendor', desc: 'We build with the next 3 years in mind. Scalable infrastructure and clean codebases that survive us.' },
]

const COMING = [
  { icon: '🏪', name: 'HarNova Store', desc: 'White-label e-commerce SaaS for Malaysian SMEs with DuitNow, FPX, and marketplace sync.' },
  { icon: '📊', name: 'HarNova Analytics', desc: 'Business intelligence for SMEs — sales, inventory, and customer data in one place.' },
  { icon: '🤖', name: 'HarNova AI Agents', desc: 'Plug-in AI agents for customer support, data extraction, and workflow automation.' },
]

const QUEUE = [
  ['#01','Arjun Rao','In Progress','#4F46E5','#EEF2FF'],
  ['#02','Mei Lin Chong','Pharmacy','#06B6D4','#ECFEFF'],
  ['#03','Hafiz Rahman','Checked In','#10B981','#ECFDF5'],
  ['#04','Priya Nair','Waiting','#F59E0B','#FFFBEB'],
  ['#05','Lim Ah Kow','Waiting','#F59E0B','#FFFBEB'],
]

// ── Animated mesh gradient background ────────────────────────────────────────
function MeshBg() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)' }} />
      <div style={{ position: 'absolute', top: '20%', left: '-15%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.10) 0%, transparent 70%)' }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '20%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)' }} />
      {/* Grid lines */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.035 }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#4F46E5" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  )
}

// ── Floating badge ────────────────────────────────────────────────────────────
function FloatingCard({ style, children }) {
  return (
    <div style={{
      background: '#fff',
      border: '1px solid #E4E8FF',
      borderRadius: 16,
      padding: '14px 18px',
      boxShadow: '0 8px 32px rgba(79,70,229,0.10), 0 2px 8px rgba(0,0,0,0.04)',
      backdropFilter: 'blur(8px)',
      ...style,
    }}>
      {children}
    </div>
  )
}

// ── Scroll reveal ─────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, style = {} }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; obs.unobserve(el) }
    }, { threshold: 0.08 })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} style={{ opacity: 0, transform: 'translateY(28px)', transition: `opacity .7s ease-out ${delay}s, transform .7s ease-out ${delay}s`, ...style }}>
      {children}
    </div>
  )
}

function Eyebrow({ label, color = '#4F46E5' }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', background: color + '12', border: `1px solid ${color}30`, borderRadius: 999, marginBottom: 16 }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: color, display: 'inline-block' }} />
      <span style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color }}>{label}</span>
    </div>
  )
}

// ── Dashboard mockup (light version) ─────────────────────────────────────────
function Mockup() {
  return (
    <div style={{ background: '#fff', border: '1px solid #E4E8FF', borderRadius: 20, overflow: 'hidden', boxShadow: '0 32px 80px rgba(79,70,229,0.15), 0 8px 32px rgba(0,0,0,0.06)' }}>
      {/* Title bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '12px 16px', borderBottom: '1px solid #F1F5F9', background: '#FAFBFF' }}>
        {['#FF5F57','#FFBD2E','#28C840'].map(c => <span key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, display: 'inline-block' }} />)}
        <span style={{ marginLeft: 8, fontSize: 10, color: '#94A3B8', fontWeight: 500 }}>MediLink — Reception Dashboard</span>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
          <span style={{ fontSize: 9, color: '#10B981', fontWeight: 600 }}>LIVE</span>
        </div>
      </div>
      <div style={{ padding: 16 }}>
        {/* Stat cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 12 }}>
          {[['Queue Today','14','#4F46E5','#EEF2FF'],['In Progress','3','#F59E0B','#FFFBEB'],['Sync Status','Live','#10B981','#ECFDF5']].map(([l,v,c,bg]) => (
            <div key={l} style={{ background: bg, border: `1px solid ${c}20`, borderRadius: 10, padding: '10px 12px' }}>
              <div style={{ fontSize: 8, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 3, fontWeight: 600 }}>{l}</div>
              <div style={{ fontFamily: 'Syne,sans-serif', fontSize: '1.2rem', fontWeight: 800, color: c }}>{v}</div>
            </div>
          ))}
        </div>
        {/* Queue */}
        <div style={{ background: '#FAFBFF', border: '1px solid #E4E8FF', borderRadius: 10, overflow: 'hidden', marginBottom: 10 }}>
          <div style={{ padding: '7px 12px', fontSize: 8, textTransform: 'uppercase', letterSpacing: '.1em', color: '#94A3B8', borderBottom: '1px solid #F1F5F9', fontWeight: 600, background: '#F8FAFF' }}>Live Queue</div>
          {QUEUE.map(([n,name,status,c,bg]) => (
            <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderBottom: '1px solid #F1F5F9', fontSize: 9 }}>
              <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, color: '#4F46E5', width: 22 }}>{n}</span>
              <span style={{ color: '#0F172A', flex: 1, fontWeight: 500 }}>{name}</span>
              <span style={{ padding: '3px 8px', borderRadius: 6, fontSize: 8, fontWeight: 700, background: bg, color: c }}>{status}</span>
            </div>
          ))}
        </div>
        {/* AI strip */}
        <div style={{ background: 'linear-gradient(135deg, #FFF7ED, #FFFBEB)', border: '1px solid #FED7AA', borderRadius: 10, padding: '10px 12px' }}>
          <div style={{ fontSize: 8, color: '#D97706', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 5 }}>⚡ AI Triage — #03 Hafiz Rahman</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ padding: '3px 8px', background: '#FEF3C7', border: '1px solid #FCD34D', borderRadius: 6, fontSize: 8, fontWeight: 800, color: '#92400E' }}>URGENT · Yellow</span>
            <span style={{ fontSize: 8, color: '#78716C' }}>Target: 60 min · Chest tightness + elevated BP</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Nav ───────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '14px 0',
      background: scrolled ? 'rgba(255,255,255,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid #E4E8FF' : '1px solid transparent',
      transition: 'all .3s',
    }}>
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-.03em', color: '#0F172A' }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg, #4F46E5, #8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff', display: 'inline-block' }} />
          </div>
          HarNova
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {[['Services','#services'],['Products','#products'],['Why Us','#why'],['Contact','#contact']].map(([l,h]) => (
            <a key={l} href={h} style={{ fontSize: '.875rem', fontWeight: 500, color: '#475569', transition: 'color .2s' }}
              onMouseEnter={e => e.target.style.color = '#4F46E5'}
              onMouseLeave={e => e.target.style.color = '#475569'}>{l}</a>
          ))}
          <a href="mailto:hello@harnova.my" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 22px', background: 'linear-gradient(135deg, #4F46E5, #6366F1)', borderRadius: 10, fontSize: '.875rem', fontWeight: 600, color: '#fff', boxShadow: '0 4px 14px rgba(79,70,229,0.35)', transition: 'all .2s' }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 6px 20px rgba(79,70,229,0.5)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 14px rgba(79,70,229,0.35)'}>
            Get in touch →
          </a>
        </div>
      </div>
    </nav>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function App() {
  const W = { maxWidth: 1160, margin: '0 auto', padding: '0 24px' }

  const btnPrimary = {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    padding: '14px 28px',
    background: 'linear-gradient(135deg, #4F46E5, #6366F1)',
    borderRadius: 12, fontWeight: 700, fontSize: '1rem', color: '#fff',
    boxShadow: '0 4px 20px rgba(79,70,229,0.35)',
    transition: 'all .2s',
  }
  const btnSecondary = {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    padding: '14px 28px',
    border: '2px solid #E4E8FF',
    borderRadius: 12, fontWeight: 600, fontSize: '1rem', color: '#475569',
    background: '#fff',
    transition: 'all .2s',
  }

  return <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
      ::selection { background: #C7D2FE; color: #3730A3; }
    `}</style>
    <Nav />

    {/* ── HERO ─────────────────────────────────────────────────────────── */}
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '120px 0 80px', position: 'relative', overflow: 'hidden', background: 'linear-gradient(160deg, #F8F9FF 0%, #EEF2FF 50%, #F0FDFF 100%)' }}>
      <MeshBg />
      <div style={{ ...W, position: 'relative', zIndex: 1, width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <Reveal>
            {/* Eyebrow pill */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', background: '#fff', border: '1px solid #C7D2FE', borderRadius: 999, marginBottom: 24, boxShadow: '0 2px 8px rgba(79,70,229,0.10)' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', display: 'inline-block', boxShadow: '0 0 6px #10B981' }} />
              <span style={{ fontSize: '.75rem', fontWeight: 700, color: '#4F46E5', letterSpacing: '.06em' }}>Malaysian Tech Startup · Kuala Lumpur</span>
            </div>

            <h1 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 'clamp(2.6rem,5vw,4.2rem)', lineHeight: 1.08, letterSpacing: '-.03em', marginBottom: 20, color: '#0F172A' }}>
              The operating system<br />
              for{' '}
              <span style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #8B5CF6 50%, #06B6D4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Malaysian</span><br />
              businesses.
            </h1>

            <p style={{ fontSize: '1.1rem', color: '#475569', maxWidth: 480, lineHeight: 1.75, marginBottom: 36 }}>
              HarNova builds cloud platforms, AI products, and digital systems for Malaysian businesses — from clinics to SMEs. Your local Salesforce, without the enterprise price tag.
            </p>

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 56 }}>
              <a href="#products" style={btnPrimary}>See our products →</a>
              <a href="mailto:hello@harnova.my" style={btnSecondary}>Talk to us</a>
            </div>

            {/* Trust stats */}
            <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
              {[['99%','Uptime SLA'],['6+','Solutions shipped'],['🇲🇾','Malaysia-first']].map(([n,l]) => (
                <div key={l}>
                  <div style={{ fontFamily: 'Syne,sans-serif', fontSize: '1.6rem', fontWeight: 800, color: '#4F46E5', lineHeight: 1 }}>{n}</div>
                  <div style={{ fontSize: '.8rem', color: '#94A3B8', marginTop: 4, fontWeight: 500 }}>{l}</div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Right: floating UI cards */}
          <Reveal delay={0.1} style={{ position: 'relative', height: 520 }}>
            {/* Main card */}
            <FloatingCard style={{ position: 'absolute', top: 20, left: 20, right: 0, padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#4F46E5,#8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>🏥</div>
                <div>
                  <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: '.9rem', color: '#0F172A' }}>MediLink</div>
                  <div style={{ fontSize: '.72rem', color: '#94A3B8' }}>Healthcare EHR Platform</div>
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
                  <span style={{ fontSize: '.7rem', color: '#10B981', fontWeight: 700 }}>LIVE</span>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                {[['14','Patients today','#4F46E5','#EEF2FF'],['99%','Uptime','#10B981','#ECFDF5'],['< 60s','Check-in','#8B5CF6','#F5F3FF']].map(([v,l,c,bg]) => (
                  <div key={l} style={{ background: bg, borderRadius: 10, padding: '10px 12px', border: `1px solid ${c}20` }}>
                    <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: '1rem', color: c }}>{v}</div>
                    <div style={{ fontSize: '.65rem', color: '#94A3B8', marginTop: 2, fontWeight: 500 }}>{l}</div>
                  </div>
                ))}
              </div>
            </FloatingCard>

            {/* AI triage floating card */}
            <FloatingCard style={{ position: 'absolute', top: 190, left: 0, width: 260 }}>
              <div style={{ fontSize: '.65rem', color: '#D97706', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 8 }}>⚡ AI Triage Alert</div>
              <div style={{ fontWeight: 600, fontSize: '.85rem', color: '#0F172A', marginBottom: 4 }}>Hafiz Rahman · #03</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', background: '#FEF3C7', border: '1px solid #FCD34D', borderRadius: 6, fontSize: '.72rem', fontWeight: 700, color: '#92400E' }}>
                🟡 URGENT · 60 min target
              </div>
            </FloatingCard>

            {/* Payment card */}
            <FloatingCard style={{ position: 'absolute', top: 340, right: 0, width: 220 }}>
              <div style={{ fontSize: '.65rem', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 8 }}>Payment received</div>
              <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: '1.3rem', color: '#10B981' }}>RM 50.00</div>
              <div style={{ fontSize: '.72rem', color: '#94A3B8', marginTop: 4 }}>via DuitNow QR · Ref: MLK-A8F2</div>
              <div style={{ marginTop: 8, display: 'flex', gap: 4 }}>
                {['DuitNow','TnG','FPX','Cash'].map(m => (
                  <span key={m} style={{ padding: '2px 6px', background: '#EEF2FF', borderRadius: 4, fontSize: '.6rem', fontWeight: 600, color: '#4F46E5' }}>{m}</span>
                ))}
              </div>
            </FloatingCard>

            {/* Sync status card */}
            <FloatingCard style={{ position: 'absolute', top: 460, left: 40, width: 200 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>☁️</div>
                <div>
                  <div style={{ fontSize: '.75rem', fontWeight: 700, color: '#10B981' }}>Synced to cloud</div>
                  <div style={{ fontSize: '.65rem', color: '#94A3B8' }}>2 seconds ago</div>
                </div>
              </div>
            </FloatingCard>
          </Reveal>
        </div>
      </div>
    </section>

    {/* ── SERVICES ──────────────────────────────────────────────────────── */}
    <section id="services" style={{ padding: '100px 0', background: '#fff' }}>
      <div style={W}>
        <Reveal style={{ textAlign: 'center', marginBottom: 60 }}>
          <Eyebrow label="What we do" color="#4F46E5" />
          <h2 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', letterSpacing: '-.02em', color: '#0F172A', marginBottom: 12 }}>
            Everything your business needs<br />to go digital
          </h2>
          <p style={{ color: '#475569', fontSize: '1rem', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
            From a landing page to a full cloud system with AI — one team, no vendor juggling.
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            {SERVICES.map((s) => (
              <div key={s.name} style={{ background: '#FAFBFF', border: '1px solid #E4E8FF', borderRadius: 16, padding: '28px 24px', transition: 'all .2s', cursor: 'default' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = s.color + '50'; e.currentTarget.style.boxShadow = `0 8px 32px ${s.color}15`; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#E4E8FF'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none' }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: s.bg, border: `1px solid ${s.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: 16 }}>{s.icon}</div>
                <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: '1rem', marginBottom: 8, color: '#0F172A' }}>{s.name}</div>
                <div style={{ fontSize: '.875rem', color: '#64748B', lineHeight: 1.65 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>

    {/* ── PRODUCTS — MEDILINK ───────────────────────────────────────────── */}
    <section id="products" style={{ padding: '100px 0', background: 'linear-gradient(160deg, #F8F9FF, #EEF2FF)' }}>
      <div style={W}>
        <Reveal style={{ textAlign: 'center', marginBottom: 60 }}>
          <Eyebrow label="Our products" color="#8B5CF6" />
          <h2 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', letterSpacing: '-.02em', color: '#0F172A' }}>
            Platforms we've built and shipped
          </h2>
        </Reveal>

        {/* MediLink card */}
        <Reveal delay={0.05} style={{ marginBottom: 32 }}>
          <div style={{ background: '#fff', border: '1px solid #E4E8FF', borderRadius: 24, padding: '56px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center', boxShadow: '0 16px 60px rgba(79,70,229,0.08)' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 14px', background: '#ECFDF5', border: '1px solid #6EE7B7', borderRadius: 999, fontSize: '.72rem', fontWeight: 700, color: '#059669', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 20 }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
                Live · Healthcare
              </div>
              <h3 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 'clamp(2rem,3vw,2.8rem)', letterSpacing: '-.03em', marginBottom: 12, color: '#0F172A' }}>MediLink</h3>
              <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.75, marginBottom: 28 }}>
                A high-availability hybrid cloud EHR platform for Malaysian clinics and hospitals. Runs fully offline when internet drops. Syncs to cloud when it's back up.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
                {MEDILINK_FEATURES.map((f) => (
                  <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '.9rem', color: '#475569' }}>
                    <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'linear-gradient(135deg,#4F46E5,#8B5CF6)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1, color: '#fff', fontSize: 10, fontWeight: 700 }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href="mailto:hello@harnova.my?subject=MediLink Demo" style={btnPrimary}>Request a demo →</a>
                <a href="https://github.com/yashhgill/Medilink" target="_blank" rel="noopener" style={btnSecondary}>View on GitHub</a>
              </div>
            </div>
            <Mockup />
          </div>
        </Reveal>

        {/* Feature highlights grid */}
        <Reveal delay={0.1} style={{ marginBottom: 32 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
            {HIGHLIGHTS.map((h) => (
              <div key={h.title} style={{ background: '#fff', border: '1px solid #E4E8FF', borderRadius: 14, padding: '20px', display: 'flex', gap: 14, alignItems: 'flex-start', transition: 'all .2s', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', cursor: 'default' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = h.color + '40'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 24px ${h.color}12` }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#E4E8FF'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.03)' }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: h.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0, border: `1px solid ${h.color}20` }}>{h.icon}</div>
                <div>
                  <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: '.9rem', color: '#0F172A', marginBottom: 3 }}>{h.title}</div>
                  <div style={{ fontSize: '.78rem', color: '#64748B', lineHeight: 1.55 }}>{h.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Coming soon */}
        <Reveal delay={0.15}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            {COMING.map((p) => (
              <div key={p.name} style={{ background: '#fff', border: '2px dashed #E4E8FF', borderRadius: 16, padding: '28px 24px', position: 'relative', opacity: 0.8 }}>
                <span style={{ position: 'absolute', top: 16, right: 16, padding: '3px 10px', background: '#FFFBEB', border: '1px solid #FCD34D', borderRadius: 6, fontSize: '.65rem', fontWeight: 700, color: '#D97706', textTransform: 'uppercase', letterSpacing: '.08em' }}>Coming Soon</span>
                <div style={{ fontSize: '1.8rem', marginBottom: 12 }}>{p.icon}</div>
                <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: '1rem', marginBottom: 6, color: '#0F172A' }}>{p.name}</div>
                <div style={{ fontSize: '.82rem', color: '#64748B', lineHeight: 1.6 }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>

    {/* ── WHY HARNOVA ──────────────────────────────────────────────────── */}
    <section id="why" style={{ padding: '100px 0', background: '#fff' }}>
      <div style={W}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <Reveal>
            <Eyebrow label="Why HarNova" color="#4F46E5" />
            <h2 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 'clamp(1.8rem,3.5vw,2.4rem)', letterSpacing: '-.02em', marginBottom: 36, color: '#0F172A' }}>
              We're not an agency.<br />We're a product studio.
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {WHY.map((w) => (
                <div key={w.title} style={{ display: 'flex', gap: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg,#EEF2FF,#F5F3FF)', border: '1px solid #C7D2FE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>{w.icon}</div>
                  <div>
                    <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: '1rem', marginBottom: 4, color: '#0F172A' }}>{w.title}</div>
                    <div style={{ fontSize: '.875rem', color: '#475569', lineHeight: 1.7 }}>{w.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            {/* Salesforce pitch card */}
            <div style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #06B6D4 100%)', borderRadius: 24, padding: 40, color: '#fff', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
              <div style={{ position: 'absolute', bottom: -40, left: -40, width: 150, height: 150, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.7)', marginBottom: 12 }}>Our vision</div>
                <h3 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: '1.6rem', letterSpacing: '-.02em', marginBottom: 16, lineHeight: 1.2 }}>
                  Malaysia's own Salesforce — but actually affordable.
                </h3>
                <p style={{ fontSize: '.9rem', color: 'rgba(255,255,255,.8)', lineHeight: 1.7, marginBottom: 28 }}>
                  MediLink is just the first. HarNova is building a suite of cloud-native business platforms designed specifically for Malaysian industries — healthcare, retail, F&B, logistics, and beyond.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {['Healthcare — MediLink (Live now)','Retail & E-Commerce — HarNova Store (Soon)','Analytics & BI — HarNova Analytics (Soon)','AI Automation — HarNova Agents (Soon)'].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '.85rem', color: 'rgba(255,255,255,.85)' }}>
                      <span style={{ width: 18, height: 18, borderRadius: '50%', background: i === 0 ? '#10B981' : 'rgba(255,255,255,.2)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, flexShrink: 0 }}>
                        {i === 0 ? '✓' : '·'}
                      </span>
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
    <section id="contact" style={{ padding: '100px 0', background: 'linear-gradient(160deg, #F8F9FF, #EEF2FF)' }}>
      <div style={W}>
        <Reveal>
          <div style={{ background: '#fff', border: '1px solid #E4E8FF', borderRadius: 28, padding: '72px', textAlign: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 24px 80px rgba(79,70,229,0.10)' }}>
            {/* Top accent line */}
            <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 200, height: 3, background: 'linear-gradient(90deg, #4F46E5, #8B5CF6, #06B6D4)', borderRadius: '0 0 4px 4px' }} />
            {/* BG orbs */}
            <div style={{ position: 'absolute', top: -80, right: -80, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,70,229,0.06), transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: -60, left: -60, width: 250, height: 250, borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.06), transparent 70%)', pointerEvents: 'none' }} />

            <Eyebrow label="Let's build together" color="#4F46E5" />
            <h2 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', letterSpacing: '-.02em', marginBottom: 16, color: '#0F172A' }}>
              Ready to build something real?
            </h2>
            <p style={{ fontSize: '1rem', color: '#475569', marginBottom: 40, maxWidth: 480, margin: '0 auto 40px' }}>
              Tell us what you're trying to solve. We'll figure out the tech together.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 40 }}>
              <a href="mailto:hello@harnova.my" style={btnPrimary}>Email us →</a>
              <a href="https://wa.me/60182085097" target="_blank" rel="noopener" style={btnSecondary}>💬 WhatsApp</a>
            </div>
            <div style={{ display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap' }}>
              {[['📧','hello@harnova.my','mailto:hello@harnova.my'],['🌐','harnova.my','https://harnova.my'],['📍','Kuala Lumpur, Malaysia',null]].map(([icon,text,href]) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '.875rem', color: '#94A3B8' }}>
                  {icon}{' '}{href ? <a href={href} style={{ color: '#4F46E5', fontWeight: 500 }}>{text}</a> : text}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>

    {/* ── FOOTER ───────────────────────────────────────────────────────── */}
    <footer style={{ borderTop: '1px solid #E4E8FF', padding: '40px 0', background: '#fff' }}>
      <div style={{ ...W, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-.03em', marginBottom: 4, color: '#0F172A' }}>
            <div style={{ width: 22, height: 22, borderRadius: 6, background: 'linear-gradient(135deg, #4F46E5, #8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff', display: 'inline-block' }} />
            </div>
            HarNova
          </div>
          <div style={{ fontSize: '.78rem', color: '#94A3B8' }}>© 2025 HarNova Technology · harnova.my</div>
        </div>
        <div style={{ display: 'flex', gap: 28 }}>
          {[['Services','#services'],['Products','#products'],['Contact','#contact'],['GitHub','https://github.com/yashhgill']].map(([l,h]) => (
            <a key={l} href={h} style={{ fontSize: '.82rem', color: '#94A3B8', transition: 'color .2s' }}
              onMouseEnter={e => e.target.style.color = '#4F46E5'}
              onMouseLeave={e => e.target.style.color = '#94A3B8'}>{l}</a>
          ))}
        </div>
      </div>
    </footer>
  </>
}
