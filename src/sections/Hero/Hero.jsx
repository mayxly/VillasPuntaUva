import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <img
          src="/images/logos/logo-white.png"
          alt=""
          className={styles.icon}
        />
        <h1 className={styles.title}>Villas Arrecife</h1>
        <p className={styles.subtitle}>
          Private Beach Villas in Punta Uva & Arrecife, Costa Rica
        </p>
      </div>
    </section>
  )
}
