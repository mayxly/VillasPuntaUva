import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { IoBedOutline, IoPeopleOutline } from 'react-icons/io5'
import {
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
  suites,
  EXTRA_GUEST_NIGHTLY_FEE,
} from '../../data/suites'
import airbnbAvailability from '../../data/airbnbAvailability.json'
import BookingModal from '../../components/BookingModal/BookingModal'
import GuestPicker from '../../components/GuestPicker/GuestPicker'
import styles from './SuiteDetailPage.module.css'
import { useLanguage } from '../../i18n/LanguageContext'
import { es } from 'date-fns/locale'
import { registerLocale } from 'react-datepicker'

registerLocale('es', es)

const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
})

const initialBookingValue = {
  arrival: null,
  departure: null,
  guests: '2',
  kidsUnder5: 0,
  pets: 0,
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

function NotesSection({ suite }) {
  const { t } = useLanguage()
  if (!suite.notes?.length) return null

  const guestAccessItems = suite.notes
    .filter((group) => group.title === 'Guest access')
    .flatMap((group) => group.items)
  const displayNotes = suite.notes
    .filter((group) => group.title === 'Other things to note' || group.title === 'Not included')
    .map((group) => {
      if (group.title !== 'Other things to note') return group

      return {
        ...group,
        items: [...guestAccessItems, ...group.items],
      }
    })

  if (!displayNotes.length) return null

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
  const { language, locale, t } = useLanguage()
  const priceFormatter = new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
  const dateFormatter = new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric' })
  const [bookingValue, setBookingValue] = useState(initialBookingValue)
  const [arrivalOpen, setArrivalOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [checkoutOpenDate, setCheckoutOpenDate] = useState(null)
  const [bookingOpen, setBookingOpen] = useState(false)
  const arrivalPickerRef = useRef(null)
  const checkoutPickerRef = useRef(null)
  const { arrival, departure, guests, pets } = bookingValue
  const guestCount = Number(guests)
  const petCount = Number(pets) || 0
  const minNights = suite.minNights ?? 1
  const minCheckoutDate = arrival ? addDays(arrival, minNights) : new Date()
  const blockedRanges = useMemo(() => getBlockedRanges(suite.slug), [suite.slug])

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

  const closeArrivalCalendar = () => {
    setArrivalOpen(false)
    arrivalPickerRef.current?.setOpen(false)
  }

  const closeCheckoutCalendar = () => {
    setCheckoutOpen(false)
    checkoutPickerRef.current?.setOpen(false)
  }

  const handleArrivalChange = (date) => {
    setBookingValue((current) => ({
      ...current,
      arrival: date,
      departure: null,
    }))
    closeArrivalCalendar()
    setCheckoutOpenDate(date)

    if (date) {
      window.setTimeout(() => setCheckoutOpen(true), 0)
    }
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

        <div className={styles.bookingFields}>
          <label className={styles.field}>
            <span>{t('common.checkIn')}</span>
            <DatePicker
              ref={arrivalPickerRef}
              selected={arrival}
              onChange={handleArrivalChange}
              placeholderText={t('common.selectDate')}
              className={styles.input}
              minDate={new Date()}
              excludeDateIntervals={blockedRanges}
              dateFormat="MMM d, yyyy"
              locale={language === 'es' ? 'es' : undefined}
              shouldCloseOnSelect
              open={arrivalOpen}
              onInputClick={() => setArrivalOpen(true)}
              onClickOutside={closeArrivalCalendar}
              onSelect={closeArrivalCalendar}
            >
              {minNights > 1 && (
                <div className={styles.minNightsNote}>{t('booking.minNightsNote', { count: minNights })}</div>
              )}
            </DatePicker>
          </label>

          <label className={styles.field}>
            <span>{t('common.checkout')}</span>
            <DatePicker
              ref={checkoutPickerRef}
              selected={departure}
              onChange={(date) => {
                updateValue({ departure: date })
                closeCheckoutCalendar()
              }}
              placeholderText={t('common.selectDate')}
              className={styles.input}
              minDate={minCheckoutDate}
              excludeDateIntervals={blockedRanges}
              dateFormat="MMM d, yyyy"
              locale={language === 'es' ? 'es' : undefined}
              shouldCloseOnSelect
              openToDate={checkoutOpenDate || arrival || undefined}
              open={checkoutOpen}
              onInputClick={() => setCheckoutOpen(true)}
              onClickOutside={closeCheckoutCalendar}
              onSelect={closeCheckoutCalendar}
            >
              {minNights > 1 && (
                <div className={styles.minNightsNote}>{t('booking.minNightsNote', { count: minNights })}</div>
              )}
            </DatePicker>
            {minNights > 1 && (
              <span className={styles.minNightsHint}>{t('booking.minNightsNote', { count: minNights })}</span>
            )}
          </label>

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
              <div className={styles.rateCard}>
                <LuCalendarDays size={20} />
                <h3>{t('suites.fees')}</h3>
                <p>{new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(suite.cleaningFee)} {t('booking.cleaningFee').toLowerCase()}</p>
                {(suite.maxGuests ?? suite.sleeps) > suite.sleeps && (
                  <p>{t('suites.extraGuestFeeNote', { amount: `$${EXTRA_GUEST_NIGHTLY_FEE}` })}</p>
                )}
                <p>{t('suites.discount')}</p>
              </div>
            </div>
          </div>

          <AirbnbSection suite={suite} />
        </div>

        <BookingPanel suite={suite} />
      </section>
    </div>
  )
}
