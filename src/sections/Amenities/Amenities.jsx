import { Link } from 'react-router-dom'
import { amenities } from '../../data/amenities'
import styles from './Amenities.module.css'

export default function Amenities() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Amenities</h2>
        <p className={styles.subheading}>
          Everything you need for a perfect stay
        </p>
        <div className={styles.grid}>
          {amenities.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.id} className={styles.item}>
                <div className={styles.iconWrap}>
                  <Icon size={32} />
                </div>
                <span className={styles.name}>{item.name}</span>
              </div>
            )
          })}
        </div>
        <div className={styles.btnWrap}>
          <Link to="/amenities" className={styles.btn}>View Amenities</Link>
        </div>
      </div>
    </section>
  )
}
