import { useEffect, useRef, useState } from 'react'
import { LuChevronDown, LuMinus, LuPlus } from 'react-icons/lu'
import styles from './GuestPicker.module.css'
import { useLanguage } from '../../i18n/LanguageContext'

function Stepper({ label, description, value, min, max, onDecrement, onIncrement }) {
  return (
    <div className={styles.row}>
      <div className={styles.rowText}>
        <span className={styles.rowLabel}>{label}</span>
        {description && <span className={styles.rowDescription}>{description}</span>}
      </div>
      <div className={styles.counter}>
        <button
          type="button"
          className={styles.counterBtn}
          onClick={onDecrement}
          disabled={value <= min}
          aria-label={`Decrease ${label}`}
        >
          <LuMinus size={14} />
        </button>
        <span className={styles.counterValue}>{value}</span>
        <button
          type="button"
          className={styles.counterBtn}
          onClick={onIncrement}
          disabled={value >= max}
          aria-label={`Increase ${label}`}
        >
          <LuPlus size={14} />
        </button>
      </div>
    </div>
  )
}

export default function GuestPicker({ value, onChange, maxGuests = 12, maxKids = 6, maxPets = 4 }) {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)

  const guests = Number(value.guests) || 1
  const kidsUnder5 = Number(value.kidsUnder5) || 0
  const pets = Number(value.pets) || 0

  useEffect(() => {
    if (!open) return undefined

    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  const set = (key, nextValue) => {
    onChange({ ...value, [key]: nextValue })
  }

  const summary = [
    `${guests} ${guests === 1 ? t('common.guest') : t('common.guests')}`,
    kidsUnder5 > 0 ? `${kidsUnder5} ${kidsUnder5 === 1 ? t('common.kid') : t('common.kids')}` : null,
    pets > 0 ? `${pets} ${pets === 1 ? t('common.pet') : t('common.pets')}` : null,
  ].filter(Boolean).join(' · ')

  return (
    <div className={styles.wrapper} ref={containerRef}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
      >
        <span>{summary}</span>
        <LuChevronDown size={16} className={open ? styles.chevronOpen : ''} />
      </button>

      {open && (
        <div className={styles.panel}>
          <Stepper
            label={t('common.guests')}
            value={guests}
            min={1}
            max={maxGuests}
            onDecrement={() => set('guests', String(Math.max(1, guests - 1)))}
            onIncrement={() => set('guests', String(Math.min(maxGuests, guests + 1)))}
          />
          <Stepper
            label={t('common.kidsUnder5')}
            description={t('common.kidsUnder5Note')}
            value={kidsUnder5}
            min={0}
            max={maxKids}
            onDecrement={() => set('kidsUnder5', Math.max(0, kidsUnder5 - 1))}
            onIncrement={() => set('kidsUnder5', Math.min(maxKids, kidsUnder5 + 1))}
          />
          <Stepper
            label={t('common.pets')}
            description={t('common.petsNote')}
            value={pets}
            min={0}
            max={maxPets}
            onDecrement={() => set('pets', Math.max(0, pets - 1))}
            onIncrement={() => set('pets', Math.min(maxPets, pets + 1))}
          />
          <button type="button" className={styles.doneBtn} onClick={() => setOpen(false)}>
            {t('common.done')}
          </button>
        </div>
      )}
    </div>
  )
}
