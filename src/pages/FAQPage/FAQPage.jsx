import { useState } from 'react'
import { LuChevronDown } from 'react-icons/lu'
import styles from './FAQPage.module.css'
import { useLanguage } from '../../i18n/LanguageContext'

const faqsEn = [
  {
    question: 'How many guests can each villa sleep?',
    answer: 'It varies by villa, from a 2-guest studio up to a 10-guest villa. Each villa also allows a couple of extra guests beyond its base capacity for a nightly fee. Check each villa’s page for its exact capacity.',
  },
  {
    question: 'Is there a minimum number of nights?',
    answer: 'Most villas require a 2-night minimum stay. Villa Carey and Villa Colibri have no minimum, so a single night is available at those two.',
  },
  {
    question: 'Do children count as guests?',
    answer: 'Kids 5 and under stay free and do not count toward your guest total.',
  },
  {
    question: 'Is there a fee for extra guests?',
    answer: 'Yes, $15 per night for each guest beyond a villa’s base capacity.',
  },
  {
    question: 'Can I bring a pet?',
    answer: 'Yes, every villa is pet-friendly. Pets are $10 per night.',
  },
  {
    question: 'Does pricing change during the holidays?',
    answer: 'Yes, holiday rates apply for Christmas (Dec 19–30) and New Year’s (Dec 31–Jan 2), shown automatically when those dates are selected.',
  },
  {
    question: 'Are there any discounts available?',
    answer: 'Yes — stays of 7 nights or more receive 10% off, and bookings made within 7 days of arrival also receive a 10% last-minute discount.',
  },
  {
    question: 'How do I book?',
    answer: 'Message us on WhatsApp at +506 6145 9916, or reserve directly through this site to avoid third-party platform fees.',
  },
  {
    question: 'Where are the villas located?',
    answer: 'Punta Uva, Puerto Viejo, Limón, Costa Rica.',
  },
  {
    question: 'What if my question isn’t answered here?',
    answer: 'Message us on WhatsApp at +506 6145 9916 or email villaspuntauva@gmail.com — we’re happy to help.',
  },
]

const faqsEs = [
  {
    question: '¿Cuántos huéspedes caben en cada villa?',
    answer: 'Varía según la villa, desde un estudio para 2 personas hasta una villa para 10. Cada villa también permite algunos huéspedes adicionales sobre su capacidad base por un cargo por noche. Consulte la página de cada villa para ver su capacidad exacta.',
  },
  {
    question: '¿Hay un mínimo de noches?',
    answer: 'La mayoría de las villas requieren una estadía mínima de 2 noches. Villa Carey y Villa Colibrí no tienen mínimo, por lo que una sola noche está disponible en esas dos.',
  },
  {
    question: '¿Los niños cuentan como huéspedes?',
    answer: 'Los niños de 5 años o menos se hospedan gratis y no cuentan dentro del total de huéspedes.',
  },
  {
    question: '¿Hay un cargo por huéspedes adicionales?',
    answer: 'Sí, $15 por noche por cada huésped adicional a la capacidad base de la villa.',
  },
  {
    question: '¿Puedo llevar una mascota?',
    answer: 'Sí, todas las villas son pet-friendly. Las mascotas tienen un costo de $10 por noche.',
  },
  {
    question: '¿Las tarifas cambian en fechas festivas?',
    answer: 'Sí, se aplican tarifas especiales en Navidad (19–30 de diciembre) y Año Nuevo (31 de diciembre–2 de enero), que se muestran automáticamente al seleccionar esas fechas.',
  },
  {
    question: '¿Hay descuentos disponibles?',
    answer: 'Sí: las estadías de 7 noches o más reciben un 10% de descuento, y las reservas hechas dentro de los 7 días previos a la llegada también reciben un 10% de descuento de última hora.',
  },
  {
    question: '¿Cómo puedo reservar?',
    answer: 'Envíenos un mensaje por WhatsApp al +506 6145 9916, o reserve directamente en este sitio para evitar cargos de plataformas externas.',
  },
  {
    question: '¿Dónde están ubicadas las villas?',
    answer: 'Punta Uva, Puerto Viejo, Limón, Costa Rica.',
  },
  {
    question: '¿Y si mi pregunta no está aquí?',
    answer: 'Escríbanos por WhatsApp al +506 6145 9916 o al correo villaspuntauva@gmail.com — con gusto le ayudamos.',
  },
]

function FAQItem({ question, answer, open, onToggle }) {
  return (
    <div className={styles.item}>
      <button type="button" className={styles.question} onClick={onToggle} aria-expanded={open}>
        <span>{question}</span>
        <LuChevronDown size={18} className={open ? styles.chevronOpen : styles.chevron} />
      </button>
      {open && <p className={styles.answer}>{answer}</p>}
    </div>
  )
}

export default function FAQPage() {
  const { language } = useLanguage()
  const faqs = language === 'es' ? faqsEs : faqsEn
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <img src="/images/logos/logo-white.png" alt="" className={styles.heroIcon} />
          <h1 className={styles.heroTitle}>{language === 'es' ? 'Preguntas frecuentes' : 'Frequently Asked Questions'}</h1>
          <p className={styles.heroText}>
            {language === 'es'
              ? 'Respuestas rápidas sobre reservar y hospedarse con nosotros.'
              : 'Quick answers about booking and staying with us.'}
          </p>
        </div>
      </section>

      <section className={styles.list}>
        {faqs.map((faq, index) => (
          <FAQItem
            key={faq.question}
            question={faq.question}
            answer={faq.answer}
            open={openIndex === index}
            onToggle={() => setOpenIndex((current) => (current === index ? null : index))}
          />
        ))}
      </section>
    </div>
  )
}
