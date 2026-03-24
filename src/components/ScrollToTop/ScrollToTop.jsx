import { HiArrowUp } from 'react-icons/hi'
import { useScrollPosition } from '../../hooks/useScrollPosition'
import styles from './ScrollToTop.module.css'

export default function ScrollToTop() {
  const scrollY = useScrollPosition()
  const visible = scrollY > 300

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      className={`${styles.btn} ${visible ? styles.visible : ''}`}
      onClick={handleClick}
      aria-label="Scroll to top"
    >
      <HiArrowUp size={22} />
    </button>
  )
}
