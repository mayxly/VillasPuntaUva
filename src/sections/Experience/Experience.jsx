import { useMemo } from 'react'
import styles from './Experience.module.css'
import { useLanguage } from '../../i18n/LanguageContext'
import PhotoCarousel from '../../components/PhotoCarousel/PhotoCarousel'

const CATEGORY_LABELS = {
  en: {
    nomads: 'Digital Nomads',
    families: 'Families',
    solos: 'Solo Travelers',
    couples: 'Couples',
    friends: 'Groups of Friends',
  },
  es: {
    nomads: 'Nómadas Digitales',
    families: 'Familias',
    solos: 'Viajeros Solos',
    couples: 'Parejas',
    friends: 'Grupos de Amigos',
  },
}

// Each lifestyle photo hand-tagged to match what's actually pictured.
const PHOTO_CATEGORIES = {
  1: 'solos',
  2: 'solos',
  3: 'solos',
  4: 'solos',
  5: 'nomads',
  6: 'nomads',
  7: 'solos',
  8: 'solos',
  9: 'families',
  10: 'families',
  11: 'families',
  12: 'families',
  13: 'solos',
  14: 'solos',
  15: 'friends',
  16: 'solos',
  17: 'friends',
  18: 'solos',
  20: 'friends',
  21: 'solos',
  22: 'couples',
  23: 'couples',
  24: 'friends',
  25: 'solos',
  26: 'solos',
  27: 'friends',
  28: 'friends',
  29: 'friends',
  30: 'friends',
  31: 'solos',
  32: 'families',
  33: 'families',
  34: 'families',
  35: 'couples',
}

function shuffle(array) {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export default function Experience() {
  const { language, t } = useLanguage()

  const photoOrder = useMemo(() => {
    const base = Object.keys(PHOTO_CATEGORIES).map(Number)
    return shuffle(base)
  }, [])

  const categoryLabels = CATEGORY_LABELS[language] || CATEGORY_LABELS.en

  const photos = photoOrder.map((id) => ({
    id,
    src: `/images/about/lifestyle/experience${id}.webp`,
    alt: categoryLabels[PHOTO_CATEGORIES[id]],
  }))

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>{t('home.experienceHeading')}</h2>
        <p className={styles.subheading}>{t('home.experienceText')}</p>

        <PhotoCarousel photos={photos} />
      </div>
    </section>
  )
}
