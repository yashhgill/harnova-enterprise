import { useEffect, useRef, useState } from 'react'

const SERVICES = [
  { icon: '🌐', name: 'Web Development', desc: 'Fast, modern web apps on React and Next.js. Portals, dashboards, and landing pages built for Malaysian users and mobile-first.', tag: 'Available', tagColor: '#22C55E' },
  { icon: '☁️', name: 'Cloud Infrastructure', desc: 'AWS, GCP, and Azure architecture, deployment, and management. VPNs, load balancers, databases — Well-Architected by design.', tag: 'Available', tagColor: '#22C55E' },
  { icon: '🤖', name: 'AI-Powered Products', desc: 'Custom AI features integrated into your systems — triage engines, document processors, chatbots — using the latest open models.', tag: 'Available', tagColor: '#22C55E' },
  { icon: '🛒', name: 'E-Commerce Solutions', desc: 'Full e-commerce with DuitNow, FPX, and TnG payment integration. Inventory, orders, delivery tracking — no foreign gateways.', tag: 'Available', tagColor: '#22C55E' },
  { icon: '📦', name: 'SaaS Platforms', desc: 'Multi-tenant SaaS products from scratch — auth, billing, onboarding, dashboards. You focus on the business, we handle the platform.', tag: 'Coming Soon', tagColor: '#F59E0B' },
  { icon: '🧭', name: 'IT Consulting', desc: 'Tech stack decisions, cloud cost reviews, architecture audits. Honest advice with no vendor lock-in agenda.', tag: 'Available', tagColor: '#22C55E' },
]
const MEDILINK_FEATURES = [
  'MyKad IC kiosk check-in via camera — no NFC hardware needed',
  'Manchester Triage System AI — real clinical scoring, not a chatbot',
  'DuitNow QR, TnG eWallet, FPX, and cash payment support',
  'Pharmacy inventory with low-stock and expiry alerts',
  '99% uptime SLA — the clinic keeps running even when internet connectivity drops',
  'Full audit logging — every patient data access tracked',
  'Multi-facility record sharing with consent-gated access',
  'Real-time queue WebSocket broadcast to all dashboards',
]
const COMING = [
  { icon: '🏪', name: 'HarNova Store', desc: 'White-label e-commerce SaaS for Malaysian SMEs with DuitNow, FPX, and Shopee/Lazada sync.' },
  { icon: '📊', name: 'HarNova Analytics', desc: 'Business intelligence dashboard — sales, inventory, and customer data in one place.' },
  { icon: '🤖', name: 'HarNova AI Agents', desc: 'Plug-in AI agents for customer support, data extraction, and workflow automation.' },
]
const WHY = [
  { icon: '🇲🇾', title: 'Built for Malaysia, not copied from the West', desc: 'DuitNow QR, TnG eWallet, MyKad IC, FPX — every product works natively with Malaysian payment and identity systems.' },
  { icon: '⚡', title: 'We ship, not just consult', desc: "Every engagement ends with working, deployed software — not a 50-slide deck. We stay until it's live and stable." },
  { icon: '🔐', title: 'Security and uptime by design', desc: 'Role-based access control, encrypted connections, audit logs, and redundant architecture baked in from day one — not bolted on after a breach.' },
  { icon: '📈', title: 'Long-term partner, not a one-off vendor', desc: 'We build with the next 3 years in mind. Scalable infrastructure, clean codebases, documentation that survives us.' },
]
const MEDILINK_HIGHLIGHTS = [
  ['🏥', 'Smart Check-In', 'Patients walk in, scan their IC, and get a queue ticket in under 60 seconds — no staff needed.'],
  ['🧠', 'AI Clinical Triage', 'Real-time triage scoring based on chief complaint and vitals. Tells staff exactly how urgent each patient is.'],
  ['💊', 'Pharmacy Management', 'Automatic dispense queue, stock tracking, low-stock alerts, and expiry warnings — all in one screen.'],
  ['📡', 'Works Offline', 'The system keeps running even when the internet goes down. Zero downtime for the clinic.'],
  ['💳', 'Local Payments', 'DuitNow QR, TnG eWallet, FPX, and cash — all supported. No foreign payment gateways.'],
  ['🔒', 'Audit & Compliance', 'Every patient data access is logged automatically. Who viewed what, when, and from where.'],
  ['🏢', 'Multi-Facility', 'Doctors at different facilities can securely view shared patient records — with patient consent.'],
  ['📊', 'Live Dashboard', 'Receptionists, doctors, and pharmacists each get their own real-time view of the clinic queue.'],
  ['☁️', 'Cloud Backup', 'Patient data syncs to the cloud automatically. If the local server fails, nothing is lost.'],
]
const QUEUE = [['#01','Arjun Rao','In Progress','#7C3AFF'],['#02','Mei Lin Chong','Pharmacy','#60A5FA'],['#03','Hafiz Rahman','Checked In','#22C55E'],['#04','Priya Nair','Waiting','#F59E0B'],['#05','Lim Ah Kow','Waiting','#F59E0B']]

