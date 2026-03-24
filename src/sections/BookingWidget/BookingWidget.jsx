import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import styles from './BookingWidget.module.css'

export default function BookingWidget() {
  const [arrival, setArrival] = useState(null)
  const [departure, setDeparture] = useState(null)
  const [guests, setGuests] = useState('2')

  return (
    <section className={styles.section} id="book">
      <div className={styles.card}>
        <div className={styles.field}>
          <label className={styles.label}>Arrival Date</label>
          <DatePicker
            selected={arrival}
            onChange={setArrival}
            placeholderText="Select date"
            className={styles.input}
            minDate={new Date()}
            dateFormat="MMM d, yyyy"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Departure Date</label>
          <DatePicker
            selected={departure}
            onChange={setDeparture}
            placeholderText="Select date"
            className={styles.input}
            minDate={arrival || new Date()}
            dateFormat="MMM d, yyyy"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Number of Guests</label>
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className={styles.input}
          >
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} {i === 0 ? 'Guest' : 'Guests'}
              </option>
            ))}
          </select>
        </div>

        <button className={styles.btn}>View Suites</button>
      </div>
    </section>
  )
}
