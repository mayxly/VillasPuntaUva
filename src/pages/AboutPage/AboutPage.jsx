import styles from './AboutPage.module.css'

const values = [
  {
    title: 'Family-run hospitality',
    text: 'Villas Punta Uva is a family business built with care, intention, and a love for welcoming guests into this corner of Costa Rica.',
  },
  {
    title: 'Luxury in nature',
    text: 'The homes are designed for comfort while keeping the jungle, wildlife, and Caribbean coast at the heart of the experience.',
  },
  {
    title: 'A place to slow down',
    text: 'Guests come for the beaches, food, culture, and wildlife, then settle into the simple rhythm of life in Punta Uva.',
  },
]

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <img
            src="/images/logos/logo-white.png"
            alt=""
            className={styles.heroIcon}
          />
          <h1>About Us</h1>
          <p>
            A family-built retreat shaped by a long love for Costa Rica, the Caribbean coast,
            and the rare feeling of luxury surrounded by jungle.
          </p>
        </div>
      </section>

      <section className={styles.story}>
        <div className={styles.storyText}>
          <p className={styles.eyebrow}>Our Story</p>
          <h2>From a dream of Costa Rica to a home in Punta Uva</h2>
          <p>
            Since 2011, our family has travelled through much of Costa Rica and kept returning to
            the beauty that first captured us: the jungle, the wildlife, the warmth of the people,
            the culture, and the food.
          </p>
          <p>
            The Caribbean coast became the place that felt most like home. Its beaches, wildlife,
            and easygoing rhythm inspired the dream of creating luxury vacation homes where guests
            could feel close to nature without giving up comfort.
          </p>
        </div>

        <div className={styles.storyImage} aria-label="Villas Punta Uva hosts" role="img" />
      </section>

      <section className={styles.family}>
        <div className={styles.familyInner}>
          <p className={styles.eyebrow}>A Family Business</p>
          <h2>Built to share the place we love</h2>
          <p>
            Villas Punta Uva is the result of a family dream that came to life sooner than expected:
            after moving from Canada to Punta Uva in 2021, paradise became home, and the vision for
            these villas became part of everyday life.
          </p>
          <p>
            The goal has always been simple: build something meaningful and share this beautiful
            country with guests from around the world.
          </p>
        </div>
      </section>

      <section className={styles.experience}>
        <div className={styles.experienceHeader}>
          <p className={styles.eyebrow}>Life on the Caribbean Coast</p>
          <h2>What guests feel here</h2>
        </div>

        <div className={styles.valueGrid}>
          {values.map((value) => (
            <article key={value.title} className={styles.valueCard}>
              <h3>{value.title}</h3>
              <p>{value.text}</p>
            </article>
          ))}
        </div>

        <div className={styles.photoPlaceholders}>
          <div className={styles.photoPlaceholder}>
            <span>Photo placeholder</span>
            <p>Add a family or host photo here.</p>
          </div>
          <div className={styles.photoPlaceholder}>
            <span>Photo placeholder</span>
            <p>Add a villa, beach, or jungle lifestyle photo here.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
