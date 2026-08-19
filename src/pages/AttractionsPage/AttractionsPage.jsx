import styles from './AttractionsPage.module.css'
import { useLanguage } from '../../i18n/LanguageContext'
import SEO from '../../components/SEO/SEO'

const seoText = {
  en: {
    title: 'Attractions Near Punta Uva & Puerto Viejo | Villas Punta Uva',
    description: 'Tours, diving, surf lessons, chocolate tours, horseback riding, wildlife sanctuaries, and nightlife near Punta Uva and Puerto Viejo, Costa Rica.',
  },
  es: {
    title: 'Atracciones en Punta Uva y Puerto Viejo | Villas Punta Uva',
    description: 'Tours, buceo, clases de surf, tours de chocolate, cabalgatas, santuarios de vida silvestre y vida nocturna cerca de Punta Uva y Puerto Viejo, Costa Rica.',
  },
}

const spanishLabels = {
  'Outdoor Adventures': 'Aventuras al aire libre',
  'Water Activities': 'Actividades acuáticas',
  Diving: 'Buceo',
  'In the Caribbean': 'En el Caribe',
  'Canopy Tour': 'Tour de canopy',
  'Surf Lessons': 'Clases de surf',
  'Chocolate Tours': 'Tours de chocolate',
  'Horseback Riding': 'Cabalgatas',
  Nature: 'Naturaleza',
  Activities: 'Actividades',
  'Explore the Caribbean': 'Explore el Caribe',
  'Night Life': 'Vida nocturna',
  'Rafting Rio Pacuare': 'Rafting en el Río Pacuare',
  'Punta Uva Kayaking': 'Kayak en Punta Uva',
  'Cahuita Snorkeling': 'Snorkel en Cahuita',
  'Discover Dive': 'Buceo de descubrimiento',
  'Boat dives': 'Buceos desde barco',
  'Shore dives': 'Buceos desde la orilla',
  'Zipline-Canopy Tour': 'Tour de tirolesa y canopy',
  'Superman Experience': 'Experiencia Superman',
  'Jungle Adventure': 'Aventura en la selva',
  Packages: 'Paquetes',
  Includes: 'Incluye',
  'Regular Tours (open to public)': 'Tours regulares (abiertos al público)',
  'Private Tours (advanced notice)': 'Tours privados (con reserva previa)',
  'Short Tour': 'Tour corto',
  'Beach Jungle Tour': 'Tour de playa y selva',
  'El hippo camp tour': 'Tour de campamento Hippo',
  'Bri Bri Waterfalls': 'Cataratas de Bri Bri',
  'Macaw Sanctuary': 'Santuario de guacamayas',
  'Jaguar Sanctuary': 'Santuario de jaguares',
  'Yoga at Svastha': 'Yoga en Svastha',
  'Farmers markets': 'Mercados agrícolas',
  'Volleyball in Cocles': 'Voleibol en Cocles',
  'Hot Rocks Local Bar and Restaurant': 'Bar y restaurante local Hot Rocks',
  Adults: 'Adultos',
  'Tuktuk Numbers': 'Números de tuk-tuk',
  'Taxi Numbers': 'Números de taxi',
}

