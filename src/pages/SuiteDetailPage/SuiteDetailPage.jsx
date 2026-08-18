import { useEffect, useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { IoBedOutline, IoPeopleOutline } from 'react-icons/io5'
import {
  LuBadgePercent,
  LuBath,
  LuCalendarDays,
  LuChevronDown,
  LuChevronUp,
  LuDumbbell,
  LuImage,
  LuImages,
  LuInfo,
  LuMonitor,
  LuCircleParking,
  LuReceipt,
  LuShieldCheck,
  LuTreePalm,
  LuWaves,
  LuWifi,
  LuWind,
  LuSparkles,
  LuUtensils,
  LuX,
} from 'react-icons/lu'
import {
  calculateSuiteStay,
  getLowestNightlyRate,
  getLocalizedSuite,
  isSuiteAvailable,
  suites,
  EXTRA_GUEST_NIGHTLY_FEE,
  PET_NIGHTLY_FEE,
} from '../../data/suites'
import airbnbAvailability from '../../data/airbnbAvailability.json'
import BookingModal from '../../components/BookingModal/BookingModal'
import GuestPicker from '../../components/GuestPicker/GuestPicker'
import DateRangePicker from '../../components/DateRangePicker/DateRangePicker'
import styles from './SuiteDetailPage.module.css'
import { useLanguage } from '../../i18n/LanguageContext'

const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
})

function parseDateParam(value) {
  if (!value) return null

  const [year, month, day] = value.split('-').map(Number)
  if (!year || !month || !day) return null

  const date = new Date(year, month - 1, day)
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return null
  }

  return date
}

function getBookingValueFromParams(searchParams) {
  return {
    arrival: parseDateParam(searchParams.get('arrival')),
    departure: parseDateParam(searchParams.get('departure')),
    guests: searchParams.get('guests') || '1',
    kidsUnder5: Number(searchParams.get('kidsUnder5')) || 0,
    pets: Number(searchParams.get('pets')) || 0,
  }
}

function formatPrice(value) {
  return priceFormatter.format(value)
}

function addDays(date, days) {
  const nextDate = new Date(date)
  nextDate.setDate(nextDate.getDate() + days)
  return nextDate
}

function parseIsoDate(value) {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day)
}

function getBlockedRanges(slug) {
  const ranges = airbnbAvailability[slug] ?? []
  // Airbnb's DTEND is the checkout day, which is bookable again as a new arrival,
  // so the excluded range only covers through the night before checkout.
  return ranges.map((range) => ({
    start: parseIsoDate(range.start),
    end: addDays(parseIsoDate(range.end), -1),
  }))
}

// A gap shorter than minNights right before a reservation can't fit a stay,
// so treat those lead-in days as unavailable too (e.g. a single free night
// squeezed between two bookings on a suite with a 2-night minimum).
function getInsufficientRunwayRanges(occupiedRanges, minNights) {
  if (minNights <= 1) return []

  return occupiedRanges.map((range) => ({
    start: addDays(range.start, -(minNights - 1)),
    end: addDays(range.start, -1),
  }))
}

// A checkout date isn't itself an occupied night — the guest leaves that
// morning, so the next reservation can start the same day (same-day
// turnover). What actually makes a checkout date invalid is the night
// before it being occupied, so shift each occupied range forward a day.
function getCheckoutExcludedRanges(occupiedRanges) {
  return occupiedRanges.map((range) => ({
    start: addDays(range.start, 1),
    end: addDays(range.end, 1),
  }))
}

function uniqueImages(images) {
  return images.filter((image, index) => images.indexOf(image) === index)
}

function getSuitePhotoSections(suite) {
  return (suite.photoSections ?? [])
    .map((section) => ({
      ...section,
      images: uniqueImages((section.images ?? []).filter(Boolean)),
    }))
    .filter((section) => section.title && section.images.length > 0)
}