function DotGrid() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W,H,dots=[],raf
    const mouse={x:-999,y:-999}, SP=38
    const resize=()=>{
      W=canvas.width=canvas.offsetWidth; H=canvas.height=canvas.offsetHeight; dots=[]
      const cols=Math.ceil(W/SP)+1, rows=Math.ceil(H/SP)+1
      for(let r=0;r<rows;r++) for(let c=0;c<cols;c++) dots.push({x:c*SP,y:r*SP,b:.1+Math.random()*.12,p:Math.random()*Math.PI*2})
    }
    const draw=(ts)=>{
      ctx.clearRect(0,0,W,H)
      const t=ts/1000
      for(const d of dots){
        const pulse=d.b+Math.sin(t*.05+d.p)*.04
        const dx=d.x-mouse.x,dy=d.y-mouse.y,dist=Math.sqrt(dx*dx+dy*dy)
        const prox=Math.max(0,1-dist/180)
        ctx.beginPath(); ctx.arc(d.x,d.y,1.4+prox*1.5,0,Math.PI*2)
        ctx.fillStyle=`rgba(91,33,240,${Math.min(1,pulse+prox*.5)})`; ctx.fill()
      }
      raf=requestAnimationFrame(draw)
    }
    const onM=(e)=>{const r=canvas.getBoundingClientRect();mouse.x=e.clientX-r.left;mouse.y=e.clientY-r.top}
    window.addEventListener('resize',resize); window.addEventListener('mousemove',onM)
    resize(); raf=requestAnimationFrame(draw)
    return()=>{cancelAnimationFrame(raf);window.removeEventListener('resize',resize);window.removeEventListener('mousemove',onM)}
  },[])
  return <canvas ref={ref} style={{position:'absolute',inset:0,width:'100%',height:'100%',opacity:.45,pointerEvents:'none'}}/>
}

function Reveal({children,delay=0,style={}}) {
  const ref=useRef(null)
  useEffect(()=>{
    const el=ref.current; if(!el) return
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){el.style.opacity='1';el.style.transform='translateY(0)';obs.unobserve(el)}},{threshold:.1})
    obs.observe(el); return()=>obs.disconnect()
  },[])
  return <div ref={ref} style={{opacity:0,transform:'translateY(24px)',transition:`opacity .65s ease-out ${delay}s,transform .65s ease-out ${delay}s`,...style}}>{children}</div>
}

function Eyebrow({label}) {
  return <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:14}}><div style={{width:24,height:2,background:'#5B21F0',borderRadius:2}}/><span style={{fontSize:'.72rem',fontWeight:600,letterSpacing:'.12em',textTransform:'uppercase',color:'#7C3AFF'}}>{label}</span></div>
}

