import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const LanguageContext = createContext(null)
const STORAGE_KEY = 'villas-punta-uva-language'

export const locales = { en: 'en-US', es: 'es-CR' }

export const messages = {
  en: {
    nav: { home: 'Home', suites: 'Villas', attractions: 'Attractions', about: 'About Us', contact: 'Contact Us', faqs: 'FAQs', book: 'Book Now', open: 'Open menu', close: 'Close menu', language: 'Language' },
    common: { arrival: 'Arrival Date', departure: 'Departure Date', checkIn: 'Check-in', checkout: 'Checkout', guests: 'Guests', guestsNote: 'Ages 5 and older', selectDate: 'Select date', guest: 'Guest', viewSuites: 'View Suites', reserve: 'Reserve', from: 'from', night: 'night', nights: 'nights', showMore: 'Show more', showLess: 'Show less', close: 'Close', previous: 'Previous', next: 'Next', kid: 'Kid', kids: 'Kids', kidsUnder5: 'Children under 5', kidsUnder5Note: 'Free, does not count as a guest', pet: 'Pet', pets: 'Pets', petsNote: '$10/night per pet', done: 'Done' },
    booking: { modalTitle: 'Ready to book?', modalText: 'Text or WhatsApp us at {{phone}} to book your stay, ask a question, or inquire about availability.', message: 'Message {{phone}}', estimate: 'Estimate your stay', checkoutAfterArrival: 'Please choose a checkout date after your arrival date.', minNightsNote: '{{count}}-night minimum', minNightsError: 'This villa requires a {{count}}-night minimum stay.', clearDates: 'Clear dates', selectGuest: 'Please select at least one guest.', selectArrival: 'Please select an arrival date.', selectDeparture: 'Please select a departure date.', selectDates: 'Select your dates to see an estimated stay total.', nightlySubtotal: 'Nightly subtotal for {{count}} {{unit}}', weeklyDiscount: 'Weekly discount (10%)', lastMinuteDiscount: 'Last-minute discount (10%)', extraGuestFee: 'Extra guest fee ({{count}})', petFee: 'Pet fee ({{count}})', cleaningFee: 'Cleaning fee', estimatedTotal: 'Estimated total' },
    footer: { ready: 'Ready to plan your escape?', text: "Shoot us a text — we'd love to hear from you.", tagline: 'Private Villas in Puerto Viejo, Costa Rica', quickLinks: 'Quick Links', contact: 'Contact', follow: 'Follow Us', rights: 'All rights reserved.' },
    suites: { title: 'Suites', hero: 'Browse private villas shaped for quiet mornings, salt-air afternoons, and effortless Caribbean stays.', listings: 'Suite listings', showingAll: 'Showing all available suites', showingFor: 'Showing available suites for {{count}} {{unit}}', clear: 'Clear search', noMatch: 'No suites match your search', smallerGroup: 'Try a smaller group size to see more villas.', allSuites: 'Show all suites', viewDetails: 'View details', sleeps: 'Sleeps {{count}}', all: 'All suites', special: 'What makes it special', sleep: "Where you'll sleep", offers: 'What this place offers', moreAmenities: 'Show more amenities', lessAmenities: 'Show less amenities', goodToKnow: 'Good to know', rates: '2026 rates', rateHigh: 'High season rates', rateLow: 'Low season rates', weekdays: 'weekdays', weekends: 'weekends', fees: 'Fees and discounts', discount: '10% off for stays of 7+ nights or bookings made within 7 days of arrival', extraGuestFeeNote: '{{amount}}/night per guest over the base capacity', holidayPricingNote: 'Holiday dates pricing may vary.', directBook: 'Book directly with us to avoid third-party platform fees and get the best direct booking experience!', alsoSeen: 'Also seen on', notFound: 'Suite Not Found', missing: "The suite you're looking for doesn't exist.", back: 'Back to Suites', photoGallery: 'Photo gallery', morePhotos: 'Show more', closeGallery: 'Close photo gallery', twoNightMinimum: 'The following villas are available but require a two night minimum', twoNightMinimumException: 'Exceptions can be made, contact us on WhatsApp at +506 6145 9916', datesUnavailable: "The following villas aren't available for your dates. Try new dates to find new results." },
    home: { tagline: 'Private Villas in Puerto Viejo Costa Rica', discover: 'Discover our suites', discoverText: "We're more than a place to stay. Villas Punta Uva is an invitation to pause, breathe, and reconnect. Explore our handcrafted villas designed for calm, where every element tells a story.", punta: 'Punta Uva, Costa Rica', puntaText: 'Stay in private vacation villas surrounded by jungle, wildlife, and the Caribbean coast. Each home is designed for comfort, privacy, and easy days near Punta Uva Beach.', aboutText: "Whether you're seeking a romantic getaway, a family adventure, or a peaceful retreat, our team is dedicated to making your stay exceptional from start to finish.", explore: 'Explore Puerto Viejo', exploreText: 'Discover the best experiences the Caribbean coast has to offer', viewAttractions: 'View Attractions', reviewsText: "At Villas Punta Uva in Punta Uva, Costa Rica, we offer a warm, authentic experience that connects you with the nature and culture of Costa Rica's Southern Caribbean.", posted: 'Posted on' },
    pages: { about: 'About Us', attractions: 'Attractions', attractionsHero: 'Explore tours, ocean adventures, jungle experiences, wellness, and nightlife around Puerto Viejo.', contact: 'Contact Us', contactHero: 'Our team will guide you with everything you need to ensure your experience is nothing short of exceptional.', contactIntro: "Get in touch with us and let's plan your Caribbean escape at Villas Punta Uva.", phone: 'Phone', email: 'Email', location: 'Location', aboutHero: 'A family-built retreat shaped by a long love for Costa Rica, the Caribbean coast, and the rare feeling of luxury surrounded by jungle.' },
  },
  es: {
    nav: { home: 'Inicio', suites: 'Villas', attractions: 'Atracciones', about: 'Sobre nosotros', contact: 'Contáctenos', faqs: 'Preguntas frecuentes', book: 'Reservar', open: 'Abrir menú', close: 'Cerrar menú', language: 'Idioma' },
    common: { arrival: 'Fecha de llegada', departure: 'Fecha de salida', checkIn: 'Llegada', checkout: 'Salida', guests: 'Huéspedes', guestsNote: '5 años en adelante', selectDate: 'Seleccionar fecha', guest: 'Huésped', viewSuites: 'Ver villas', reserve: 'Reservar', from: 'desde', night: 'noche', nights: 'noches', showMore: 'Ver más', showLess: 'Ver menos', close: 'Cerrar', previous: 'Anterior', next: 'Siguiente', kid: 'Niño', kids: 'Niños', kidsUnder5: 'Niños menores de 5 años', kidsUnder5Note: 'Gratis, no cuenta como huésped', pet: 'Mascota', pets: 'Mascotas', petsNote: '$10/noche por mascota', done: 'Listo' },
    booking: { modalTitle: '¿Listo para reservar?', modalText: 'Envíenos un mensaje de texto o WhatsApp al {{phone}} para reservar su estadía, hacer una pregunta o consultar disponibilidad.', message: 'Enviar mensaje al {{phone}}', estimate: 'Calcule su estadía', checkoutAfterArrival: 'Seleccione una fecha de salida posterior a la llegada.', minNightsNote: 'Mínimo {{count}} noches', minNightsError: 'Esta villa requiere una estadía mínima de {{count}} noches.', clearDates: 'Borrar fechas', selectGuest: 'Seleccione al menos un huésped.', selectArrival: 'Seleccione una fecha de llegada.', selectDeparture: 'Seleccione una fecha de salida.', selectDates: 'Seleccione sus fechas para ver un total estimado de la estadía.', nightlySubtotal: 'Subtotal de {{count}} {{unit}}', weeklyDiscount: 'Descuento semanal (10%)', lastMinuteDiscount: 'Descuento de última hora (10%)', extraGuestFee: 'Cargo por huésped adicional ({{count}})', petFee: 'Cargo por mascota ({{count}})', cleaningFee: 'Tarifa de limpieza', estimatedTotal: 'Total estimado' },
    footer: { ready: '¿Listo para planear su escapada?', text: 'Escríbanos; nos encantará saber de usted.', tagline: 'Villas privadas en Puerto Viejo, Costa Rica', quickLinks: 'Enlaces rápidos', contact: 'Contacto', follow: 'Síganos', rights: 'Todos los derechos reservados.' },
    suites: { title: 'Villas', hero: 'Descubra villas privadas para mañanas tranquilas, tardes con brisa salina y estadías caribeñas sin esfuerzo.', listings: 'Listado de villas', showingAll: 'Mostrando todas las villas disponibles', showingFor: 'Mostrando villas disponibles para {{count}} {{unit}}', clear: 'Limpiar búsqueda', noMatch: 'No hay villas que coincidan con su búsqueda', smallerGroup: 'Pruebe con un grupo más pequeño para ver más villas.', allSuites: 'Ver todas las villas', viewDetails: 'Ver detalles', sleeps: 'Capacidad para {{count}}', all: 'Todas las villas', special: 'Lo que la hace especial', sleep: 'Dónde dormirá', offers: 'Lo que ofrece este lugar', moreAmenities: 'Mostrar más comodidades', lessAmenities: 'Mostrar menos comodidades', goodToKnow: 'Información importante', rates: 'Tarifas 2026', rateHigh: 'Tarifas de temporada alta', rateLow: 'Tarifas de temporada baja', weekdays: 'entre semana', weekends: 'fin de semana', fees: 'Tarifas y descuentos', discount: '10% de descuento en estadías de 7 noches o más, o reservas hechas dentro de los 7 días previos a la llegada', extraGuestFeeNote: '{{amount}}/noche por huésped adicional a la capacidad base', holidayPricingNote: 'Las tarifas de temporada pueden variar en fechas festivas.', directBook: 'Reserve directamente con nosotros para evitar cargos de plataformas externas y obtener la mejor experiencia de reserva directa.', alsoSeen: 'También disponible en', notFound: 'Villa no encontrada', missing: 'La villa que busca no existe.', back: 'Volver a las villas', photoGallery: 'Galería de fotos', morePhotos: 'Ver más', closeGallery: 'Cerrar galería de fotos', twoNightMinimum: 'Las siguientes villas están disponibles pero requieren una estadía mínima de dos noches', twoNightMinimumException: 'Se pueden hacer excepciones, contáctenos por WhatsApp al +506 6145 9916', datesUnavailable: 'Las siguientes villas no están disponibles para sus fechas. Pruebe con otras fechas para ver nuevos resultados.' },
    home: { tagline: 'Villas privadas en Puerto Viejo, Costa Rica', discover: 'Descubra nuestras villas', discoverText: 'Somos más que un lugar para quedarse. Villas Punta Uva es una invitación a pausar, respirar y reconectar. Explore nuestras villas hechas para la calma, donde cada elemento cuenta una historia.', punta: 'Punta Uva, Costa Rica', puntaText: 'Hospédese en villas privadas de vacaciones rodeadas de selva, vida silvestre y la costa caribeña. Cada hogar está diseñado para brindar comodidad, privacidad y días tranquilos cerca de Playa Punta Uva.', aboutText: 'Ya sea que busque una escapada romántica, una aventura familiar o un retiro tranquilo, nuestro equipo se dedica a hacer que su estadía sea excepcional de principio a fin.', explore: 'Explora Puerto Viejo', exploreText: 'Descubra las mejores experiencias que ofrece la costa caribeña', viewAttractions: 'Ver atracciones', reviewsText: 'En Villas Punta Uva, Costa Rica, ofrecemos una experiencia cálida y auténtica que lo conecta con la naturaleza y la cultura del Caribe Sur de Costa Rica.', posted: 'Publicado en' },
    pages: { about: 'Sobre nosotros', attractions: 'Atracciones', attractionsHero: 'Explore tours, aventuras oceánicas, experiencias en la selva, bienestar y vida nocturna alrededor de Puerto Viejo.', contact: 'Contáctenos', contactHero: 'Nuestro equipo le guiará con todo lo que necesite para que su experiencia sea excepcional.', contactIntro: 'Póngase en contacto con nosotros y planifiquemos su escapada caribeña en Villas Punta Uva.', phone: 'Teléfono', email: 'Correo electrónico', location: 'Ubicación', aboutHero: 'Un refugio familiar nacido de un profundo amor por Costa Rica, la costa caribeña y la sensación única de lujo rodeado de selva.' },
  },
}

function getByPath(object, path) {
  return path.split('.').reduce((value, key) => value?.[key], object)
}

function interpolate(value, variables) {
  return String(value).replace(/{{(\w+)}}/g, (_, key) => variables[key] ?? '')
}

function initialLanguage() {
  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (saved === 'en' || saved === 'es') return saved
  return navigator.languages?.some((language) => language.toLowerCase().startsWith('es')) ? 'es' : 'en'
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(initialLanguage)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language)
    document.documentElement.lang = language
  }, [language])

  const value = useMemo(() => ({
    language,
    setLanguage,
    locale: locales[language],
    t: (path, variables = {}) => interpolate(getByPath(messages[language], path) ?? getByPath(messages.en, path) ?? path, variables),
  }), [language])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const value = useContext(LanguageContext)
  if (!value) throw new Error('useLanguage must be used within LanguageProvider')
  return value
}
