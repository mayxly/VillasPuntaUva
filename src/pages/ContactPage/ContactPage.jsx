import { HiPhone, HiMail, HiLocationMarker } from 'react-icons/hi'
import styles from './ContactPage.module.css'

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <img
            src="/images/logos/logo-white.png"
            alt=""
            className={styles.heroIcon}
          />
          <h1 className={styles.heroTitle}>Contact Us</h1>
          <p className={styles.heroText}>
            Our team will guide you with everything you
            need to ensure your experience is nothing short of exceptional.
          </p>
        </div>
        <img
          src="/images/logos/logo-white.png"
          alt=""
          className={styles.watermark}
        />
      </section>

      <section className={styles.info}>
        <p className={styles.intro}>
          Get in touch with us and let's plan your Caribbean escape at Villas Punta Uva.
        </p>
        <div className={styles.cards}>
          <div className={styles.card}>
            <div className={styles.iconCircle}>
              <HiPhone size={28} />
            </div>
            <h3 className={styles.cardLabel}>Phone</h3>
            <p className={styles.cardDetail}>+506 6145 9916</p>
          </div>
          <div className={styles.card}>
            <div className={styles.iconCircle}>
              <HiMail size={28} />
            </div>
            <h3 className={styles.cardLabel}>Email</h3>
            <p className={styles.cardDetail}>info@villaspuntauva.com</p>
          </div>
          <div className={styles.card}>
            <div className={styles.iconCircle}>
              <HiLocationMarker size={28} />
            </div>
            <h3 className={styles.cardLabel}>Location</h3>
            <p className={styles.cardDetail}>Punta Uva Puerto Viejo, CR</p>
          </div>
        </div>
      </section>
    </div>
  )
}
