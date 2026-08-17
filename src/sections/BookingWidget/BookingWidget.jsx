import { useState } from 'react'
import { LuX } from 'react-icons/lu'
import styles from './BookingWidget.module.css'
import { useLanguage } from '../../i18n/LanguageContext'
import GuestPicker from '../../components/GuestPicker/GuestPicker'
import DateRangePicker from '../../components/DateRangePicker/DateRangePicker'

const defaultValue = {
  arrival: null,
  departure: null,
  guests: '1',
  kidsUnder5: 0,
  pets: 0,
}

export default function BookingWidget({
  value,
  onChange,
  onSearch,
  buttonLabel = 'View Suites',
}) {
  const { t } = useLanguage()
  const [localValue, setLocalValue] = useState(defaultValue)

  const bookingValue = value ?? localValue
  const { arrival, departure, guests, kidsUnder5, pets } = bookingValue
  const hasSearchValue = Boolean(arrival || departure || Number(guests) !== 2 || kidsUnder5 || pets)

  const updateValue = (updates) => {
    const nextValue = {
      ...bookingValue,
      ...updates,
    }

    if (onChange) {
      onChange(nextValue)
    } else {
      setLocalValue(nextValue)
    }
  }

  const handleSearch = () => {
    if (onSearch) {
      onSearch(bookingValue)
    }
  }

  const handleClear = () => {
    updateValue(defaultValue)
  }

  return (
    <section className={styles.section} id="book">
      <div className={styles.card}>
        {hasSearchValue && (
          <div className={styles.clearRow}>
            <button type="button" className={styles.clearBtn} onClick={handleClear}>
              <LuX size={14} />
              {t('suites.clear')}
            </button>
          </div>
        )}

        <div className={styles.fieldsRow}>
          <div className={styles.dateField}>
            <DateRangePicker arrival={arrival} departure={departure} onChange={updateValue} />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>{t('common.guests')}</label>
            <GuestPicker value={bookingValue} onChange={updateValue} maxGuests={12} />
          </div>

          <button className={styles.btn} onClick={handleSearch}>
            {buttonLabel === 'View Suites' ? t('common.viewSuites') : buttonLabel}
          </button>
        </div>
      </div>
    </section>
  )
}
