import { useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

const getScrollKey = ({ pathname, search }) => `${pathname}${search}`

export default function ScrollRestoration() {
  const location = useLocation()
  const scrollPositions = useRef(new Map())

  useLayoutEffect(() => {
    if (!('scrollRestoration' in window.history)) return undefined

    const previous = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'

    return () => {
      window.history.scrollRestoration = previous
    }
  }, [])

  useLayoutEffect(() => {
    const key = getScrollKey(location)
    const frame = window.requestAnimationFrame(() => {
      const root = document.documentElement
      const previousScrollBehavior = root.style.scrollBehavior
      root.style.scrollBehavior = 'auto'

      if (location.hash) {
        const target = document.querySelector(location.hash)

        if (target) {
          target.scrollIntoView({ block: 'start', behavior: 'auto' })
          root.style.scrollBehavior = previousScrollBehavior
          return
        }
      }

      window.scrollTo(0, scrollPositions.current.get(key) ?? 0)
      root.style.scrollBehavior = previousScrollBehavior
    })

    return () => {
      window.cancelAnimationFrame(frame)
      scrollPositions.current.set(key, window.scrollY)
    }
  }, [location])

  return null
}
