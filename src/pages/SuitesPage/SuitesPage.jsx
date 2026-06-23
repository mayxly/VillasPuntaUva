import { useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { IoBedOutline, IoPeopleOutline } from 'react-icons/io5'
import { LuBath } from 'react-icons/lu'
import BookingWidget from '../../sections/BookingWidget/BookingWidget'
import { getLowestNightlyRate, suites } from '../../data/suites'
import styles from './SuitesPage.module.css'

const initialBookingValue = {
  arrival: null,
  departure: null,
  guests: '2',
}

const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

function parseDateParam(value) {
  if (!value) return null

  const [year, month, day] = value.split('-').map(Number)

  if (!year || !month || !day) return null

  const date = new Date(year, month - 1, day)

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null
  }

  return date
}

function formatDateParam(date) {
  if (!date) return ''

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function getBookingValueFromParams(searchParams) {
  return {
    arrival: parseDateParam(searchParams.get('arrival')),
    departure: parseDateParam(searchParams.get('departure')),
    guests: searchParams.get('guests') || initialBookingValue.guests,
  }
}

function SuiteListingCard({ suite }) {
  return (
    <Link to={`/suites/${suite.slug}`} className={styles.suiteCard}>
      <div className={styles.cardImageWrap}>
        <img
          src={suite.image}
          alt={suite.name}
          className={styles.cardImage}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className={styles.cardBody}>
        <div className={styles.cardHeader}>
          <div>
            <h2 className={styles.cardTitle}>{suite.name}</h2>
            <p className={styles.cardLocation}>{suite.location}, Costa Rica</p>
          </div>
          <p className={styles.price}>
            <span className={styles.priceMeta}>from</span> {priceFormatter.format(getLowestNightlyRate(suite))}
            <span className={styles.priceNight}>/night</span>
          </p>
        </div>
        <div className={styles.specs} aria-label={`${suite.name} details`}>
          <span className={styles.spec}>
            <IoBedOutline size={18} />
            {suite.bedrooms} {suite.bedrooms === 1 ? 'bed' : 'beds'}
          </span>
          <span className={styles.spec}>
            <LuBath size={18} />
            {suite.bathrooms} {suite.bathrooms === 1 ? 'bath' : 'baths'}
          </span>
          <span className={styles.spec}>
            <IoPeopleOutline size={18} />
            Sleeps {suite.sleeps}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default function SuitesPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [bookingValue, setBookingValue] = useState(() => getBookingValueFromParams(searchParams))
  const [guestFilter, setGuestFilter] = useState(() => {
    const guestCount = Number(searchParams.get('guests'))
    return Number.isFinite(guestCount) && guestCount >= 1 ? guestCount : null
  })
  const [error, setError] = useState('')

  const filteredSuites = useMemo(() => {
    if (!guestFilter) return suites
    return suites.filter((suite) => suite.sleeps >= guestFilter)
  }, [guestFilter])

  const handleSearch = ({ arrival, departure, guests }) => {
    const guestCount = Number(guests)

    if (!arrival) {
      setError('Please select an arrival date.')
      return
    }

    if (!departure) {
      setError('Please select a departure date.')
      return
    }

    if (departure <= arrival) {
      setError('Please choose a departure date after your arrival date.')
      return
    }

    if (!Number.isFinite(guestCount) || guestCount < 1) {
      setError('Please select at least one guest.')
      return
    }

    const params = new URLSearchParams({
      arrival: formatDateParam(arrival),
      departure: formatDateParam(departure),
      guests,
    })

    setGuestFilter(guestCount)
    navigate(`/suites?${params.toString()}#available-suites`, { replace: true })
    setError('')
  }

  const clearSearch = () => {
    setBookingValue(initialBookingValue)
    setGuestFilter(null)
    setSearchParams({})
    setError('')
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <img
            src="/images/logos/logo-white.png"
            alt=""
            className={styles.heroIcon}
          />
          <h1 className={styles.heroTitle}>Suites</h1>
          <p className={styles.heroText}>
            Browse private villas shaped for quiet mornings, salt-air afternoons, and effortless Caribbean stays.
          </p>
        </div>
      </section>

      <BookingWidget
        value={bookingValue}
        onChange={setBookingValue}
        onSearch={handleSearch}
      />

      <section className={styles.listings} aria-label="Suite listings">
        {error && (
          <p className={styles.message} role="alert">
            {error}
          </p>
        )}

        {!error && (
          <div id="available-suites" className={styles.filterBar}>
            <p>
              {guestFilter
                ? `Showing available suites for ${guestFilter} ${guestFilter === 1 ? 'guest' : 'guests'}`
                : 'Showing all available suites'}
            </p>
            {guestFilter && (
              <button type="button" className={styles.clearButton} onClick={clearSearch}>
                Clear search
              </button>
            )}
          </div>
        )}

        {filteredSuites.length > 0 ? (
          <div className={styles.grid}>
            {filteredSuites.map((suite) => (
              <SuiteListingCard key={suite.id} suite={suite} />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <h2>No suites match your search</h2>
            <p>Try a smaller group size to see more villas.</p>
            <button type="button" className={styles.emptyButton} onClick={clearSearch}>
              Show all suites
            </button>
          </div>
        )}
      </section>
    </div>
  )
}
