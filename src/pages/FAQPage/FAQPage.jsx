import { useState } from 'react'
import { LuChevronDown } from 'react-icons/lu'
import styles from './FAQPage.module.css'
import { useLanguage } from '../../i18n/LanguageContext'
import SEO from '../../components/SEO/SEO'

const seoText = {
  en: {
    title: 'Frequently Asked Questions | Villas Punta Uva',
    description: 'Answers about booking, minimum stays, pets, discounts, cancellation policy, and amenities at Villas Punta Uva in Punta Uva, Costa Rica.',
  },
  es: {
    title: 'Preguntas Frecuentes | Villas Punta Uva',
    description: 'Respuestas sobre reservas, estadías mínimas, mascotas, descuentos, política de cancelación y comodidades en Villas Punta Uva, Costa Rica.',
  },
}

const faqSectionsEn = [
  {
    title: 'Villas',
    items: [
      {
        question: 'How many guests can each villa sleep?',
        answer: 'It varies by villa, from a 2-guest studio up to a 10-guest villa. Each villa also allows a couple of extra guests beyond its base capacity for a nightly fee. Check each villa’s page for its exact capacity.',
      },
      {
        question: 'Where are the villas located?',
        answer: 'Punta Uva, Puerto Viejo, Limón, Costa Rica.',
      },
      {
        question: 'How far is the beach from the house?',
        answer: 'Most villas are about a 5-minute walk to Arrecife/Punta Uva Beach. Villa Cacha and Villa Carey are about a 7-minute walk.',
      },
      {
        question: 'Is there a washer and dryer available?',
        answer: 'Yes, in Villa Mariposa, Villa Presidente, Villa Angel, Villa Cacha, and Villa Carey. Villa Tucan and Villa Colibrí do not have an in-unit washer/dryer.',
      },
      {
        question: 'Do you have a safe for valuables?',
        answer: 'Yes, a small safe is available in every villa for passports and valuables.',
      },
      {
        question: 'Is there parking available? Do I need a 4x4 vehicle? Can I get there without a car?',
        answer: 'We have free private parking located inside a gated property. We are located just off the main road and a 4x4 is not necessary — you can move around easily by bike, ATV, motorcycle, and more.',
      },
    ],
  },
  {
    title: 'Reservations and Policies',
    items: [
      {
        question: 'Is there a minimum number of nights?',
        answer: 'Most villas require a 2-night minimum stay. Villa Carey and Villa Colibrí have no minimum, so a single night is available at those two.',
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
        answer: 'Yes — stays of 7 nights or more receive 10% off, stays of 28 nights or more (monthly stays) receive 35% off, and bookings made within 7 days of arrival also receive a 10% last-minute discount.',
      },
      {
        question: 'Is early check-in or late check-out available?',
        answer: 'It depends on whether we have another reservation right before or after yours. When it’s available, up to 2 hours early or late is usually free — anything beyond that comes with an extra fee. Message us on WhatsApp ahead of your stay and we’ll let you know what’s possible for your dates.',
      },
      {
        question: 'How do I book?',
        answer: 'Message us on WhatsApp at +506 6145 9916 to book your stay.',
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'Zelle, Canadian e-Transfer, Wise, national SINPE or bank transfer, and on some occasions international wire transfer.',
      },
      {
        question: 'What is your cancellation policy?',
        answer: 'A 50% deposit is required to confirm your reservation and block your dates. Cancel up to 14 days before arrival for a full refund of your deposit. The remaining 50% balance is due exactly 14 days before arrival. Cancellations made within 14 days of arrival are not eligible for a refund.',
      },
    ],
  },
  {
    title: 'Services and Amenities',
    items: [
      {
        question: 'Do you provide beach towels and beach chairs?',
        answer: 'Yes.',
      },
      {
        question: 'Could you help us book a private chef, daily cleaning, or massages at the villa?',
        answer: 'Yes, we can provide the contacts for all of that once you’ve reserved.',
      },
      {
        question: 'What tours do you recommend for us?',
        answer: 'In the Caribbean, there are plenty of tours to choose from, including our favorites: ziplining, surf lessons, chocolate tours, horseback riding, bird/animal night tours, and snorkel tours.',
      },
      {
        question: 'Is the tap water safe to drink?',
        answer: 'Yes, it is, but we recommend drinking the filtered water we provide at our water dispenser. Not included at Villa Colibrí.',
      },
      {
        question: 'What if my question isn’t answered here?',
        answer: 'Message us on WhatsApp at +506 6145 9916 or email villaspuntauva@gmail.com — we’re happy to help.',
      },
    ],
  },
]

