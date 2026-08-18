import { useNavigate } from 'react-router-dom'
import Hero from '../../sections/Hero/Hero'
import BookingWidget from '../../sections/BookingWidget/BookingWidget'
import Location from '../../sections/Location/Location'
import SuitesGallery from '../../sections/SuitesGallery/SuitesGallery'
import Experience from '../../sections/Experience/Experience'
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

  const handleSuiteSearch = ({ arrival, departure, guests, kidsUnder5, pets }) => {
    const params = new URLSearchParams()
    const arrivalParam = formatDateParam(arrival)
    const departureParam = formatDateParam(departure)

    if (arrivalParam) params.set('arrival', arrivalParam)
    if (departureParam) params.set('departure', departureParam)
    if (guests) params.set('guests', guests)
    if (kidsUnder5) params.set('kidsUnder5', kidsUnder5)
    if (pets) params.set('pets', pets)

    navigate(`/suites${params.toString() ? `?${params.toString()}` : ''}#available-suites`)
  }

  return (
    <>
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
