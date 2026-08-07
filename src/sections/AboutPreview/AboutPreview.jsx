import { Link } from 'react-router-dom'
import styles from './AboutPreview.module.css'
import { useLanguage } from '../../i18n/LanguageContext'

export default function AboutPreview() {
  const { t } = useLanguage()
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <img
          src="/images/logos/logo-white.png"
          alt=""
          className={styles.icon}
        />
        <h2 className={styles.heading}>
          {t('home.punta')}
        </h2>
        <p className={styles.text}>
          {t('home.puntaText')}
        </p>
        <Link to="/suites#available-suites" className={styles.btn}>{t('common.viewSuites')}</Link>
      </div>
    </section>
  )
}
