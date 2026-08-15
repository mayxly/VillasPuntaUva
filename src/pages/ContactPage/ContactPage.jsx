import { HiPhone, HiMail, HiLocationMarker } from 'react-icons/hi'
import styles from './ContactPage.module.css'
import { useLanguage } from '../../i18n/LanguageContext'

export default function ContactPage() {
  const { t } = useLanguage()
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <img
            src="/images/logos/logo-white.png"
            alt=""
            className={styles.heroIcon}
          />
          <h1 className={styles.heroTitle}>{t('pages.contact')}</h1>
          <p className={styles.heroText}>
            {t('pages.contactHero')}
          </p>
        </div>
      </section>

      <section className={styles.info}>
        <p className={styles.intro}>
          {t('pages.contactIntro')}
        </p>
        <div className={styles.cards}>
          <div className={styles.card}>
            <div className={styles.iconCircle}>
              <HiPhone size={28} />
            </div>
            <h3 className={styles.cardLabel}>{t('pages.phone')}</h3>
            <p className={styles.cardDetail}>+506 6145 9916</p>
          </div>
          <div className={styles.card}>
            <div className={styles.iconCircle}>
              <HiMail size={28} />
            </div>
            <h3 className={styles.cardLabel}>{t('pages.email')}</h3>
            <p className={styles.cardDetail}>info@villaspuntauva.com</p>
          </div>
          <div className={styles.card}>
            <div className={styles.iconCircle}>
              <HiLocationMarker size={28} />
            </div>
            <h3 className={styles.cardLabel}>{t('pages.location')}</h3>
            <p className={styles.cardDetail}>Punta Uva, Puerto Viejo, Limón, Costa Rica</p>
          </div>
        </div>
      </section>
    </div>
  )
}
