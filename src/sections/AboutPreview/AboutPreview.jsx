import { Link } from 'react-router-dom'
import styles from './AboutPreview.module.css'

export default function AboutPreview() {
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <img
          src="/images/logos/logo-white.png"
          alt=""
          className={styles.icon}
        />
        <h2 className={styles.heading}>
          Punta Uva, Costa Rica
        </h2>
        <p className={styles.text}>
          Stay in private vacation villas surrounded by jungle, wildlife, and the Caribbean coast.
          Each home is designed for comfort, privacy, and easy days near Punta Uva Beach.
        </p>
        <Link to="/suites#available-suites" className={styles.btn}>View Our Suites</Link>
      </div>
    </section>
  )
}
