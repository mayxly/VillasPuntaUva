import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import HomePage from './pages/HomePage/HomePage'
import SuitesPage from './pages/SuitesPage/SuitesPage'
import SuiteDetailPage from './pages/SuiteDetailPage/SuiteDetailPage'
import AboutPage from './pages/AboutPage/AboutPage'
import AttractionsPage from './pages/AttractionsPage/AttractionsPage'
import ContactPage from './pages/ContactPage/ContactPage'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/suites" element={<SuitesPage />} />
          <Route path="/suites/:slug" element={<SuiteDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/attractions" element={<AttractionsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
