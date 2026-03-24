import { Link } from 'react-router-dom'
import PlaceholderImage from '../../components/PlaceholderImage/PlaceholderImage'
import styles from './AboutUs.module.css'

export default function AboutUs() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.textCol}>
          <h2 className={styles.heading}>About Us</h2>
          <p className={styles.text}>
            At Villas Arrecife, we are passionate about sharing the magic of Costa Rica's Caribbean
            coast with our guests. Our collection of hand-picked villas in Punta Uva and Arrecife
            offer the perfect blend of comfort and nature, each uniquely designed to provide an
            unforgettable escape surrounded by lush tropical gardens, pristine beaches, and abundant
            wildlife.
          </p>
          <p className={styles.text}>
            Whether you're seeking a romantic getaway, a family adventure, or a peaceful retreat,
            our team is dedicated to making your stay exceptional from start to finish.
          </p>
          <Link to="/about" className={styles.btn}>About Us</Link>
        </div>
        <div className={styles.imageCol}>
          <PlaceholderImage label="About Photo" aspectRatio="4/3" />
        </div>
      </div>
    </section>
  )
}
