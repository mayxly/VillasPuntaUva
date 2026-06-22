import { useNavigate } from 'react-router-dom'
import Hero from '../../sections/Hero/Hero'
import BookingWidget from '../../sections/BookingWidget/BookingWidget'
import SuitesGallery from '../../sections/SuitesGallery/SuitesGallery'
import AboutPreview from '../../sections/AboutPreview/AboutPreview'
import Attractions from '../../sections/Attractions/Attractions'
import AboutUs from '../../sections/AboutUs/AboutUs'
import Reviews from '../../sections/Reviews/Reviews'

function formatDateParam(date) {
  if (!date) return ''

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export default function HomePage() {
  const navigate = useNavigate()

  const handleSuiteSearch = ({ arrival, departure, guests }) => {
    const params = new URLSearchParams()
    const arrivalParam = formatDateParam(arrival)
    const departureParam = formatDateParam(departure)

    if (arrivalParam) params.set('arrival', arrivalParam)
    if (departureParam) params.set('departure', departureParam)
    if (guests) params.set('guests', guests)

    navigate(`/suites${params.toString() ? `?${params.toString()}` : ''}`)
  }

  return (
    <>
      <Hero />
      <BookingWidget onSearch={handleSuiteSearch} />
      <SuitesGallery />
      <AboutPreview />
      <Attractions />
      <AboutUs />
      <Reviews />
    </>
  )
}
