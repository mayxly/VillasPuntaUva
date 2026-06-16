import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HiMenu, HiX, HiChevronDown } from 'react-icons/hi'
import { useScrollPosition } from '../../hooks/useScrollPosition'
import { suites } from '../../data/suites'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [suitesOpen, setSuitesOpen] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)
  const scrollY = useScrollPosition()
  const location = useLocation()

  const isHome = location.pathname === '/'
  const isScrolled = scrollY > 80
  const solid = !isHome || isScrolled

  useEffect(() => {
    document.body.style.overflow = mobileOpen || bookingOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen, bookingOpen])

  useEffect(() => {
    if (!bookingOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setBookingOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [bookingOpen])

  useEffect(() => {
    setMobileOpen(false)
    setSuitesOpen(false)
  }, [location])

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/suites', label: 'Suites', hasDropdown: true },
    { to: '/about', label: 'About Us' },
    { to: '/attractions', label: 'Attractions' },
    { to: '/contact', label: 'Contact Us' },
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

  const openBookingModal = () => {
    setMobileOpen(false)
    setSuitesOpen(false)
    setBookingOpen(true)
  }

  return (
    <>
      <header className={`${styles.navbar} ${solid ? styles.solid : ''}`}>
        <div className={styles.container}>
          <Link to="/" className={styles.logoLink}>
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
                    {suites.map((suite) => (
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
            <button type="button" className={styles.bookBtn} onClick={openBookingModal}>
              Book Now
            </button>
          </nav>

          <button
            className={styles.hamburger}
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
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
          aria-label="Close menu"
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
                  {suites.map((suite) => (
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
          <button type="button" className={styles.bookBtn} onClick={openBookingModal}>
            Book Now
          </button>
        </nav>
      </div>

      {bookingOpen && (
        <div
          className={styles.modalOverlay}
          onClick={() => setBookingOpen(false)}
          role="presentation"
        >
          <div
            className={styles.bookingModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className={styles.modalClose}
              onClick={() => setBookingOpen(false)}
              aria-label="Close booking information"
            >
              <HiX size={24} />
            </button>
            <img
              src="/images/logos/logo-blue.png"
              alt=""
              className={styles.modalIcon}
            />
            <h2 id="booking-modal-title">Ready to book?</h2>
            <p>
              Text or WhatsApp us at <strong>+506 6145 9916</strong> to book your stay,
              ask a question, or inquire about availability.
            </p>
            <a href="https://wa.me/50661459916" className={styles.modalAction}>
              Message +506 6145 9916
            </a>
          </div>
        </div>
      )}
    </>
  )
}
