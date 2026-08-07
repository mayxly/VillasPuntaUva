import { Link } from 'react-router-dom'
import { IoBedOutline } from 'react-icons/io5'
import { LuBath } from 'react-icons/lu'
import { HiArrowRight } from 'react-icons/hi'
import PlaceholderImage from '../PlaceholderImage/PlaceholderImage'
import styles from './SuiteCard.module.css'
import { useLanguage } from '../../i18n/LanguageContext'

export default function SuiteCard({ name, location, slug, image, bedrooms, bathrooms, description }) {
  const { t } = useLanguage()
  return (
    <div className={styles.card}>
      {/* Front face — image + name overlay */}
      <div className={styles.front}>
        {image ? (
          <div className={styles.imageWrap}>
            <img
              src={image}
              alt={name}
              className={styles.suiteImage}
              loading="lazy"
              decoding="async"
            />
          </div>
        ) : (
          <PlaceholderImage label={name} aspectRatio="3/4" />
        )}
        <div className={styles.frontOverlay}>
          <img
            src="/images/logos/logo-white.png"
            alt=""
            className={styles.frontIcon}
          />
          <h3 className={styles.frontName}>{name}</h3>
          <p className={styles.frontLocation}>{location}</p>
        </div>
      </div>

      {/* Back face — details on hover */}
      <div className={styles.back}>
        <img
          src="/images/logos/logo-white.png"
          alt=""
          className={styles.backIcon}
        />
        <h3 className={styles.backName}>{name}</h3>
        <div className={styles.specs}>
          <span className={styles.spec}>
            <IoBedOutline size={18} />
            {bedrooms} {bedrooms === 1 ? t('common.guest').replace('Guest', 'Bed').replace('Huésped', 'Cama') : (t('common.guest').replace('Guest', 'Beds').replace('Huésped', 'Camas'))}
          </span>
          <span className={styles.spec}>
            <LuBath size={18} />
            {bathrooms} {bathrooms === 1 ? (t('common.guest').startsWith('H') ? 'Baño' : 'Bath') : (t('common.guest').startsWith('H') ? 'Baños' : 'Baths')}
          </span>
        </div>
        <p className={styles.backDesc}>{description}</p>
        <Link to={`/suites/${slug}`} className={styles.viewLink}>
          {t('suites.viewDetails')} <HiArrowRight size={18} />
        </Link>
      </div>
    </div>
  )
}
