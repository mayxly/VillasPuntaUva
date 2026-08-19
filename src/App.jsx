import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import ScrollRestoration from './components/ScrollRestoration/ScrollRestoration'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import HomePage from './pages/HomePage/HomePage'
import SuitesPage from './pages/SuitesPage/SuitesPage'
import SuiteDetailPage from './pages/SuiteDetailPage/SuiteDetailPage'
import LocationPage from './pages/LocationPage/LocationPage'
import AboutPage from './pages/AboutPage/AboutPage'
import AttractionsPage from './pages/AttractionsPage/AttractionsPage'
import ContactPage from './pages/ContactPage/ContactPage'
import FAQPage from './pages/FAQPage/FAQPage'

// Each route is also registered under an /es prefix, so the Spanish version
// of every page has its own crawlable, indexable URL (see LanguageContext).
const routes = [
  { path: '/', element: <HomePage /> },
  { path: '/suites', element: <SuitesPage /> },
  { path: '/suites/:slug', element: <SuiteDetailPage /> },
  { path: '/location', element: <LocationPage /> },
  { path: '/about', element: <AboutPage /> },
  { path: '/attractions', element: <AttractionsPage /> },
  { path: '/contact', element: <ContactPage /> },
  { path: '/faq', element: <FAQPage /> },
]

export default function App() {
  return (
    <>
      <ScrollRestoration />
      <Navbar />
      <main>
        <Routes>
          {routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
          {routes.map(({ path, element }) => (
            <Route key={`es-${path}`} path={path === '/' ? '/es' : `/es${path}`} element={element} />
          ))}
        </Routes>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
