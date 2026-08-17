import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import ScrollRestoration from './components/ScrollRestoration/ScrollRestoration'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import HomePage from './pages/HomePage/HomePage'
import SuitesPage from './pages/SuitesPage/SuitesPage'
import SuiteDetailPage from './pages/SuiteDetailPage/SuiteDetailPage'
import AboutPage from './pages/AboutPage/AboutPage'
import AttractionsPage from './pages/AttractionsPage/AttractionsPage'
import ContactPage from './pages/ContactPage/ContactPage'
import FAQPage from './pages/FAQPage/FAQPage'

export default function App() {
  return (
    <>
      <ScrollRestoration />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/suites" element={<SuitesPage />} />
          <Route path="/suites/:slug" element={<SuiteDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/attractions" element={<AttractionsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
        </Routes>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
