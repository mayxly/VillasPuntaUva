import { forwardRef, useMemo, useRef, useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import '../../styles/datepicker-theme.css'
import { es } from 'date-fns/locale'
import { LuX } from 'react-icons/lu'
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

  // excludeDateIntervals only disables individual days from being clicked — it
  // doesn't stop a checkout date from being chosen past a booked stretch, which
  // would silently span a stay straight through occupied nights (e.g. picking
  // check-in before a booking and checkout after it, skipping over the gap).
  // Cap checkout at the day before the nearest booking that starts after arrival.
  const maxDate = arrival
    ? checkoutExcludedRanges.reduce((earliest, range) => {
        const cap = addDays(range.start, -1)
        if (cap <= arrival) return earliest
        return !earliest || cap < earliest ? cap : earliest
      }, null)
    : undefined

  const close = () => {
    setOpen(false)
    pickerRef.current?.setOpen(false)
  }

  const handleChange = ([start, end]) => {
    onChange({ arrival: start, departure: end })
  }

  const clearArrival = (event) => {
    event.stopPropagation()
    onChange({ arrival: null, departure: null })
  }

  const clearDeparture = (event) => {
    event.stopPropagation()
    onChange({ arrival, departure: null })
  }

  const clearBoth = () => {
    onChange({ arrival: null, departure: null })
  }

  // react-datepicker only reads openToDate at mount, so once a check-in date
  // is picked, remount to jump the visible months to the earliest valid
  // checkout date instead of leaving the calendar stuck on check-in's month.
  // Keyed on arrival alone (not departure) so finishing the range — arrival
  // unchanged, departure going from null to a date — doesn't remount again.
  const phaseKey = arrival ? `checkin-${arrival.getTime()}` : 'idle'

  const nights = arrival && departure ? Math.round((departure - arrival) / (1000 * 60 * 60 * 24)) : null
  const activeField = arrival && !departure ? 'checkout' : 'checkin'

  return (
    <DatePicker
      key={phaseKey}
      ref={pickerRef}
      selectsRange
      monthsShown={2}
      startDate={arrival}
      endDate={departure}
      onChange={handleChange}
      minDate={minDate}
      maxDate={maxDate}
      excludeDateIntervals={excludeDateIntervals}
      openToDate={arrival ? minDate : undefined}
      dateFormat="MMM d, yyyy"
      locale={language === 'es' ? 'es' : undefined}
      open={open}
      onInputClick={() => setOpen(true)}
      onClickOutside={close}
      wrapperClassName={className}
      portalId="date-picker-portal"
      popperPlacement="bottom-start"
      popperProps={{ strategy: 'fixed' }}
      customInput={
        <RangeTrigger
          checkInLabel={t('common.checkIn')}
          checkoutLabel={t('common.checkout')}
          checkInText={arrival ? dateFormatter.format(arrival) : ''}
          checkoutText={departure ? dateFormatter.format(departure) : ''}
          placeholder={t('common.selectDate')}
        />
      }
      calendarContainer={({ className: calendarClassName, children }) => (
        <div className={calendarClassName}>
          <div className={styles.popupHeader}>
            <div className={styles.popupSummary}>
              {nights != null && (
                <>
                  <p className={styles.nightsHeading}>
                    {nights} {nights === 1 ? t('common.night') : t('common.nights')}
                  </p>
                  <p className={styles.rangeSubtitle}>
                    {dateFormatter.format(arrival)} – {dateFormatter.format(departure)}
                  </p>
                </>
              )}
            </div>

            <div className={styles.pillRow}>
              <div className={`${styles.popupPill} ${activeField === 'checkin' ? styles.popupPillActive : ''}`}>
                <span className={styles.popupPillLabel}>{t('common.checkIn')}</span>
                <span className={styles.popupPillValue}>{arrival ? dateFormatter.format(arrival) : '—'}</span>
                {arrival && (
                  <button
                    type="button"
                    className={styles.popupPillClear}
                    onClick={clearArrival}
                    aria-label={`${t('suites.clear')} ${t('common.checkIn')}`}
                  >
                    <LuX size={13} />
                  </button>
                )}
              </div>
              <div className={`${styles.popupPill} ${activeField === 'checkout' ? styles.popupPillActive : ''}`}>
                <span className={styles.popupPillLabel}>{t('common.checkout')}</span>
                <span className={styles.popupPillValue}>{departure ? dateFormatter.format(departure) : '—'}</span>
                {departure && (
                  <button
                    type="button"
                    className={styles.popupPillClear}
                    onClick={clearDeparture}
                    aria-label={`${t('suites.clear')} ${t('common.checkout')}`}
                  >
                    <LuX size={13} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {minNights > 1 && (
            <div className={styles.minNightsNote}>{t('booking.minNightsNote', { count: minNights })}</div>
          )}

          {children}

          <div className={styles.popupFooter}>
            <button type="button" className={styles.clearDatesBtn} onClick={clearBoth}>
              {t('booking.clearDates')}
            </button>
            <button type="button" className={styles.closeBtn} onClick={close}>
              {t('common.close')}
            </button>
          </div>
        </div>
      )}
    />
  )
}