function Gallery({ suite }) {
  const { t } = useLanguage()
  const [galleryOpen, setGalleryOpen] = useState(false)
  const featuredImages = uniqueImages(
    (suite.featuredGallery?.length ? suite.featuredGallery : [suite.image, ...(suite.gallery ?? [])]).filter(Boolean)
  ).slice(0, 5)
  const photoSections = useMemo(() => getSuitePhotoSections(suite), [suite])

  useEffect(() => {
    if (!galleryOpen) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setGalleryOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [galleryOpen])

  return (
    <section className={styles.gallery} aria-label={`${suite.name} ${t('suites.photos')}`}>
      <div className={styles.galleryGrid}>
        {featuredImages.map((image, index) => (
          <img
            key={image}
            src={image}
            alt={`${suite.name} ${t('suites.photos')} ${index + 1}`}
            className={index === 0 ? styles.galleryHero : styles.galleryImage}
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
          />
        ))}

        <button
          type="button"
          className={styles.showPhotosButton}
          onClick={() => setGalleryOpen(true)}
          aria-haspopup="dialog"
        >
          <LuImages size={18} />
          {t('suites.morePhotos')}
        </button>
      </div>

      {galleryOpen && (
        <div
          className={styles.galleryModal}
          role="dialog"
          aria-modal="true"
          aria-label={`${suite.name} ${t('suites.photoGallery').toLowerCase()}`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setGalleryOpen(false)
            }
          }}
        >
          <div className={styles.galleryDialog}>
            <div className={styles.galleryDialogHeader}>
              <div>
                <p>{t('suites.photoGallery')}</p>
                <h2>{suite.name}</h2>
              </div>
              <button
                type="button"
                className={styles.galleryCloseButton}
                onClick={() => setGalleryOpen(false)}
                aria-label={t('suites.closeGallery')}
              >
                <LuX size={18} />
                {t('common.close')}
              </button>
            </div>

            <div className={styles.galleryDialogBody}>
              {photoSections.map((section) => (
                <section key={section.title} className={styles.photoSection}>
                  <h3>{section.title}</h3>
                  <div className={styles.photoSectionGrid}>
                    {section.images.map((image, index) => (
                      <img
                        key={image}
                        src={image}
                        alt={`${suite.name} ${section.title} ${t('suites.photos')} ${index + 1}`}
                        loading="lazy"
                        decoding="async"
                      />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

function Fact({ icon, label }) {
  return (
    <span className={styles.fact}>
      {icon}
      {label}
    </span>
  )
}

function SleepingSection({ suite }) {
  const { t } = useLanguage()
  if (!suite.sleepingArrangements?.length) return null

  return (
    <div className={styles.sectionBlock}>
      <h2>{t('suites.sleep')}</h2>
      <div className={styles.sleepGrid}>
        {suite.sleepingArrangements.map((room) => (
          <article key={`${room.label}-${room.bed}`} className={styles.sleepCard}>
            {room.image ? (
              <img
                src={room.image}
                alt={`${suite.name} ${room.label}`}
                className={styles.sleepImage}
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div className={styles.sleepPlaceholder} aria-label={`${room.label} photo placeholder`} role="img">
                <LuImage size={28} />
              </div>
            )}
            <div className={styles.sleepBody}>
              <h3>{room.label}</h3>
              <p>{room.bed}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

function AmenitiesSection({ suite }) {
  const { t } = useLanguage()
  const [expanded, setExpanded] = useState(false)
  const preview = suite.amenitiesPreview ?? suite.sharedAmenities ?? []
  const amenityGroups = suite.amenities ?? []

  return (
    <div className={styles.sectionBlock}>
      <h2>{t('suites.offers')}</h2>
      <div className={styles.amenityGrid}>
        {preview.map((amenity) => (
          <div key={amenity} className={styles.amenity}>
            <AmenityIcon label={amenity} />
            <span>{amenity}</span>
          </div>
        ))}
      </div>

      {expanded && (
        <div className={styles.amenityGroups}>
          {amenityGroups.map((group) => (
            <section key={group.title} className={styles.amenityGroup}>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}

      {amenityGroups.length > 0 && (
        <button
          type="button"
          className={styles.showMoreButton}
          onClick={() => setExpanded((current) => !current)}
        >
          {expanded ? t('suites.lessAmenities') : t('suites.moreAmenities')}
          {expanded ? <LuChevronUp size={18} /> : <LuChevronDown size={18} />}
        </button>
      )}
    </div>
  )
}

function AmenityIcon({ label }) {
  const normalizedLabel = label.toLowerCase()

  if (normalizedLabel.includes('beach')) return <LuTreePalm size={18} />
  if (normalizedLabel.includes('pool')) return <LuWaves size={18} />
  if (normalizedLabel.includes('gym')) return <LuDumbbell size={18} />
  if (normalizedLabel.includes('wifi') || normalizedLabel.includes('wi-fi')) return <LuWifi size={18} />
  if (normalizedLabel.includes('air conditioning')) return <LuWind size={18} />
  if (normalizedLabel.includes('parking')) return <LuCircleParking size={18} />
  if (normalizedLabel.includes('tv') || normalizedLabel.includes('netflix')) return <LuMonitor size={18} />
  if (normalizedLabel.includes('patio') || normalizedLabel.includes('rancho') || normalizedLabel.includes('hammock')) {
    return <LuTreePalm size={18} />
  }
  if (normalizedLabel.includes('bbq') || normalizedLabel.includes('barbecue') || normalizedLabel.includes('kitchen')) {
    return <LuUtensils size={18} />
  }

  return <LuSparkles size={18} />
}

const houseRulesEn = [
  'Check-in after 3:00 PM',
  'Checkout before 11:00 AM',
  'No parties or events',
  'Quiet hours: 11:00 PM – 7:00 AM',
]

const houseRulesEs = [
  'Llegada después de las 3:00 PM',
  'Salida antes de las 11:00 AM',
  'No se permiten fiestas ni eventos',
  'Horario de silencio: 11:00 PM – 7:00 AM',
]

// getLocalizedSuite() translates note group titles into Spanish, so matching
// must accept both the English source title and its Spanish translation.
const isGuestAccessTitle = (title) => title === 'Guest access' || title === 'Acceso de huéspedes'
const isOtherNotesTitle = (title) => title === 'Other things to note' || title === 'Otros aspectos a tener en cuenta'
const isNotIncludedTitle = (title) => title === 'Not included' || title === 'No incluido'

function NotesSection({ suite }) {
  const { t, language } = useLanguage()
  const houseRules = language === 'es' ? houseRulesEs : houseRulesEn

  const guestAccessItems = (suite.notes ?? [])
    .filter((group) => isGuestAccessTitle(group.title))
    .flatMap((group) => group.items)
  const displayNotes = (suite.notes ?? [])
    .filter((group) => isOtherNotesTitle(group.title) || isNotIncludedTitle(group.title))
    .map((group) => {
      if (!isOtherNotesTitle(group.title)) return group

      return {
        ...group,
        items: [...guestAccessItems, ...group.items],
      }
    })

  return (
    <div className={styles.sectionBlock}>
      <h2>{t('suites.goodToKnow')}</h2>
      <div className={styles.notesGrid}>
        {displayNotes.map((group) => (
          <article key={group.title} className={styles.noteCard}>
            <div className={styles.noteHeader}>
              <LuInfo size={18} />
              <h3>{group.title}</h3>
            </div>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
        <article className={styles.noteCard}>
          <div className={styles.noteHeader}>
            <LuInfo size={18} />
            <h3>{t('suites.houseRules')}</h3>
          </div>
          <ul>
            {houseRules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </article>
      </div>
    </div>
  )
}

function AirbnbSection({ suite }) {
  const { t } = useLanguage()
  if (!suite.airbnbUrl) return null

  return (
    <div className={`${styles.sectionBlock} ${styles.airbnbBlock}`}>
      <p className={styles.airbnbEyebrow}>{t('suites.alsoSeen')}</p>
      <a
        href={suite.airbnbUrl}
        className={styles.airbnbButton}
        target="_blank"
        rel="noreferrer"
        aria-label={`View ${suite.name} on Airbnb`}
      >
        <img src="/images/logos/airbnb-logo.png" alt="" />
        <span>Airbnb</span>
      </a>
      <p className={styles.airbnbNote}>
        {t('suites.directBook')}
      </p>
    </div>
  )
}

function BookingPanel({ suite }) {
  const { locale, t } = useLanguage()
  const priceFormatter = new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
  const dateFormatter = new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric' })
  const [searchParams] = useSearchParams()
  const [bookingValue, setBookingValue] = useState(() => getBookingValueFromParams(searchParams))
  const [bookingOpen, setBookingOpen] = useState(false)
  const { arrival, departure, guests, kidsUnder5, pets } = bookingValue
  const guestCount = Number(guests)
  const petCount = Number(pets) || 0
  const hasSearchValue = Boolean(arrival || departure || guestCount !== 2 || kidsUnder5 || pets)
  const minNights = suite.minNights ?? 1
  const blockedRanges = useMemo(() => getBlockedRanges(suite.slug), [suite.slug])
  const arrivalExcludedRanges = useMemo(
    () => [...blockedRanges, ...getInsufficientRunwayRanges(blockedRanges, minNights)],
    [blockedRanges, minNights],
  )
  const checkoutExcludedRanges = useMemo(() => getCheckoutExcludedRanges(blockedRanges), [blockedRanges])

  const estimate = useMemo(() => {
    if (!arrival || !departure || departure <= arrival) return null
    return calculateSuiteStay(suite, arrival, departure, guestCount, petCount)
  }, [arrival, departure, suite, guestCount, petCount])

  const error = useMemo(() => {
    if (!arrival && !departure) return ''
    if (arrival && departure && departure <= arrival) {
      return t('booking.checkoutAfterArrival')
    }
    if (arrival && departure) {
      const nights = Math.round((departure - arrival) / (1000 * 60 * 60 * 24))
      if (nights < minNights) {
        return t('booking.minNightsError', { count: minNights })
      }
      if (!isSuiteAvailable(suite.slug, arrival, departure)) {
        return t('booking.datesNotAvailable')
      }
    }
    if (!Number.isFinite(guestCount) || guestCount < 1) {
      return t('booking.selectGuest')
    }
    if (guestCount > (suite.maxGuests ?? suite.sleeps)) {
      return `${suite.name}: ${t('suites.sleeps', { count: suite.maxGuests ?? suite.sleeps })}.`
    }
    return ''
  }, [arrival, departure, guestCount, suite, minNights])
  const visibleEstimate = error ? null : estimate

  const updateValue = (updates) => {
    setBookingValue((current) => ({
      ...current,
      ...updates,
    }))
  }

  const handleClear = () => {
    setBookingValue({ arrival: null, departure: null, guests: '1', kidsUnder5: 0, pets: 0 })
  }

  return (
    <>
      <aside className={styles.bookingPanel} aria-label={t('booking.estimate')}>
        <div className={styles.bookingHeader}>
          <p>
            <span>{t('common.from')}</span>
            {priceFormatter.format(getLowestNightlyRate(suite))}
          </p>
          <span>/{t('common.night')}</span>
        </div>

        {hasSearchValue && (
          <div className={styles.clearRow}>
            <button type="button" className={styles.clearBtn} onClick={handleClear}>
              <LuX size={14} />
              {t('suites.clear')}
            </button>
          </div>
        )}

        <div className={styles.bookingFields}>
          <div className={`${styles.field} ${styles.fullField}`}>
            <DateRangePicker
              arrival={arrival}
              departure={departure}
              onChange={updateValue}
              minNights={minNights}
              arrivalExcludedRanges={arrivalExcludedRanges}
              checkoutExcludedRanges={checkoutExcludedRanges}
            />
          </div>

          <div className={`${styles.field} ${styles.fullField}`}>
            <span>{t('common.guests')}</span>
            <GuestPicker value={bookingValue} onChange={updateValue} maxGuests={suite.maxGuests ?? 12} />
          </div>
        </div>

        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}

        {visibleEstimate ? (
          <div className={styles.estimate}>
            <div className={styles.lineItem}>
              <span>
                {t('booking.nightlySubtotal', { count: visibleEstimate.nights.length, unit: visibleEstimate.nights.length === 1 ? t('common.night') : t('common.nights') })}
              </span>
              <strong>{formatPrice(visibleEstimate.nightlySubtotal)}</strong>
            </div>
            {visibleEstimate.monthlyDiscount > 0 && (
              <div className={styles.lineItem}>
                <span>{t('booking.monthlyDiscount')}</span>
                <strong>-{formatPrice(visibleEstimate.monthlyDiscount)}</strong>
              </div>
            )}
            {visibleEstimate.weeklyDiscount > 0 && (
              <div className={styles.lineItem}>
                <span>{t('booking.weeklyDiscount')}</span>
                <strong>-{formatPrice(visibleEstimate.weeklyDiscount)}</strong>
              </div>
            )}
            {visibleEstimate.lastMinuteDiscount > 0 && (
              <div className={styles.lineItem}>
                <span>{t('booking.lastMinuteDiscount')}</span>
                <strong>-{formatPrice(visibleEstimate.lastMinuteDiscount)}</strong>
              </div>
            )}
            {visibleEstimate.extraGuestFee > 0 && (
              <div className={styles.lineItem}>
                <span>{t('booking.extraGuestFee', { count: visibleEstimate.extraGuests })}</span>
                <strong>{formatPrice(visibleEstimate.extraGuestFee)}</strong>
              </div>
            )}
            {visibleEstimate.petFee > 0 && (
              <div className={styles.lineItem}>
                <span>{t('booking.petFee', { count: visibleEstimate.petCount })}</span>
                <strong>{formatPrice(visibleEstimate.petFee)}</strong>
              </div>
            )}
            <div className={styles.lineItem}>
                <span>{t('booking.cleaningFee')}</span>
              <strong>{formatPrice(visibleEstimate.cleaningFee)}</strong>
            </div>
            <div className={styles.totalLine}>
              <span>{t('booking.estimatedTotal')}</span>
              <strong>{formatPrice(visibleEstimate.total)}</strong>
            </div>

            <button
              type="button"
              className={styles.reserveButton}
              onClick={() => setBookingOpen(true)}
            >
              {t('common.reserve')}
            </button>

            <div className={styles.nightlyList}>
              {visibleEstimate.nightlyRates.map((night) => (
                <div key={night.date.toISOString()}>
                  <span>{dateFormatter.format(night.date)}</span>
                  <span>{formatPrice(night.rate)}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className={styles.prompt}>{t('booking.selectDates')}</p>
        )}
      </aside>

      {bookingOpen && <BookingModal onClose={() => setBookingOpen(false)} />}
    </>
  )
}

export default function SuiteDetailPage() {
  const { slug } = useParams()
  const { language, locale, t } = useLanguage()
  const suite = getLocalizedSuite(suites.find((item) => item.slug === slug), language)

  if (!suite) {
    return (
      <div className={styles.notFound}>
        <h1>{t('suites.notFound')}</h1>
        <p>{t('suites.missing')}</p>
        <Link to="/suites" className={styles.backLink}>{t('suites.back')}</Link>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div>
          <Link to="/suites" className={styles.backText}>{t('suites.all')}</Link>
          <h1>{suite.name}</h1>
          <p className={styles.location}>{suite.location}, Costa Rica</p>
        </div>
        <p className={styles.heroPrice}>
          <span>{t('common.from')}</span>
          {new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(getLowestNightlyRate(suite))}
          <span>/{t('common.night')}</span>
        </p>
      </section>

      <Gallery suite={suite} />

      <section className={styles.content}>
        <div className={styles.mainContent}>
          <div className={styles.summary}>
            <div className={styles.facts}>
              <Fact icon={<IoPeopleOutline size={20} />} label={`${suite.sleeps} ${t('suites.guests')}`} />
              <Fact icon={<IoBedOutline size={20} />} label={suite.bedsLabel} />
              <Fact icon={<LuBath size={20} />} label={suite.bathsLabel} />
            </div>
            <p>{suite.description}</p>
          </div>

          <SleepingSection suite={suite} />

          <div className={styles.sectionBlock}>
            <h2>{t('suites.special')}</h2>
            <div className={styles.featureGrid}>
              {suite.features.map((feature) => (
                <div key={feature} className={styles.feature}>
                  <LuSparkles size={18} />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <AmenitiesSection suite={suite} />

          <NotesSection suite={suite} />

          <div className={styles.sectionBlock}>
            <h2>{t('suites.rates')}</h2>
            <div className={styles.rateCards}>
              <div className={styles.rateCard}>
                <LuCalendarDays size={20} />
                <h3>{t('suites.rateHigh')}</h3>
                <p>{new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(suite.rates.high.weekday)} {t('suites.weekdays')}</p>
                <p>{new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(suite.rates.high.weekend)} {t('suites.weekends')}</p>
              </div>
              <div className={styles.rateCard}>
                <LuCalendarDays size={20} />
                <h3>{t('suites.rateLow')}</h3>
                <p>{new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(suite.rates.low.weekday)} {t('suites.weekdays')}</p>
                <p>{new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(suite.rates.low.weekend)} {t('suites.weekends')}</p>
              </div>
            </div>

            <div className={styles.feesGrid}>
              <div className={styles.feesColumn}>
                <h3><LuReceipt size={18} />{t('suites.feesLabel')}</h3>
                <ul className={styles.feesList}>
                  <li>
                    <span>{t('booking.cleaningFee')}</span>
                    <strong>{new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(suite.cleaningFee)}</strong>
                  </li>
                  {(suite.maxGuests ?? suite.sleeps) > suite.sleeps && (
                    <li>
                      <span>{t('suites.extraGuestFeeLabel')}</span>
                      <strong>${EXTRA_GUEST_NIGHTLY_FEE}/{t('common.night')}</strong>
                    </li>
                  )}
                  <li>
                    <span>{t('suites.petFeeLabel')}</span>
                    <strong>${PET_NIGHTLY_FEE}/{t('common.night')}</strong>
                  </li>
                </ul>
              </div>

              <div className={styles.feesColumn}>
                <h3><LuBadgePercent size={18} />{t('suites.discountsLabel')}</h3>
                <ul className={styles.feesList}>
                  <li>
                    <span>{t('suites.weeklyDiscountNote')}</span>
                    <strong>10%</strong>
                  </li>
                  <li>
                    <span>{t('suites.monthlyDiscountNote')}</span>
                    <strong>35%</strong>
                  </li>
                  <li>
                    <span>{t('suites.lastMinuteDiscountNote')}</span>
                    <strong>10%</strong>
                  </li>
                </ul>
              </div>
            </div>

            <div className={styles.policyCard}>
              <h3><LuShieldCheck size={18} />{t('suites.cancellationPolicyLabel')}</h3>
              <p>{t('suites.cancellationPolicyText')}</p>
            </div>

            <p className={styles.rateNote}>{t('suites.holidayPricingNote')}</p>
          </div>

          <AirbnbSection suite={suite} />
        </div>

        <BookingPanel suite={suite} />
      </section>
    </div>
  )
}
