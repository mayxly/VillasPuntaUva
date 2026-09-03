import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import ScrollRestoration from './components/ScrollRestoration/ScrollRestoration'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import HomePage from './pages/HomePage/HomePage'
import { useLanguage } from './i18n/LanguageContext'

// Home loads eagerly since it's the most common landing page; every other
// route is code-split into its own chunk so, e.g., visiting /faq doesn't
// also fetch the booking calendar bundle it never uses.
const SuitesPage = lazy(() => import('./pages/SuitesPage/SuitesPage'))
const SuiteDetailPage = lazy(() => import('./pages/SuiteDetailPage/SuiteDetailPage'))
const LocationPage = lazy(() => import('./pages/LocationPage/LocationPage'))
const AboutPage = lazy(() => import('./pages/AboutPage/AboutPage'))
const ExplorePage = lazy(() => import('./pages/ExplorePage/ExplorePage'))
const ContactPage = lazy(() => import('./pages/ContactPage/ContactPage'))
const FAQPage = lazy(() => import('./pages/FAQPage/FAQPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'))

// Each route is also registered under an /es prefix, so the Spanish version
// of every page has its own crawlable, indexable URL (see LanguageContext).
const routes = [
  { path: '/', element: <HomePage /> },
  { path: '/suites', element: <SuitesPage /> },
  { path: '/suites/:slug', element: <SuiteDetailPage /> },
  { path: '/location', element: <LocationPage /> },
  { path: '/about', element: <AboutPage /> },
  { path: '/explore', element: <ExplorePage /> },
  { path: '/contact', element: <ContactPage /> },
  { path: '/faq', element: <FAQPage /> },
]

export default function App() {
  const { language } = useLanguage()

  return (
    <>
      <a href="#main-content" className="skipLink">
        {language === 'es' ? 'Saltar al contenido' : 'Skip to content'}
      </a>
      <ScrollRestoration />
      <Navbar />
      <main id="main-content">
        <Suspense fallback={null}>
          <Routes>
            {routes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
            {routes.map(({ path, element }) => (
              <Route key={`es-${path}`} path={path === '/' ? '/es' : `/es${path}`} element={element} />
            ))}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
