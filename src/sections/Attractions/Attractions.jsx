import { Link } from 'react-router-dom'
import { attractions } from '../../data/attractions'
import styles from './Attractions.module.css'
import { useLanguage } from '../../i18n/LanguageContext'

export default function Attractions() {
  const { language, t, localizePath } = useLanguage()
  const attractionNames = {
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
          {attractions.map((item) => (
            <Link
              key={item.id}
              to={localizePath(`/attractions#${item.targetId}`)}
              className={styles.card}
            >
              <img
                src={item.image}
                alt={language === 'es' ? attractionNames[item.name] : item.name}
                className={styles.image}
                loading="lazy"
                decoding="async"
              />
              <div className={styles.overlay} />
              <h3 className={styles.title}>{language === 'es' ? attractionNames[item.name] : item.name}</h3>
            </Link>
          ))}
        </div>
        <div className={styles.btnWrap}>
          <Link to={localizePath('/attractions')} className={styles.btn}>{t('home.viewAttractions')}</Link>
        </div>
      </div>
    </section>
  )
}
