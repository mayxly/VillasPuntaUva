import { Link } from 'react-router-dom'
import PlaceholderImage from '../../components/PlaceholderImage/PlaceholderImage'
import styles from './AboutPreview.module.css'

export default function AboutPreview() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.imageCol}>
          <PlaceholderImage label="Villa Photo" aspectRatio="4/3" />
        </div>
        <div className={styles.textCol}>
          <h2 className={styles.heading}>Villas Punta Uva & Arrecife</h2>
          <p className={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vestibulum facilisis lectus, et mollis neque.
            In a ultrices quam, eget commodo ligula. Vestibulum turpis lacus, accumsan a facilisis non, vestibulum maximus
            mauris. Vestibulum consequat sapien rutrum est gravida, sed gravida risus tincidunt. Quisque eu velit sed arcu
            dapibus finibus. 
          </p>
          <Link to="/suites" className={styles.btn}>View Our Suites</Link>
        </div>
      </div>
    </section>
  )
}