const spanishDescriptions = {
  'outdoor-adventures:Rafting Rio Pacuare': 'Un emocionante día de río entre cañones de selva y cataratas, en uno de los ríos de aguas blancas más famosos de Costa Rica. Ideal para quienes buscan paisajes, adrenalina y una inmersión total en la jungla. 4 horas.',
  'outdoor-adventures:Punta Uva Kayaking': 'Reme por tranquilas vías navegables del Caribe y observe la vida silvestre en las exuberantes orillas de Punta Uva. Es una aventura lenta y escénica, con buenas posibilidades de ver monos, perezosos, iguanas y aves tropicales. 5 horas.',
  'outdoor-adventures:Cahuita Snorkeling': 'Explore el arrecife protegido de Cahuita, una de las experiencias marinas emblemáticas de la costa caribeña. Espere aguas claras, colorida vida de arrecife, navegación, equipo y una caminata guiada. 5 horas.',
  'diving:Discover Dive': 'Perfecto para quienes bucean por primera vez y desean una introducción guiada al mundo submarino caribeño. Comience desde la orilla con instrucción técnica, apoyo de un divemaster y equipo incluido.',
  'diving:Boat dives': 'Navegue mar adentro con apoyo local para visitar sitios caribeños más profundos y disfrutar una experiencia de mar abierto. Ideal para buzos certificados; incluye acceso en bote, instrucción, divemaster y equipo.',
  'diving:Shore dives': 'Disfrute un buceo sencillo desde la orilla, cerca de la costa, ideal para buzos certificados que prefieren empezar desde tierra. Incluye instrucción, divemaster y equipo.',
  'canopy-tour:Zipline-Canopy Tour': 'Vuele por la selva y lleve su adrenalina al máximo con el tour de canopy. Recorrerá 18 plataformas y 2.400 metros de diversión y aventura.',
  'canopy-tour:Superman Experience': 'Añada un giro a la adrenalina y pruebe el cable Superman. Se deslizará 450 metros a una altura máxima de 90 metros, en la posición de vuelo del famoso superhéroe.',
  'canopy-tour:Jungle Adventure': 'Canopy, caminata, rápel, puentes colgantes, escalada de árboles, columpio de Tarzán y cable Superman. ¡Este tour lo tiene todo!',
  'surf-lessons:Surf Lessons': 'Aprenda a leer las olas con instrucción local paciente en la costa caribeña. Las clases se adaptan desde principiantes hasta surfistas en progreso, con opciones privadas y grupales.',
  'surf-lessons:Packages': 'Los paquetes de varias clases le dan más tiempo en el agua y un mejor ritmo para mejorar su postura, tiempo y confianza. Elija un paquete para recibir entrenamiento constante en varias sesiones de playa.',
  'surf-lessons:Includes': 'Tabla de surf, leash, camisetas de lycra, transporte para tres personas o menos, instructores bilingües y certificados por la ISA.',
  'chocolate-tours:Chocolate Tours': 'Recorra una finca de cacao activa y siga el chocolate desde la fruta del bosque hasta la degustación final. Un tour relajado, delicioso y memorable que combina cultura, naturaleza y vistas al mar.',
  'chocolate-tours:Regular Tours (open to public)': 'Únase a un tour público programado para conocer la finca de cacao y el taller en un ambiente fácil y social.',
  'chocolate-tours:Private Tours (advanced notice)': 'Reserve con anticipación una experiencia privada de chocolate con mayor flexibilidad para su grupo. Es ideal para familias, retiros y grupos grandes.',
  'horseback-riding:Short Tour': 'Una experiencia corta e intensa para principiantes y niños. Recorra Punta Cocles y Playa Chiquita, o relájese al final del día viendo el atardecer. Duración: 1,5 horas.',
  'horseback-riding:Beach Jungle Tour': 'Cabalgue por playas de arena blanca y después adéntrese en la selva tropical. Su guía le ayudará a observar monos aulladores, perezosos, tucanes, loros y más. Duración: 2,5 horas.',
  'horseback-riding:El hippo camp tour': 'Una mezcla de aventura y relajación para una experiencia inolvidable. Después del tour, usted y su pareja disfrutarán de un masaje en pareja con dos terapeutas licenciados. 2,5 horas más 1 hora de masaje.',
  'nature:Bri Bri Waterfalls': 'Caminata de 5 minutos por la exuberante selva tropical para llegar a las famosas cataratas de Bri Bri. Perfecto para un baño refrescante o una pequeña aventura.',
  'nature:Macaw Sanctuary': 'Observe estas extraordinarias aves en su hábitat natural. Una experiencia única e inspiradora de observación de aves y una excelente oportunidad fotográfica. Visitas con reserva todos los días a las 3 p. m.',
  'nature:Jaguar Sanctuary': 'Un centro de rescate animal en Cocles dedicado a la rehabilitación de monos, perezosos, serpientes, tortugas, jaguares y más.',
  'activities:Yoga at Svastha': 'Practique en plataformas de yoga al aire libre con vista al océano y la selva, rodeado de aves exóticas y algún perezoso, mono, agutí o mapache. Svastha es ideal para una clase tranquila o un retiro de bienestar.',
  'activities:Farmers markets': 'Recorra productos locales, artículos hechos a mano y puestos comunitarios alrededor de Puerto Viejo. Una excelente manera de abastecer la villa y conocer a quienes producen los alimentos y artesanías de la región.',
  'activities:Volleyball in Cocles': 'Participe en clases de voleibol de distintos niveles para hombres, mujeres, niñas, niños y familias. ¡Conozca nuevos amigos y la comunidad!',
  'night-life:Arrecife Restaurante': 'Cada domingo disfrute clases de baile, pista abierta y ritmos latinos como salsa, cumbia y bachata. ¡Perfecto para bailar toda la noche!',
  'night-life:Salsa Brava': 'Martes, jueves, viernes y sábado: noches de reggae y fiestas frente a la playa en Salsa Brava. Buen ambiente, música, baile e inolvidables noches caribeñas junto al mar.',
  'night-life:Clan Vibes Club': 'Miércoles a domingo: música afrobeats y reggaetón, ambiente juvenil, DJ en vivo, bar y seguridad; el lugar perfecto para disfrutar la vida nocturna de Puerto Viejo.',
  'night-life:Hot Rocks Local Bar and Restaurant': 'Un bar y restaurante local relajado con buena música, bebidas y ambiente caribeño, perfecto para comenzar o terminar su noche en Puerto Viejo.',
}

