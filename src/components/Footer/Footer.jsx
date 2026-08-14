import { Link } from 'react-router-dom'
import { FaInstagram, FaTiktok } from 'react-icons/fa'
import { getLocalizedSuites } from '../../data/suites'
import styles from './Footer.module.css'
import { useLanguage } from '../../i18n/LanguageContext'

export default function Footer() {
  const { language, t } = useLanguage()
  const suites = getLocalizedSuites(language)
  return (
    <footer className={styles.footer}>
      <div className={styles.topBanner}>
        <div className={styles.topBannerInner}>
          <div className={styles.topBannerText}>
            <h3 className={styles.topBannerHeading}>{t('footer.ready')}</h3>
            <p className={styles.topBannerSub}>{t('footer.text')}</p>
          </div>
          <a href="tel:+50661459916" className={styles.topBannerPhone}>+506 6145 9916</a>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <img
              src="/images/logos/logo-white-text.png"
              alt="Villas Punta Uva"
              className={styles.logo}
            />
            <p className={styles.tagline}>
              {t('footer.tagline')}
            </p>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>{t('footer.quickLinks')}</h4>
            <nav className={styles.links}>
              <Link to="/">{t('nav.home')}</Link>
              <Link to="/suites">{t('nav.suites')}</Link>
              <Link to="/about">{t('nav.about')}</Link>
              <Link to="/attractions">{t('nav.attractions')}</Link>
              <Link to="/contact">{t('nav.contact')}</Link>
            </nav>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>{t('nav.suites')}</h4>
            <nav className={styles.links}>
              {suites.map((suite) => (
                <Link key={suite.id} to={`/suites/${suite.slug}`}>{suite.name}</Link>
              ))}
            </nav>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>{t('footer.contact')}</h4>
            <div className={styles.contactInfo}>
              <p>Punta Uva Puerto Viejo</p>
              <p>Costa Rica</p>
              <p>+506 6145 9916</p>
              <p>info@villaspuntauva.com</p>
            </div>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>{t('footer.follow')}</h4>
            <div className={styles.socials}>
              <a
                href="https://www.instagram.com/villaspuntauva/"
                aria-label="Instagram"
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram size={22} />
              </a>
              <a
                href="https://www.tiktok.com/@villaspuntauva"
                aria-label="TikTok"
                target="_blank"
                rel="noreferrer"
              >
                <FaTiktok size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} Villas Punta Uva. {t('footer.rights')}</p>
      </div>
    </footer>
  )
}
