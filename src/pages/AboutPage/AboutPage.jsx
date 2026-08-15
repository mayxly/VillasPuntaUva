import styles from './AboutPage.module.css'
import { useLanguage } from '../../i18n/LanguageContext'

const aboutValues = [
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
    text: 'Guests come for the beaches, food, culture, and wildlife, then settle into the simple rhythm of life in Puerto Viejo.',
  },
]

export default function AboutPage() {
  const { language, t } = useLanguage()
  const spanish = language === 'es'
  const values = spanish ? [
    { title: 'Hospitalidad familiar', text: 'Villas Punta Uva es un negocio familiar construido con cuidado, intención y amor por recibir huéspedes en este rincón de Costa Rica.' },
    { title: 'Lujo en la naturaleza', text: 'Los hogares están diseñados para brindar comodidad y mantener la selva, la vida silvestre y la costa caribeña en el corazón de la experiencia.' },
    { title: 'Un lugar para bajar el ritmo', text: 'Los huéspedes llegan por las playas, la gastronomía, la cultura y la vida silvestre, y se acomodan al ritmo sencillo de Puerto Viejo.' },
  ] : aboutValues
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <img
            src="/images/logos/logo-white.png"
            alt=""
            className={styles.heroIcon}
          />
          <h1>{t('pages.about')}</h1>
          <p>
            {t('pages.aboutHero')}
          </p>
        </div>
      </section>

      <section className={styles.story}>
        <div className={styles.storyText}>
          <p className={styles.eyebrow}>{spanish ? 'Nuestra historia' : 'Our Story'}</p>
          <h2>{spanish ? 'De un sueño en Costa Rica a un hogar en Puerto Viejo' : 'From a dream of Costa Rica to a home in Puerto Viejo'}</h2>
          <p>
            {spanish ? 'Desde 2011, nuestra familia ha recorrido gran parte de Costa Rica y ha vuelto una y otra vez a la belleza que nos conquistó: la selva, la vida silvestre, la calidez de su gente, la cultura y la gastronomía.' : 'Since 2011, our family has travelled through much of Costa Rica and kept returning to the beauty that first captured us: the jungle, the wildlife, the warmth of the people, the culture, and the food.'}
          </p>
          <p>
            {spanish ? 'La costa caribeña se convirtió en el lugar que más se sentía como hogar. Sus playas, vida silvestre y ritmo relajado inspiraron el sueño de crear casas vacacionales de lujo donde los huéspedes pudieran estar cerca de la naturaleza sin renunciar a la comodidad.' : 'The Caribbean coast became the place that felt most like home. Its beaches, wildlife, and easygoing rhythm inspired the dream of creating luxury vacation homes where guests could feel close to nature without giving up comfort.'}
          </p>
        </div>

        <div className={styles.storyImage} aria-label="Villas Punta Uva hosts" role="img" />
      </section>

      <section className={styles.family}>
        <div className={styles.familyInner}>
          <p className={styles.eyebrow}>{spanish ? 'Un negocio familiar' : 'A Family Business'}</p>
          <h2>{spanish ? 'Creado para compartir el lugar que amamos' : 'Built to share the place we love'}</h2>
          <p>
            {spanish ? 'Villas Punta Uva es el resultado de un sueño familiar que cobró vida antes de lo esperado: después de mudarnos de Canadá a la costa caribeña de Costa Rica en 2021, el paraíso se convirtió en nuestro hogar y la visión de estas villas pasó a formar parte de la vida cotidiana.' : 'Villas Punta Uva is the result of a family dream that came to life sooner than expected: after moving from Canada to the Caribbean coast of Costa Rica in 2021, paradise became home, and the vision for these villas became part of everyday life.'}
          </p>
          <p>
            {spanish ? 'El objetivo siempre ha sido sencillo: construir algo significativo y compartir este hermoso país con huéspedes de todo el mundo.' : 'The goal has always been simple: build something meaningful and share this beautiful country with guests from around the world.'}
          </p>
        </div>
      </section>

      <section className={styles.experience}>
        <div className={styles.experienceImage} aria-label="Villas Punta Uva hosts" role="img" />

        <div className={styles.experienceContent}>
          <div className={styles.experienceHeader}>
            <p className={styles.eyebrow}>{spanish ? 'Vida en la costa caribeña' : 'Life on the Caribbean Coast'}</p>
            <h2>{spanish ? 'Lo que sienten los huéspedes aquí' : 'What guests feel here'}</h2>
          </div>

          <ol className={styles.valueGrid}>
            {values.map((value, index) => (
              <li key={value.title} className={styles.valueCard}>
                <span className={styles.valueNumber}>{String(index + 1).padStart(2, '0')}</span>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  )
}
