import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import styles from './BookingWidget.module.css'

const defaultValue = {
  arrival: null,
  departure: null,
  guests: '2',
}

export default function BookingWidget({
  value,
  onChange,
  onSearch,
  buttonLabel = 'View Suites',
}) {
  const [localValue, setLocalValue] = useState(defaultValue)
  const [arrivalOpen, setArrivalOpen] = useState(false)
  const [departureOpen, setDepartureOpen] = useState(false)

  const bookingValue = value ?? localValue
  const { arrival, departure, guests } = bookingValue

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

  const handleArrivalChange = (date) => {
    updateValue({
      arrival: date,
      departure: departure && date && departure <= date ? null : departure,
    })
    setArrivalOpen(false)
  }

  const handleDepartureChange = (date) => {
    updateValue({ departure: date })
    setDepartureOpen(false)
  }

  const handleSearch = () => {
    if (onSearch) {
      onSearch(bookingValue)
    }
  }

  return (
    <section className={styles.section} id="book">
      <div className={styles.card}>
        <div className={styles.field}>
          <label className={styles.label}>Arrival Date</label>
          <DatePicker
            selected={arrival}
            onChange={handleArrivalChange}
            placeholderText="Select date"
            className={styles.input}
            minDate={new Date()}
            dateFormat="MMM d, yyyy"
            open={arrivalOpen}
            onInputClick={() => setArrivalOpen(true)}
            onClickOutside={() => setArrivalOpen(false)}
            onSelect={() => setArrivalOpen(false)}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Departure Date</label>
          <DatePicker
            selected={departure}
            onChange={handleDepartureChange}
            placeholderText="Select date"
            className={styles.input}
            minDate={arrival || new Date()}
            dateFormat="MMM d, yyyy"
            open={departureOpen}
            onInputClick={() => setDepartureOpen(true)}
            onClickOutside={() => setDepartureOpen(false)}
            onSelect={() => setDepartureOpen(false)}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Number of Guests</label>
          <select
            value={guests}
            onChange={(e) => updateValue({ guests: e.target.value })}
            className={styles.input}
          >
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} {i === 0 ? 'Guest' : 'Guests'}
              </option>
            ))}
          </select>
        </div>

        <button className={styles.btn} onClick={handleSearch}>
          {buttonLabel}
        </button>
      </div>
    </section>
  )
}
