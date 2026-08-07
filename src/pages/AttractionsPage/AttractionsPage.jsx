import styles from './AttractionsPage.module.css'

const activitySections = [
  {
    id: 'outdoor-adventures',
    title: 'Outdoor Adventures',
    subtitle: 'Water Activities',
    contact: 'MESSAGE 6145 9916 TO BOOK',
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
    contact: 'MESSAGE 6145 9916 TO BOOK',
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
    contact: 'MESSAGE 6145 9916 TO BOOK',
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
    contact: 'MESSAGE 6145 9916 TO BOOK',
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
    contact: 'MESSAGE 6145 9916 TO BOOK',
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
        prices: [
          ['Adults', '20,000'],
          ['Kids ages 6 - 12 years', '10,000'],
          ['Kids ages 0 - 5 years', 'Free'],
        ],
      },
      {
        title: 'Private Tours (advanced notice)',
        description:
          'Book ahead for a private chocolate experience with more flexibility for your group. This is the best fit for families, retreats, and larger groups who want the tour arranged around them.',
        prices: [
          ['Adults (min 4)', '25,000'],
          ['Groups of 10-19', '22,500'],
          ['Groups of 20+', '18,750'],
          ['Kids ages 6 a 12 years', '12,500'],
        ],
      },
    ],
  },
  {
    id: 'horseback-riding',
    title: 'Horseback Riding',
    subtitle: 'Caribe Horse Riding Club',
    schedule: 'Monday to Friday from 9am - 5:30pm. Saturday from 9am - 12pm. Sunday closed',
    contact: 'MESSAGE 6145 9916 TO BOOK',
    images: [
      '/images/attractions/horse-1.webp',
      '/images/attractions/horse-2.webp',
      '/images/attractions/horse-3.webp',
    ],
    items: [
      {
        title: 'Short Tour',
        price: '$70',
        description:
          'A short but intense experience for beginners and kids. Start your day with an hour long ride along the beautiful Punta Cocles and Playa Chiquita, or unwind at the end of the day while watching the sunset. 1.5 hours duration',
      },
      {
        title: 'Beach Jungle Tour',
        price: '$100',
        description:
          'Ride along the beach, where you will get to see breathtaking scenery of white sand beaches. Then, head into the jungle, where you explore the rich wildlife of the tropical rainforest. Your guide will help you spot animals, it is possible to see howler monkeys, sloths, toucans, parrots and more on this amazing tour. 2.5 hours duration',
      },
      {
        title: 'El hippo camp tour',
        price: '$150',
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
      ['Tuktuk Numbers', '506 8783 4249'],
      ['Taxi Numbers', '506-8513-8333'],
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

function ActivityItem({ item }) {
  return (
    <article className={styles.item}>
      <div className={styles.itemHeader}>
        <h3>{item.title}</h3>
        {item.price && <span className={styles.price}>{item.price}</span>}
      </div>

      {item.description && <p>{item.description}</p>}

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

function ActivitySection({ section, index }) {
  return (
    <section id={section.id} className={`${styles.section} ${index % 2 ? styles.alt : ''}`}>
      <div className={styles.sectionInner}>
        <div className={styles.sectionIntro}>
          {section.eyebrow && <p className={styles.eyebrow}>{section.eyebrow}</p>}
          <h2>{section.title}</h2>
          {section.subtitle && <p className={styles.subtitle}>{section.subtitle}</p>}
          {section.provider && <p className={styles.provider}>{section.provider}</p>}
          {section.schedule && <p className={styles.schedule}>{section.schedule}</p>}
          {section.contact && <p className={styles.contact}>{section.contact}</p>}

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
                label={`${section.title} image ${imageIndex + 1}`}
              />
            ))}
          </div>

          <div className={styles.items}>
            {section.items.map((item) => (
              <ActivityItem key={item.title} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function AttractionsPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <img
            src="/images/logos/logo-white.png"
            alt=""
            className={styles.heroIcon}
          />
          <h1 className={styles.heroTitle}>Attractions</h1>
          <p className={styles.heroText}>
            Explore tours, ocean adventures, jungle experiences, wellness, and nightlife around Punta Uva.
          </p>
        </div>
      </section>

      {activitySections.map((section, index) => (
        <ActivitySection key={section.title} section={section} index={index} />
      ))}
    </div>
  )
}
