import { Link } from 'react-router-dom'
import styles from './AboutPreview.module.css'

export default function AboutPreview() {
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <img
          src="/images/logos/logo-white.png"
          alt=""
          className={styles.icon}
        />
        <h2 className={styles.heading}>
          Villas Punta Uva<br />Punta Uva, Costa Rica
        </h2>
        <p className={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vestibulum facilisis lectus, et mollis neque.
          In a ultrices quam, eget commodo ligula. Vestibulum turpis lacus, accumsan a facilisis non, vestibulum maximus
          mauris.
        </p>
        <Link to="/suites" className={styles.btn}>View Our Suites</Link>
      </div>
    </section>
  )
}
