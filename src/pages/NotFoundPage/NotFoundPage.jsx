import { Link } from 'react-router-dom'
import styles from './NotFoundPage.module.css'
import { useLanguage } from '../../i18n/LanguageContext'
import SEO from '../../components/SEO/SEO'

const copy = {
  en: {
    title: 'Page Not Found',
    text: "The page you're looking for doesn't exist or may have moved.",
    back: 'Back to Home',
  },
  es: {
    title: 'Página No Encontrada',
    text: 'La página que busca no existe o pudo haberse movido.',
    back: 'Volver al Inicio',
  },
}

export default function NotFoundPage() {
  const { language, localizePath } = useLanguage()
  const { title, text, back } = copy[language]

  return (
    <div className={styles.page}>
      <SEO
        title={`${language === 'es' ? 'Página No Encontrada' : 'Page Not Found'} | Villas Punta Uva`}
        description={text}
        path="/404"
        noindex
      />
      <div className={styles.content}>
        <img src="/images/logos/logo-black-text.png" alt="" className={styles.icon} />
        <span className={styles.code}>404</span>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.text}>{text}</p>
        <Link to={localizePath('/')} className={styles.link}>{back}</Link>
      </div>
    </div>
  )
}
