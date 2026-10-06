import { useEffect, useLayoutEffect, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatePresence, motion } from 'framer-motion'
import { RouterProvider, useRouter, scrollToHash } from './router'
import { Nav, Footer, Fab } from './components/Chrome'
import { NovaMark, reduced } from './components/ui'
import Home from './pages/Home'
import Project from './pages/Project'

gsap.registerPlugin(ScrollTrigger)

function useLenis() {
  useEffect(() => {
    if (reduced()) return
    const lenis = new Lenis({ duration: 1.15, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true })
    window.__lenis = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const tick = t => lenis.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => { gsap.ticker.remove(tick); lenis.destroy(); window.__lenis = null }
  }, [])
}

function Routes() {
  const { path, navigate } = useRouter()
  const [pick, setPick] = useState(null)
  const work = path.match(/^\/work\/([\w-]+)\/?$/)
  const key = work ? `work-${work[1]}` : 'home'

  const onPick = value => {
    setPick({ value, at: Date.now() })
    if (path === '/') scrollToHash('#contact')
    else navigate('/#contact')
  }

  // new page: jump to top (or the requested section), then re-measure scroll animations
  useLayoutEffect(() => {
    const hash = window.__pendingHash || (path === window.location.pathname ? window.location.hash : null)
    window.__pendingHash = null
    window.__lenis?.scrollTo(0, { immediate: true })
    window.scrollTo(0, 0)
    const t = setTimeout(() => {
      ScrollTrigger.refresh()
      if (hash) scrollToHash(hash)
    }, 650)
    return () => clearTimeout(t)
  }, [key]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Nav />
      <AnimatePresence mode="wait">
        <motion.div key={key}
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
          exit={{ opacity: 0, y: -20, transition: { duration: 0.35, ease: [0.4, 0, 1, 1] } }}>
          {work ? <Project slug={work[1]} onPick={onPick} /> : <Home pick={pick} onPick={onPick} />}
          <Footer />
        </motion.div>
      </AnimatePresence>
      <Fab />
    </>
  )
}

function Intro() {
  const [show, setShow] = useState(!reduced() && !sessionStorageSafe())
  useEffect(() => { if (show) { const t = setTimeout(() => setShow(false), 1300); return () => clearTimeout(t) } }, [show])
  return (
    <AnimatePresence>
      {show && (
        <motion.div className="curtain" initial={{ y: 0 }} exit={{ y: '-100%', transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}>
          <motion.div initial={{ scale: 0.4, opacity: 0, rotate: -90 }} animate={{ scale: 1, opacity: 1, rotate: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }}
            style={{ display: 'flex', alignItems: 'center', gap: 14, color: '#fff', fontFamily: 'var(--brand)', fontWeight: 700, letterSpacing: '.06em', fontSize: '1.1rem' }}>
            <NovaMark size={44} /> HARNOVA
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
function sessionStorageSafe() {
  try { const seen = sessionStorage.getItem('hn-intro'); sessionStorage.setItem('hn-intro', '1'); return !!seen } catch { return false }
}

export default function App() {
  useLenis()
  return (
    <RouterProvider>
      <Intro />
      <Routes />
    </RouterProvider>
  )
}
