import { Link } from 'react-router-dom'
import { attractions } from '../../data/attractions'
import styles from './Attractions.module.css'

export default function Attractions() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Explore Punta Uva</h2>
        <p className={styles.subheading}>
          Discover the best experiences the Caribbean coast has to offer
        </p>
        <div className={styles.grid}>
          {attractions.map((item) => (
            <Link
              key={item.id}
              to={`/attractions#${item.targetId}`}
              className={styles.card}
            >
              <img
                src={item.image}
                alt={item.name}
                className={styles.image}
                loading="lazy"
                decoding="async"
              />
              <div className={styles.overlay} />
              <h3 className={styles.title}>{item.name}</h3>
            </Link>
          ))}
        </div>
        <div className={styles.btnWrap}>
          <Link to="/attractions" className={styles.btn}>View Attractions</Link>
        </div>
      </div>
    </section>
  )
}
