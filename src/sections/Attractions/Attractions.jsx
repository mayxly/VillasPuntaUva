import { Link } from 'react-router-dom'
import { attractions } from '../../data/attractions'
import styles from './Attractions.module.css'
import { useLanguage } from '../../i18n/LanguageContext'

export default function Attractions() {
  const { t } = useLanguage()
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
              to={`/attractions#${item.targetId}`}
              className={styles.card}
            >
              <img
                src={item.image}
                alt={item.name}
                className={styles.image}
                loading="lazy"
                decoding="async"
              />
              <div className={styles.overlay} />
              <h3 className={styles.title}>{item.name}</h3>
            </Link>
          ))}
        </div>
        <div className={styles.btnWrap}>
          <Link to="/attractions" className={styles.btn}>{t('home.viewAttractions')}</Link>
        </div>
      </div>
    </section>
  )
}
