import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════════════════════════════════
   STORY DATA
═══════════════════════════════════════════════════════════════════ */
const STORIES = [
  {
    range: [0.12, 0.36],
    tag: '01 — Healthcare',
    headline: 'A clinic in\nKuala Lumpur.',
    body: 'Paper records stacked to the ceiling. Patients waiting hours. Doctors buried in admin.',
    reveal: 'MediLink digitized it all — records, prescriptions, and appointments in one tap.',
    accent: '#0891B2',
    glow: 'rgba(8,145,178,0.12)',
  },
  {
    range: [0.44, 0.64],
    tag: '02 — Local Vendors',
    headline: 'A hawker stall\nin Penang.',
    body: 'No card terminal. No digital presence. Customers walking away when they ran out of cash.',
    reveal: 'HarNova Store brings cashless payments and digital menus to every corner of Malaysia.',
    accent: '#D97706',
    glow: 'rgba(217,119,6,0.12)',
  },
  {
    range: [0.68, 0.87],
    tag: '03 — Small Business',
    headline: 'A shop in\nJohor Bahru.',
    body: 'Great products. Loyal regulars. But no way to know what\'s selling, what\'s not, or where to grow next.',
    reveal: 'HarNova Analytics turns raw sales data into clear decisions — no spreadsheet needed.',
    accent: '#7C3AED',
    glow: 'rgba(124,58,237,0.12)',
  },
]

/* ═══════════════════════════════════════════════════════════════════
   SCENE BUILDER UTILITIES
═══════════════════════════════════════════════════════════════════ */
function mesh(geo, color, opts = {}) {
  return new THREE.Mesh(geo, new THREE.MeshPhongMaterial({ color, ...opts }))
}

function at(parent, obj, x, y, z, rx = 0, ry = 0, rz = 0) {
  obj.position.set(x, y, z)
  obj.rotation.set(rx, ry, rz)
  parent.add(obj)
  return obj
}

