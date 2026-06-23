import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ─── Story data ─── */
const STORIES = [
  {
    range: [0.13, 0.38],
    tag: '01 — Healthcare',
    headline: 'A clinic in\nKuala Lumpur.',
    body: 'Paper records stacked to the ceiling. Patients waiting hours for a prescription. Doctors drowning in admin.',
    reveal: 'MediLink replaced it all — digital records, e-prescriptions, and appointments in one tap.',
    accent: '#06B6D4',
    glow: 'rgba(6,182,212,0.13)',
  },
  {
    range: [0.44, 0.65],
    tag: '02 — Local Vendors',
    headline: 'A hawker stall\nin Penang.',
    body: 'No card terminal. No online presence. Customers walking away because they ran out of cash.',
    reveal: 'HarNova Store brings cashless payments, digital menus, and inventory tools to every corner of Malaysia.',
    accent: '#F59E0B',
    glow: 'rgba(245,158,11,0.13)',
  },
  {
    range: [0.68, 0.88],
    tag: '03 — Small Business',
    headline: 'A boutique\nin Johor Bahru.',
    body: "Great products. Loyal customers. But no way to know what's working, what's not, or where to grow.",
    reveal: 'HarNova Analytics turns raw sales data into clear decisions — no spreadsheet needed.',
    accent: '#8B5CF6',
    glow: 'rgba(139,92,246,0.13)',
  },
]

/* ─── Helper: particle cloud ─── */
function makeCloud(count, spread, color) {
  const geo = new THREE.BufferGeometry()
  const pos = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    pos[i * 3]     = (Math.random() - 0.5) * spread
    pos[i * 3 + 1] = (Math.random() - 0.5) * spread
    pos[i * 3 + 2] = (Math.random() - 0.5) * (spread * 0.45)
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  return new THREE.Points(
    geo,
    new THREE.PointsMaterial({ color, size: 0.05, transparent: true, opacity: 0.45 })
  )
}

