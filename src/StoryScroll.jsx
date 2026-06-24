import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ─── Chapter data ─────────────────────────────────────────────────── */
const CHAPTERS = [
  {
    id: 'healthcare',
    tag: '01 — Healthcare',
    headline: ['A clinic in', 'Kuala Lumpur.'],
    sub: 'Paper records stacked to the ceiling. Patients waiting hours.',
    reveal: 'MediLink digitized every record, prescription, and appointment.',
    stat: { n: '60', suffix: 's', label: 'avg. check-in time' },
    bg: '#0A1628',
    accent: '#0EA5E9',
    glow: 'rgba(14,165,233,0.18)',
    icon: '🏥',
    blobs: [
      { x: '72%', y: '12%', size: 380, color: 'rgba(14,165,233,0.10)', dur: 8 },
      { x: '8%',  y: '60%', size: 220, color: 'rgba(6,182,212,0.07)',  dur: 11 },
    ],
    pills: ['EHR Records', 'AI Triage', 'DuitNow QR', 'Offline-ready'],
  },
  {
    id: 'hawker',
    tag: '02 — Local Vendors',
    headline: ['A hawker stall', 'in Penang.'],
    sub: 'No card terminal. No digital presence. Cash-only, with customers walking away.',
    reveal: 'HarNova Store brought cashless payments and a digital menu to every corner of Malaysia.',
    stat: { n: '30', suffix: 's', label: 'to go cashless' },
    bg: '#140A00',
    accent: '#F59E0B',
    glow: 'rgba(245,158,11,0.18)',
    icon: '🍜',
    blobs: [
      { x: '65%', y: '8%',  size: 340, color: 'rgba(245,158,11,0.10)', dur: 9 },
      { x: '5%',  y: '55%', size: 200, color: 'rgba(251,191,36,0.07)', dur: 13 },
    ],
    pills: ['QR Payments', 'Digital Menu', 'Sales Reports', 'Works on any phone'],
  },
  {
    id: 'shop',
    tag: '03 — Small Business',
    headline: ['A shop in', 'Johor Bahru.'],
    sub: 'Great products. Loyal regulars. But no idea what was selling, growing, or slowing.',
    reveal: 'HarNova Analytics turns raw sales data into clear, actionable decisions.',
    stat: { n: '3×', suffix: '', label: 'faster stock decisions' },
    bg: '#0D0520',
    accent: '#A78BFA',
    glow: 'rgba(167,139,250,0.18)',
    icon: '🏪',
    blobs: [
      { x: '68%', y: '10%', size: 360, color: 'rgba(167,139,250,0.10)', dur: 7 },
      { x: '5%',  y: '62%', size: 240, color: 'rgba(124,58,237,0.07)',  dur: 12 },
    ],
    pills: ['Live Analytics', 'Inventory Alerts', 'Customer Insights', 'No spreadsheets'],
  },
]

