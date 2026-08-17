import { forwardRef, useMemo, useRef, useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import '../../styles/datepicker-theme.css'
import { es } from 'date-fns/locale'
import { useLanguage } from '../../i18n/LanguageContext'
import styles from './DateRangePicker.module.css'

registerLocale('es', es)

function addDays(date, days) {
  const next = new Date(date)
  next.setDate(next.getDate() + days)
  return next
}

const RangeTrigger = forwardRef(function RangeTrigger(
  { onClick, checkInLabel, checkoutLabel, checkInText, checkoutText, placeholder },
  ref,
) {
  return (
    <div className={styles.trigger} ref={ref} onClick={onClick}>
      <div className={styles.field}>
        <span className={styles.label}>{checkInLabel}</span>
        <span className={checkInText ? styles.value : styles.placeholder}>{checkInText || placeholder}</span>
      </div>
      <span className={styles.divider} />
      <div className={styles.field}>
        <span className={styles.label}>{checkoutLabel}</span>
        <span className={checkoutText ? styles.value : styles.placeholder}>{checkoutText || placeholder}</span>
      </div>
    </div>
  )
})

export default function DateRangePicker({
  arrival,
  departure,
  onChange,
  minNights = 1,
  arrivalExcludedRanges = [],
  checkoutExcludedRanges = [],
  className = '',
}) {
  const { language, locale, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const pickerRef = useRef(null)

  const dateFormatter = useMemo(
    () => new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric', year: 'numeric' }),
    [locale],
  )

  const minDate = arrival ? addDays(arrival, minNights) : new Date()
  const excludeDateIntervals = arrival ? checkoutExcludedRanges : arrivalExcludedRanges

  const close = () => {
    setOpen(false)
    pickerRef.current?.setOpen(false)
  }

  const handleChange = ([start, end]) => {
    onChange({ arrival: start, departure: end })
    if (start && end) close()
  }

  // react-datepicker only reads openToDate at mount, so once a check-in date
  // is picked, remount to jump the visible month to the earliest valid
  // checkout date instead of leaving the calendar stuck on check-in's month.
  const phaseKey = arrival && !departure ? `checkout-${arrival.getTime()}` : 'checkin'

  return (
    <DatePicker
      key={phaseKey}
      ref={pickerRef}
      selectsRange
      startDate={arrival}
      endDate={departure}
      onChange={handleChange}
      minDate={minDate}
      excludeDateIntervals={excludeDateIntervals}
      openToDate={arrival ? minDate : undefined}
      dateFormat="MMM d, yyyy"
      locale={language === 'es' ? 'es' : undefined}
      open={open}
      onInputClick={() => setOpen(true)}
      onClickOutside={close}
      wrapperClassName={className}
      customInput={
        <RangeTrigger
          checkInLabel={t('common.checkIn')}
          checkoutLabel={t('common.checkout')}
          checkInText={arrival ? dateFormatter.format(arrival) : ''}
          checkoutText={departure ? dateFormatter.format(departure) : ''}
          placeholder={t('common.selectDate')}
        />
      }
    >
      {minNights > 1 && (
        <div className={styles.minNightsNote}>{t('booking.minNightsNote', { count: minNights })}</div>
      )}
    </DatePicker>
  )
}
