import { useMemo, useState } from 'react'
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
  LuInfo,
  LuMonitor,
  LuCircleParking,
  LuTreePalm,
  LuWaves,
  LuWifi,
  LuWind,
  LuSparkles,
  LuUtensils,
} from 'react-icons/lu'
import {
  calculateSuiteStay,
  getLowestNightlyRate,
  suites,
} from '../../data/suites'
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

function Gallery({ suite }) {
  const featuredImages = [suite.image, ...suite.gallery].slice(0, 5)

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
      </div>

      <div className={styles.photoStrip} aria-label="All suite photos">
        {suite.gallery.map((image, index) => (
          <img
            key={image}
            src={image}
            alt={`${suite.name} gallery photo ${index + 1}`}
            className={styles.stripImage}
            loading="lazy"
            decoding="async"
          />
        ))}
      </div>
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
  if (normalizedLabel.includes('wifi')) return <LuWifi size={18} />
  if (normalizedLabel.includes('air conditioning')) return <LuWind size={18} />
  if (normalizedLabel.includes('parking')) return <LuCircleParking size={18} />
  if (normalizedLabel.includes('tv') || normalizedLabel.includes('netflix')) return <LuMonitor size={18} />
  if (normalizedLabel.includes('patio') || normalizedLabel.includes('rancho') || normalizedLabel.includes('hammock')) {
    return <LuTreePalm size={18} />
  }
  if (normalizedLabel.includes('bbq') || normalizedLabel.includes('kitchen')) return <LuUtensils size={18} />

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
  const { arrival, departure, guests } = bookingValue
  const guestCount = Number(guests)

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

  const handleArrivalChange = (date) => {
    setBookingValue((current) => ({
      ...current,
      arrival: date,
      departure: current.departure && date && current.departure <= date ? null : current.departure,
    }))
  }

  return (
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
            selected={arrival}
            onChange={handleArrivalChange}
            placeholderText="Select date"
            className={styles.input}
            minDate={new Date()}
            dateFormat="MMM d, yyyy"
          />
        </label>

        <label className={styles.field}>
          <span>Checkout</span>
          <DatePicker
            selected={departure}
            onChange={(date) => updateValue({ departure: date })}
            placeholderText="Select date"
            className={styles.input}
            minDate={arrival || new Date()}
            dateFormat="MMM d, yyyy"
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
