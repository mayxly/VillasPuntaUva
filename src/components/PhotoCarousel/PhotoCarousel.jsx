import { useState, useEffect, useRef, useCallback } from 'react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import styles from './PhotoCarousel.module.css'
import { useLanguage } from '../../i18n/LanguageContext'

export default function PhotoCarousel({ photos, intervalMs = 2000 }) {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const carouselRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(3)
  const [isInView, setIsInView] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [dragDeltaPercent, setDragDeltaPercent] = useState(0)
  const dragState = useRef(null)

  const maxIndex = Math.max(0, photos.length - visibleCount)
  const cardWidthPercent = 100 / visibleCount

  const updateVisibleCount = useCallback(() => {
    const w = window.innerWidth
    if (w >= 1024) setVisibleCount(3)
    else if (w >= 640) setVisibleCount(2)
    else setVisibleCount(1)
  }, [])

  useEffect(() => {
    updateVisibleCount()
    window.addEventListener('resize', updateVisibleCount)
    return () => window.removeEventListener('resize', updateVisibleCount)
  }, [updateVisibleCount])

  useEffect(() => {
    if (activeIndex > maxIndex) setActiveIndex(maxIndex)
  }, [maxIndex, activeIndex])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.3 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isInView || isPaused || maxIndex === 0) return undefined

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) return undefined

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current >= maxIndex ? 0 : current + 1))
    }, intervalMs)

    return () => window.clearInterval(interval)
  }, [isInView, isPaused, maxIndex, intervalMs])

  const scrollTo = (index) => {
    if (index < 0) setActiveIndex(maxIndex)
    else if (index > maxIndex) setActiveIndex(0)
    else setActiveIndex(index)
  }

  const handlePointerDown = useCallback((e) => {
    dragState.current = { startX: e.clientX, active: true }
    setIsPaused(true)
  }, [])

  const handlePointerMove = useCallback((e) => {
    if (!dragState.current?.active || !carouselRef.current) return
    const width = carouselRef.current.offsetWidth || 1
    const deltaPx = e.clientX - dragState.current.startX
    setDragDeltaPercent((deltaPx / width) * 100)
  }, [])

  const endDrag = useCallback(() => {
    if (!dragState.current?.active) return
    const thresholdPercent = 8

    if (dragDeltaPercent > thresholdPercent) scrollTo(activeIndex - 1)
    else if (dragDeltaPercent < -thresholdPercent) scrollTo(activeIndex + 1)

    dragState.current = null
    setDragDeltaPercent(0)
    setIsPaused(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dragDeltaPercent, activeIndex, maxIndex])

  return (
    <div ref={sectionRef} className={styles.carouselWrap}>
      <button
        type="button"
        className={`${styles.arrow} ${styles.arrowLeft}`}
        onClick={() => scrollTo(activeIndex - 1)}
        aria-label={t('common.previous')}
      >
        <HiChevronLeft size={26} />
      </button>

      <div
        ref={carouselRef}
        className={styles.carousel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
      >
        <div
          className={styles.track}
          style={{
            transform: `translateX(calc(-${activeIndex * cardWidthPercent}% + ${dragDeltaPercent}%))`,
            transition: dragState.current?.active ? 'none' : undefined,
          }}
        >
          {photos.map((photo) => (
            <div
              key={photo.id}
              className={styles.slide}
              style={{ width: `${cardWidthPercent}%` }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className={styles.image}
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        className={`${styles.arrow} ${styles.arrowRight}`}
        onClick={() => scrollTo(activeIndex + 1)}
        aria-label={t('common.next')}
      >
        <HiChevronRight size={26} />
      </button>
    </div>
  )
}
