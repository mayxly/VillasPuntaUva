import { Link } from 'react-router-dom'
import styles from './AboutUs.module.css'

export default function AboutUs() {
  return (
    <section className={styles.section}>
      <div className={styles.brandSide}>
        <img
          src="/images/logos/logo-white-text.png"
          alt="Villas Punta Uva"
          className={styles.logo}
        />
      </div>
      <div className={styles.photoSide}>
        <div className={styles.photoContent}>
          <p className={styles.text}>
            Whether you're seeking a romantic getaway, a family adventure, or a peaceful retreat,
            our team is dedicated to making your stay exceptional from start to finish.
          </p>
          <Link to="/about" className={styles.btn}>About Us</Link>
        </div>
      </div>
    </section>
  )
}