function localizeActivityText(value, language) {
  if (language !== 'es' || !value) return value
  if (value === 'Message +506 6145 9916 on Whatsapp to book') return 'Envíe un mensaje al +506 6145 9916 por Whatsapp para reservar'
  if (value === 'Tours offered every Monday through Saturday at 10 am and 2pm. No tours on Sunday') return 'Tours de lunes a sábado a las 10 a. m. y 2 p. m. No hay tours los domingos.'
  if (value === 'Monday to Friday from 9am - 5:30pm. Saturday from 9am - 12pm. Sunday closed') return 'De lunes a viernes de 9 a. m. a 5:30 p. m. Sábado de 9 a. m. a 12 p. m. Cerrado los domingos.'
  if (spanishLabels[value]) return spanishLabels[value]
  return value
}

const activitySections = [
  {
    id: 'outdoor-adventures',
    title: 'Outdoor Adventures',
    subtitle: 'Water Activities',
    contact: 'Message +506 6145 9916 on Whatsapp to book',
    images: [
      '/images/attractions/outdoor-1.webp',
      '/images/attractions/outdoor-2.webp',
      '/images/attractions/outdoor-3.webp',
    ],
    items: [
      {
        title: 'Rafting Rio Pacuare',
        description:
          'A high-energy river day through rainforest canyons, waterfalls, and some of Costa Rica’s most famous whitewater. This is the big adventure choice for guests who want scenery, adrenaline, and a full immersion in the jungle. 4 hours.',
      },
      {
        title: 'Punta Uva Kayaking',
        description:
          'Paddle calm Caribbean waterways and look for wildlife along the lush banks around Punta Uva. It is a slower, scenic adventure with a strong chance of spotting monkeys, sloths, iguanas, and tropical birds. 5 hours.',
      },
      {
        title: 'Cahuita Snorkeling',
        description:
          'Explore the protected reef at Cahuita, one of the Caribbean coast’s signature marine experiences. Expect clear-water snorkeling, colorful reef life, and an easy mix of boat time, gear, and a guided hike. 5 hours.',
      },
    ],
  },
  {
    id: 'diving',
    title: 'Diving',
    subtitle: 'In the Caribbean',
    provider: 'Punta Uva, Dive Center',
    contact: 'Message +506 6145 9916 on Whatsapp to book',
    images: [
      '/images/attractions/dive-1.webp',
      '/images/attractions/dive-2.webp',
      '/images/attractions/dive-3.webp',
    ],
    items: [
      {
        title: 'Discover Dive',
        description:
          'Discover Dive is perfect for first-time divers who want a guided introduction to the Caribbean underwater world. Start from shore with technical instruction, safety support from a dive master, and equipment so you can feel comfortable before exploring below the surface.',
      },
      {
        title: 'Boat dives',
        description:
          'Head offshore with local dive support for deeper Caribbean sites and a more open-water experience. This option is best for certified divers who want boat access, instruction, a dive master, and full equipment included.',
      },
      {
        title: 'Shore dives',
        description:
          'Enjoy a straightforward shore-entry dive close to the coast, ideal for certified divers who prefer an easier start from land. The experience includes instruction, a dive master, and equipment.',
      },
    ],
  },
  {
    id: 'canopy-tour',
    title: 'Canopy Tour',
    subtitle: 'Nativo Adventures',
    contact: 'Message +506 6145 9916 on Whatsapp to book',
    images: [
      '/images/attractions/tour-1.webp',
      '/images/attractions/tour-2.webp',
      '/images/attractions/tour-3.webp',
    ],
    items: [
      {
        title: 'Zipline-Canopy Tour',
        description:
          'Fly through the jungle and take your adrenaline to the fullest with the Zipline tour. They will take you through 18 platforms, with a total of 2.400 meters (7,874 feet) of fun and adventure',
      },
      {
        title: 'Superman Experience',
        description:
          'Add another twist to the adrenaline rush and try the Superman cable for only a little extra. You will slide through 450 meters at a height of 90 meters, at its highest point, in the same flight position as the famous superhero.',
      },
      {
        title: 'Jungle Adventure',
        description:
          'Ziplining, hiking, rappelling, suspension bridges, tree climbing, Tarzan swing and Superman cable. This tour has it all!',
      },
    ],
  },
  {
    id: 'surf-lessons',
    title: 'Surf Lessons',
    contact: 'Message +506 6145 9916 on Whatsapp to book',
    images: [
      '/images/attractions/surf-1.webp',
      '/images/attractions/surf-2.webp',
      '/images/attractions/surf-3.webp',
    ],
    items: [
      {
        title: 'Surf Lessons',
        description:
          'Learn to read the waves with patient local instruction on the Caribbean coast. Lessons are built for first-timers through progressing surfers, with private and group options available.',
        bullets: ['Private Lesson 2 hours', 'Group Lessons 2 hours'],
        badges: ['Beginner to advanced lessons'],
      },
      {
        title: 'Packages',
        description:
          'Multi-lesson packages give you more time in the water and a better rhythm for improving your stance, timing, and confidence. Choose a package if you want steady coaching across several beach sessions.',
        badges: ['3 Lessons / 5 Lessons'],
      },
      {
        title: 'Includes',
        description:
          'Surf board, leash, rash guards, transportation for 3 or less people, bilingual instructors and certified by the ISA',
      },
    ],
  },
  {
    id: 'chocolate-tours',
    title: 'Chocolate Tours',
    schedule: 'Tours offered every Monday through Saturday at 10 am and 2pm. No tours on Sunday',
    contact: 'Message +506 6145 9916 on Whatsapp to book',
    images: [
      '/images/attractions/chocolate-1.webp',
      '/images/attractions/chocolate-2.webp',
      '/images/attractions/chocolate-3.webp',
    ],
    items: [
      {
        title: 'Chocolate Tours',
        description:
          'Walk through a working cacao setting and follow chocolate from forest fruit to finished tasting. This tour is relaxed, flavorful, and especially memorable for guests who want culture, nature, and ocean views in one experience.',
        bullets: [
          'Hiking sustainable cacao forest (some physical exertion over hilly terrain)',
          'Tasting the fruit of the cacao tree from our cacao farm',
          'Seeing the bean to bar process at our chocolate workshop',
          'Tasting the chocolate with amazing ocean views',
        ],
      },
      {
        title: 'Regular Tours (open to public)',
        description:
          'Join a scheduled public chocolate tour for an easy, social way to experience the cacao farm and workshop.',
      },
      {
        title: 'Private Tours (advanced notice)',
        description:
          'Book ahead for a private chocolate experience with more flexibility for your group. This is the best fit for families, retreats, and larger groups who want the tour arranged around them.',
      },
    ],
  },
  {
    id: 'horseback-riding',
    title: 'Horseback Riding',
    subtitle: 'Caribe Horse Riding Club',
    schedule: 'Monday to Friday from 9am - 5:30pm. Saturday from 9am - 12pm. Sunday closed',
    contact: 'Message +506 6145 9916 on Whatsapp to book',
    images: [
      '/images/attractions/horse-1.webp',
      '/images/attractions/horse-2.webp',
      '/images/attractions/horse-3.webp',
    ],
    items: [
      {
        title: 'Short Tour',
        description:
          'A short but intense experience for beginners and kids. Start your day with an hour long ride along the beautiful Punta Cocles and Playa Chiquita, or unwind at the end of the day while watching the sunset. 1.5 hours duration',
      },
      {
        title: 'Beach Jungle Tour',
        description:
          'Ride along the beach, where you will get to see breathtaking scenery of white sand beaches. Then, head into the jungle, where you explore the rich wildlife of the tropical rainforest. Your guide will help you spot animals, it is possible to see howler monkeys, sloths, toucans, parrots and more on this amazing tour. 2.5 hours duration',
      },
      {
        title: 'El hippo camp tour',
        description:
          'A mix of adventure and relax for an unforgettable experience. After the tour, you and your partner will be pampered with a couples massage by two licensed massage therapists. 2.5 hours + 1 hour massage',
      },
    ],
  },
  {
    id: 'nature',
    title: 'Nature',
    subtitle: 'Explore the Caribbean',
    images: [
      '/images/attractions/nature-1.webp',
      '/images/attractions/nature-2.webp',
      '/images/attractions/nature-3.webp',
    ],
    items: [
      {
        title: 'Bri Bri Waterfalls',
        description:
          '5 minute hike through the lush tropical jungle to arrive at the famous Bri Bri waterfalls. Perfect for a refreshing dip or a fun little adventure.',
      },
      {
        title: 'Macaw Sanctuary',
        description:
          'You can observe these extraordinary birds in their natural habitat. A unique and inspiring bird watching experience and exceptional photographic opportunity! Visit with reservation every day at 3 pm.',
      },
      {
        title: 'Jaguar Sanctuary',
        description:
          'An animal rescue center located in Cocles. The center is dedicated to the rehabilitation of monkey, sloths, snakes, turtles, jaguars, and more!',
      },
    ],
  },
  {
    id: 'activities',
    title: 'Activities',
    subtitle: 'Explore the Caribbean',
    images: [
      '/images/attractions/activity-1.webp',
      '/images/attractions/activity-2.webp',
      '/images/attractions/activity-3.webp',
    ],
    items: [
      {
        title: 'Yoga at Svastha',
        description:
          'Practice on open-air yoga platforms overlooking both the ocean and the jungle, surrounded by exotic birds and the occasional sloth, monkey, agouti, or mapache. Amaser is ideal for a peaceful class or a deeper retreat-style reset.',
        bullets: ['8am and 9:30am EVERYDAY', '5pm'],
      },
      {
        title: 'Farmers markets',
        description:
          'Browse local produce, handmade goods, and community market stalls around Puerto Viejo. These markets are a great way to stock up for the villa and meet the people behind the region’s food and crafts.',
        bullets: [
          'Saturdays in Puerto Viejo starting at 7am',
          'Organic market: Wednesdays, Fridays, and Saturdays across from Tierra de Sueños',
        ],
      },
      {
        title: 'Volleyball in Cocles',
        description:
          'Take part in a variety of volleyball classes of different levels from men, women, girls, boys, and kids. Meet new friends and get to know the community!',
      },
    ],
  },
  {
    id: 'night-life',
    title: 'Night Life',
    images: [
      '/images/attractions/cuisine.webp',
      '/images/attractions/night-1.webp',
      '/images/attractions/night-3.webp',
    ],
    contacts: [
      ['Tuktuk Numbers', '+506 8783 4249'],
      ['Taxi Numbers', '+506 8513 8333'],
    ],
    items: [
      {
        title: 'Arrecife Restaurante',
        description:
          'Every Sunday enjoy dance classes, an open dance floor, and Latin rhythms like salsa, cumbia, and bachata. Perfect for dancing the night away!',
      },
      {
        title: 'Salsa Brava',
        description:
          'Tuesday, Thursday, Friday & Saturday Reggae nights and beachside parties at Salsa Brava. Good vibes, music, dancing, and unforgettable Caribbean nights right by the ocean.',
      },
      {
        title: 'Clan Vibes Club',
        description:
          'Wednesday, Thursday, Friday, Saturday & Sunday Afrobeats and Reggaeton music, a youthful party atmosphere, live DJ, bar, and security - the perfect spot to enjoy Puerto Viejo nightlife',
      },
      {
        title: 'Hot Rocks Local Bar and Restaurant',
        description:
          'A laid-back local bar and restaurant with great music, drinks, and Caribbean vibes - perfect for starting or ending your night in Puerto Viejo',
      },
    ],
  },
]

