import { createContext, useCallback, useContext, useEffect, useState } from 'react'

/* A tiny history router — two kinds of page don't need a dependency. */
const Ctx = createContext({ path: '/', navigate: () => {} })

export function scrollToHash(hash, immediate = false) {
  const el = hash && document.getElementById(hash.replace('#', ''))
  if (!el) return false
  const lenis = window.__lenis
  if (lenis) lenis.scrollTo(el, { offset: -70, immediate, duration: 1.4 })
  else el.scrollIntoView({ behavior: immediate ? 'auto' : 'smooth' })
  return true
}

export function RouterProvider({ children }) {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigate = useCallback(to => {
    const url = new URL(to, window.location.origin)
    if (url.pathname === window.location.pathname) {
      if (url.hash) scrollToHash(url.hash)
      else window.__lenis?.scrollTo(0, { duration: 1.2 })
      return
    }
    window.history.pushState({}, '', url.pathname + url.hash)
    window.__pendingHash = url.hash || null
    setPath(url.pathname)
  }, [])

  return <Ctx.Provider value={{ path, navigate }}>{children}</Ctx.Provider>
}

export const useRouter = () => useContext(Ctx)

export function Link({ to, children, onClick, ...rest }) {
  const { navigate } = useRouter()
  const external = /^https?:|^mailto:/.test(to)
  const handle = e => {
    onClick?.(e)
    if (external || e.metaKey || e.ctrlKey || e.shiftKey || e.defaultPrevented) return
    e.preventDefault()
    if (to.startsWith('#')) { scrollToHash(to); return }
    navigate(to)
  }
  return (
    <a href={to} onClick={handle} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})} {...rest}>
      {children}
    </a>
  )
}
