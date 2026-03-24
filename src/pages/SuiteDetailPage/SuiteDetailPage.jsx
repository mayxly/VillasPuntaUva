import { useParams, Link } from 'react-router-dom'
import { suites } from '../../data/suites'
import styles from './SuiteDetailPage.module.css'

export default function SuiteDetailPage() {
  const { slug } = useParams()
  const suite = suites.find((s) => s.slug === slug)

  if (!suite) {
    return (
      <div className={styles.page}>
        <h1>Suite Not Found</h1>
        <p>The suite you're looking for doesn't exist.</p>
        <Link to="/suites" className={styles.backLink}>Back to Suites</Link>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <h1>{suite.name}</h1>
      <p className={styles.location}>{suite.location}, Limón, Costa Rica</p>
      <p className={styles.coming}>Full suite details coming soon.</p>
      <Link to="/suites" className={styles.backLink}>Back to All Suites</Link>
    </div>
  )
}
