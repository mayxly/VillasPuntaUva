import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HiMenu, HiX, HiChevronDown } from 'react-icons/hi'
import { useScrollPosition } from '../../hooks/useScrollPosition'
import { getLocalizedSuites } from '../../data/suites'
import BookingModal from '../BookingModal/BookingModal'
import { useLanguage } from '../../i18n/LanguageContext'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [suitesOpen, setSuitesOpen] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)
  const scrollY = useScrollPosition()
  const location = useLocation()
  const { language, setLanguage, t } = useLanguage()
  const localizedSuites = getLocalizedSuites(language)

  const isHome = location.pathname === '/'
  const isScrolled = scrollY > 80
  const solid = !isHome || isScrolled

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  useEffect(() => {
    setMobileOpen(false)
    setSuitesOpen(false)
  }, [location])

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/suites', label: t('nav.suites'), hasDropdown: true },
    { to: '/location', label: t('nav.location') },
    { to: '/attractions', label: t('nav.attractions') },
    { to: '/about', label: t('nav.about') },
    { to: '/contact', label: t('nav.contact') },
  ]

  const isActiveLink = (link) => {
    if (link.hasDropdown) return location.pathname.startsWith(link.to)
    return location.pathname === link.to
  }

  const handleNavClick = (event, link) => {
    if (location.pathname !== link.to) return

    event.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setMobileOpen(false)
    setSuitesOpen(false)
  }

  const handleLogoClick = (event) => {
    setMobileOpen(false)
    setSuitesOpen(false)

    if (isHome) {
      event.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const openBookingModal = () => {
    setMobileOpen(false)
    setSuitesOpen(false)
    setBookingOpen(true)
  }

  return (
    <>
      <header className={`${styles.navbar} ${solid ? styles.solid : ''}`}>
        <div className={styles.container}>
          <Link to="/" className={styles.logoLink} onClick={handleLogoClick}>
            <img
              src={solid ? '/images/logos/logo-black-text.png' : '/images/logos/logo-white-text.png'}
              alt="Villas Punta Uva"
              className={styles.logo}
            />
          </Link>

          <nav className={styles.desktopNav}>
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div
                  key={link.to}
                  className={styles.dropdownWrap}
                  onMouseEnter={() => setSuitesOpen(true)}
                  onMouseLeave={() => setSuitesOpen(false)}
                >
                  <Link
                    to={link.to}
                    className={`${styles.navLink} ${isActiveLink(link) ? styles.active : ''}`}
                    onClick={(event) => handleNavClick(event, link)}
                  >
                    {link.label}
                    <HiChevronDown size={16} className={`${styles.chevron} ${suitesOpen ? styles.chevronOpen : ''}`} />
                  </Link>
                  <div className={`${styles.dropdown} ${suitesOpen ? styles.dropdownVisible : ''}`}>
                    {localizedSuites.map((suite) => (
                      <Link
                        key={suite.id}
                        to={`/suites/${suite.slug}`}
                        className={styles.dropdownLink}
                      >
                        {suite.name}
                        <span className={styles.dropdownLocation}>{suite.location}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`${styles.navLink} ${isActiveLink(link) ? styles.active : ''}`}
                  onClick={(event) => handleNavClick(event, link)}
                >
                  {link.label}
                </Link>
              )
            )}
            <LanguageSwitch language={language} setLanguage={setLanguage} t={t} />
            <button type="button" className={styles.bookBtn} onClick={openBookingModal}>
              {t('nav.book')}
            </button>
          </nav>
          <div className={styles.mobileActions}>
            <LanguageSwitch language={language} setLanguage={setLanguage} t={t} />
          </div>

          <button
            className={styles.hamburger}
            onClick={() => setMobileOpen(true)}
            aria-label={t('nav.open')}
          >
            <HiMenu size={28} />
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className={styles.overlay} onClick={() => setMobileOpen(false)} />
      )}
      <div className={`${styles.drawer} ${mobileOpen ? styles.drawerOpen : ''}`}>
        <button
          className={styles.closeBtn}
          onClick={() => setMobileOpen(false)}
          aria-label={t('nav.close')}
        >
          <HiX size={28} />
        </button>
        <nav className={styles.drawerNav}>
          {navLinks.map((link) => (
            <div key={link.to}>
              <Link
                to={link.to}
                className={`${styles.drawerLink} ${isActiveLink(link) ? styles.drawerLinkActive : ''}`}
                onClick={(event) => handleNavClick(event, link)}
              >
                {link.label}
              </Link>
              {link.hasDropdown && (
                <div className={styles.drawerSub}>
                  {localizedSuites.map((suite) => (
                    <Link
                      key={suite.id}
                      to={`/suites/${suite.slug}`}
                      className={styles.drawerSubLink}
                    >
                      {suite.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <LanguageSwitch language={language} setLanguage={setLanguage} t={t} className={styles.drawerLanguage} />
          <button type="button" className={styles.bookBtn} onClick={openBookingModal}>
            {t('nav.book')}
          </button>
        </nav>
      </div>

      {bookingOpen && <BookingModal onClose={() => setBookingOpen(false)} />}
    </>
  )
}

function LanguageSwitch({ language, setLanguage, t, className = '' }) {
  return (
    <div className={`${styles.languageSwitch} ${className}`} aria-label={t('nav.language')}>
      {['en', 'es'].map((option) => (
        <button
          key={option}
          type="button"
          className={language === option ? styles.languageActive : ''}
          onClick={() => setLanguage(option)}
          aria-pressed={language === option}
          aria-label={`${t('nav.language')}: ${option === 'en' ? 'English' : 'Español'}`}
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