/* ─── Animated counter ─────────────────────────────────────────────── */
function animateCounter(el, target, suffix) {
  const isNum = /^\d+$/.test(target)
  if (!isNum) { el.textContent = target + suffix; return }
  const end = parseInt(target, 10)
  let start = null
  const step = (ts) => {
    if (!start) start = ts
    const p = Math.min((ts - start) / 900, 1)
    const eased = 1 - Math.pow(1 - p, 3)
    el.textContent = Math.round(end * eased) + suffix
    if (p < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

/* ═══════════════════════════════════════════════════════════════════ */
export default function StoryScroll() {
  const wrapRef    = useRef(null)
  const stickyRef  = useRef(null)
  const bgRef      = useRef(null)
  const introRef   = useRef(null)
  const endRef     = useRef(null)
  const chRefs     = useRef([])   // chapter panel refs
  const statRefs   = useRef([])   // stat number refs

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wrap   = wrapRef.current
      const sticky = stickyRef.current
      const bg     = bgRef.current

      /* ── Total scroll progress helpers ── */
      const pct = (p) => `${p * 100}% top`

      /* ── Background color morph ── */
      // intro → ch1 → ch2 → ch3 → end
      const bgColors = ['#060412', CHAPTERS[0].bg, CHAPTERS[1].bg, CHAPTERS[2].bg, '#060412']
      const bgBreaks = [0,        0.14,            0.40,            0.66,            0.95]

      ScrollTrigger.create({
        trigger: wrap,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
        onUpdate(self) {
          const p = self.progress
          // interpolate between breakpoints
          let i = bgBreaks.findIndex((b, idx) => p >= b && p < (bgBreaks[idx + 1] ?? 1))
          if (i < 0) i = bgBreaks.length - 2
          const segStart = bgBreaks[i], segEnd = bgBreaks[i + 1] ?? 1
          const t = (p - segStart) / (segEnd - segStart)
          gsap.set(bg, { backgroundColor: gsap.utils.interpolate(bgColors[i], bgColors[i + 1], t) })
        },
      })

      /* ── Intro panel ── */
      gsap.to('#hn-intro-tag',    { opacity: 0, y: -20, scrollTrigger: { trigger: wrap, start: '4% top',  end: '9% top',  scrub: true } })
      gsap.to('#hn-intro-head',   { opacity: 0, y: -30, scrollTrigger: { trigger: wrap, start: '5% top',  end: '10% top', scrub: true } })
      gsap.to('#hn-intro-sub',    { opacity: 0, y: -20, scrollTrigger: { trigger: wrap, start: '4.5% top',end: '9.5% top',scrub: true } })
      gsap.to('#hn-intro-scroll', { opacity: 0,         scrollTrigger: { trigger: wrap, start: '3% top',  end: '7% top',  scrub: true } })

      /* ── Chapter panels ── */
      CHAPTERS.forEach((ch, i) => {
        const el    = chRefs.current[i]
        const statEl = statRefs.current[i]
        if (!el) return

        // Range for this chapter: in, hold, out
        const base = 0.14 + i * 0.26      // chapter start
        const hold = base + 0.06           // fully visible
        const fade = base + 0.18           // start fade
        const out  = base + 0.24           // gone

        /* In: clip-path + scale + blur */
        gsap.fromTo(`#hn-ch-${ch.id}`,
          { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
          { clipPath: 'inset(0 0 0% 0)',   opacity: 1,
            scrollTrigger: { trigger: wrap, start: pct(base), end: pct(hold), scrub: 1.0 } }
        )

        /* Out */
        if (i < CHAPTERS.length - 1) {
          gsap.to(`#hn-ch-${ch.id}`,
            { clipPath: 'inset(100% 0 0% 0)', opacity: 0,
              scrollTrigger: { trigger: wrap, start: pct(fade), end: pct(out), scrub: 1.0 } }
          )
        }

        /* Headline words: stagger in from bottom */
        const words = el.querySelectorAll('.hn-word')
        words.forEach((w, wi) => {
          gsap.fromTo(w,
            { y: 60, opacity: 0 },
            { y: 0,  opacity: 1, ease: 'power3.out',
              scrollTrigger: { trigger: wrap, start: pct(base), end: pct(base + 0.07), scrub: 0.9 },
              delay: wi * 0.05 }
          )
        })

        /* Sub-text reveal */
        gsap.fromTo(`#hn-sub-${ch.id}`,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0,
            scrollTrigger: { trigger: wrap, start: pct(base + 0.04), end: pct(base + 0.10), scrub: true } }
        )

        /* Reveal quote */
        gsap.fromTo(`#hn-reveal-${ch.id}`,
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0,
            scrollTrigger: { trigger: wrap, start: pct(base + 0.07), end: pct(base + 0.14), scrub: true } }
        )

        /* Pills stagger */
        const pills = el.querySelectorAll('.hn-pill')
        pills.forEach((p, pi) => {
          gsap.fromTo(p,
            { opacity: 0, y: 16, scale: 0.85 },
            { opacity: 1, y: 0,  scale: 1,
              scrollTrigger: { trigger: wrap, start: pct(base + 0.06 + pi * 0.01), end: pct(base + 0.13), scrub: true } }
          )
        })

        /* Icon float-in + parallax */
        gsap.fromTo(`#hn-icon-${ch.id}`,
          { scale: 0.4, opacity: 0, y: 80 },
          { scale: 1,   opacity: 1, y: 0,
            scrollTrigger: { trigger: wrap, start: pct(base), end: pct(hold + 0.04), scrub: 1.1 } }
        )
        gsap.to(`#hn-icon-${ch.id}`, {
          y: -40,
          scrollTrigger: { trigger: wrap, start: pct(hold), end: pct(out), scrub: true },
        })

        /* Stat counter — trigger once when chapter is visible */
        ScrollTrigger.create({
          trigger: wrap,
          start: pct(hold - 0.01),
          onEnter() { if (statEl) animateCounter(statEl, ch.stat.n, ch.stat.suffix) },
          onEnterBack() { if (statEl) animateCounter(statEl, ch.stat.n, ch.stat.suffix) },
        })

        /* Blobs parallax */
        el.querySelectorAll('.hn-blob').forEach((blob, bi) => {
          gsap.to(blob, {
            y: bi % 2 === 0 ? -60 : 50,
            x: bi % 2 === 0 ? 30 : -20,
            scrollTrigger: { trigger: wrap, start: pct(base), end: pct(out), scrub: true },
          })
        })
      })

      /* ── End CTA ── */
      gsap.fromTo('#hn-end',
        { opacity: 0, y: 50, scale: 0.96 },
        { opacity: 1, y: 0,  scale: 1,
          scrollTrigger: { trigger: wrap, start: '88% top', end: '94% top', scrub: true } }
      )

      /* ── Progress bar ── */
      gsap.to('#hn-prog-fill', {
        scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: wrap, start: 'top top', end: 'bottom bottom', scrub: true },
      })

    }, wrapRef)

    return () => ctx.revert()
  }, [])

  /* ─── Styles ─────────────────────────────────────────────────────── */
  const S = {
    wrap: {
      height: '500vh',
      position: 'relative',
    },
    sticky: {
      position: 'sticky',
      top: 0,
      height: '100vh',
      overflow: 'hidden',
    },
    bg: {
      position: 'absolute',
      inset: 0,
      background: '#060412',
      transition: 'none',
    },
    /* dot grid */
    grid: {
      position: 'absolute',
      inset: 0,
      backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)',
      backgroundSize: '40px 40px',
      pointerEvents: 'none',
    },
    /* radial vignette */
    vignette: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(ellipse 90% 90% at 50% 50%, transparent 35%, rgba(0,0,0,0.72) 100%)',
      pointerEvents: 'none',
    },
    panel: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(24px,5vw,80px)',
      pointerEvents: 'none',
    },
  }

  return (
    <section ref={wrapRef} id="story" style={S.wrap}>
      <div ref={stickyRef} style={S.sticky}>

        {/* Background layer */}
        <div ref={bgRef} style={S.bg} />
        <div style={S.grid} />
        <div style={S.vignette} />

        {/* ── Intro ─────────────────────────────────────────────── */}
        <div style={{ ...S.panel, flexDirection: 'column', textAlign: 'center', gap: 0 }}>
          <div id="hn-intro-tag" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 20 }}>
            The HarNova Story
          </div>
          <h2 id="hn-intro-head" style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 'clamp(2.4rem,7vw,6.5rem)', lineHeight: 1.02, letterSpacing: '-0.03em', color: '#fff', margin: '0 0 20px', maxWidth: 820 }}>
            We build for the people{' '}
            <span style={{ background: 'linear-gradient(135deg,#4F46E5 0%,#0EA5E9 50%,#A78BFA 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              behind the screen.
            </span>
          </h2>
          <p id="hn-intro-sub" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 'clamp(14px,1.6vw,18px)', color: 'rgba(255,255,255,0.38)', maxWidth: 480 }}>
            Scroll to meet the Malaysians we build for.
          </p>
          <div id="hn-intro-scroll" style={{ marginTop: 52, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', fontFamily: "'DM Sans',sans-serif", fontWeight: 700 }}>Scroll</span>
            {/* Animated scroll pill */}
            <div style={{ width: 22, height: 36, border: '2px solid rgba(255,255,255,0.15)', borderRadius: 99, display: 'flex', justifyContent: 'center', paddingTop: 6 }}>
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.5)', animation: 'hnScrollDot 1.6s ease-in-out infinite' }} />
            </div>
          </div>
        </div>

        {/* ── Chapter panels ──────────────────────────────────── */}
        {CHAPTERS.map((ch, i) => (
          <div
            key={ch.id}
            id={`hn-ch-${ch.id}`}
            ref={el => { chRefs.current[i] = el }}
            style={{
              ...S.panel,
              clipPath: 'inset(0 0 100% 0)',
              opacity: 0,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 'clamp(20px,4vw,60px)',
              maxWidth: 1160,
              margin: '0 auto',
            }}
          >
            {/* Ambient blobs */}
            {ch.blobs.map((b, bi) => (
              <div key={bi} className="hn-blob" style={{
                position: 'absolute',
                left: b.x, top: b.y,
                width: b.size, height: b.size,
                borderRadius: '50%',
                background: b.color,
                filter: 'blur(60px)',
                pointerEvents: 'none',
                animation: `hnBlob${bi} ${b.dur}s ease-in-out infinite`,
              }} />
            ))}

            {/* Left: text block */}
            <div style={{ flex: '0 0 auto', maxWidth: 560, position: 'relative', zIndex: 1 }}>
              {/* Chapter tag */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', border: `1px solid ${ch.accent}44`, background: `${ch.accent}12`, borderRadius: 99, marginBottom: 22 }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: ch.accent, display: 'inline-block', boxShadow: `0 0 8px ${ch.accent}` }} />
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: ch.accent, fontFamily: "'DM Sans',sans-serif" }}>{ch.tag}</span>
              </div>

              {/* Headline with per-word clip */}
              <div style={{ overflow: 'hidden', marginBottom: 18 }}>
                {ch.headline.map((line, li) => (
                  <div key={li} style={{ overflow: 'hidden' }}>
                    <h2 className="hn-word" style={{
                      display: 'block',
                      fontFamily: "'Syne',sans-serif",
                      fontWeight: 800,
                      fontSize: 'clamp(2rem,5.5vw,5.2rem)',
                      lineHeight: 1.05,
                      letterSpacing: '-0.03em',
                      color: li === 0 ? 'rgba(255,255,255,0.9)' : '#fff',
                      margin: 0,
                    }}>
                      {li === ch.headline.length - 1
                        ? <span style={{ background: `linear-gradient(135deg,#fff 30%,${ch.accent})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{line}</span>
                        : line
                      }
                    </h2>
                  </div>
                ))}
              </div>

              {/* Sub */}
              <p id={`hn-sub-${ch.id}`} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 'clamp(13px,1.4vw,17px)', color: 'rgba(255,255,255,0.42)', lineHeight: 1.75, marginBottom: 20, maxWidth: 420, opacity: 0 }}>
                {ch.sub}
              </p>

              {/* Reveal quote */}
              <div id={`hn-reveal-${ch.id}`} style={{ borderLeft: `2px solid ${ch.accent}`, paddingLeft: 16, marginBottom: 28, opacity: 0 }}>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 'clamp(14px,1.4vw,17px)', color: 'rgba(255,255,255,0.88)', fontWeight: 500, lineHeight: 1.65, margin: 0 }}>
                  {ch.reveal}
                </p>
              </div>

              {/* Pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {ch.pills.map((pill, pi) => (
                  <span key={pill} className="hn-pill" style={{
                    display: 'inline-block',
                    padding: '6px 14px',
                    background: `${ch.accent}16`,
                    border: `1px solid ${ch.accent}33`,
                    borderRadius: 99,
                    fontSize: 12,
                    fontWeight: 600,
                    color: ch.accent,
                    fontFamily: "'DM Sans',sans-serif",
                    opacity: 0,
                  }}>
                    {pill}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: big icon + stat card */}
            <div style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, position: 'relative', zIndex: 1 }}>
              {/* Floating icon */}
              <div id={`hn-icon-${ch.id}`} style={{
                width: 'clamp(100px,16vw,200px)',
                height: 'clamp(100px,16vw,200px)',
                borderRadius: '30%',
                background: `linear-gradient(135deg, ${ch.accent}22, ${ch.accent}08)`,
                border: `1px solid ${ch.accent}33`,
                backdropFilter: 'blur(20px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'clamp(40px,7vw,88px)',
                boxShadow: `0 0 80px ${ch.glow}, 0 0 0 1px ${ch.accent}22`,
                opacity: 0,
                animation: `hnFloat${i} 4s ease-in-out infinite`,
              }}>
                {ch.icon}
              </div>

              {/* Stat card */}
              <div style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.10)',
                borderRadius: 16,
                padding: 'clamp(14px,2vw,20px) clamp(20px,3vw,32px)',
                textAlign: 'center',
                backdropFilter: 'blur(12px)',
                minWidth: 140,
                boxShadow: `0 0 40px ${ch.glow}`,
              }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 'clamp(2rem,4vw,3.5rem)', color: ch.accent, lineHeight: 1, letterSpacing: '-0.02em' }}>
                  <span ref={el => { statRefs.current[i] = el }}>0{ch.stat.suffix}</span>
                </div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.38)', marginTop: 6, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  {ch.stat.label}
                </div>
              </div>
            </div>

            {/* Chapter number watermark */}
            <div style={{
              position: 'absolute',
              right: 0, bottom: '8%',
              fontFamily: "'Syne',sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(80px,18vw,220px)',
              color: 'rgba(255,255,255,0.025)',
              lineHeight: 1,
              letterSpacing: '-0.05em',
              userSelect: 'none',
              pointerEvents: 'none',
            }}>
              0{i + 1}
            </div>
          </div>
        ))}

        {/* ── End CTA ────────────────────────────────────────── */}
        <div id="hn-end" style={{ ...S.panel, flexDirection: 'column', textAlign: 'center', opacity: 0, gap: 0 }}>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 20 }}>
            The HarNova Suite
          </div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 'clamp(2.2rem,6vw,5.5rem)', lineHeight: 1.05, letterSpacing: '-0.03em', color: '#fff', margin: '0 0 18px', maxWidth: 780 }}>
            Technology that works for{' '}
            <span style={{ background: 'linear-gradient(135deg,#0EA5E9,#4F46E5,#A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              everyone.
            </span>
          </h2>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 'clamp(14px,1.5vw,18px)', color: 'rgba(255,255,255,0.38)', lineHeight: 1.7, maxWidth: 520, margin: '0 auto 36px' }}>
            Not just the Fortune 500. HarNova exists for the clinics,<br className="hide-mobile" /> the hawker stalls, and the local shops.
          </p>
          {/* Three-chapter summary chips */}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            {CHAPTERS.map(ch => (
              <div key={ch.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 18px', background: `${ch.accent}14`, border: `1px solid ${ch.accent}33`, borderRadius: 99 }}>
                <span style={{ fontSize: 16 }}>{ch.icon}</span>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600, color: ch.accent }}>{ch.tag.split(' — ')[1]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Progress bar ──────────────────────────────────── */}
        <div style={{ position: 'absolute', right: 20, top: '16%', bottom: '16%', width: 2, background: 'rgba(255,255,255,0.06)', borderRadius: 1, zIndex: 10 }}>
          <div id="hn-prog-fill" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100%', background: 'linear-gradient(to bottom,#4F46E5,#0EA5E9,#A78BFA)', transformOrigin: 'top', transform: 'scaleY(0)', borderRadius: 1 }} />
        </div>

        {/* ── Keyframe styles ───────────────────────────────── */}
        <style>{`
          @keyframes hnScrollDot {
            0%   { transform: translateY(0);   opacity: 1 }
            60%  { transform: translateY(12px); opacity: 0.2 }
            100% { transform: translateY(0);   opacity: 1 }
          }
          @keyframes hnFloat0 { 0%,100% { transform: translateY(0) rotate(0deg) } 50% { transform: translateY(-14px) rotate(2deg) } }
          @keyframes hnFloat1 { 0%,100% { transform: translateY(0) rotate(0deg) } 50% { transform: translateY(-10px) rotate(-2deg) } }
          @keyframes hnFloat2 { 0%,100% { transform: translateY(0) rotate(0deg) } 50% { transform: translateY(-16px) rotate(1.5deg) } }
        `}</style>
      </div>
    </section>
  )
}
