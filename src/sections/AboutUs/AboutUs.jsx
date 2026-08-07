import { Link } from 'react-router-dom'
import styles from './AboutUs.module.css'
import { useLanguage } from '../../i18n/LanguageContext'

export default function AboutUs() {
  const { t } = useLanguage()
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
            {t('home.aboutText')}
          </p>
          <Link to="/about" className={styles.btn}>{t('nav.about')}</Link>
        </div>
      </div>
    </section>
  )
}