/* ─── Blocky character builder ─── */
function makeCharacter({ skin = 0xE8B89A, shirt, pants = 0x1e3a5f, shoes = 0x1a1a1a, hairCol = 0x1a0e0a, accessories = [] }) {
  const g = new THREE.Group()
  const sk = new THREE.MeshPhongMaterial({ color: skin })
  const sh = new THREE.MeshPhongMaterial({ color: shirt })
  const pt = new THREE.MeshPhongMaterial({ color: pants })
  const sr = new THREE.MeshPhongMaterial({ color: shoes })
  const hr = new THREE.MeshPhongMaterial({ color: hairCol })
  const ey = new THREE.MeshPhongMaterial({ color: 0x111122 })

  // Head (box-style)
  const head = at(g, mesh(new THREE.BoxGeometry(0.34, 0.34, 0.34), 0), 0, 1.74, 0)
  head.material = sk
  // Hair top
  at(g, mesh(new THREE.BoxGeometry(0.36, 0.12, 0.36), 0), 0, 1.90, 0).material = hr
  // Eyes
  at(g, mesh(new THREE.BoxGeometry(0.07, 0.05, 0.02), 0), -0.09, 1.74, 0.17).material = ey
  at(g, mesh(new THREE.BoxGeometry(0.07, 0.05, 0.02), 0), 0.09, 1.74, 0.17).material = ey
  // Neck
  at(g, mesh(new THREE.BoxGeometry(0.16, 0.10, 0.16), 0), 0, 1.52, 0).material = sk
  // Torso
  const torso = at(g, mesh(new THREE.BoxGeometry(0.50, 0.52, 0.24), 0), 0, 1.18, 0)
  torso.material = sh
  // Pelvis
  at(g, mesh(new THREE.BoxGeometry(0.46, 0.20, 0.22), 0), 0, 0.88, 0).material = pt
  // Left upper arm
  at(g, mesh(new THREE.BoxGeometry(0.16, 0.28, 0.16), 0), -0.36, 1.22, 0, 0, 0, 0.15).material = sh
  // Left forearm
  at(g, mesh(new THREE.BoxGeometry(0.14, 0.26, 0.14), 0), -0.40, 0.95, 0, 0, 0, 0.08).material = sk
  // Right upper arm
  at(g, mesh(new THREE.BoxGeometry(0.16, 0.28, 0.16), 0), 0.36, 1.22, 0, 0, 0, -0.15).material = sh
  // Right forearm
  at(g, mesh(new THREE.BoxGeometry(0.14, 0.26, 0.14), 0), 0.40, 0.95, 0, 0, 0, -0.08).material = sk
  // Left leg
  at(g, mesh(new THREE.BoxGeometry(0.20, 0.44, 0.20), 0), -0.14, 0.56, 0).material = pt
  at(g, mesh(new THREE.BoxGeometry(0.18, 0.40, 0.18), 0), -0.14, 0.12, 0).material = pt
  at(g, mesh(new THREE.BoxGeometry(0.20, 0.08, 0.30), 0), -0.14, -0.08, 0.05).material = sr
  // Right leg
  at(g, mesh(new THREE.BoxGeometry(0.20, 0.44, 0.20), 0), 0.14, 0.56, 0).material = pt
  at(g, mesh(new THREE.BoxGeometry(0.18, 0.40, 0.18), 0), 0.14, 0.12, 0).material = pt
  at(g, mesh(new THREE.BoxGeometry(0.20, 0.08, 0.30), 0), 0.14, -0.08, 0.05).material = sr

  /* ── Accessories ── */
  accessories.forEach(acc => {
    if (acc === 'white-coat') {
      const wc = new THREE.MeshPhongMaterial({ color: 0xf8f8f8 })
      at(g, mesh(new THREE.BoxGeometry(0.58, 0.56, 0.28), 0), 0, 1.18, 0).material = wc
      // lapels
      at(g, mesh(new THREE.BoxGeometry(0.10, 0.30, 0.05), 0), -0.16, 1.22, 0.14).material = wc
      at(g, mesh(new THREE.BoxGeometry(0.10, 0.30, 0.05), 0), 0.16, 1.22, 0.14).material = wc
      // coat left arm
      at(g, mesh(new THREE.BoxGeometry(0.20, 0.30, 0.20), 0), -0.36, 1.20, 0, 0, 0, 0.15).material = wc
      at(g, mesh(new THREE.BoxGeometry(0.18, 0.28, 0.18), 0), 0.36, 1.20, 0, 0, 0, -0.15).material = wc
    }
    if (acc === 'stethoscope') {
      const sm = new THREE.MeshPhongMaterial({ color: 0x888899 })
      at(g, mesh(new THREE.TorusGeometry(0.12, 0.018, 6, 20, Math.PI), 0), 0, 1.42, 0.10, 0, 0, 0).material = sm
      at(g, mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.03, 10), 0), 0, 1.30, 0.14).material = sm
    }
    if (acc === 'clipboard') {
      const cbMat = new THREE.MeshPhongMaterial({ color: 0xfff3e0 })
      const cbGroup = new THREE.Group()
      at(cbGroup, mesh(new THREE.BoxGeometry(0.22, 0.28, 0.02), 0), 0, 0, 0).material = cbMat
      at(cbGroup, mesh(new THREE.BoxGeometry(0.08, 0.03, 0.03), 0), 0, 0.15, 0.02).material = new THREE.MeshPhongMaterial({ color: 0x888888 })
      // lines on clipboard
      for (let li = 0; li < 4; li++) {
        at(cbGroup, mesh(new THREE.BoxGeometry(0.14, 0.01, 0.01), 0), 0, 0.04 - li * 0.05, 0.015).material = new THREE.MeshPhongMaterial({ color: 0xccbbaa })
      }
      cbGroup.position.set(0.42, 0.90, 0.10)
      cbGroup.rotation.z = -0.2
      g.add(cbGroup)
    }
    if (acc === 'apron') {
      const apMat = new THREE.MeshPhongMaterial({ color: 0xfff8e7 })
      at(g, mesh(new THREE.BoxGeometry(0.48, 0.62, 0.04), 0), 0, 1.05, 0.14).material = apMat
      at(g, mesh(new THREE.BoxGeometry(0.20, 0.08, 0.04), 0), 0, 1.43, 0.14).material = apMat
    }
    if (acc === 'chef-hat') {
      const chMat = new THREE.MeshPhongMaterial({ color: 0xffffff })
      at(g, mesh(new THREE.CylinderGeometry(0.20, 0.20, 0.04, 12), 0), 0, 1.98, 0).material = chMat
      at(g, mesh(new THREE.CylinderGeometry(0.14, 0.17, 0.22, 12), 0), 0, 2.11, 0).material = chMat
    }
    if (acc === 'phone') {
      const phGroup = new THREE.Group()
      at(phGroup, mesh(new THREE.BoxGeometry(0.10, 0.18, 0.012), 0), 0, 0, 0).material = new THREE.MeshPhongMaterial({ color: 0x1a1a2e })
      at(phGroup, mesh(new THREE.PlaneGeometry(0.085, 0.155), 0), 0, 0, 0.008).material = new THREE.MeshPhongMaterial({ color: 0x06B6D4, emissive: 0x06B6D4, emissiveIntensity: 0.4 })
      phGroup.position.set(0.46, 0.90, 0.10)
      phGroup.rotation.z = -0.2
      g.add(phGroup)
    }
    if (acc === 'hospital-gown') {
      at(g, mesh(new THREE.BoxGeometry(0.54, 0.56, 0.28), 0), 0, 1.18, 0)
        .material = new THREE.MeshPhongMaterial({ color: 0xb8e4f0 })
    }
    if (acc === 'tie') {
      const tieMat = new THREE.MeshPhongMaterial({ color: 0x4F46E5 })
      at(g, mesh(new THREE.BoxGeometry(0.06, 0.28, 0.04), 0), 0, 1.12, 0.13).material = tieMat
      at(g, mesh(new THREE.BoxGeometry(0.09, 0.06, 0.04), 0), 0, 0.97, 0.13).material = tieMat
    }
    if (acc === 'scan-device') {
      const sdGroup = new THREE.Group()
      at(sdGroup, mesh(new THREE.BoxGeometry(0.14, 0.08, 0.04), 0), 0, 0, 0)
        .material = new THREE.MeshPhongMaterial({ color: 0x10B981, emissive: 0x10B981, emissiveIntensity: 0.4 })
      sdGroup.position.set(-0.45, 0.92, 0.08)
      sdGroup.rotation.z = 0.3
      g.add(sdGroup)
    }
  })

  return g
}

