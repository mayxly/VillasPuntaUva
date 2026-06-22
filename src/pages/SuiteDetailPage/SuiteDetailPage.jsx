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
  suites,
} from '../../data/suites'
import BookingModal from '../../components/BookingModal/BookingModal'
import styles from './SuiteDetailPage.module.css'

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
}

function formatPrice(value) {
  return priceFormatter.format(value)
}

function addDays(date, days) {
  const nextDate = new Date(date)
  nextDate.setDate(nextDate.getDate() + days)
  return nextDate
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
    <section className={styles.gallery} aria-label={`${suite.name} photos`}>
      <div className={styles.galleryGrid}>
        {featuredImages.map((image, index) => (
          <img
            key={image}
            src={image}
            alt={`${suite.name} photo ${index + 1}`}
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
          Show more
        </button>
      </div>

      {galleryOpen && (
        <div
          className={styles.galleryModal}
          role="dialog"
          aria-modal="true"
          aria-label={`${suite.name} photo gallery`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setGalleryOpen(false)
            }
          }}
        >
          <div className={styles.galleryDialog}>
            <div className={styles.galleryDialogHeader}>
              <div>
                <p>Photo gallery</p>
                <h2>{suite.name}</h2>
              </div>
              <button
                type="button"
                className={styles.galleryCloseButton}
                onClick={() => setGalleryOpen(false)}
                aria-label="Close photo gallery"
              >
                <LuX size={18} />
                Close
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
                        alt={`${suite.name} ${section.title} photo ${index + 1}`}
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
  if (!suite.sleepingArrangements?.length) return null

  return (
    <div className={styles.sectionBlock}>
      <h2>Where you&apos;ll sleep</h2>
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
  const [expanded, setExpanded] = useState(false)
  const preview = suite.amenitiesPreview ?? suite.sharedAmenities ?? []
  const amenityGroups = suite.amenities ?? []

  return (
    <div className={styles.sectionBlock}>
      <h2>What this place offers</h2>
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
          {expanded ? 'Show less amenities' : 'Show more amenities'}
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
      <h2>Good to know</h2>
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

function BookingPanel({ suite }) {
  const [bookingValue, setBookingValue] = useState(initialBookingValue)
  const [arrivalOpen, setArrivalOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [checkoutOpenDate, setCheckoutOpenDate] = useState(null)
  const [bookingOpen, setBookingOpen] = useState(false)
  const arrivalPickerRef = useRef(null)
  const checkoutPickerRef = useRef(null)
  const { arrival, departure, guests } = bookingValue
  const guestCount = Number(guests)
  const minCheckoutDate = arrival ? addDays(arrival, 1) : new Date()

  const estimate = useMemo(() => {
    if (!arrival || !departure || departure <= arrival) return null
    return calculateSuiteStay(suite, arrival, departure)
  }, [arrival, departure, suite])

  const error = useMemo(() => {
    if (!arrival && !departure) return ''
    if (arrival && departure && departure <= arrival) {
      return 'Please choose a checkout date after your arrival date.'
    }
    if (!Number.isFinite(guestCount) || guestCount < 1) {
      return 'Please select at least one guest.'
    }
    if (guestCount > suite.sleeps) {
      return `${suite.name} sleeps up to ${suite.sleeps} guests.`
    }
    return ''
  }, [arrival, departure, guestCount, suite])
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
      <aside className={styles.bookingPanel} aria-label="Estimate your stay">
        <div className={styles.bookingHeader}>
          <p>
            <span>from</span>
            {formatPrice(getLowestNightlyRate(suite))}
          </p>
          <span>/night</span>
        </div>

        <div className={styles.bookingFields}>
          <label className={styles.field}>
            <span>Check-in</span>
            <DatePicker
              ref={arrivalPickerRef}
              selected={arrival}
              onChange={handleArrivalChange}
              placeholderText="Select date"
              className={styles.input}
              minDate={new Date()}
              dateFormat="MMM d, yyyy"
              shouldCloseOnSelect
              open={arrivalOpen}
              onInputClick={() => setArrivalOpen(true)}
              onClickOutside={closeArrivalCalendar}
              onSelect={closeArrivalCalendar}
            />
          </label>

          <label className={styles.field}>
            <span>Checkout</span>
            <DatePicker
              ref={checkoutPickerRef}
              selected={departure}
              onChange={(date) => {
                updateValue({ departure: date })
                closeCheckoutCalendar()
              }}
              placeholderText="Select date"
              className={styles.input}
              minDate={minCheckoutDate}
              dateFormat="MMM d, yyyy"
              shouldCloseOnSelect
              openToDate={checkoutOpenDate || arrival || undefined}
              open={checkoutOpen}
              onInputClick={() => setCheckoutOpen(true)}
              onClickOutside={closeCheckoutCalendar}
              onSelect={closeCheckoutCalendar}
            />
          </label>

          <label className={`${styles.field} ${styles.fullField}`}>
            <span>Guests</span>
            <select
              value={guests}
              onChange={(event) => updateValue({ guests: event.target.value })}
              className={styles.input}
            >
              {Array.from({ length: 10 }, (_, index) => index + 1).map((count) => (
                <option key={count} value={count}>
                  {count} {count === 1 ? 'Guest' : 'Guests'}
                </option>
              ))}
            </select>
          </label>
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
                Nightly subtotal for {visibleEstimate.nights.length}{' '}
                {visibleEstimate.nights.length === 1 ? 'night' : 'nights'}
              </span>
              <strong>{formatPrice(visibleEstimate.nightlySubtotal)}</strong>
            </div>
            {visibleEstimate.discount > 0 && (
              <div className={styles.lineItem}>
                <span>Weekly discount</span>
                <strong>-{formatPrice(visibleEstimate.discount)}</strong>
              </div>
            )}
            <div className={styles.lineItem}>
              <span>Cleaning fee</span>
              <strong>{formatPrice(visibleEstimate.cleaningFee)}</strong>
            </div>
            <div className={styles.totalLine}>
              <span>Estimated total</span>
              <strong>{formatPrice(visibleEstimate.total)}</strong>
            </div>

            <button
              type="button"
              className={styles.reserveButton}
              onClick={() => setBookingOpen(true)}
            >
              Reserve
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
          <p className={styles.prompt}>Select your dates to see an estimated stay total.</p>
        )}

        <p className={styles.rateFinePrint}>{suite.rateNote}</p>
      </aside>

      {bookingOpen && <BookingModal onClose={() => setBookingOpen(false)} />}
    </>
  )
}

export default function SuiteDetailPage() {
  const { slug } = useParams()
  const suite = suites.find((item) => item.slug === slug)

  if (!suite) {
    return (
      <div className={styles.notFound}>
        <h1>Suite Not Found</h1>
        <p>The suite you're looking for doesn't exist.</p>
        <Link to="/suites" className={styles.backLink}>Back to Suites</Link>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div>
          <Link to="/suites" className={styles.backText}>All suites</Link>
          <h1>{suite.name}</h1>
          <p className={styles.location}>{suite.location}, Limon, Costa Rica</p>
        </div>
        <p className={styles.heroPrice}>
          <span>from</span>
          {formatPrice(getLowestNightlyRate(suite))}
          <span>/night</span>
        </p>
      </section>

      <Gallery suite={suite} />

      <section className={styles.content}>
        <div className={styles.mainContent}>
          <div className={styles.summary}>
            <div className={styles.facts}>
              <Fact icon={<IoPeopleOutline size={20} />} label={`${suite.sleeps} guests`} />
              <Fact icon={<IoBedOutline size={20} />} label={suite.bedsLabel} />
              <Fact icon={<LuBath size={20} />} label={suite.bathsLabel} />
            </div>
            <p>{suite.description}</p>
          </div>

          <SleepingSection suite={suite} />

          <div className={styles.sectionBlock}>
            <h2>What makes it special</h2>
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
            <h2>2026 rates</h2>
            <div className={styles.rateCards}>
              <div className={styles.rateCard}>
                <LuCalendarDays size={20} />
                <h3>July to March</h3>
                <p>{formatPrice(suite.rates.high.weekday)} Sunday to Thursday</p>
                <p>{formatPrice(suite.rates.high.weekend)} Friday and Saturday</p>
              </div>
              <div className={styles.rateCard}>
                <LuCalendarDays size={20} />
                <h3>April to June</h3>
                <p>{formatPrice(suite.rates.low.weekday)} Sunday to Thursday</p>
                <p>{formatPrice(suite.rates.low.weekend)} Friday and Saturday</p>
              </div>
              <div className={styles.rateCard}>
                <LuCalendarDays size={20} />
                <h3>Fees and discounts</h3>
                <p>{formatPrice(suite.cleaningFee)} cleaning fee</p>
                <p>10% off stays of 7 nights or more</p>
              </div>
            </div>
            <p className={styles.rateNote}>{suite.rateNote}</p>
          </div>
        </div>

        <BookingPanel suite={suite} />
      </section>
    </div>
  )
}
