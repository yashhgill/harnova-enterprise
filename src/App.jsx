import { useEffect, useLayoutEffect, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { RouterProvider, useRouter, scrollToHash } from './router'
import { Nav, Footer, Fab } from './components/Chrome'
import { reduced } from './components/ui'
import Home from './pages/Home'
import Project from './pages/Project'

gsap.registerPlugin(ScrollTrigger)

function useLenis() {
  useEffect(() => {
    if (reduced()) return
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
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

  useLayoutEffect(() => {
    const hash = window.__pendingHash || window.location.hash
    window.__pendingHash = null
    window.__lenis?.scrollTo(0, { immediate: true })
    window.scrollTo(0, 0)
    const t = setTimeout(() => { ScrollTrigger.refresh(); if (hash) scrollToHash(hash) }, 300)
    return () => clearTimeout(t)
  }, [key])

  return (
    <>
      <Nav />
      <div className="page" key={key}>
        {work ? <Project slug={work[1]} onPick={onPick} /> : <Home pick={pick} onPick={onPick} />}
        <Footer />
      </div>
      <Fab />
    </>
  )
}

export default function App() {
  useLenis()
  return <RouterProvider><Routes /></RouterProvider>
}
