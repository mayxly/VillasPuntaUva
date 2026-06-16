import { useEffect } from 'react'
import { HiX } from 'react-icons/hi'
import styles from './BookingModal.module.css'

export default function BookingModal({ onClose }) {
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
          aria-label="Close booking information"
        >
          <HiX size={24} />
        </button>
        <img
          src="/images/logos/logo-blue.png"
          alt=""
          className={styles.icon}
        />
        <h2 id="booking-modal-title">Ready to book?</h2>
        <p>
          Text or WhatsApp us at <strong>+506 6145 9916</strong> to book your stay,
          ask a question, or inquire about availability.
        </p>
        <a href="https://wa.me/50661459916" className={styles.action}>
          Message +506 6145 9916
        </a>
      </div>
    </div>
  )
}
