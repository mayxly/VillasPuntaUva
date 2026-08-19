import { useNavigate } from 'react-router-dom'
import Hero from '../../sections/Hero/Hero'
import BookingWidget from '../../sections/BookingWidget/BookingWidget'
import Location from '../../sections/Location/Location'
import SuitesGallery from '../../sections/SuitesGallery/SuitesGallery'
import Experience from '../../sections/Experience/Experience'
import Attractions from '../../sections/Attractions/Attractions'
import AboutUs from '../../sections/AboutUs/AboutUs'
import Reviews from '../../sections/Reviews/Reviews'
import SEO from '../../components/SEO/SEO'
import { useLanguage } from '../../i18n/LanguageContext'

const seoText = {
  en: {
    title: 'Villas Punta Uva | Luxury Vacation Rentals Near Punta Uva Beach, Costa Rica',
    description: 'Private luxury villas steps from Punta Uva Beach in Puerto Viejo, Costa Rica. Shared infinity pool, jungle views, and villas for couples, families, and groups. Book direct.',
  },
  es: {
    title: 'Villas Punta Uva | Villas de Lujo Cerca de Playa Punta Uva, Costa Rica',
    description: 'Villas privadas de lujo a pasos de Playa Punta Uva en Puerto Viejo, Costa Rica. Piscina infinita compartida, vistas a la selva, y villas para parejas, familias y grupos. Reserve directo.',
  },
}

function formatDateParam(date) {
  if (!date) return ''

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export default function HomePage() {
  const navigate = useNavigate()
  const { language, localizePath } = useLanguage()
  const seo = seoText[language]

  const handleSuiteSearch = ({ arrival, departure, guests, kidsUnder5, pets }) => {
    const params = new URLSearchParams()
    const arrivalParam = formatDateParam(arrival)
    const departureParam = formatDateParam(departure)

    if (arrivalParam) params.set('arrival', arrivalParam)
    if (departureParam) params.set('departure', departureParam)
    if (guests) params.set('guests', guests)
    if (kidsUnder5) params.set('kidsUnder5', kidsUnder5)
    if (pets) params.set('pets', pets)

    navigate(localizePath(`/suites${params.toString() ? `?${params.toString()}` : ''}#available-suites`))
  }

  return (
    <>
      <SEO title={seo.title} description={seo.description} path="/" />
      <Hero />
      <BookingWidget onSearch={handleSuiteSearch} />
      <Location />
      <SuitesGallery />
      <Experience />
      <Attractions />
      <AboutUs />
      <Reviews />
    </>
  )
}
