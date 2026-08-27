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
    const root = document.documentElement
    const previousScrollBehavior = root.style.scrollBehavior
    let frame

    // Hash targets can live on lazy-loaded routes (see App.jsx's Suspense
    // boundary), so the element may not exist yet on the first frame after
    // navigation — retry for a bit instead of giving up and scrolling to 0.
    const attemptScroll = (attemptsLeft) => {
      root.style.scrollBehavior = 'auto'

      if (location.hash) {
        const target = document.querySelector(location.hash)

        if (target) {
          target.scrollIntoView({ block: 'start', behavior: 'auto' })
          root.style.scrollBehavior = previousScrollBehavior
          return
        }

        if (attemptsLeft > 0) {
          frame = window.requestAnimationFrame(() => attemptScroll(attemptsLeft - 1))
          return
        }
      }

      window.scrollTo(0, scrollPositions.current.get(key) ?? 0)
      root.style.scrollBehavior = previousScrollBehavior
    }

    frame = window.requestAnimationFrame(() => attemptScroll(60))

    return () => {
      window.cancelAnimationFrame(frame)
      scrollPositions.current.set(key, window.scrollY)
    }
  }, [location])

  return null
}
