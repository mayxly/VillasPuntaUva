import { useState, useRef, useEffect, useCallback } from 'react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { suites } from '../../data/suites'
import SuiteCard from '../../components/SuiteCard/SuiteCard'
import styles from './SuitesGallery.module.css'

export default function SuitesGallery() {
  const trackRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(4)

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

  const scrollTo = (index) => {
    const clamped = Math.max(0, Math.min(index, maxIndex))
    setActiveIndex(clamped)
  }

  const cardWidthPercent = 100 / visibleCount

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <img
          src="/images/logos/logo-blue.png"
          alt=""
          className={styles.icon}
        />
        <h2 className={styles.heading}>
          Discover<br /><strong>our suites</strong>
        </h2>
        <p className={styles.subheading}>
          We're more than a place to stay. Villas Punta Uva is an invitation to pause, breathe, and
          reconnect. Explore our handcrafted villas designed for calm, where every element tells a story.
        </p>
      </div>

      <div className={styles.carouselWrap}>
        <button
          className={`${styles.arrow} ${styles.arrowLeft}`}
          onClick={() => scrollTo(activeIndex - 1)}
          disabled={activeIndex === 0}
          aria-label="Previous"
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
                  bedrooms={suite.bedrooms}
                  bathrooms={suite.bathrooms}
                  description={suite.description}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          className={`${styles.arrow} ${styles.arrowRight}`}
          onClick={() => scrollTo(activeIndex + 1)}
          disabled={activeIndex >= maxIndex}
          aria-label="Next"
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
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
