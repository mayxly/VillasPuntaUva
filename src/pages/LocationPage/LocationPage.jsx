import styles from './LocationPage.module.css'
import { useLanguage } from '../../i18n/LanguageContext'
import PhotoCarousel from '../../components/PhotoCarousel/PhotoCarousel'

// Excludes 2, 4, 5, 10, 12, and 13 — already shown elsewhere on this page
// (beach, area, sister-properties, compare, proof sections, and the hero).
const BEACH_PHOTO_IDS = [3, 8, 9, 11, 14, 15, 16, 17]
const BEACH_PHOTOS = BEACH_PHOTO_IDS.map((id) => `/images/beach/beach-${id}.webp`)

const GOOGLE_MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=Villas+Punta+Uva%2C+Puerto+Viejo%2C+Lim%C3%B3n%2C+Costa+Rica'
const PUNTA_UVA_BEACH_MAPS_URL = 'https://maps.app.goo.gl/FcyoXvCmKSrKsCDD7'
const VILLAS_ARRECIFE_WAZE_URL = 'https://waze.com/ul/hd1tny67yu'

const CITATION_LINKS = {
  cite1: 'https://ticotimes.net/2025/05/13/costa-ricas-punta-uva-beach-named-among-top-50-beaches-for-2025',
  cite2: 'https://ticotimes.net/2026/03/22/costa-rica-named-best-nature-destination-at-forbes-travel-awards-2026',
}

export default function LocationPage() {
  const { t } = useLanguage()

  const galleryPhotos = BEACH_PHOTOS.map((src, index) => ({
    id: BEACH_PHOTO_IDS[index],
    src,
    alt: t('pages.locationGallery'),
  }))

  const citations = [
    {
      title: t('pages.locationProofCite1Title'),
      text: t('pages.locationProofCite1Text'),
      source: t('pages.locationProofCite1Source'),
      url: CITATION_LINKS.cite1,
    },
    {
      title: t('pages.locationProofCite2Title'),
      text: t('pages.locationProofCite2Text'),
      source: t('pages.locationProofCite2Source'),
      url: CITATION_LINKS.cite2,
    },
  ]

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <img
            src="/images/logos/logo-white.png"
            alt=""
            className={styles.heroIcon}
          />
          <h1 className={styles.heroTitle}>{t('pages.location')}</h1>
          <p className={styles.heroText}>{t('pages.locationHero')}</p>
        </div>
      </section>

      {/* Section 1: Location to the beach */}
      <section className={styles.beachSection}>
        <div
          className={styles.beachImage}
          style={{ backgroundImage: "url('/images/beach/beach-2.webp')" }}
          role="img"
          aria-label={t('pages.locationBeachHeading')}
        />
        <div className={styles.beachContent}>
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{t('pages.locationBeachEyebrow')}</p>
            <h2>{t('pages.locationBeachHeading')}</h2>
          </div>
          <p className={styles.bodyText}>{t('pages.locationBeachText')}</p>
          <a
            href={PUNTA_UVA_BEACH_MAPS_URL}
            target="_blank"
            rel="noreferrer"
            className={styles.mapBtn}
          >
            {t('pages.locationBeachDirections')}
          </a>
        </div>
      </section>

      {/* Section 2: Where we're located / getting around */}
      <section className={styles.areaSection}>
        <div className={styles.areaContent}>
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>{t('pages.locationAreaEyebrow')}</p>
            <h2>{t('pages.locationAreaHeading')}</h2>
          </div>
          <p className={styles.bodyText}>{t('pages.locationAreaText')}</p>
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noreferrer"
            className={styles.mapBtn}
          >
            {t('pages.locationGetDirections')}
          </a>
        </div>
        <div
          className={styles.areaImage}
          style={{ backgroundImage: "url('/images/beach/beach-4.webp')" }}
          role="img"
          aria-label={t('pages.locationAreaHeading')}
        />
      </section>

      {/* Section 3: Villas Punta Uva & sister property Villas Arrecife */}
      <section className={styles.sisterSection}>
        <div className={styles.sisterText}>
          <p className={styles.eyebrow}>{t('pages.locationSisterEyebrow')}</p>
          <h2>{t('pages.locationSisterHeading')}</h2>
          <p className={styles.bodyText}>{t('pages.locationSisterText')}</p>
          <a
            href={VILLAS_ARRECIFE_WAZE_URL}
            target="_blank"
            rel="noreferrer"
            className={styles.mapBtn}
          >
            {t('pages.locationSisterBtn')}
          </a>
        </div>
        <div
          className={styles.sisterImage}
          style={{ backgroundImage: "url('/images/beach/beach-10.webp')" }}
          role="img"
          aria-label={t('pages.locationSisterHeading')}
        />
      </section>

      {/* Section 4: Caribbean side vs Pacific side */}
      <section className={styles.compareSection}>
        <div className={styles.compareText}>
          <p className={styles.eyebrow}>{t('pages.locationCompareEyebrow')}</p>
          <h2>{t('pages.locationCompareHeading')}</h2>
          <p className={styles.bodyText}>{t('pages.locationCompareText')}</p>
        </div>
        <div className={styles.compareImages}>
          <div
            className={styles.compareImage}
            style={{ backgroundImage: "url('/images/hero/arrecife-beach.webp')" }}
            role="img"
            aria-label={t('pages.locationCompareHeading')}
          />
          <div
            className={styles.compareImage}
            style={{ backgroundImage: "url('/images/beach/beach-13.webp')" }}
            role="img"
            aria-label={t('pages.locationCompareHeading')}
          />
        </div>
      </section>

      <section
        className={styles.proofSection}
        style={{ backgroundImage: "url('/images/beach/beach-5.webp')" }}
      >
        <div className={styles.proofContent}>
          <p className={styles.eyebrowLight}>{t('pages.locationProofEyebrow')}</p>
          <h2 className={styles.proofHeading}>{t('pages.locationProofHeading')}</h2>

          <div className={styles.citations}>
            {citations.map((citation) => (
              <a
                key={citation.title}
                href={citation.url}
                target="_blank"
                rel="noreferrer"
                className={styles.citationCard}
              >
                <h3 className={styles.citationTitle}>{citation.title}</h3>
                <p className={styles.citationText}>{citation.text}</p>
                <span className={styles.citationSource}>{citation.source}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.gallerySection}>
        <h2 className={styles.galleryHeading}>{t('pages.locationGallery')}</h2>
        <p className={styles.galleryText}>{t('pages.locationGalleryText')}</p>
        <PhotoCarousel photos={galleryPhotos} />
      </section>
    </div>
  )
}