function AttractionImage({ label, src }) {
  if (src) {
    return (
      <img
        src={src}
        alt={label}
        className={styles.attractionImage}
        loading="lazy"
        decoding="async"
      />
    )
  }

  return (
    <div className={styles.placeholder} aria-label={label} role="img">
      <span>{label}</span>
    </div>
  )
}

function ActivityItem({ item, language, sectionId }) {
  return (
    <article className={styles.item}>
      <div className={styles.itemHeader}>
        <h3>{localizeActivityText(item.title, language)}</h3>
        {item.price && <span className={styles.price}>{item.price}</span>}
      </div>

      {item.description && <p>{language === 'es' ? (spanishDescriptions[`${sectionId}:${item.title}`] ?? item.description) : item.description}</p>}

      {item.lines?.map((line) => (
        <p key={line} className={styles.line}>
          {line}
        </p>
      ))}

      {item.badges?.length > 0 && (
        <div className={styles.badges}>
          {item.badges.map((badge) => (
            <span key={badge}>{badge}</span>
          ))}
        </div>
      )}

      {item.bullets?.length > 0 && (
        <ul>
          {item.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      )}

      {item.prices?.length > 0 && (
        <dl className={styles.priceList}>
          {item.prices.map(([label, value]) => (
            <div key={label} className={styles.priceRow}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      )}
    </article>
  )
}

function ActivitySection({ section, index, language }) {
  return (
    <section id={section.id} className={`${styles.section} ${index % 2 ? styles.alt : ''}`}>
      <div className={styles.sectionInner}>
        <div className={styles.sectionIntro}>
          {section.eyebrow && <p className={styles.eyebrow}>{section.eyebrow}</p>}
          <h2>{localizeActivityText(section.title, language)}</h2>
          {section.subtitle && <p className={styles.subtitle}>{localizeActivityText(section.subtitle, language)}</p>}
          {section.provider && <p className={styles.provider}>{localizeActivityText(section.provider, language)}</p>}
          {section.schedule && <p className={styles.schedule}>{localizeActivityText(section.schedule, language)}</p>}
          {section.contact && <p className={styles.contact}>{localizeActivityText(section.contact, language)}</p>}

          {section.contacts?.length > 0 && (
            <div className={styles.contactGrid}>
              {section.contacts.map(([label, value]) => (
                <div key={label} className={styles.contactCard}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.sectionGrid}>
          <div className={styles.mediaStack}>
            {(section.images ?? Array.from({ length: section.imageCount })).map((image, imageIndex) => (
              <AttractionImage
                key={imageIndex}
                src={image}
                label={`${localizeActivityText(section.title, language)} ${language === 'es' ? 'imagen' : 'image'} ${imageIndex + 1}`}
              />
            ))}
          </div>

          <div className={styles.items}>
            {section.items.map((item) => (
              <ActivityItem key={item.title} item={item} language={language} sectionId={section.id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function AttractionsPage() {
  const { language, t } = useLanguage()
  const seo = seoText[language]
  return (
    <div className={styles.page}>
      <SEO title={seo.title} description={seo.description} path="/attractions" />
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <img
            src="/images/logos/logo-white.png"
            alt=""
            className={styles.heroIcon}
          />
          <h1 className={styles.heroTitle}>{t('pages.attractions')}</h1>
          <p className={styles.heroText}>
            {t('pages.attractionsHero')}
          </p>
        </div>
      </section>

      {activitySections.map((section, index) => (
        <ActivitySection key={section.title} section={section} index={index} language={language} />
      ))}
    </div>
  )
}