const faqSectionsEs = [
  {
    title: 'Villas',
    items: [
      {
        question: '¿Cuántos huéspedes caben en cada villa?',
        answer: 'Varía según la villa, desde un estudio para 2 personas hasta una villa para 10. Cada villa también permite algunos huéspedes adicionales sobre su capacidad base por un cargo por noche. Consulte la página de cada villa para ver su capacidad exacta.',
      },
      {
        question: '¿Dónde están ubicadas las villas?',
        answer: 'Punta Uva, Puerto Viejo, Limón, Costa Rica.',
      },
      {
        question: '¿Qué tan lejos está la playa de la casa?',
        answer: 'La mayoría de las villas están a unos 5 minutos caminando de la playa Arrecife/Punta Uva. Villa Cacha y Villa Carey están a unos 7 minutos caminando.',
      },
      {
        question: '¿Hay lavadora y secadora disponibles?',
        answer: 'Sí, en Villa Mariposa, Villa Presidente, Villa Angel, Villa Cacha y Villa Carey. Villa Tucan y Villa Colibrí no cuentan con lavadora/secadora en la unidad.',
      },
      {
        question: '¿Tienen caja fuerte para objetos de valor?',
        answer: 'Sí, cada villa cuenta con una pequeña caja fuerte para pasaportes y objetos de valor.',
      },
      {
        question: '¿Hay estacionamiento disponible? ¿Necesito un vehículo 4x4? ¿Puedo llegar sin carro?',
        answer: 'Contamos con estacionamiento privado y gratuito dentro de una propiedad cerrada. Estamos ubicados a poca distancia de la carretera principal y no se necesita un 4x4 — puede moverse fácilmente en bicicleta, ATV, motocicleta y más.',
      },
    ],
  },
  {
    title: 'Reservas y políticas',
    items: [
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
        answer: 'Sí: las estadías de 7 noches o más reciben un 10% de descuento, las estadías de 28 noches o más (mensuales) reciben un 35% de descuento, y las reservas hechas dentro de los 7 días previos a la llegada también reciben un 10% de descuento de última hora.',
      },
      {
        question: '¿Está disponible el check-in temprano o el check-out tardío?',
        answer: 'Depende de si tenemos otra reserva justo antes o después de la suya. Cuando está disponible, hasta 2 horas antes o después suele ser gratis — cualquier tiempo adicional tiene un cargo extra. Escríbanos por WhatsApp antes de su estadía y le confirmamos qué es posible para sus fechas.',
      },
      {
        question: '¿Cómo puedo reservar?',
        answer: 'Envíenos un mensaje por WhatsApp al +506 6145 9916 para reservar su estadía.',
      },
      {
        question: '¿Qué métodos de pago aceptan?',
        answer: 'Zelle, e-Transfer canadiense, Wise, SINPE nacional o transferencia bancaria, y en algunas ocasiones transferencia bancaria internacional.',
      },
      {
        question: '¿Cuál es su política de cancelación?',
        answer: 'Se requiere un depósito del 50% para confirmar su reserva y bloquear sus fechas. Puede cancelar hasta 14 días antes de la llegada y recibirá un reembolso completo de su depósito. El 50% restante del pago se solicita exactamente 14 días antes de la llegada. Las cancelaciones realizadas dentro de los 14 días previos a la llegada no son elegibles para reembolso.',
      },
    ],
  },
  {
    title: 'Servicios y comodidades',
    items: [
      {
        question: '¿Proveen toallas de playa y sillas de playa?',
        answer: 'Sí.',
      },
      {
        question: '¿Nos pueden ayudar a reservar chef privado, limpieza diaria o masajes en la villa?',
        answer: 'Sí, podemos brindarle los contactos para todo eso una vez que haya reservado.',
      },
      {
        question: '¿Qué tours nos recomiendan?',
        answer: 'En el Caribe hay muchos tours entre los cuales elegir, incluyendo nuestros favoritos: canopy, clases de surf, tours de chocolate, cabalgatas, tours nocturnos de aves/animales y tours de esnórquel.',
      },
      {
        question: '¿Es segura el agua del grifo para beber?',
        answer: 'Sí, lo es, pero recomendamos beber el agua filtrada que ofrecemos en nuestro dispensador de agua. Villa Colibrí no incluida.',
      },
      {
        question: '¿Y si mi pregunta no está aquí?',
        answer: 'Escríbanos por WhatsApp al +506 6145 9916 o al correo villaspuntauva@gmail.com — con gusto le ayudamos.',
      },
    ],
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
  const sections = language === 'es' ? faqSectionsEs : faqSectionsEn
  const [openKey, setOpenKey] = useState('0-0')
  const seo = seoText[language]

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: sections.flatMap((section) => section.items).map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }

  return (
    <div className={styles.page}>
      <SEO title={seo.title} description={seo.description} path="/faq" jsonLd={faqJsonLd} />
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
        {sections.map((section, sectionIndex) => (
          <div key={section.title} className={styles.section}>
            <h2 className={styles.sectionTitle}>{section.title}</h2>
            <div className={styles.sectionItems}>
              {section.items.map((faq, itemIndex) => {
                const key = `${sectionIndex}-${itemIndex}`
                return (
                  <FAQItem
                    key={faq.question}
                    question={faq.question}
                    answer={faq.answer}
                    open={openKey === key}
                    onToggle={() => setOpenKey((current) => (current === key ? null : key))}
                  />
                )
              })}
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
