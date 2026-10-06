import { useLayoutEffect, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { RouterProvider, useRouter, scrollToHash } from './router'
import { Nav, Footer, Fab } from './components/Chrome'
import Home from './pages/Home'
import Project from './pages/Project'

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

  // on a new page: start at the top, or at the section the link asked for
  useLayoutEffect(() => {
    const hash = window.__pendingHash || window.location.hash
    window.__pendingHash = null
    window.scrollTo({ top: 0, behavior: 'instant' })
    const t = setTimeout(() => { ScrollTrigger.refresh(); if (hash) scrollToHash(hash) }, 120)
    return () => clearTimeout(t)
  }, [key])

  return (
    <>
      <Nav />
      <div key={key}>
        {work ? <Project slug={work[1]} onPick={onPick} /> : <Home pick={pick} onPick={onPick} />}
      </div>
      <Footer />
      <Fab />
    </>
  )
}

export default function App() {
  return <RouterProvider><Routes /></RouterProvider>
}
