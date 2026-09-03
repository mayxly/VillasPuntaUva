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
  const [openDropdown, setOpenDropdown] = useState(null)
  const [bookingOpen, setBookingOpen] = useState(false)
  const scrollY = useScrollPosition()
  const location = useLocation()
  const { language, setLanguage, t, localizePath } = useLanguage()
  const localizedSuites = getLocalizedSuites(language)

  const isHome = location.pathname === '/' || location.pathname === '/es'
  const isScrolled = scrollY > 80
  const solid = !isHome || isScrolled

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  useEffect(() => {
    setMobileOpen(false)
    setOpenDropdown(null)
  }, [location])

  const navLinks = [
    { to: localizePath('/'), label: t('nav.home') },
    {
      to: localizePath('/suites'),
      label: t('nav.suites'),
      hasDropdown: true,
      dropdownItems: localizedSuites.map((suite) => ({
        key: suite.id,
        to: localizePath(`/suites/${suite.slug}`),
        label: suite.name,
        sublabel: suite.location,
      })),
    },
    {
      to: localizePath('/location'),
      label: t('nav.location'),
      hasDropdown: true,
      dropdownItems: [
        { key: 'beach', to: `${localizePath('/location')}#beach`, label: t('nav.locationBeach') },
        { key: 'getting-around', to: `${localizePath('/location')}#getting-around`, label: t('nav.locationGettingAround') },
        { key: 'sister', to: `${localizePath('/location')}#sister`, label: t('nav.locationSister') },
        { key: 'compare', to: `${localizePath('/location')}#compare`, label: t('nav.locationCompare') },
        { key: 'proof', to: `${localizePath('/location')}#proof`, label: t('nav.locationProof') },
      ],
    },
    {
      to: localizePath('/explore'),
      label: t('nav.explore'),
      hasDropdown: true,
      dropdownItems: [
        { key: 'outdoor-adventures', to: `${localizePath('/explore')}#outdoor-adventures`, label: t('nav.exploreOutdoorAdventures') },
        { key: 'diving', to: `${localizePath('/explore')}#diving`, label: t('nav.exploreDiving') },
        { key: 'canopy-tour', to: `${localizePath('/explore')}#canopy-tour`, label: t('nav.exploreCanopyTour') },
        { key: 'surf-lessons', to: `${localizePath('/explore')}#surf-lessons`, label: t('nav.exploreSurfLessons') },
        { key: 'chocolate-tours', to: `${localizePath('/explore')}#chocolate-tours`, label: t('nav.exploreChocolateTours') },
        { key: 'horseback-riding', to: `${localizePath('/explore')}#horseback-riding`, label: t('nav.exploreHorsebackRiding') },
        { key: 'nature', to: `${localizePath('/explore')}#nature`, label: t('nav.exploreNature') },
        { key: 'activities', to: `${localizePath('/explore')}#activities`, label: t('nav.exploreActivities') },
        { key: 'night-life', to: `${localizePath('/explore')}#night-life`, label: t('nav.exploreNightLife') },
      ],
    },
    { to: localizePath('/about'), label: t('nav.about') },
    { to: localizePath('/contact'), label: t('nav.contact') },
    { to: localizePath('/faq'), label: t('nav.faqs') },
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
    setOpenDropdown(null)
  }

  const handleLogoClick = (event) => {
    setMobileOpen(false)
    setOpenDropdown(null)

    if (isHome) {
      event.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const openBookingModal = () => {
    setMobileOpen(false)
    setOpenDropdown(null)
    setBookingOpen(true)
  }

  return (
    <>
      <header className={`${styles.navbar} ${solid ? styles.solid : ''}`}>
        <div className={styles.container}>
          <Link to={localizePath('/')} className={styles.logoLink} onClick={handleLogoClick}>
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
                  onMouseEnter={() => setOpenDropdown(link.to)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    to={link.to}
                    className={`${styles.navLink} ${isActiveLink(link) ? styles.active : ''}`}
                    onClick={(event) => handleNavClick(event, link)}
                  >
                    {link.label}
                    <HiChevronDown size={16} className={`${styles.chevron} ${openDropdown === link.to ? styles.chevronOpen : ''}`} />
                  </Link>
                  <div className={`${styles.dropdown} ${openDropdown === link.to ? styles.dropdownVisible : ''}`}>
                    {link.dropdownItems.map((item) => (
                      <Link
                        key={item.key}
                        to={item.to}
                        className={styles.dropdownLink}
                      >
                        {item.label}
                        {item.sublabel && <span className={styles.dropdownLocation}>{item.sublabel}</span>}
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
                  {link.dropdownItems.map((item) => (
                    <Link
                      key={item.key}
                      to={item.to}
                      className={styles.drawerSubLink}
                    >
                      {item.label}
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
