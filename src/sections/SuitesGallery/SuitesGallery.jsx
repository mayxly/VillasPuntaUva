import { useState, useRef, useEffect, useCallback } from 'react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { suites } from '../../data/suites'
import SuiteCard from '../../components/SuiteCard/SuiteCard'
import styles from './SuitesGallery.module.css'
import { useLanguage } from '../../i18n/LanguageContext'

export default function SuitesGallery() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(4)
  const [isInView, setIsInView] = useState(false)

  const maxIndex = Math.max(0, suites.length - visibleCount)

  const updateVisibleCount = useCallback(() => {
    const w = window.innerWidth
    if (w >= 1200) setVisibleCount(4)
    else if (w >= 900) setVisibleCount(3)
    else if (w >= 600) setVisibleCount(2)
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
      { threshold: 0.35 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isInView || maxIndex === 0) return undefined

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) return undefined

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current >= maxIndex ? 0 : current + 1))
    }, 3600)

    return () => window.clearInterval(interval)
  }, [isInView, maxIndex])

  const scrollTo = (index) => {
    const clamped = Math.max(0, Math.min(index, maxIndex))
    setActiveIndex(clamped)
  }

  const cardWidthPercent = 100 / visibleCount

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.header}>
        <img
          src="/images/logos/logo-blue.png"
          alt=""
          className={styles.icon}
        />
        <h2 className={styles.heading}>
          {t('home.discover')}
        </h2>
        <p className={styles.subheading}>
          {t('home.discoverText')}
        </p>
      </div>

      <div className={styles.carouselWrap}>
        <button
          className={`${styles.arrow} ${styles.arrowLeft}`}
          onClick={() => scrollTo(activeIndex - 1)}
          disabled={activeIndex === 0}
          aria-label={t('common.previous')}
        >
          <HiChevronLeft size={28} />
        </button>

        <div className={styles.carousel}>
          <div
            ref={trackRef}
            className={styles.track}
            style={{
              transform: `translateX(-${activeIndex * cardWidthPercent}%)`,
            }}
          >
            {suites.map((suite) => (
              <div
                key={suite.id}
                className={styles.slide}
                style={{ width: `${cardWidthPercent}%` }}
              >
                <SuiteCard
                  name={suite.name}
                  location={suite.location}
                  slug={suite.slug}
                  image={suite.image}
                  bedrooms={suite.bedrooms}
                  bathrooms={suite.bathrooms}
                  description={suite.shortDescription}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          className={`${styles.arrow} ${styles.arrowRight}`}
          onClick={() => scrollTo(activeIndex + 1)}
          disabled={activeIndex >= maxIndex}
          aria-label={t('common.next')}
        >
          <HiChevronRight size={28} />
        </button>
      </div>

      <div className={styles.dots}>
        {Array.from({ length: maxIndex + 1 }, (_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`}
            onClick={() => scrollTo(i)}
            aria-label={`${t('common.next')} ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
