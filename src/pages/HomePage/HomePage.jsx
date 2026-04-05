import Hero from '../../sections/Hero/Hero'
import BookingWidget from '../../sections/BookingWidget/BookingWidget'
import SuitesGallery from '../../sections/SuitesGallery/SuitesGallery'
import AboutPreview from '../../sections/AboutPreview/AboutPreview'
import Attractions from '../../sections/Attractions/Attractions'
import AboutUs from '../../sections/AboutUs/AboutUs'
import Reviews from '../../sections/Reviews/Reviews'

export default function HomePage() {
  return (
    <>
      <Hero />
      <BookingWidget />
      <SuitesGallery />
      <AboutPreview />
      <Attractions />
      <AboutUs />
      <Reviews />
    </>
  )
}
