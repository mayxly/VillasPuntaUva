import { Link } from 'react-router-dom'
import { FaInstagram, FaFacebookF, FaTripadvisor } from 'react-icons/fa'
import { suites } from '../../data/suites'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.topBanner}>
        <div className={styles.topBannerInner}>
          <div className={styles.topBannerText}>
            <h3 className={styles.topBannerHeading}>Ready to plan your escape?</h3>
            <p className={styles.topBannerSub}>Shoot us a text — we'd love to hear from you.</p>
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
              Private Beach Villas in Punta Uva & Arrecife, Costa Rica
            </p>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Quick Links</h4>
            <nav className={styles.links}>
              <Link to="/">Home</Link>
              <Link to="/suites">Suites</Link>
              <Link to="/about">About Us</Link>
              <Link to="/attractions">Attractions</Link>
              <Link to="/contact">Contact Us</Link>
            </nav>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Suites</h4>
            <nav className={styles.links}>
              {suites.map((suite) => (
                <Link key={suite.id} to={`/suites/${suite.slug}`}>{suite.name}</Link>
              ))}
            </nav>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Contact</h4>
            <div className={styles.contactInfo}>
              <p>Punta Uva Puerto Viejo</p>
              <p>Costa Rica</p>
              <p>+506 6145 9916</p>
              <p>info@villaspuntauva.com</p>
            </div>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Follow Us</h4>
            <div className={styles.socials}>
              <a href="#" aria-label="Instagram"><FaInstagram size={22} /></a>
              <a href="#" aria-label="Facebook"><FaFacebookF size={20} /></a>
              <a href="#" aria-label="TripAdvisor"><FaTripadvisor size={22} /></a>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} Villas Punta Uva. All rights reserved.</p>
      </div>
    </footer>
  )
}
