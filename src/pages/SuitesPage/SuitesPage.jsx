import { useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { IoBedOutline, IoPeopleOutline } from 'react-icons/io5'
import { LuBath } from 'react-icons/lu'
import BookingWidget from '../../sections/BookingWidget/BookingWidget'
import { getLocalizedSuites, getLowestNightlyRate } from '../../data/suites'
import styles from './SuitesPage.module.css'
import { useLanguage } from '../../i18n/LanguageContext'

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
  const { language, locale, t } = useLanguage()
  const formatter = new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
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
            <span className={styles.priceMeta}>{t('common.from')}</span> {formatter.format(getLowestNightlyRate(suite))}
            <span className={styles.priceNight}>/{t('common.night')}</span>
          </p>
        </div>
        <div className={styles.specs} aria-label={`${suite.name} details`}>
          <span className={styles.spec}>
            <IoBedOutline size={18} />
            {suite.bedrooms} {language === 'es' ? (suite.bedrooms === 1 ? 'cama' : 'camas') : (suite.bedrooms === 1 ? 'bed' : 'beds')}
          </span>
          <span className={styles.spec}>
            <LuBath size={18} />
            {suite.bathrooms} {language === 'es' ? (suite.bathrooms === 1 ? 'baño' : 'baños') : (suite.bathrooms === 1 ? 'bath' : 'baths')}
          </span>
          <span className={styles.spec}>
            <IoPeopleOutline size={18} />
            {t('suites.sleeps', { count: suite.sleeps })}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default function SuitesPage() {
  const { language, t } = useLanguage()
  const localizedSuites = getLocalizedSuites(language)
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [bookingValue, setBookingValue] = useState(() => getBookingValueFromParams(searchParams))
  const [guestFilter, setGuestFilter] = useState(() => {
    const guestCount = Number(searchParams.get('guests'))
    return Number.isFinite(guestCount) && guestCount >= 1 ? guestCount : null
  })
  const [error, setError] = useState('')

  const filteredSuites = useMemo(() => {
    if (!guestFilter) return localizedSuites
    return localizedSuites.filter((suite) => suite.sleeps >= guestFilter)
  }, [guestFilter, localizedSuites])

  const handleSearch = ({ arrival, departure, guests }) => {
    const guestCount = Number(guests)

    if (!arrival) {
      setError(t('booking.selectArrival'))
      return
    }

    if (!departure) {
      setError(t('booking.selectDeparture'))
      return
    }

    if (departure <= arrival) {
      setError(t('booking.checkoutAfterArrival'))
      return
    }

    if (!Number.isFinite(guestCount) || guestCount < 1) {
      setError(t('booking.selectGuest'))
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
          <h1 className={styles.heroTitle}>{t('suites.title')}</h1>
          <p className={styles.heroText}>
            {t('suites.hero')}
          </p>
        </div>
      </section>

      <BookingWidget
        value={bookingValue}
        onChange={setBookingValue}
        onSearch={handleSearch}
      />

      <section className={styles.listings} aria-label={t('suites.listings')}>
        {error && (
          <p className={styles.message} role="alert">
            {error}
          </p>
        )}

        {!error && (
          <div id="available-suites" className={styles.filterBar}>
            <p>
              {guestFilter
                ? t('suites.showingFor', { count: guestFilter, unit: guestFilter === 1 ? t('common.guest').toLowerCase() : t('common.guests').toLowerCase() })
                : t('suites.showingAll')}
            </p>
            {guestFilter && (
              <button type="button" className={styles.clearButton} onClick={clearSearch}>
                {t('suites.clear')}
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
            <h2>{t('suites.noMatch')}</h2>
            <p>{t('suites.smallerGroup')}</p>
            <button type="button" className={styles.emptyButton} onClick={clearSearch}>
              {t('suites.allSuites')}
            </button>
          </div>
        )}
      </section>
    </div>
  )
}