function Mockup() {
  return (
    <div style={{background:'#0D0C14',border:'1px solid #2D2B3D',borderRadius:14,overflow:'hidden',boxShadow:'0 24px 60px rgba(0,0,0,.6)'}}>
      <div style={{display:'flex',alignItems:'center',gap:6,padding:'10px 14px',borderBottom:'1px solid #2D2B3D',background:'#0A0910'}}>
        {['#FF5F57','#FFBD2E','#28C840'].map(c=><span key={c} style={{width:10,height:10,borderRadius:'50%',background:c,display:'inline-block'}}/>)}
        <span style={{marginLeft:8,fontSize:10,color:'#55536A'}}>MediLink — Reception Dashboard</span>
      </div>
      <div style={{padding:16}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8,marginBottom:10}}>
          {[['Queue Today','14','#7C3AFF'],['In Progress','3','#F0EEF8'],['Sync Status','Live','#22C55E']].map(([l,v,c])=>(
            <div key={l} style={{background:'#1C1B28',border:'1px solid #2D2B3D',borderRadius:8,padding:'10px 12px'}}>
              <div style={{fontSize:8,color:'#55536A',textTransform:'uppercase',letterSpacing:'.1em',marginBottom:2}}>{l}</div>
              <div style={{fontFamily:'Syne,sans-serif',fontSize:'1.1rem',fontWeight:700,color:c}}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{background:'#1C1B28',border:'1px solid #2D2B3D',borderRadius:8,overflow:'hidden',marginBottom:8}}>
          <div style={{padding:'7px 12px',fontSize:8,textTransform:'uppercase',letterSpacing:'.1em',color:'#55536A',borderBottom:'1px solid #2D2B3D'}}>Live Queue</div>
          {QUEUE.map(([n,name,status,c])=>(
            <div key={n} style={{display:'flex',alignItems:'center',gap:8,padding:'7px 12px',borderBottom:'1px solid rgba(45,43,61,.5)',fontSize:9}}>
              <span style={{fontFamily:'Syne,sans-serif',fontWeight:700,color:'#7C3AFF',width:20}}>{n}</span>
              <span style={{color:'#F0EEF8',flex:1}}>{name}</span>
              <span style={{padding:'2px 6px',borderRadius:4,fontSize:8,fontWeight:600,background:c+'22',color:c}}>{status}</span>
            </div>
          ))}
        </div>
        <div style={{background:'rgba(91,33,240,.08)',border:'1px solid rgba(91,33,240,.2)',borderRadius:8,padding:'10px 12px'}}>
          <div style={{fontSize:8,color:'#7C3AFF',fontWeight:600,letterSpacing:'.1em',textTransform:'uppercase',marginBottom:6}}>⚡ AI Triage — #03 Hafiz Rahman</div>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <span style={{padding:'3px 8px',background:'rgba(245,158,11,.15)',border:'1px solid rgba(245,158,11,.3)',borderRadius:4,fontSize:8,fontWeight:700,color:'#F59E0B'}}>URGENT · Yellow</span>
            <span style={{fontSize:8,color:'#55536A'}}>Target wait: 60 min · Chest tightness + elevated BP</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function Nav() {
  const [scrolled,setScrolled]=useState(false)
  useEffect(()=>{const fn=()=>setScrolled(window.scrollY>40);window.addEventListener('scroll',fn,{passive:true});return()=>window.removeEventListener('scroll',fn)},[])
  return (
    <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:100,padding:'16px 0',background:scrolled?'rgba(10,10,15,.9)':'transparent',backdropFilter:scrolled?'blur(16px)':'none',borderBottom:scrolled?'1px solid #2D2B3D':'1px solid transparent',transition:'all .3s'}}>
      <style>{`@keyframes pd{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.6;transform:scale(.85)}} nav a:hover{color:#F0EEF8!important}`}</style>
      <div style={{maxWidth:1160,margin:'0 auto',padding:'0 24px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <a href="#" style={{display:'flex',alignItems:'center',gap:8,fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:'1.25rem',letterSpacing:'-.03em',color:'#F0EEF8'}}>
          <span style={{width:8,height:8,borderRadius:'50%',background:'#5B21F0',boxShadow:'0 0 10px rgba(91,33,240,.5)',display:'inline-block',animation:'pd 2.5s ease-in-out infinite'}}/>HarNova
        </a>
        <div style={{display:'flex',alignItems:'center',gap:28}}>
          {[['Services','#services'],['Products','#products'],['Why Us','#why'],['Contact','#contact']].map(([l,h])=>(
            <a key={l} href={h} style={{fontSize:'.875rem',color:'#9896B0',transition:'color .2s'}}>{l}</a>
          ))}
          <a href="mailto:hello@harnova.my" style={{display:'inline-flex',alignItems:'center',gap:6,padding:'9px 20px',background:'#5B21F0',borderRadius:8,fontSize:'.875rem',fontWeight:600,color:'#fff'}}>Get in touch →</a>
        </div>
      </div>
    </nav>
  )
}

export default function App() {
  const S={maxWidth:1160,margin:'0 auto',padding:'0 24px'}
  const h2={fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:'clamp(1.8rem,3.5vw,2.6rem)',letterSpacing:'-.02em'}
  const btn=(bg='#5B21F0')=>({display:'inline-flex',alignItems:'center',gap:8,padding:'14px 28px',background:bg,borderRadius:10,fontWeight:600,fontSize:'.95rem',color:'#fff',transition:'all .2s'})
  const ghost={display:'inline-flex',alignItems:'center',gap:8,padding:'14px 28px',border:'1px solid #2D2B3D',borderRadius:10,fontWeight:500,fontSize:'.95rem',color:'#9896B0',transition:'all .2s'}

  return <>
    <Nav/>

    {/* HERO */}
    <section style={{minHeight:'100vh',display:'flex',alignItems:'center',padding:'120px 0 80px',position:'relative',overflow:'hidden'}}>
      <DotGrid/>
      <div style={{position:'absolute',top:'-20%',right:'-10%',width:800,height:800,borderRadius:'50%',background:'radial-gradient(circle,rgba(91,33,240,.18) 0%,transparent 70%)',pointerEvents:'none'}}/>
      <div style={{position:'absolute',bottom:'-30%',left:'-15%',width:600,height:600,borderRadius:'50%',background:'radial-gradient(circle,rgba(91,33,240,.10) 0%,transparent 70%)',pointerEvents:'none'}}/>
      <div style={{...S,position:'relative',zIndex:1,width:'100%'}}>
        <Reveal>
          <div style={{display:'inline-flex',alignItems:'center',gap:8,padding:'6px 14px',background:'rgba(91,33,240,.12)',border:'1px solid rgba(91,33,240,.3)',borderRadius:999,marginBottom:28}}>
            <span style={{width:6,height:6,borderRadius:'50%',background:'#22C55E',display:'inline-block'}}/>
            <span style={{fontSize:'.78rem',fontWeight:500,color:'#7C3AFF'}}>Malaysian Tech Startup · Kuala Lumpur</span>
          </div>
          <h1 style={{fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:'clamp(2.8rem,6vw,5rem)',lineHeight:1.05,letterSpacing:'-.03em',marginBottom:20}}>
            Building the tech<br/>
            <span style={{background:'linear-gradient(135deg,#7C3AFF,#A78BFA)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>infrastructure</span><br/>
            Malaysia needs.
          </h1>
          <p style={{fontSize:'clamp(1rem,2vw,1.2rem)',color:'#9896B0',maxWidth:520,lineHeight:1.7,marginBottom:40}}>
            HarNova designs and ships cloud platforms, AI products, and digital systems for Malaysian businesses — from SMEs to hospitals. Built to last, built to scale.
          </p>
          <div style={{display:'flex',gap:14,flexWrap:'wrap',marginBottom:72}}>
            <a href="#products" style={btn()}>See our products →</a>
            <a href="#contact" style={ghost}>Talk to us</a>
          </div>
          <div style={{display:'flex',gap:48,paddingTop:40,borderTop:'1px solid #2D2B3D',flexWrap:'wrap'}}>
            {[['99%','Uptime SLA on our platforms'],['6+','Tech solutions delivered'],['MY','Built for the Malaysian market']].map(([n,l])=>(
              <div key={l}>
                <div style={{fontFamily:'Syne,sans-serif',fontSize:'2rem',fontWeight:800,color:'#7C3AFF',lineHeight:1}}>{n}</div>
                <div style={{fontSize:'.8rem',color:'#9896B0',marginTop:4}}>{l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>

    {/* SERVICES */}
    <section id="services" style={{background:'#13121A',padding:'100px 0'}}>
      <div style={S}>
        <Reveal style={{marginBottom:56}}>
          <Eyebrow label="What we do"/>
          <h2 style={h2}>End-to-end tech services for Malaysia</h2>
          <p style={{color:'#9896B0',fontSize:'1rem',maxWidth:500,lineHeight:1.7,marginTop:12}}>From a landing page to a full cloud system with AI — one team, no vendor juggling.</p>
        </Reveal>
        <Reveal delay={.05}>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:2,background:'#2D2B3D',borderRadius:16,overflow:'hidden'}}>
            {SERVICES.map(s=>(
              <div key={s.name} style={{background:'#13121A',padding:'36px 32px',transition:'background .2s',cursor:'default'}}
                onMouseEnter={e=>e.currentTarget.style.background='#1C1B28'}
                onMouseLeave={e=>e.currentTarget.style.background='#13121A'}>
                <div style={{width:44,height:44,borderRadius:10,background:'rgba(91,33,240,.12)',border:'1px solid rgba(91,33,240,.2)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.3rem',marginBottom:20}}>{s.icon}</div>
                <div style={{fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:'1.05rem',marginBottom:8}}>{s.name}</div>
                <div style={{fontSize:'.875rem',color:'#9896B0',lineHeight:1.65}}>{s.desc}</div>
                <span style={{display:'inline-block',marginTop:16,padding:'3px 10px',background:s.tagColor+'18',border:`1px solid ${s.tagColor}55`,borderRadius:999,fontSize:'.7rem',fontWeight:600,color:s.tagColor,letterSpacing:'.06em',textTransform:'uppercase'}}>{s.tag}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>

    {/* PRODUCTS */}
    <section id="products" style={{padding:'100px 0'}}>
      <div style={S}>
        <Reveal style={{marginBottom:56}}><Eyebrow label="Our products"/><h2 style={h2}>Platforms we've built and shipped</h2></Reveal>
        <Reveal delay={.05} style={{marginBottom:24}}>
          <div style={{background:'#13121A',border:'1px solid #2D2B3D',borderRadius:20,padding:'56px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:64,alignItems:'center',position:'relative',overflow:'hidden'}}>
            <div style={{position:'absolute',top:-100,right:-100,width:400,height:400,borderRadius:'50%',background:'radial-gradient(circle,rgba(91,33,240,.08),transparent 70%)',pointerEvents:'none'}}/>
            <div>
              <div style={{display:'inline-flex',alignItems:'center',gap:6,padding:'5px 12px',background:'rgba(34,197,94,.1)',border:'1px solid rgba(34,197,94,.25)',borderRadius:999,fontSize:'.72rem',fontWeight:600,color:'#22C55E',letterSpacing:'.08em',textTransform:'uppercase',marginBottom:20}}>
                <span style={{width:5,height:5,borderRadius:'50%',background:'#22C55E',display:'inline-block'}}/> Live · Healthcare
              </div>
              <h3 style={{fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:'clamp(1.8rem,3vw,2.4rem)',letterSpacing:'-.02em',marginBottom:12}}>MediLink</h3>
              <p style={{fontSize:'1rem',color:'#9896B0',lineHeight:1.7,marginBottom:28}}>A high-availability hybrid cloud EHR platform for Malaysian clinics and hospitals. Runs fully offline when internet drops. Syncs to AWS when it's back up.</p>
              <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:10,marginBottom:32}}>
                {MEDILINK_FEATURES.map(f=>(
                  <li key={f} style={{display:'flex',alignItems:'flex-start',gap:10,fontSize:'.9rem',color:'#9896B0'}}>
                    <span style={{width:18,height:18,borderRadius:'50%',background:'rgba(91,33,240,.15)',border:'1px solid rgba(91,33,240,.3)',display:'inline-flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:2,color:'#7C3AFF',fontSize:10}}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
                <a href="mailto:hello@harnova.my?subject=MediLink Demo" style={btn()}>Request a demo →</a>
                <a href="https://github.com/yashhgill/Medilink" target="_blank" rel="noopener" style={ghost}>View on GitHub</a>
              </div>
            </div>
            <Mockup/>
          </div>
        </Reveal>
        <Reveal delay={.1}>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16}}>
            {COMING.map(p=>(
              <div key={p.name} style={{background:'#13121A',border:'1px solid #2D2B3D',borderRadius:14,padding:'28px 24px',opacity:.7,position:'relative'}}>
                <span style={{position:'absolute',top:14,right:14,padding:'3px 8px',background:'rgba(245,158,11,.1)',border:'1px solid rgba(245,158,11,.2)',borderRadius:4,fontSize:'.65rem',fontWeight:700,color:'#F59E0B',textTransform:'uppercase',letterSpacing:'.08em'}}>Coming Soon</span>
                <div style={{fontSize:'1.6rem',marginBottom:12}}>{p.icon}</div>
                <div style={{fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:'1rem',marginBottom:6}}>{p.name}</div>
                <div style={{fontSize:'.82rem',color:'#9896B0',lineHeight:1.6}}>{p.desc}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>

    {/* WHY */}
    <section id="why" style={{background:'#13121A',padding:'100px 0'}}>
      <div style={S}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:64,alignItems:'center'}}>
          <Reveal>
            <Eyebrow label="Why HarNova"/>
            <h2 style={{...h2,marginBottom:36}}>We're not an agency.<br/>We're a product studio.</h2>
            <div style={{display:'flex',flexDirection:'column',gap:28}}>
              {WHY.map(w=>(
                <div key={w.title} style={{display:'flex',gap:16}}>
                  <div style={{width:40,height:40,borderRadius:10,background:'rgba(91,33,240,.1)',border:'1px solid rgba(91,33,240,.2)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.1rem',flexShrink:0}}>{w.icon}</div>
                  <div>
                    <div style={{fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:'1rem',marginBottom:4}}>{w.title}</div>
                    <div style={{fontSize:'.875rem',color:'#9896B0',lineHeight:1.65}}>{w.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={.1}>
            <div style={{background:'#0A0A0F',border:'1px solid #2D2B3D',borderRadius:16,padding:32}}>
              <div style={{fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:'.95rem',color:'#9896B0',marginBottom:16}}>What MediLink does</div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10,marginBottom:24}}>
                {MEDILINK_HIGHLIGHTS.map(([icon,title,desc])=>(
                  <div key={title} style={{background:'#1C1B28',border:'1px solid #2D2B3D',borderRadius:10,padding:'14px',transition:'border-color .2s',cursor:'default'}}
                    onMouseEnter={e=>e.currentTarget.style.borderColor='#5B21F0'}
                    onMouseLeave={e=>e.currentTarget.style.borderColor='#2D2B3D'}
                    title={desc}>
                    <div style={{fontSize:'1.2rem',marginBottom:6}}>{icon}</div>
                    <div style={{fontSize:'.78rem',fontWeight:600,color:'#F0EEF8',lineHeight:1.3,marginBottom:4}}>{title}</div>
                    <div style={{fontSize:'.7rem',color:'#55536A',lineHeight:1.5}}>{desc}</div>
                  </div>
                ))}
              </div>
              <div style={{padding:20,background:'rgba(91,33,240,.06)',border:'1px solid rgba(91,33,240,.15)',borderRadius:12}}>
                <div style={{fontFamily:'Syne,sans-serif',fontWeight:700,color:'#7C3AFF',fontSize:'.875rem',marginBottom:6}}>Enterprise-grade architecture</div>
                <div style={{fontSize:'.82rem',color:'#9896B0',lineHeight:1.7}}>Every HarNova platform is architected for reliability, security, performance, and cost efficiency — built to pass enterprise procurement reviews and handle real clinical workloads.</div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section id="contact" style={{padding:'100px 0'}}>
      <div style={S}>
        <Reveal>
          <div style={{background:'linear-gradient(135deg,rgba(91,33,240,.2) 0%,rgba(91,33,240,.05) 100%)',border:'1px solid rgba(91,33,240,.25)',borderRadius:24,padding:'72px',textAlign:'center',position:'relative',overflow:'hidden'}}>
            <div style={{position:'absolute',top:0,left:'50%',transform:'translateX(-50%)',width:600,height:1,background:'linear-gradient(90deg,transparent,#5B21F0,transparent)'}}/>
            <h2 style={{fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:'clamp(1.8rem,3.5vw,2.8rem)',letterSpacing:'-.02em',marginBottom:16}}>Ready to build something real?</h2>
            <p style={{fontSize:'1rem',color:'#9896B0',marginBottom:36}}>Tell us what you're trying to solve. We'll figure out the tech together.</p>
            <div style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap',marginBottom:40}}>
              <a href="mailto:hello@harnova.my" style={btn()}>Email us →</a>
              <a href="https://wa.me/60182085097" target="_blank" rel="noopener" style={ghost}>WhatsApp</a>
            </div>
            <div style={{display:'flex',gap:32,justifyContent:'center',flexWrap:'wrap'}}>
              {[['📧','hello@harnova.my','mailto:hello@harnova.my'],['🌐','harnova.my','https://harnova.my'],['📍','Kuala Lumpur, Malaysia',null]].map(([icon,text,href])=>(
                <div key={text} style={{display:'flex',alignItems:'center',gap:8,fontSize:'.875rem',color:'#9896B0'}}>
                  {icon} {href?<a href={href} style={{color:'#7C3AFF'}}>{text}</a>:text}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>

    {/* FOOTER */}
    <footer style={{borderTop:'1px solid #2D2B3D',padding:'40px 0'}}>
      <div style={{...S,display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:16}}>
        <div>
          <div style={{display:'flex',alignItems:'center',gap:8,fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:'1.1rem',letterSpacing:'-.03em',marginBottom:6}}>
            <span style={{width:8,height:8,borderRadius:'50%',background:'#5B21F0',display:'inline-block'}}/>HarNova
          </div>
          <div style={{fontSize:'.82rem',color:'#55536A'}}>© 2025 HarNova Technology · harnova.my</div>
        </div>
        <div style={{display:'flex',gap:24}}>
          {[['Services','#services'],['Products','#products'],['Contact','#contact'],['GitHub','https://github.com/yashhgill']].map(([l,h])=>(
            <a key={l} href={h} style={{fontSize:'.82rem',color:'#55536A',transition:'color .2s'}}
              onMouseEnter={e=>e.target.style.color='#F0EEF8'} onMouseLeave={e=>e.target.style.color='#55536A'}>{l}</a>
          ))}
        </div>
      </div>
    </footer>
  </>
}
