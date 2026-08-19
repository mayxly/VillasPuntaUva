import { Link } from 'react-router-dom'
import { FaWalking, FaTrophy, FaUmbrellaBeach, FaLeaf } from 'react-icons/fa'
import styles from './Location.module.css'
import { useLanguage } from '../../i18n/LanguageContext'

export default function Location() {
  const { t, localizePath } = useLanguage()

  const badges = [
    { icon: <FaWalking size={18} />, text: t('home.locationBadgeWalk') },
    { icon: <FaTrophy size={18} />, text: t('home.locationBadgeTop50') },
    { icon: <FaUmbrellaBeach size={18} />, text: t('home.locationBadgeBestBeach') },
    { icon: <FaLeaf size={18} />, text: t('home.locationBadgeForbes') },
  ]

  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <span className={styles.eyebrow}>{t('home.locationLabel')}</span>
        <h2 className={styles.heading}>{t('home.locationHeading')}</h2>
        <p className={styles.text}>{t('home.locationText')}</p>

        <div className={styles.badges}>
          {badges.map((badge) => (
            <span key={badge.text} className={styles.badge}>
              {badge.icon}
              {badge.text}
            </span>
          ))}
        </div>

        <Link to={localizePath('/location')} className={styles.btn}>{t('home.viewLocation')}</Link>
      </div>
    </section>
  )
}
