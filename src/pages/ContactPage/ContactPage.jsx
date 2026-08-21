import { HiPhone, HiMail, HiLocationMarker } from 'react-icons/hi'
import styles from './ContactPage.module.css'
import { useLanguage } from '../../i18n/LanguageContext'
import SEO from '../../components/SEO/SEO'

const GOOGLE_MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=Villas+Punta+Uva%2C+Puerto+Viejo%2C+Lim%C3%B3n%2C+Costa+Rica'

const seoText = {
  en: {
    title: 'Contact Us | Villas Punta Uva, Puerto Viejo Costa Rica',
    description: 'Get in touch with Villas Punta Uva by phone, WhatsApp, or email to book your Caribbean coast Costa Rica villa.',
  },
  es: {
    title: 'Contáctenos | Villas Punta Uva, Puerto Viejo Costa Rica',
    description: 'Póngase en contacto con Villas Punta Uva por teléfono, WhatsApp o correo electrónico para reservar su villa en la costa caribeña de Costa Rica.',
  },
}

export default function ContactPage() {
  const { language, t } = useLanguage()
  const seo = seoText[language]
  return (
    <div className={styles.page}>
      <SEO title={seo.title} description={seo.description} path="/contact" />
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
          <a href="tel:+50661459916" className={styles.card}>
            <div className={styles.iconCircle}>
              <HiPhone size={28} />
            </div>
            <h3 className={styles.cardLabel}>{t('pages.phone')}</h3>
            <p className={styles.cardDetail}>+506 6145 9916</p>
          </a>
          <a href="mailto:villaspuntauva@gmail.com" className={styles.card}>
            <div className={styles.iconCircle}>
              <HiMail size={28} />
            </div>
            <h3 className={styles.cardLabel}>{t('pages.email')}</h3>
            <p className={styles.cardDetail}>villaspuntauva@gmail.com</p>
          </a>
          <a href={GOOGLE_MAPS_URL} target="_blank" rel="noreferrer" className={styles.card}>
            <div className={styles.iconCircle}>
              <HiLocationMarker size={28} />
            </div>
            <h3 className={styles.cardLabel}>{t('pages.location')}</h3>
            <p className={styles.cardDetail}>Punta Uva, Puerto Viejo, Limón, Costa Rica</p>
          </a>
        </div>
      </section>
    </div>
  )
}
