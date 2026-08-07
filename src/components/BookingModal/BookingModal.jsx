import { useEffect } from 'react'
import { HiX } from 'react-icons/hi'
import styles from './BookingModal.module.css'
import { useLanguage } from '../../i18n/LanguageContext'

export default function BookingModal({ onClose }) {
  const { t } = useLanguage()
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return (
    <div className={styles.overlay} onClick={onClose} role="presentation">
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label={t('common.close')}
        >
          <HiX size={24} />
        </button>
        <img
          src="/images/logos/logo-blue.png"
          alt=""
          className={styles.icon}
        />
        <h2 id="booking-modal-title">{t('booking.modalTitle')}</h2>
        <p>
          {t('booking.modalText', { phone: '+506 6145 9916' })}
        </p>
        <a href="https://wa.me/50661459916" className={styles.action}>
          {t('booking.message', { phone: '+506 6145 9916' })}
        </a>
      </div>
    </div>
  )
}