export default function StoryScroll() {
  const sectionRef  = useRef(null)
  const stickyRef   = useRef(null)
  const canvasRef   = useRef(null)
  const introRef    = useRef(null)
  const chapterRefs = useRef([null, null, null])
  const endRef      = useRef(null)
  const stateRef    = useRef({})

  useEffect(() => {
    const canvas = canvasRef.current
    let W = window.innerWidth
    let H = window.innerHeight

    /* ────────── Three.js renderer ────────── */
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    /* ────────── Scene ────────── */
    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x000814, 6, 40)

    /* ────────── Camera ────────── */
    const camera = new THREE.PerspectiveCamera(62, W / H, 0.1, 200)
    camera.position.set(0, 1.5, 13)
    const camTarget = new THREE.Vector3(0, 0, 6)

    /* ────────── Lights ────────── */
    scene.add(new THREE.AmbientLight(0x8899ff, 0.18))
    const keyLight = new THREE.DirectionalLight(0x06B6D4, 2.8)
    keyLight.position.set(6, 12, 6)
    scene.add(keyLight)
    const rimLight = new THREE.PointLight(0x4F46E5, 4.5, 55)
    rimLight.position.set(-10, 5, 5)
    scene.add(rimLight)
    const backLight = new THREE.PointLight(0x8B5CF6, 2.2, 65)
    backLight.position.set(0, -5, -50)
    scene.add(backLight)

    /* ════════════════════════════════════════
       WORLD 1 — HEALTHCARE   (z = 0)
    ════════════════════════════════════════ */
    const healthGroup = new THREE.Group()
    scene.add(healthGroup)

    const cyanMat = new THREE.MeshPhongMaterial({
      color: 0x06B6D4, emissive: 0x0a9fbb, emissiveIntensity: 0.55,
    })

    const crossH = new THREE.Mesh(new THREE.BoxGeometry(5.2, 1.5, 0.4), cyanMat)
    const crossV = new THREE.Mesh(new THREE.BoxGeometry(1.5, 5.2, 0.4), cyanMat)
    healthGroup.add(crossH, crossV)

    // Orbiting patient spheres
    const orbiters = Array.from({ length: 8 }, (_, i) => {
      const r = 2.9 + (i % 3) * 0.85
      const mat = new THREE.MeshPhongMaterial({
        color: i % 2 === 0 ? 0x06B6D4 : 0xffffff,
        emissive: 0x06B6D4, emissiveIntensity: 0.38,
      })
      const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.14 + (i % 3) * 0.06, 8, 8), mat)
      healthGroup.add(mesh)
      return { mesh, a: (i / 8) * Math.PI * 2, r, speed: 0.28 + i * 0.04 }
    })

    // ECG heartbeat line
    const ecgPts = []
    for (let i = 0; i < 100; i++) {
      const x  = (i / 99) * 9.5 - 4.75
      const tt = i / 99
      let   y  = 0
      if (tt > 0.36 && tt < 0.39) y = 0.7
      else if (tt > 0.39 && tt < 0.42) y = -2.0
      else if (tt > 0.42 && tt < 0.46) y = 3.4
      else if (tt > 0.46 && tt < 0.50) y = -0.7
      else if (tt > 0.50 && tt < 0.53) y = 0
      ecgPts.push(new THREE.Vector3(x, y - 4.0, 0.3))
    }
    healthGroup.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(ecgPts),
        new THREE.LineBasicMaterial({ color: 0x06B6D4 })
      )
    )
    healthGroup.add(makeCloud(300, 20, 0x06B6D4))

    /* ════════════════════════════════════════
       WORLD 2 — FOOD VENDORS   (z = -28)
    ════════════════════════════════════════ */
    const foodGroup = new THREE.Group()
    foodGroup.position.z = -28
    scene.add(foodGroup)

    const amberMat = new THREE.MeshPhongMaterial({
      color: 0xF59E0B, emissive: 0xD97706, emissiveIntensity: 0.45,
    })
    const greenMat = new THREE.MeshPhongMaterial({
      color: 0x10B981, emissive: 0x059669, emissiveIntensity: 0.45,
    })

    // Coin stack
    for (let i = 0; i < 11; i++) {
      const coin = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.1, 0.17, 32), amberMat)
      coin.position.set(-3.5 + Math.sin(i) * 0.07, i * 0.2 - 1.9, Math.cos(i) * 0.04)
      foodGroup.add(coin)
    }

    // QR pattern
    const qrPattern = [
      [1,1,1,1,1],
      [1,0,0,0,1],
      [1,0,1,0,1],
      [1,0,0,0,1],
      [1,1,1,1,1],
    ]
    qrPattern.forEach((row, ry) => {
      row.forEach((cell, cx) => {
        if (!cell) return
        const c = new THREE.Mesh(new THREE.BoxGeometry(0.37, 0.37, 0.12), greenMat)
        c.position.set(cx * 0.41 + 1.4, (4 - ry) * 0.41 - 1.2, 0)
        foodGroup.add(c)
      })
    })

    // Floating tap-to-pay card
    const cardGroup = new THREE.Group()
    cardGroup.position.set(-4.0, 1.2, 0.6)
    cardGroup.rotation.y = 0.45
    cardGroup.rotation.x = -0.1
    const cardBody = new THREE.Mesh(
      new THREE.BoxGeometry(3.5, 2.2, 0.07),
      new THREE.MeshPhongMaterial({ color: 0x1e3a5f, emissive: 0x0a1f3a, emissiveIntensity: 0.3, transparent: true, opacity: 0.82 })
    )
    const cardStripe = new THREE.Mesh(
      new THREE.BoxGeometry(3.5, 0.42, 0.09),
      new THREE.MeshPhongMaterial({ color: 0xF59E0B, emissive: 0xF59E0B, emissiveIntensity: 0.45 })
    )
    cardStripe.position.y = -0.42
    cardGroup.add(cardBody, cardStripe)
    foodGroup.add(cardGroup)
    foodGroup.add(makeCloud(220, 20, 0xF59E0B))

    /* ════════════════════════════════════════
       WORLD 3 — SMALL BUSINESS   (z = -56)
    ════════════════════════════════════════ */
    const bizGroup = new THREE.Group()
    bizGroup.position.z = -56
    scene.add(bizGroup)

    // Glowing backdrop
    const backdrop = new THREE.Mesh(
      new THREE.PlaneGeometry(11, 7.5),
      new THREE.MeshPhongMaterial({
        color: 0x1e1b4b, emissive: 0x0f0c2e, emissiveIntensity: 0.4,
        transparent: true, opacity: 0.55, side: THREE.DoubleSide,
      })
    )
    backdrop.position.z = -0.9
    bizGroup.add(backdrop)

    // Bar chart
    const barData = [1.1, 1.7, 1.4, 2.6, 2.0, 3.4, 2.7, 4.0, 3.3, 4.6]
    const bars = barData.map((h, i) => {
      const hue = 0.73 + i * 0.007
      const mat = new THREE.MeshPhongMaterial({
        color: new THREE.Color().setHSL(hue, 0.75, 0.58),
        emissive: new THREE.Color().setHSL(hue, 0.75, 0.25),
        emissiveIntensity: 0.5,
      })
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.52, h, 0.4), mat)
      bar.position.set((i - 4.5) * 0.72, h / 2 - 2.6, 0)
      bizGroup.add(bar)
      return bar
    })

    // Trend line
    bizGroup.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(
          barData.map((h, i) => new THREE.Vector3((i - 4.5) * 0.72, h - 2.6, 0.32))
        ),
        new THREE.LineBasicMaterial({ color: 0xF43F5E })
      )
    )

    // KPI dots
    ;[0x8B5CF6, 0xF43F5E, 0x10B981].forEach((col, i) => {
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.28, 12, 12),
        new THREE.MeshPhongMaterial({ color: col, emissive: col, emissiveIntensity: 0.65 })
      )
      dot.position.set(-3 + i * 3, 2.9, 0.45)
      bizGroup.add(dot)
    })

    bizGroup.add(makeCloud(220, 20, 0x8B5CF6))

    /* ════════════════════════════════════════
       FINALE — CONVERGENCE   (z = -86)
    ════════════════════════════════════════ */
    const endGroup = new THREE.Group()
    endGroup.position.z = -86
    scene.add(endGroup)

    const centerSphere = new THREE.Mesh(
      new THREE.SphereGeometry(2.4, 32, 32),
      new THREE.MeshPhongMaterial({ color: 0x4F46E5, emissive: 0x4F46E5, emissiveIntensity: 0.55 })
    )
    endGroup.add(centerSphere)

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(4.2, 0.11, 8, 80),
      new THREE.MeshPhongMaterial({
        color: 0x06B6D4, emissive: 0x06B6D4, emissiveIntensity: 0.55,
        transparent: true, opacity: 0.65,
      })
    )
    ring.rotation.x = Math.PI / 2.8
    endGroup.add(ring)

    const triOrbs = [0x06B6D4, 0xF59E0B, 0x8B5CF6].map((col, i) => {
      const orb = new THREE.Mesh(
        new THREE.SphereGeometry(0.75, 16, 16),
        new THREE.MeshPhongMaterial({ color: col, emissive: col, emissiveIntensity: 0.6 })
      )
      endGroup.add(orb)
      return { mesh: orb, base: (i / 3) * Math.PI * 2 }
    })

    /* ────────── Store refs ────────── */
    stateRef.current = {
      renderer, scene, camera, camTarget,
      crossH, crossV, orbiters, cardGroup, bars,
      centerSphere, ring, triOrbs,
      keyLight, rimLight,
    }

    /* ────────── Animation loop ────────── */
    let raf
    let t = 0
    const animate = () => {
      raf = requestAnimationFrame(animate)
      t += 0.007

      // Health: pulse cross + orbit spheres
      const pulse = 1 + Math.sin(t * 2.2) * 0.035
      crossH.scale.setScalar(pulse)
      crossV.scale.setScalar(pulse)
      healthGroup.rotation.y = Math.sin(t * 0.38) * 0.07
      orbiters.forEach(o => {
        o.a += o.speed * 0.007
        o.mesh.position.set(
          Math.cos(o.a) * o.r,
          Math.sin(o.a) * o.r,
          Math.sin(o.a * 1.5) * 0.6
        )
      })

      // Food: float card
      foodGroup.rotation.y = Math.sin(t * 0.28) * 0.07
      cardGroup.position.y = 1.2 + Math.sin(t * 0.62) * 0.22
      cardGroup.rotation.y = 0.45 + Math.sin(t * 0.38) * 0.12

      // Business: breathe bars
      bizGroup.rotation.y = Math.sin(t * 0.22) * 0.05
      bars.forEach((b, i) => {
        b.scale.y = 1 + Math.sin(t * (0.55 + i * 0.09) + i * 0.7) * 0.06
      })

      // Finale: orbit tri-orbs + spin ring
      centerSphere.rotation.y = t * 0.45
      ring.rotation.z = t * 0.28
      triOrbs.forEach(o => {
        const a = o.base + t * 0.38
        o.mesh.position.set(
          Math.cos(a) * 4.0,
          Math.sin(a) * 1.4,
          Math.sin(a * 0.7) * 3.2
        )
      })

      camera.lookAt(camTarget)
      renderer.render(scene, camera)
    }
    animate()

    /* ────────── GSAP ScrollTrigger ────────── */
    const ctx = gsap.context(() => {
      const section = sectionRef.current

      // Camera proxy values (GSAP animates these; Three.js reads them)
      const cam = { z: 13, y: 1.5, x: 0 }
      const atmo = { fog: 0 } // 0=health 0.33=food 0.66=biz

      // Main camera path — scrub 1.4 = ~1.4s lag, feels cinematic
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.4,
          onUpdate(self) {
            const p = self.progress
            camera.position.z = cam.z
            camera.position.y = cam.y
            camera.position.x = cam.x
            camTarget.z = cam.z - 7
            camTarget.y = 0
            camTarget.x = cam.x * 0.15

            // Lighting hue shift
            const isHealth = p < 0.33
            const isFood   = p >= 0.33 && p < 0.66
            const keyTarget = isHealth
              ? new THREE.Color(0x06B6D4)
              : isFood
                ? new THREE.Color(0xF59E0B)
                : new THREE.Color(0x8B5CF6)
            keyLight.color.lerp(keyTarget, 0.05)

            const fogTarget = isHealth
              ? new THREE.Color(0x000d1a)
              : isFood
                ? new THREE.Color(0x160c00)
                : new THREE.Color(0x0a001a)
            scene.fog.color.lerp(fogTarget, 0.05)
          },
        },
      })

      // Camera flies through all three worlds
      tl.to(cam, { z: -86, ease: 'none' }, 0)
      tl.to(cam, {
        y: gsap.utils.wrap([1.5, 3.5, 1.5, 3.5, 1.5]),
        ease: 'none',
      }, 0)
      // Subtle X drift between chapters
      tl.to(cam, { x:  1.2, ease: 'power1.inOut', duration: 0.25 }, 0.12)
      tl.to(cam, { x: -1.0, ease: 'power1.inOut', duration: 0.25 }, 0.44)
      tl.to(cam, { x:  0.8, ease: 'power1.inOut', duration: 0.25 }, 0.68)
      tl.to(cam, { x:  0,   ease: 'power1.inOut', duration: 0.1  }, 0.90)

      // ── Intro text ──
      gsap.fromTo(introRef.current,
        { opacity: 1, y: 0 },
        {
          opacity: 0, y: -30,
          ease: 'power2.in',
          scrollTrigger: {
            trigger: section,
            start: '7% top',
            end:   '12% top',
            scrub: true,
          },
        }
      )

      // ── Chapter texts ──
      STORIES.forEach((story, i) => {
        const el = chapterRefs.current[i]
        const [s, e] = story.range

        gsap.fromTo(el,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: `${s * 100}% top`,
              end:   `${(s + 0.07) * 100}% top`,
              scrub: true,
            },
          }
        )
        gsap.fromTo(el,
          { opacity: 1, y: 0 },
          {
            opacity: 0, y: -30,
            ease: 'power2.in',
            scrollTrigger: {
              trigger: section,
              start: `${(e - 0.06) * 100}% top`,
              end:   `${e * 100}% top`,
              scrub: true,
            },
          }
        )
      })

      // ── End CTA ──
      gsap.fromTo(endRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: '90% top',
            end:   '95% top',
            scrub: true,
          },
        }
      )

      // ── Progress line fill ──
      gsap.to('.hn-progress-fill', {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end:   'bottom bottom',
          scrub: true,
        },
      })
    }, sectionRef)

    /* ────────── Resize ────────── */
    const onResize = () => {
      W = window.innerWidth
      H = window.innerHeight
      renderer.setSize(W, H)
      camera.aspect = W / H
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      ctx.revert()
      renderer.dispose()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="story"
      style={{ height: '500vh', position: 'relative', background: '#000814' }}
    >
      <div
        ref={stickyRef}
        style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}
      >
        {/* Three.js canvas */}
        <canvas
          ref={canvasRef}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        />

        {/* Edge vignette */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 42%, rgba(0,2,12,0.6) 100%)',
        }} />

        {/* ── Intro ── */}
        <div
          ref={introRef}
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            width: '90%', maxWidth: 700,
            pointerEvents: 'none',
          }}
        >
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12, fontWeight: 700,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.32)', margin: '0 0 22px',
          }}>
            The HarNova Story
          </p>
          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(36px, 6vw, 76px)',
            fontWeight: 800, lineHeight: 1.08,
            color: '#fff', margin: '0 0 18px',
          }}>
            We build for the<br />
            <span style={{
              background: 'linear-gradient(135deg, #4F46E5 0%, #06B6D4 50%, #8B5CF6 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              people behind the screen.
            </span>
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 'clamp(14px, 1.5vw, 18px)',
            color: 'rgba(255,255,255,0.42)', lineHeight: 1.6,
          }}>
            Patients. Vendors. Shop owners. Their problems are real.
          </p>

          {/* Scroll cue */}
          <div style={{
            marginTop: 44, display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 8,
          }}>
            <span style={{
              fontSize: 11, fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.28)',
            }}>Scroll</span>
            <div style={{
              width: 1, height: 38,
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.35), transparent)',
            }} />
          </div>
        </div>

        {/* ── Chapter texts ── */}
        {STORIES.map((story, i) => (
          <div
            key={i}
            ref={el => { chapterRefs.current[i] = el }}
            style={{
              position: 'absolute',
              bottom: '10%', left: '6%',
              maxWidth: 560,
              opacity: 0,
              pointerEvents: 'none',
            }}
          >
            {/* Tag pill */}
            <div style={{
              display: 'inline-flex', alignItems: 'center',
              fontSize: 11, fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase',
              color: story.accent,
              padding: '4px 14px',
              background: story.glow,
              border: `1px solid ${story.accent}55`,
              borderRadius: 100, marginBottom: 18,
            }}>
              {story.tag}
            </div>

            <h2 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(30px, 4.5vw, 58px)',
              fontWeight: 800, lineHeight: 1.1,
              color: '#fff', margin: '0 0 14px',
              whiteSpace: 'pre-line',
            }}>
              {story.headline}
            </h2>

            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(13px, 1.3vw, 16px)',
              color: 'rgba(255,255,255,0.48)',
              lineHeight: 1.72, margin: '0 0 18px', maxWidth: 420,
            }}>
              {story.body}
            </p>

            <div style={{
              borderLeft: `3px solid ${story.accent}`,
              paddingLeft: 16,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(14px, 1.4vw, 17px)',
              color: 'rgba(255,255,255,0.85)',
              fontWeight: 500, lineHeight: 1.6, maxWidth: 420,
            }}>
              {story.reveal}
            </div>
          </div>
        ))}

        {/* ── End CTA ── */}
        <div
          ref={endRef}
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            width: '90%', maxWidth: 660,
            opacity: 0, pointerEvents: 'none',
          }}
        >
          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(28px, 4.5vw, 60px)',
            fontWeight: 800, color: '#fff', lineHeight: 1.15,
            margin: '0 0 18px',
          }}>
            Technology should work<br />for{' '}
            <span style={{
              background: 'linear-gradient(135deg, #06B6D4, #4F46E5, #8B5CF6)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              everyone.
            </span>
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 'clamp(14px, 1.5vw, 18px)',
            color: 'rgba(255,255,255,0.5)', lineHeight: 1.65,
          }}>
            Not just the Fortune 500. HarNova exists for the rest of us —<br />
            the clinics, the hawker stalls, the boutiques.
          </p>
        </div>

        {/* ── Side progress indicator ── */}
        <div style={{
          position: 'absolute', right: 24,
          top: '15%', bottom: '15%',
          width: 1, background: 'rgba(255,255,255,0.07)', borderRadius: 1,
        }}>
          <div
            className="hn-progress-fill"
            style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '100%',
              background: 'linear-gradient(to bottom, #4F46E5, #06B6D4, #8B5CF6)',
              transformOrigin: 'top', scaleY: 0, borderRadius: 1,
              transform: 'scaleY(0)',
            }}
          />
        </div>
      </div>
    </section>
  )
}
