import { useState, useCallback, useEffect, useRef } from 'react'
import { FaStar } from 'react-icons/fa'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { GoVerified } from 'react-icons/go'
import { reviews } from '../../data/reviews'
import styles from './Reviews.module.css'
import { useLanguage } from '../../i18n/LanguageContext'

function AirbnbLogo() {
  return (
    <img
      src="/images/logos/airbnb-logo.png"
      alt="Airbnb"
      className={styles.platformLogo}
    />
  )
}

function ReviewCard({ review }) {
  const { language, t } = useLanguage()
  const reviewText = language === 'es' ? review.textEs : review.text
  const [expanded, setExpanded] = useState(false)
  const maxLength = 150
  const isLong = reviewText.length > maxLength
  const displayText = expanded ? reviewText : reviewText.slice(0, maxLength)

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.avatar}>
          <span className={styles.avatarLetter}>{review.name[0]}</span>
        </div>
        <div className={styles.headerInfo}>
          <span className={styles.name}>{review.name}</span>
          <span className={styles.location}>{review.location}</span>
        </div>
        <div className={styles.postedOn}>
          <span className={styles.postedLabel}>{t('home.posted')}</span>
          <AirbnbLogo />
        </div>

      </div>

      <div className={styles.ratingRow}>
        <div className={styles.stars}>
          {Array.from({ length: review.rating }, (_, i) => (
            <FaStar key={i} size={12} />
          ))}
        </div>
        <GoVerified size={14} className={styles.verified} />
        <span className={styles.date}>
          {review.date} · {review.tripType}
        </span>
      </div>

      <p className={styles.text}>
        {displayText}{isLong && !expanded && '...'}
      </p>

      {isLong && (
        <button
          className={styles.showMore}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? t('common.showLess') : t('common.showMore')}
        </button>
      )}
    </div>
  )
}

export default function Reviews() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(3)
  const [isInView, setIsInView] = useState(false)

  const maxIndex = Math.max(0, reviews.length - visibleCount)

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
    }, 4200)

    return () => window.clearInterval(interval)
  }, [isInView, maxIndex])

  const scrollTo = (index) => {
    setActiveIndex(Math.max(0, Math.min(index, maxIndex)))
  }

  const cardWidthPercent = 100 / visibleCount

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <p className={styles.intro}>
          {t('home.reviewsText')}
        </p>

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
              className={styles.track}
              style={{
                transform: `translateX(-${activeIndex * cardWidthPercent}%)`,
              }}
            >
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className={styles.slide}
                  style={{ width: `${cardWidthPercent}%` }}
                >
                  <ReviewCard review={review} />
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
      </div>
    </section>
  )
}
