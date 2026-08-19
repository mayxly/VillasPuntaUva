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
    description: "Steps from one of Costa Rica's most beautiful beaches, Villas Punta Uva brings families, friends, and couples together for laid-back luxury wrapped in jungle and Caribbean sea air.",
  },
  es: {
    title: 'Villas Punta Uva | Villas de Lujo Cerca de Playa Punta Uva, Costa Rica',
    description: 'A pasos de una de las playas más hermosas de Costa Rica, Villas Punta Uva reúne a familias, amigos y parejas en un lujo relajado, rodeado de selva y aire del mar Caribe.',
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
