import { Link } from 'react-router-dom'
import { explore } from '../../data/explore'
import styles from './Explore.module.css'
import { useLanguage } from '../../i18n/LanguageContext'

export default function Explore() {
  const { language, t, localizePath } = useLanguage()
  const exploreNames = {
    'Ocean Adventures': 'Aventuras en el océano',
    'Jungle & Wildlife': 'Selva y vida silvestre',
    'Culture & Wellness': 'Cultura y bienestar',
    'Tours & Nightlife': 'Tours y vida nocturna',
  }
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>{t('home.explore')}</h2>
        <p className={styles.subheading}>
          {t('home.exploreText')}
        </p>
        <div className={styles.grid}>
          {explore.map((item) => (
            <Link
              key={item.id}
              to={localizePath(`/explore#${item.targetId}`)}
              className={styles.card}
            >
              <img
                src={item.image}
                alt={language === 'es' ? exploreNames[item.name] : item.name}
                className={styles.image}
                loading="lazy"
                decoding="async"
              />
              <div className={styles.overlay} />
              <h3 className={styles.title}>{language === 'es' ? exploreNames[item.name] : item.name}</h3>
            </Link>
          ))}
        </div>
        <div className={styles.btnWrap}>
          <Link to={localizePath('/explore')} className={styles.btn}>{t('home.viewExplore')}</Link>
        </div>
      </div>
    </section>
  )
}
