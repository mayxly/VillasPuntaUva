import styles from './Hero.module.css'
import { useLanguage } from '../../i18n/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()
  return (
    <section className={styles.hero}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <img
          src="/images/logos/logo-white.png"
          alt=""
          className={styles.icon}
        />
        <h1 className={styles.title}>Villas Punta Uva</h1>
        <p className={styles.subtitle}>
          {t('home.tagline')}
        </p>
      </div>
    </section>
  )
}