/* ─── Room builder ─── */
function makeRoom(w, h, d, floorCol, wallCol, ceilCol = 0xf0ede8) {
  const g = new THREE.Group()
  const fm = new THREE.MeshPhongMaterial({ color: floorCol })
  const wm = new THREE.MeshPhongMaterial({ color: wallCol, side: THREE.BackSide })
  const cm = new THREE.MeshPhongMaterial({ color: ceilCol })

  // Floor
  at(g, mesh(new THREE.PlaneGeometry(w, d), 0), 0, 0, 0, -Math.PI / 2).material = fm
  // Back wall
  at(g, mesh(new THREE.PlaneGeometry(w, h), 0), 0, h / 2, -d / 2).material = wm
  // Left wall
  at(g, mesh(new THREE.PlaneGeometry(d, h), 0), -w / 2, h / 2, 0, 0, -Math.PI / 2).material = wm
  // Right wall
  at(g, mesh(new THREE.PlaneGeometry(d, h), 0), w / 2, h / 2, 0, 0, Math.PI / 2).material = wm
  // Ceiling
  at(g, mesh(new THREE.PlaneGeometry(w, d), 0), 0, h, 0, Math.PI / 2).material = cm

  return g
}

/* ─── Particle cloud ─── */
function makeCloud(count, spread, color) {
  const geo = new THREE.BufferGeometry()
  const pos = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    pos[i * 3]     = (Math.random() - 0.5) * spread
    pos[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.6
    pos[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.4
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  return new THREE.Points(geo, new THREE.PointsMaterial({ color, size: 0.04, transparent: true, opacity: 0.5 }))
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════════ */
export default function StoryScroll() {
  const sectionRef  = useRef(null)
  const canvasRef   = useRef(null)
  const introRef    = useRef(null)
  const chapterRefs = useRef([null, null, null])
  const endRef      = useRef(null)

  useEffect(() => {
    let W = window.innerWidth, H = window.innerHeight

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    /* ── Scene & fog ── */
    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x0a0818, 4, 22)

    /* ── Camera ── */
    const camera = new THREE.PerspectiveCamera(62, W / H, 0.1, 200)
    camera.position.set(0, 1.6, 5.5)
    const camTarget = new THREE.Vector3(0, 1.2, -1)

    /* ── Global lights ── */
    scene.add(new THREE.AmbientLight(0xffffff, 0.30))

    /* ═══════════════════════════════════════════════════
       SCENE 1 — CLINIC  (z offset = 0)
    ═══════════════════════════════════════════════════ */
    const clinicGroup = new THREE.Group()
    scene.add(clinicGroup)

    // Room: mint-white walls, light tile floor
    const clinicRoom = makeRoom(8, 3.2, 7, 0xd8e8e8, 0xe8f4f4)
    clinicGroup.add(clinicRoom)

    // Window on back wall (left side)
    at(clinicGroup, mesh(new THREE.BoxGeometry(1.4, 1.8, 0.05), 0xc8e8f8,
      { transparent: true, opacity: 0.45 }), -2, 2.1, -3.45)
    at(clinicGroup, mesh(new THREE.BoxGeometry(1.5, 1.9, 0.08), 0xffffff), -2, 2.1, -3.50)

    // Window light shaft
    const clinicKey = new THREE.SpotLight(0xfff8f0, 3, 10, Math.PI / 6, 0.5)
    clinicKey.position.set(-2, 3.5, -2.5)
    clinicKey.target.position.set(-1.5, 0, 0)
    clinicGroup.add(clinicKey, clinicKey.target)

    // Ceiling strip light
    const clinicStrip = new THREE.RectAreaLight ? null : new THREE.DirectionalLight(0xeef8ff, 0.6)
    if (clinicStrip) { clinicStrip.position.set(0, 3, 0); clinicGroup.add(clinicStrip) }

    // Examination table
    const tableMat = new THREE.MeshPhongMaterial({ color: 0xffffff })
    const tableBase = at(clinicGroup, mesh(new THREE.BoxGeometry(2.0, 0.80, 0.80), 0x8899bb), 0.5, 0.40, -1.5)
    at(clinicGroup, mesh(new THREE.BoxGeometry(2.1, 0.10, 0.85), 0xfafcff), 0.5, 0.82, -1.5).material = tableMat
    // Pillow
    at(clinicGroup, mesh(new THREE.BoxGeometry(0.45, 0.10, 0.35), 0xffffff), 1.3, 0.94, -1.5)

    // IV stand (right side of table)
    at(clinicGroup, mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.9, 8), 0xaaaaaa), 1.7, 0.95, -1.8)
    at(clinicGroup, mesh(new THREE.CylinderGeometry(0.005, 0.005, 0.6, 8), 0xcccccc), 1.7, 1.90, -1.8, 0, 0, Math.PI / 2)
    at(clinicGroup, mesh(new THREE.SphereGeometry(0.07, 8, 6), 0xd0e8ff, { transparent: true, opacity: 0.7 }), 1.7, 2.0, -1.8)

    // Medical monitor on stand
    at(clinicGroup, mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.9, 8), 0x666666), -2.5, 0.45, -1.5)
    at(clinicGroup, mesh(new THREE.BoxGeometry(0.60, 0.44, 0.06), 0x222233), -2.5, 0.96, -1.5)
    at(clinicGroup, mesh(new THREE.PlaneGeometry(0.52, 0.36), 0x0ea5e9, { emissive: 0x0ea5e9, emissiveIntensity: 0.3 }), -2.5, 0.96, -1.46)
    // EHR lines on screen
    for (let li = 0; li < 5; li++) {
      at(clinicGroup, mesh(new THREE.PlaneGeometry(0.30 - li * 0.04, 0.015), 0xffffff, { emissive: 0xffffff, emissiveIntensity: 0.8 }), -2.5 - 0.05 + li * 0.02, 1.05 - li * 0.055, -1.45)
    }

    // Red cross on wall
    at(clinicGroup, mesh(new THREE.BoxGeometry(0.28, 0.08, 0.02), 0xef4444), 3.0, 2.0, -3.44)
    at(clinicGroup, mesh(new THREE.BoxGeometry(0.08, 0.28, 0.02), 0xef4444), 3.0, 2.0, -3.44)

    // Floor tile lines (subtle grid)
    for (let i = -3; i <= 3; i++) {
      at(clinicGroup, mesh(new THREE.BoxGeometry(8, 0.005, 0.01), 0xbbd0d0), 0, 0.002, i * 1.0)
      at(clinicGroup, mesh(new THREE.BoxGeometry(0.01, 0.005, 7), 0xbbd0d0), i * 1.1, 0.002, 0)
    }

    // Doctor character — white coat, stethoscope, clipboard
    const doctor = makeCharacter({
      skin: 0xF0C890, shirt: 0x2563EB, pants: 0x1e3a5f,
      accessories: ['white-coat', 'stethoscope', 'clipboard'],
    })
    doctor.position.set(-1.0, 0, -1.5)
    doctor.rotation.y = 0.5  // facing patient
    clinicGroup.add(doctor)

    // Patient character — hospital gown, sitting on table
    const patient = makeCharacter({
      skin: 0xE8B09A, shirt: 0xb8e4f0, pants: 0xb8e4f0,
      hairCol: 0x3d2b1f,
      accessories: ['hospital-gown'],
    })
    patient.position.set(0.5, 0.83, -1.5)
    patient.rotation.y = -0.5  // facing doctor
    // Sitting pose: bend the legs down
    patient.children.forEach(c => {
      if (c.position.y < 0.6 && c.position.y > 0) {
        c.position.y -= 0.3
      }
    })
    clinicGroup.add(patient)

    // Floating MediLink tablet glow near doctor's hand
    const tablet = new THREE.Group()
    at(tablet, mesh(new THREE.BoxGeometry(0.30, 0.22, 0.015), 0x1a1a2e), 0, 0, 0)
    at(tablet, mesh(new THREE.PlaneGeometry(0.26, 0.19), 0x0ea5e9, { emissive: 0x0ea5e9, emissiveIntensity: 0.5 }), 0, 0, 0.009)
    tablet.position.set(-0.5, 1.05, -1.0)
    tablet.rotation.y = 0.5
    tablet.rotation.x = -0.2
    clinicGroup.add(tablet)

    clinicGroup.add(makeCloud(60, 6, 0x06B6D4))

    /* ═══════════════════════════════════════════════════
       SCENE 2 — HAWKER STALL  (z offset = -22)
    ═══════════════════════════════════════════════════ */
    const hawkerGroup = new THREE.Group()
    hawkerGroup.position.z = -22
    scene.add(hawkerGroup)

    // Semi-outdoor: just a floor and back structure (no side walls, open feel)
    at(hawkerGroup, mesh(new THREE.PlaneGeometry(10, 8), 0xb8a898, {}), 0, 0, -1, -Math.PI / 2)

    // Stall roof (red metal)
    at(hawkerGroup, mesh(new THREE.BoxGeometry(5.0, 0.08, 2.8), 0xcc2222), 0, 2.5, -1.2, -0.05)
    // Roof supports
    for (const x of [-2.2, 2.2]) {
      at(hawkerGroup, mesh(new THREE.CylinderGeometry(0.04, 0.04, 2.5, 8), 0x884444), x, 1.25, -2.4)
    }
    // Back wall of stall
    at(hawkerGroup, mesh(new THREE.BoxGeometry(5.0, 2.5, 0.08), 0xd4a96a), 0, 1.25, -2.6)
    // Menu board on back wall
    at(hawkerGroup, mesh(new THREE.BoxGeometry(1.4, 0.9, 0.04), 0x1a1a1a), 0, 1.8, -2.55)
    at(hawkerGroup, mesh(new THREE.PlaneGeometry(1.3, 0.80), 0x222233, { emissive: 0x222233, emissiveIntensity: 0.2 }), 0, 1.80, -2.52)
    // Menu text lines
    for (let li = 0; li < 4; li++) {
      const lineW = li === 0 ? 0.60 : 0.35 + Math.random() * 0.3
      at(hawkerGroup, mesh(new THREE.PlaneGeometry(lineW, 0.06), 0xffd700, { emissive: 0xffd700, emissiveIntensity: 0.6 }),
        -0.2 + (Math.random() - 0.5) * 0.4, 2.02 - li * 0.17, -2.51)
    }

    // Stall counter
    at(hawkerGroup, mesh(new THREE.BoxGeometry(4.5, 0.10, 0.50), 0x8B7355), 0, 0.92, -1.0)
    at(hawkerGroup, mesh(new THREE.BoxGeometry(4.5, 0.92, 0.50), 0xa08060), 0, 0.46, -1.0)

    // Wok on counter
    at(hawkerGroup, mesh(new THREE.CylinderGeometry(0.35, 0.24, 0.20, 16), 0x333333), -1.2, 1.04, -1.3)
    at(hawkerGroup, mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.04, 16), 0x444444), -1.2, 1.15, -1.3)
    // Gas burner ring
    at(hawkerGroup, mesh(new THREE.TorusGeometry(0.18, 0.025, 6, 20), 0x555566), -1.2, 1.02, -1.3)

    // Steam particles above wok
    const steamPts = []
    for (let i = 0; i < 30; i++) {
      steamPts.push(
        (Math.random() - 0.5) * 0.5 - 1.2,
        1.2 + Math.random() * 0.8,
        -1.3 + (Math.random() - 0.5) * 0.3
      )
    }
    const steamGeo = new THREE.BufferGeometry()
    steamGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(steamPts), 3))
    hawkerGroup.add(new THREE.Points(steamGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.04, transparent: true, opacity: 0.35 })))

    // Plates / food on counter
    for (const x of [-0.3, 0.5, 1.1]) {
      at(hawkerGroup, mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.03, 12), 0xfafafa), x, 0.985, -1.1)
      at(hawkerGroup, mesh(new THREE.CylinderGeometry(0.10, 0.10, 0.05, 10), 0xd4875a), x, 1.0, -1.1)
    }

    // Hanging red lanterns
    for (const [lx, ly, lz] of [[-1.5, 2.35, -0.4], [0.2, 2.35, -0.6], [1.6, 2.35, -0.5]]) {
      at(hawkerGroup, mesh(new THREE.CylinderGeometry(0.10, 0.08, 0.22, 12), 0xcc1111, { emissive: 0x881100, emissiveIntensity: 0.5 }), lx, ly, lz)
      at(hawkerGroup, mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.25, 6), 0xcc1111), lx, ly + 0.23, lz)
      // Lantern glow
      const lanternLight = new THREE.PointLight(0xff6633, 0.6, 1.5)
      lanternLight.position.set(lx, ly, lz)
      hawkerGroup.add(lanternLight)
    }

    // Outdoor warm light
    const hawkerSun = new THREE.DirectionalLight(0xfff0cc, 1.2)
    hawkerSun.position.set(4, 6, 3)
    hawkerGroup.add(hawkerSun)
    hawkerGroup.add(new THREE.AmbientLight(0xffe4b5, 0.25))

    // Plastic stools in front of counter
    for (const [sx, sz] of [[-1.5, 1.2], [0, 1.2], [1.5, 1.2]]) {
      at(hawkerGroup, mesh(new THREE.CylinderGeometry(0.22, 0.20, 0.06, 12), 0xcc3333), sx, 0.46, sz)
      // Stool legs
      for (const [lx, lz2] of [[-0.15, -0.15], [0.15, -0.15], [-0.15, 0.15], [0.15, 0.15]]) {
        at(hawkerGroup, mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.42, 6), 0xcc3333), sx + lx, 0.22, sz + lz2)
      }
    }

    // Vendor character — chef hat + apron
    const vendor = makeCharacter({
      skin: 0xD4956A, shirt: 0xffffff, pants: 0x555555,
      hairCol: 0x1a1008,
      accessories: ['apron', 'chef-hat'],
    })
    vendor.position.set(-1.2, 0, -1.65)
    vendor.rotation.y = 0.3  // slight angle toward customer
    hawkerGroup.add(vendor)

    // Customer character — phone in hand
    const customer = makeCharacter({
      skin: 0xF5CBA7, shirt: 0xF59E0B, pants: 0x1e1b4b,
      hairCol: 0x1a0e0a,
      accessories: ['phone'],
    })
    customer.position.set(0.8, 0, 0.6)
    customer.rotation.y = Math.PI - 0.5  // facing vendor
    hawkerGroup.add(customer)

    // QR code stand on counter (cashless payment)
    at(hawkerGroup, mesh(new THREE.BoxGeometry(0.18, 0.28, 0.02), 0x111111), 1.8, 1.08, -1.0)
    at(hawkerGroup, mesh(new THREE.PlaneGeometry(0.15, 0.24), 0xffffff), 1.8, 1.08, -0.99)
    at(hawkerGroup, mesh(new THREE.PlaneGeometry(0.10, 0.10), 0x111111, { emissive: 0x111111, emissiveIntensity: 0.2 }), 1.8, 1.10, -0.985)

    hawkerGroup.add(makeCloud(40, 7, 0xF59E0B))

    /* ═══════════════════════════════════════════════════
       SCENE 3 — BUSINESS SHOP  (z offset = -44)
    ═══════════════════════════════════════════════════ */
    const shopGroup = new THREE.Group()
    shopGroup.position.z = -44
    scene.add(shopGroup)

    // Room: warm cream walls, wooden floor
    const shopRoom = makeRoom(9, 3.2, 7, 0xc8a87a, 0xf0ebe0)
    shopGroup.add(shopRoom)

    // Wooden floor planks
    for (let i = -4; i <= 4; i++) {
      at(shopGroup, mesh(new THREE.BoxGeometry(0.9, 0.005, 7), 0xb8935a), i * 0.92, 0.003, 0)
    }
    // Plank lines
    for (let i = -4; i <= 4; i++) {
      at(shopGroup, mesh(new THREE.BoxGeometry(9, 0.003, 0.01), 0xa07848), 0, 0.004, i * 1.0)
    }

    // Shop shelving unit (back wall)
    at(shopGroup, mesh(new THREE.BoxGeometry(7, 2.6, 0.30), 0xc8a870), 0, 1.3, -3.2)
    // Shelf levels
    for (let lv = 0; lv < 4; lv++) {
      at(shopGroup, mesh(new THREE.BoxGeometry(7.1, 0.05, 0.32), 0xb89050), 0, 0.5 + lv * 0.6, -3.2)
    }

    // Products on shelves (colorful boxes)
    const prodColors = [0xef4444, 0x3b82f6, 0x10B981, 0xf59e0b, 0x8b5cf6, 0xec4899, 0x06b6d4, 0xf97316]
    for (let lv = 0; lv < 3; lv++) {
      for (let p = 0; p < 9; p++) {
        const col = prodColors[(lv * 9 + p) % prodColors.length]
        const h = 0.28 + Math.random() * 0.14
        at(shopGroup,
          mesh(new THREE.BoxGeometry(0.22, h, 0.20), col, { emissive: col, emissiveIntensity: 0.08 }),
          -3.0 + p * 0.72, 0.55 + lv * 0.60 + h / 2, -3.08
        )
      }
    }

    // Shop counter (front, right side)
    at(shopGroup, mesh(new THREE.BoxGeometry(2.2, 0.96, 0.60), 0xa08060), 2.5, 0.48, -1.0)
    at(shopGroup, mesh(new THREE.BoxGeometry(2.3, 0.07, 0.65), 0xb8956a), 2.5, 0.96, -1.0)

    // POS screen on counter
    at(shopGroup, mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.30, 8), 0x555555), 2.5, 1.12, -1.1)
    at(shopGroup, mesh(new THREE.BoxGeometry(0.55, 0.38, 0.04), 0x111122), 2.5, 1.35, -1.15)
    at(shopGroup, mesh(new THREE.PlaneGeometry(0.48, 0.32), 0x7C3AED, { emissive: 0x7C3AED, emissiveIntensity: 0.35 }), 2.5, 1.35, -1.12)

    // Floating analytics dashboard (holographic, left side of room)
    const dashGroup = new THREE.Group()
    dashGroup.position.set(-2.5, 1.8, -1.8)
    dashGroup.rotation.y = 0.4
    // Dashboard glass
    at(dashGroup, mesh(new THREE.BoxGeometry(1.8, 1.2, 0.02), 0x0a0520, { transparent: true, opacity: 0.85 }), 0, 0, 0)
    at(dashGroup, mesh(new THREE.PlaneGeometry(1.7, 1.1), 0x120830, { emissive: 0x120830, emissiveIntensity: 0.5 }), 0, 0, 0.012)
    // Bar chart bars on dashboard
    const dashBars = [0.32, 0.50, 0.38, 0.72, 0.58, 0.80, 0.68]
    const dashColors = [0x4F46E5, 0x7C3AED, 0x8B5CF6, 0x6D28D9, 0x5B21B6, 0x4C1D95, 0x7C3AED]
    dashBars.forEach((h, i) => {
      const barMat = new THREE.MeshPhongMaterial({ color: dashColors[i], emissive: dashColors[i], emissiveIntensity: 0.5 })
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.12, h, 0.02), barMat)
      bar.position.set(-0.62 + i * 0.21, h / 2 - 0.5, 0.015)
      dashGroup.add(bar)
    })
    // Trend line
    const trendPts = dashBars.map((h, i) => new THREE.Vector3(-0.62 + i * 0.21, h - 0.5, 0.02))
    const trendGeo = new THREE.BufferGeometry().setFromPoints(trendPts)
    dashGroup.add(new THREE.Line(trendGeo, new THREE.LineBasicMaterial({ color: 0xF43F5E })))
    // Dashboard header line
    at(dashGroup, mesh(new THREE.BoxGeometry(1.4, 0.06, 0.015), 0x4F46E5, { emissive: 0x4F46E5, emissiveIntensity: 0.6 }), 0, 0.48, 0.015)
    // Dashboard glow
    const dashLight = new THREE.PointLight(0x7C3AED, 1.0, 3)
    dashLight.position.set(-2.5, 1.8, -1.2)
    shopGroup.add(dashLight)
    shopGroup.add(dashGroup)

    // Shop lighting
    const shopKey = new THREE.SpotLight(0xfff8e7, 2.5, 8, Math.PI / 5, 0.4)
    shopKey.position.set(0, 3.5, 0)
    shopKey.target.position.set(0, 0, -1)
    shopGroup.add(shopKey, shopKey.target)

    // Shopkeeper — tie, scan device
    const shopkeeper = makeCharacter({
      skin: 0xE8C49A, shirt: 0xf8f8f8, pants: 0x1e1b4b,
      hairCol: 0x2d1b0e,
      accessories: ['tie', 'scan-device'],
    })
    shopkeeper.position.set(2.5, 0, -0.3)
    shopkeeper.rotation.y = Math.PI  // facing customers (toward camera)
    shopGroup.add(shopkeeper)

    // Browsing customer
    const shopper = makeCharacter({
      skin: 0xF5CBA7, shirt: 0x10B981, pants: 0x374151,
      hairCol: 0x1a0e0a,
      accessories: [],
    })
    shopper.position.set(-1.0, 0, 0.5)
    shopper.rotation.y = -0.8  // looking at shelves
    shopGroup.add(shopper)

    shopGroup.add(makeCloud(40, 8, 0x8B5CF6))

    /* ═══════════════════════════════════════════════════
       FINALE — CONVERGENCE  (z offset = -66)
    ═══════════════════════════════════════════════════ */
    const endGroup = new THREE.Group()
    endGroup.position.z = -66
    scene.add(endGroup)

    // Central orb
    const centerSphere = at(endGroup,
      mesh(new THREE.SphereGeometry(1.8, 32, 32), 0x4F46E5, { emissive: 0x4F46E5, emissiveIntensity: 0.55 }),
      0, 1.5, 0
    )
    // Orbit ring
    const ring = at(endGroup,
      mesh(new THREE.TorusGeometry(3.5, 0.09, 8, 80), 0x06B6D4, { emissive: 0x06B6D4, emissiveIntensity: 0.5, transparent: true, opacity: 0.7 }),
      0, 1.5, 0, Math.PI / 2.6
    )
    // Three sector orbs
    const triOrbs = [0x06B6D4, 0xD97706, 0x7C3AED].map((col, i) => {
      const orb = mesh(new THREE.SphereGeometry(0.6, 16, 16), col, { emissive: col, emissiveIntensity: 0.5 })
      endGroup.add(orb)
      return { mesh: orb, base: (i / 3) * Math.PI * 2 }
    })
    // End particles
    endGroup.add(makeCloud(120, 10, 0x4F46E5))

    /* ═══════════════════════════════════════════════════
       ANIMATION LOOP
    ═══════════════════════════════════════════════════ */
    let raf, t = 0
    const animate = () => {
      raf = requestAnimationFrame(animate)
      t += 0.006

      // Clinic: doctor subtle bob, tablet hover
      doctor.position.y = Math.sin(t * 0.8) * 0.008
      tablet.position.y = 1.05 + Math.sin(t * 1.2) * 0.04
      tablet.rotation.y = 0.5 + Math.sin(t * 0.6) * 0.08

      // Hawker: vendor slight lean, steam drift
      vendor.position.y = Math.sin(t * 0.9 + 0.5) * 0.007
      customer.position.y = Math.sin(t * 0.7) * 0.006

      // Shop: dashboard float, shopkeeper slight nod
      dashGroup.position.y = 1.8 + Math.sin(t * 0.7) * 0.06
      dashGroup.rotation.y = 0.4 + Math.sin(t * 0.4) * 0.06
      shopkeeper.children[0] && (shopkeeper.children[0].rotation.x = Math.sin(t * 0.5) * 0.04) // head nod

      // Finale
      centerSphere.rotation.y = t * 0.4
      ring.rotation.z = t * 0.25
      triOrbs.forEach(o => {
        const a = o.base + t * 0.35
        o.mesh.position.set(Math.cos(a) * 3.3, 1.5 + Math.sin(a) * 1.0, Math.sin(a) * 3.3)
      })

      camera.lookAt(camTarget)
      renderer.render(scene, camera)
    }
    animate()

    /* ═══════════════════════════════════════════════════
       GSAP SCROLL TRIGGER
    ═══════════════════════════════════════════════════ */
    const ctx = gsap.context(() => {
      const section = sectionRef.current
      // Camera proxy
      const cam = { z: 5.5, y: 1.6, x: 0 }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
          onUpdate(self) {
            const p = self.progress
            camera.position.z = cam.z
            camera.position.y = cam.y
            camera.position.x = cam.x
            camTarget.z = cam.z - 5
            camTarget.y = cam.y * 0.7
            camTarget.x = cam.x * 0.2

            // Atmosphere color shift
            const fogTarget = p < 0.33
              ? new THREE.Color(0x0a1520)
              : p < 0.66
                ? new THREE.Color(0x1a0f00)
                : new THREE.Color(0x0a0520)
            scene.fog.color.lerp(fogTarget, 0.04)
          },
        },
      })

      // Camera moves through 4 worlds
      tl.to(cam, { z: -54, ease: 'none' }, 0)  // fly through all 3 scenes + finale
      // Subtle camera drift
      tl.to(cam, { x:  1.0, ease: 'power1.inOut', duration: 0.18 }, 0.10)
      tl.to(cam, { x: -0.8, ease: 'power1.inOut', duration: 0.18 }, 0.42)
      tl.to(cam, { x:  0.6, ease: 'power1.inOut', duration: 0.18 }, 0.66)
      tl.to(cam, { x:  0,   ease: 'power1.inOut', duration: 0.10 }, 0.90)

      // ── Intro fade out ──
      gsap.fromTo(introRef.current,
        { opacity: 1, y: 0 },
        { opacity: 0, y: -40, scrollTrigger: { trigger: section, start: '6% top', end: '11% top', scrub: true } }
      )

      // ── Chapter text animations ──
      STORIES.forEach((story, i) => {
        const el = chapterRefs.current[i]
        const [s, e] = story.range
        gsap.fromTo(el,
          { opacity: 0, y: 55 },
          { opacity: 1, y: 0, ease: 'power2.out',
            scrollTrigger: { trigger: section, start: `${s * 100}% top`, end: `${(s + 0.07) * 100}% top`, scrub: true } }
        )
        gsap.fromTo(el,
          { opacity: 1, y: 0 },
          { opacity: 0, y: -35, ease: 'power2.in',
            scrollTrigger: { trigger: section, start: `${(e - 0.06) * 100}% top`, end: `${e * 100}% top`, scrub: true } }
        )
      })

      // ── End CTA ──
      gsap.fromTo(endRef.current,
        { opacity: 0, y: 55 },
        { opacity: 1, y: 0, ease: 'power2.out',
          scrollTrigger: { trigger: section, start: '90% top', end: '95% top', scrub: true } }
      )

      // ── Progress fill ──
      gsap.to('.hn-progress-fill', {
        scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom bottom', scrub: true },
      })
    }, sectionRef)

    /* ── Resize ── */
    const onResize = () => {
      W = window.innerWidth; H = window.innerHeight
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
      style={{ height: '500vh', position: 'relative', background: '#060412' }}
    >
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        {/* Three.js canvas */}
        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />

        {/* Vignette */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 85% 85% at 50% 50%, transparent 40%, rgba(4,2,18,0.65) 100%)',
        }} />

        {/* Intro */}
        <div ref={introRef} style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center', width: '90%', maxWidth: 680, pointerEvents: 'none',
        }}>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', margin: '0 0 20px' }}>
            The HarNova Story
          </p>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(34px,6vw,72px)', fontWeight: 800, lineHeight: 1.08, color: '#fff', margin: '0 0 16px' }}>
            We build for the<br />
            <span style={{ background: 'linear-gradient(135deg,#4F46E5 0%,#0891B2 50%,#7C3AED 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              people behind the screen.
            </span>
          </h2>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 'clamp(14px,1.5vw,18px)', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
            Scroll to see how we're changing everyday lives in Malaysia.
          </p>
          <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 11, fontFamily: "'DM Sans',sans-serif", fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>Scroll</span>
            <div style={{ width: 1, height: 36, background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)' }} />
          </div>
        </div>

        {/* Chapter overlays */}
        {STORIES.map((story, i) => (
          <div key={i} ref={el => { chapterRefs.current[i] = el }}
            style={{ position: 'absolute', bottom: '9%', left: '5%', maxWidth: 520, opacity: 0, pointerEvents: 'none' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', fontSize: 11, fontFamily: "'DM Sans',sans-serif", fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: story.accent, padding: '4px 14px', background: story.glow, border: `1px solid ${story.accent}55`, borderRadius: 100, marginBottom: 16 }}>
              {story.tag}
            </div>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(28px,4.5vw,54px)', fontWeight: 800, lineHeight: 1.1, color: '#fff', margin: '0 0 12px', whiteSpace: 'pre-line' }}>
              {story.headline}
            </h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 'clamp(13px,1.3vw,16px)', color: 'rgba(255,255,255,0.45)', lineHeight: 1.72, margin: '0 0 16px', maxWidth: 400 }}>
              {story.body}
            </p>
            <div style={{ borderLeft: `3px solid ${story.accent}`, paddingLeft: 14, fontFamily: "'DM Sans',sans-serif", fontSize: 'clamp(14px,1.4vw,17px)', color: 'rgba(255,255,255,0.88)', fontWeight: 500, lineHeight: 1.6, maxWidth: 400 }}>
              {story.reveal}
            </div>
          </div>
        ))}

        {/* End CTA */}
        <div ref={endRef} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center', width: '90%', maxWidth: 620, opacity: 0, pointerEvents: 'none' }}>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(26px,4.5vw,58px)', fontWeight: 800, color: '#fff', lineHeight: 1.15, margin: '0 0 16px' }}>
            Technology should work<br />for{' '}
            <span style={{ background: 'linear-gradient(135deg,#0891B2,#4F46E5,#7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              everyone.
            </span>
          </h2>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 'clamp(14px,1.5vw,18px)', color: 'rgba(255,255,255,0.48)', lineHeight: 1.65 }}>
            Not just the Fortune 500. HarNova exists for the rest of us —<br />
            the clinics, the hawker stalls, the local shops.
          </p>
        </div>

        {/* Progress bar */}
        <div style={{ position: 'absolute', right: 22, top: '15%', bottom: '15%', width: 1, background: 'rgba(255,255,255,0.06)', borderRadius: 1 }}>
          <div className="hn-progress-fill" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100%', background: 'linear-gradient(to bottom,#4F46E5,#0891B2,#7C3AED)', transformOrigin: 'top', transform: 'scaleY(0)', borderRadius: 1 }} />
        </div>
      </div>
    </section>
  )
}
