import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HiMenu, HiX, HiChevronDown } from 'react-icons/hi'
import { useScrollPosition } from '../../hooks/useScrollPosition'
import { suites } from '../../data/suites'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [suitesOpen, setSuitesOpen] = useState(false)
  const scrollY = useScrollPosition()
  const location = useLocation()

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
    { to: '/', label: 'Home' },
    { to: '/suites', label: 'Suites', hasDropdown: true },
    { to: '/about', label: 'About Us' },
    { to: '/attractions', label: 'Attractions' },
    { to: '/contact', label: 'Contact Us' },
  ]

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
                    className={`${styles.navLink} ${location.pathname.startsWith('/suites') ? styles.active : ''}`}
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
                  className={`${styles.navLink} ${location.pathname === link.to ? styles.active : ''}`}
                >
                  {link.label}
                </Link>
              )
            )}
            <a href="#book" className={styles.bookBtn}>Book Now</a>
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
                className={styles.drawerLink}
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
          <a href="#book" className={styles.bookBtn}>Book Now</a>
        </nav>
      </div>
    </>
  )
}
