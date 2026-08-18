import airbnbAvailability from './airbnbAvailability.json'

const makeGallery = (folder, count, skipped = []) =>
  Array.from({ length: count }, (_, index) => index + 1)
    .filter((number) => !skipped.includes(number))
    .map((number) => `/images/suites/${folder}/${folder}-${number}.webp`)

const makeSuiteImage = (folder, number) => `/images/suites/${folder}/${folder}-${number}.webp`

const makeSuiteImages = (folder, numbers) =>
  numbers.map((number) => makeSuiteImage(folder, number))

const uniqueImages = (images) =>
  images.filter((image, index) => images.indexOf(image) === index)

const makePhotoSections = (folder, sections) =>
  sections.map((section) => ({
    title: section.title,
    images: section.images ?? makeSuiteImages(folder, section.numbers),
  }))

const makeGalleryFromPhotoSections = (featuredGallery, photoSections) =>
  uniqueImages([
    ...featuredGallery,
    ...photoSections.flatMap((section) => section.images),
  ])

const sharedPoolImages = [
  '/images/infinity pool/drone-4.webp',
  '/images/infinity pool/drone-7.webp',
  '/images/infinity pool/drone-13.webp',
  '/images/infinity pool/drone-19.webp',
]

const sharedBeachImages = [
  '/images/beach/beach-1.webp',
  '/images/beach/beach-2.webp',
  '/images/beach/beach-3.webp',
  '/images/beach/beach-4.webp',
  '/images/beach/beach-5.webp',
  '/images/beach/beach-6.webp',
  '/images/beach/beach-7.webp',
]

const mariposaFeaturedGallery = makeSuiteImages('mariposa', [1, 8, 30, 37, 66])
const mariposaPhotoSections = makePhotoSections('mariposa', [
  { title: 'Kitchen', numbers: [1, 2, 4] },
  { title: 'Dining Room', numbers: [ 8, 9] },
  { title: 'Living Room', numbers: [10, 12, 13] },
  { title: 'Patio', numbers: [15, 16,18, 20, 21] },
  { title: 'Bedroom 1', numbers: [22, 23,26, 27] },
  { title: 'Bedroom 2', numbers: [ 30, 31, 33, 29] },
  { title: 'Bedroom 3', numbers: [ 37, 38, 39,] },
  { title: 'Bedroom 4', numbers: [ 43,46, 47, 48, 53, 55] },
  { title: 'Bedroom 5', numbers: [ 58, 59, 60, 61] },
  { title: 'Pool', images: sharedPoolImages },
  { title: 'Beach', images: sharedBeachImages },
])

const tucanFeaturedGallery = makeSuiteImages('tucan', [1, 2, 17, 12, 28])
const tucanPhotoSections = makePhotoSections('tucan', [
  { title: 'Kitchen', numbers: [1, 3, 5, 6, 7] },
  { title: 'Living Room', numbers: [2, 8, 9, 10] },
  { title: 'Dining Room', numbers: [12, 27] },
  { title: 'Bedroom 1', numbers: [17, 18] },
  { title: 'Bedroom 2', numbers: [19, 22, 25, 26] },
  { title: 'Pool', images: sharedPoolImages },
  { title: 'Beach', images: sharedBeachImages },
])

const presidenteFeaturedGallery = makeSuiteImages('presidente', [20, 7, 13, 1, 38])
const presidentePhotoSections = makePhotoSections('presidente', [
  { title: 'Kitchen', numbers: [1, 3, 4, 5, 9, 10, 12] },
  { title: 'Dining Room', numbers: [6, 7, 8] },
  { title: 'Living Room', numbers: [16, 19, 20, 21] },
  { title: 'Bedroom 1', numbers: [13, 14, 15] },
  { title: 'Bedroom 2', numbers: [36] },
  { title: 'Bedroom 3', numbers: [ 22, 23, 28] },
  { title: 'Bedroom 4', numbers: [37] },
  { title: 'Bedroom 5', numbers: [32, 34] },
  { title: 'Pool', images: sharedPoolImages },
  { title: 'Beach', images: sharedBeachImages },
])

const angelFeaturedGallery = makeSuiteImages('angel', [24, 5, 12, 27, 38])
const angelPhotoSections = makePhotoSections('angel', [
  { title: 'Living Room', numbers: [1, 2, 3] },
  { title: 'Dining Room', numbers: [5, 6, 10] },
  { title: 'Bedroom 1', numbers: [13, 14, 15, 17, 18] },
  { title: 'Kitchen', numbers: [22, 23, 24] },
  { title: 'Bedroom 2', numbers: [27, 28, 29] },
  { title: 'Balcony', numbers: [31, 32, 33] },
  { title: 'Exterior', numbers: [34, 35, 36] },
  { title: 'Pool', images: sharedPoolImages },
  { title: 'Beach', images: sharedBeachImages },
])

const cachaFeaturedGallery = makeSuiteImages('cacha', [16, 20, 23, 39, 35])
const cachaPhotoSections = makePhotoSections('cacha', [
  { title: 'Living Room', numbers: [16] },
  { title: 'Dining Room', numbers: [20, 21] },
  { title: 'Bedroom 1', numbers: [23, 24, 25, 26, 27] },
  { title: 'Kitchen', numbers: [14, 17, 18, 19] },
  { title: 'Bedroom 2', numbers: [37] },
  { title: 'Bedroom 3', numbers: [29, 30, 32] },
  { title: 'Patio', numbers: [10, 11, 12, 13, 22] },
  { title: 'Pool', numbers: [40,41] },
  { title: 'Exterior', numbers: [2, 3] },
  { title: 'Beach', images: sharedBeachImages },
])

const careyFeaturedGallery = makeSuiteImages('carey', [12, 2, 5, 7, 13])
const careyPhotoSections = makePhotoSections('carey', [
  { title: 'Bedroom 1', numbers: [9, 10, 11] },
  { title: 'Kitchen', numbers: [2, 3] },
  { title: 'Bedroom 2', numbers: [12] },
  { title: 'Bathroom', numbers: [4] },
  { title: 'Balcony', numbers: [6, 7, 8] },
  { title: 'Exterior', numbers: [1, 5] },
  { title: 'Pool', images: sharedPoolImages },
  { title: 'Beach', images: sharedBeachImages },
])

const colibriFeaturedGallery = makeSuiteImages('colibri', [2, 8, 6, 12, 22])
const colibriPhotoSections = makePhotoSections('colibri', [
  { title: 'Bedroom 1', numbers: [ 4, 8, 10] },
  { title: 'Dining Room', numbers: [6, 7] },
  { title: 'Kitchen', numbers: [1, 3, 5] },
  { title: 'Bathroom', numbers: [11] },
  { title: 'Patio', numbers: [12, 13, 14, 20, 21] },
  { title: 'Pool', images: sharedPoolImages },
  { title: 'Beach', images: sharedBeachImages },
])

const sharedAmenities = [
  'Infinity pool',
  'Gym',
  'Yoga platform',
  'Parking',
]

const standardRateNote =
  'Holiday pricing may vary, and stays of 7 nights or more receive a 10% discount. Kids 5 and under stay free and do not count as a guest.'

export const suites = [
  {
    id: 1,
    name: 'Villa Mariposa',
    location: 'Puerto Viejo',
    slug: 'villa-mariposa',
    airbnbUrl: 'https://www.airbnb.ca/rooms/1110956901295044381',
    image: '/images/suites/mariposa.webp',
    gallery: makeGalleryFromPhotoSections(mariposaFeaturedGallery, mariposaPhotoSections),
    featuredGallery: mariposaFeaturedGallery,
    photoSections: mariposaPhotoSections,  
    bedrooms: 5,
    bathrooms: 5,
    sleeps: 10,
    maxGuests: 12,
    minNights: 2,
    bedsLabel: '5 beds',
    bathsLabel: '5 baths',
    cleaningFee: 150,
    petFriendly: true,
    shortDescription:
      'A spacious five-bedroom Caribbean villa with king suites, a chef-ready kitchen, jungle-view porches, and shared infinity pool access.',
    description:
      'Villa Mariposa is a spacious Caribbean luxury residence designed for families and groups who want room to gather without giving up privacy. Five king bedrooms, five bathrooms, air conditioning throughout, and a chef-ready kitchen make it easy to settle in after days at Arrecife/Punta Uva Beach. Jungle-view porches, shared infinity pool access, and work-friendly fiber internet give the villa a polished yet deeply tropical feel.',
    sleepingArrangements: [
      { label: 'Bedroom 1', bed: '1 King Bed', image: '/images/suites/mariposa/mariposa-47.webp' },
      { label: 'Bedroom 2', bed: '1 King Bed', image: '/images/suites/mariposa/mariposa-58.webp' },
      { label: 'Bedroom 3', bed: '1 King Bed', image: '/images/suites/mariposa/mariposa-22.webp' },
      { label: 'Bedroom 4', bed: '1 King Bed', image: '/images/suites/mariposa/mariposa-30.webp' },
      { label: 'Bedroom 5', bed: '1 King Bed', image: '/images/suites/mariposa/mariposa-37.webp' },
    ],
    features: [
      'Each bedroom has its own private bathroom and patio',
      'Spacious common areas for large groups',
      'Large kitchen, living room, and dining area',
      'Air conditioning throughout',
      'Outdoor barbecue area',
      'Access to shared infinity pool, gym, yoga platform, and parking',
    ],
    sharedAmenities,
    amenitiesPreview: ['Public beach access 5 minute walk', 'Shared infinity pool', 'Chef-ready kitchen', 'Wi-Fi', 'Air conditioning', 'Private patio or balcony'],
    amenities: [
      {
        title: 'Bathroom',
        items: ['Bathtub', 'Hair dryer', 'Shampoo', 'Conditioner', 'Body soap', 'Bidet', 'Outdoor shower', 'Hot water', 'Shower gel'],
      },
      {
        title: 'Bedroom and laundry',
        items: ['Washer and dryer in unit', 'Free laundry for stays of 5 nights or more', '$10/night laundry fee for the whole reservation on stays under 5 nights', 'Essentials', 'Bed linens', 'Cotton linens', 'Extra pillows and blankets', 'Room-darkening shades', 'Iron', 'Safe', 'Wardrobe storage'],
      },
      {
        title: 'Kitchen and dining',
        items: ['Chef-ready kitchen', 'Double refrigerator', 'Microwave', 'Dishwasher', 'Gas stove', 'Oven', 'Coffee maker', 'Rice cooker', 'Dining table', 'Barbecue utensils'],
      },
      {
        title: 'Outdoor and location',
        items: ['Public beach access 5 minute walk', 'Private entrance', 'Private patio or balcony', 'Private backyard', 'Outdoor furniture', 'Barbecue grill', 'Beach essentials', 'Sun loungers'],
      },
      {
        title: 'Parking and services',
        items: ['Free driveway parking for 4 cars', 'Shared outdoor infinity pool', 'Shared gym nearby', 'Pets allowed for a fee', 'Luggage drop-off allowed', 'Long-term stays allowed', 'Self check-in with keypad', 'Housekeeping is available at an extra cost'],
      },
    ],
    notes: [
      {
        title: 'Guest access',
        items: ['Guests have access to Villa Mariposa, the shared swimming pool, and the yoga deck.'],
      },
      {
        title: 'Other things to note',
        items: ['The double refrigerators include ice makers.', 'The property is gated and has exterior security cameras for safety.', 'Parties are not allowed.'],
      },
      {
        title: 'Not included',
        items: ['Heating is not available.'],
      },
    ],
    rateNote: standardRateNote,
    rates: {
      high: { weekday: 500, weekend: 550 },
      low: { weekday: 400, weekend: 425 },
    },
    holidayRates: [
      { start: '2026-12-19', end: '2026-12-30', rate: 700 },
      { start: '2026-12-31', end: '2027-01-02', rate: 850 },
    ],
  },
  {
    id: 2,
    name: 'Villa Tucan',
    location: 'Puerto Viejo',
    slug: 'villa-tucan',
    airbnbUrl: 'https://www.airbnb.ca/rooms/1113377681101829744',
    image: '/images/suites/tucan.webp',
    gallery: makeGalleryFromPhotoSections(tucanFeaturedGallery, tucanPhotoSections),
    featuredGallery: tucanFeaturedGallery,
    photoSections: tucanPhotoSections,
    bedrooms: 2,
    bathrooms: 2,
    sleeps: 4,
    maxGuests: 6,
    minNights: 2,
    bedsLabel: '2 beds',
    bathsLabel: '2 baths',
    cleaningFee: 60,
    petFriendly: true,
    shortDescription:
      'An upper-level two-bedroom jungle retreat with a bright kitchen, full air conditioning, and shared pool, gym, and yoga deck access.',
    description:
      'Casa Tucan is an upper-level jungle retreat with two bedrooms, two bathrooms, and full air conditioning. The bright kitchen, comfortable living room, and large windows make it an inviting home base for guests who want modern comfort near Arrecife/Punta Uva Beach. Shared pool, gym, and yoga deck access add resort-style ease, while the surrounding trees bring sloths, monkeys, and birds into the experience.',
    sleepingArrangements: [
      { label: 'Bedroom 1', bed: '1 Queen Bed', image: '/images/suites/tucan/tucan-17.webp' },
      { label: 'Bedroom 2', bed: '1 Queen Bed', image: '/images/suites/tucan/tucan-19.webp' },
    ],
    features: [
      'Caribbean-inspired design',
      'Fully equipped kitchen',
      'Comfortable living room with a TV',
      'Air conditioning',
      'Access to shared infinity pool, gym, and yoga platform',
      'Surrounded by lush tropical nature',
    ],
    sharedAmenities: ['Infinity pool', 'Gym', 'Yoga platform'],
    amenitiesPreview: ['Public beach access 5 minute walk', 'Pool', 'Shared gym', 'Wi-Fi', 'Kitchen', '50-inch HDTV with Netflix'],
    amenities: [
      {
        title: 'Bathroom',
        items: ['Hair dryer', 'Shampoo', 'Conditioner', 'Body soap', 'Bidet', 'Hot water', 'Shower gel'],
      },
      {
        title: 'Bedroom and laundry',
        items: ['Essentials', 'Hangers', 'Bed linens', 'Extra pillows and blankets', 'Room-darkening shades', 'Iron', 'Safe', 'Clothing storage'],
      },
      {
        title: 'Kitchen and dining',
        items: ['Kitchen', 'Refrigerator', 'Microwave', 'Cooking basics', 'Dishes and silverware', 'Freezer', 'Dishwasher', 'Stove', 'Oven', 'Coffee maker', 'Wine glasses', 'Toaster', 'Baking sheet', 'Blender', 'Dining table'],
      },
      {
        title: 'Location and outdoor',
        items: ['Public beach access 5 minute walk', 'Laundromat nearby', 'Shared barbecue grill', 'Sun loungers'],
      },
      {
        title: 'Parking and services',
        items: ['Free parking on premises', 'Pool', 'Shared gym', 'Pets allowed for a fee', 'Self check-in with keypad', 'Housekeeping is available at an extra cost'],
      },
    ],
    notes: [
      {
        title: 'Guest access',
        items: ['Casa Tucan is completely yours during the stay.', 'The yoga deck, gym, and pool are shared.'],
      },
      {
        title: 'Other things to note',
        items: ['A reverse-osmosis water filter is built into the kitchen sink.', 'Fiber-optic internet and Starlink backup help keep the home well connected.', 'The home is located on the main road, so motorcycles may be audible at times.', 'There may be construction across the street as the area continues to grow.'],
      },
      {
        title: 'Not included',
        items: ['Washer and dryer are not available.', 'Carbon monoxide alarm and heating are not available.', 'Exterior security cameras are not on the property.'],
      },
    ],
    rateNote: standardRateNote,
    rates: {
      high: { weekday: 180, weekend: 200 },
      low: { weekday: 150, weekend: 175 },
    },
    holidayRates: [
      { start: '2026-12-19', end: '2026-12-30', rate: 250 },
      { start: '2026-12-31', end: '2027-01-02', rate: 300 },
    ],
  },
  {
    id: 3,
    name: 'Villa Presidente',
    location: 'Puerto Viejo',
    slug: 'villa-presidente',
    airbnbUrl: 'https://www.airbnb.ca/rooms/938421023355226897',
    image: '/images/suites/presidente.webp',
    gallery: makeGalleryFromPhotoSections(presidenteFeaturedGallery, presidentePhotoSections),
    featuredGallery: presidenteFeaturedGallery,
    photoSections: presidentePhotoSections,
    bedrooms: 5,
    bathrooms: 5,
    sleeps: 10,
    maxGuests: 12,
    minNights: 2,
    bedsLabel: '5 beds',
    bathsLabel: '5 baths',
    cleaningFee: 150,
    petFriendly: true,
    shortDescription:
      'An elegant five-bedroom residence with private bathrooms, balconies, a chef-ready kitchen, and shared resort-style amenities.',
    description:
      'Villa Presidente is the most elegant large-group residence at Villas Punta Uva, with five bedrooms, private bathrooms, balconies, and full air conditioning. Four king beds and one queen bed give families and groups generous comfort, while the chef-ready kitchen, quartz dining table, and spacious living room are designed for gathering. A gated setting, shared infinity pool, yoga platform, workout area, and five-minute walk to Arrecife/Punta Uva Beach make this a refined Caribbean base.',
    sleepingArrangements: [
      { label: 'Bedroom 1', bed: '1 King Bed', image: '/images/suites/presidente/presidente-13.webp' },
      { label: 'Bedroom 2', bed: '1 Queen Bed', image: '/images/suites/presidente/presidente-36.webp' },
      { label: 'Bedroom 3', bed: '1 King Bed', image: '/images/suites/presidente/presidente-22.webp' },
      { label: 'Bedroom 4', bed: '1 King Bed', image: '/images/suites/presidente/presidente-37.webp' },
      { label: 'Bedroom 5', bed: '1 King Bed', image: '/images/suites/presidente/presidente-32.webp' },
    ],
    features: [
      'Each bedroom has its own private bathroom',
      'Spacious social areas for large groups',
      'Large kitchen, living room, and dining area',
      'Beautiful wraparound veranda',
      'Air conditioning throughout',
      'Outdoor barbecue area',
      'Access to shared infinity pool, gym, yoga platform, and parking',
    ],
    sharedAmenities,
    amenitiesPreview: ['Public beach access 5 minute walk', 'Shared pool', 'Gym', 'Chef-ready kitchen', 'Wi-Fi', 'Dedicated workspace'],
    amenities: [
      {
        title: 'Views and bathroom',
        items: ['Garden view', 'Pool view', 'Bathtub', 'Hair dryer', 'Shampoo', 'Conditioner', 'Body soap', 'Bidet', 'Outdoor shower', 'Hot water', 'Shower gel'],
      },
      {
        title: 'Bedroom and laundry',
        items: ['Washer and dryer in unit', 'Free laundry for stays of 5 nights or more', '$10/night laundry fee for the whole reservation on stays under 5 nights', 'Essentials', 'Hangers', 'Bed linens', 'Extra pillows and blankets', 'Room-darkening shades', 'Iron', 'Safe', 'Clothing storage'],
      },
      {
        title: 'Kitchen and dining',
        items: ['Kitchen', 'Double refrigerator', 'Microwave', 'Dishwasher', 'Mini fridge', 'Freezer', 'Stove', 'Oven', 'Hot water kettle', 'Coffee maker', 'Rice cooker', 'Dining table', 'Barbecue utensils'],
      },
      {
        title: 'Location and outdoor',
        items: ['Public beach access 5 minute walk', 'Private entrance', 'Laundromat nearby', 'Patio or balcony', 'Private backyard', 'Private gas barbecue grill', 'Beach essentials', 'Sun loungers'],
      },
      {
        title: 'Parking and services',
        items: ['Free parking on premises', 'Shared pool', 'Gym', 'Pets allowed for a fee', 'Luggage drop-off allowed', 'Long-term stays allowed', 'Self check-in with keypad', 'Housekeeping is available at an extra cost'],
      },
    ],
    notes: [
      {
        title: 'Guest access',
        items: ['The house includes access to the infinity pool, yoga platform, workout area, and free parking.'],
      },
      {
        title: 'Other things to note',
        items: ['The two large freezers produce ice for guest use.', 'Exterior cameras monitor the gate, parking area, and backyard for safety.', 'Parties are not allowed.'],
      },
      {
        title: 'Not included',
        items: ['Smoke alarm, carbon monoxide alarm, and heating are not available.'],
      },
    ],
    rateNote: standardRateNote,
    rates: {
      high: { weekday: 500, weekend: 550 },
      low: { weekday: 400, weekend: 425 },
    },
    holidayRates: [
      { start: '2026-12-19', end: '2026-12-30', rate: 700 },
      { start: '2026-12-31', end: '2027-01-02', rate: 850 },
    ],
  },
  {
    id: 4,
    name: 'Villa Colibri',
    location: 'Puerto Viejo',
    slug: 'villa-colibri',
    airbnbUrl: 'https://www.airbnb.ca/rooms/1121764501882415469',
    image: '/images/suites/colibri.webp',
    gallery: makeGalleryFromPhotoSections(colibriFeaturedGallery, colibriPhotoSections),
    featuredGallery: colibriFeaturedGallery,
    photoSections: colibriPhotoSections,
    bedrooms: 1,
    bathrooms: 1,
    sleeps: 2,
    maxGuests: 3,
    bedsLabel: '1 bedroom studio',
    bathsLabel: '1 bath',
    cleaningFee: 30,
    petFriendly: true,
    shortDescription:
      'A cozy air-conditioned studio with a private kitchen, outdoor rancho, hammocks, and shared pool and gym access.',
    description:
      'Villa Colibri is a cozy, air-conditioned studio made for an easy couple’s getaway near Arrecife/Punta Uva Beach. The private kitchen and bathroom keep the space self-contained, while the outdoor rancho with hammocks and seating gives you extra room to watch sloths, birds, and monkeys. Shared pool, gym, and yoga platform access make this compact villa feel connected to the larger Villas Punta Uva retreat.',
    sleepingArrangements: [
      { label: 'Studio', bed: '1 Queen Bed', image: '/images/suites/colibri/colibri-8.webp' },
    ],
    features: [
      'Cozy studio layout',
      'Air conditioning',
      'Small kitchen',
      'Private rancho with a barbecue area',
      'Outdoor lounge area',
      'Access to shared infinity pool, gym, yoga platform, and parking',
    ],
    sharedAmenities,
    amenitiesPreview: ['Public beach access 5 minute walk', 'Shared outdoor pool', 'Shared gym', 'Kitchen', 'Wi-Fi', 'Air conditioning'],
    amenities: [
      {
        title: 'Bathroom',
        items: ['Hair dryer', 'Shampoo', 'Conditioner', 'Body soap', 'Outdoor shower', 'Hot water', 'Shower gel'],
      },
      {
        title: 'Bedroom and laundry',
        items: ['Essentials', 'Hangers', 'Bed linens', 'Extra pillows and blankets', 'Room-darkening shades', 'Iron', 'Safe', 'Dresser storage'],
      },
      {
        title: 'Kitchen and dining',
        items: ['Kitchen', 'Refrigerator', 'Microwave', 'Cooking basics', 'Dishes and silverware', 'Freezer', 'Gas stove', 'Oven', 'Drip coffee maker', 'Wine glasses', 'Toaster', 'Baking sheet', 'Blender', 'Dining table', 'Coffee'],
      },
      {
        title: 'Outdoor and facilities',
        items: ['Public beach access 5 minute walk', 'Sun loungers', 'Free parking on premises', 'Shared outdoor pool', 'Shared gym in building'],
      },
      {
        title: 'Services',
        items: ['Pets allowed for a fee', 'Luggage drop-off allowed', 'Long-term stays allowed', 'Self check-in with keypad', 'Housekeeping is available at an extra cost'],
      },
    ],
    notes: [
      {
        title: 'Guest access',
        items: ['Guests have access to the large double infinity pool, gym, and yoga platform.'],
      },
      {
        title: 'Other things to note',
        items: ['Fiber-optic internet and Starlink backup help keep you connected.', 'The home is located on the main road for convenience, so motorcycles may be audible at times.', 'There may be construction across the street as the area continues to grow.'],
      },
      {
        title: 'Not included',
        items: ['Washer, smoke alarm, carbon monoxide alarm, and heating are not available.'],
      },
    ],
    rateNote: standardRateNote,
    rates: {
      high: { weekday: 90, weekend: 100 },
      low: { weekday: 80, weekend: 90 },
    },
    holidayRates: [
      { start: '2026-12-19', end: '2026-12-30', rate: 125 },
      { start: '2026-12-31', end: '2027-01-02', rate: 175 },
    ],
  },
  {
    id: 5,
    name: 'Villa Angel',
    location: 'Puerto Viejo',
    slug: 'villa-angel',
    airbnbUrl: 'https://www.airbnb.ca/rooms/773962707352739865',
    image: '/images/suites/angel.webp',
    gallery: makeGalleryFromPhotoSections(angelFeaturedGallery, angelPhotoSections),
    featuredGallery: angelFeaturedGallery,
    photoSections: angelPhotoSections,
    bedrooms: 2,
    bathrooms: 2,
    sleeps: 4,
    maxGuests: 6,
    minNights: 2,
    bedsLabel: '2 beds',
    bathsLabel: '2 baths',
    cleaningFee: 100,
    petFriendly: true,
    shortDescription:
      'A private wood-style two-bedroom villa with wraparound porches, hammocks, full kitchen, and shared infinity pool access.',
    description:
      'Villa Angel is a private wood-style home wrapped in breezy porches, hammocks, rocking chairs, and the sounds of the jungle. Two bedrooms, air conditioning, a fully equipped kitchen, and a generous dining area make it comfortable for families or two couples. A short walk to Arrecife/Punta Uva Beach, shared infinity pool access, and high-speed internet give the villa a relaxed yet practical Caribbean feel.',
    sleepingArrangements: [
      { label: 'Bedroom 1', bed: '1 King Bed', image: '/images/suites/angel/angel-12.webp' },
      { label: 'Bedroom 2', bed: '1 Queen Bed', image: '/images/suites/angel/angel-25.webp' },
    ],
    features: [
      'Wood-style home',
      'Air conditioning',
      'Spacious wraparound veranda',
      'Hammocks for relaxing',
      'Private path to the shared infinity pool',
      'Outdoor space for barbecuing',
    ],
    sharedAmenities: ['Infinity pool', 'Parking'],
    amenitiesPreview: ['Public beach access 5 minute walk', 'Shared infinity pool', 'Kitchen', 'Wi-Fi', 'Air conditioning', 'Hammock'],
    amenities: [
      {
        title: 'Bathroom',
        items: ['Hair dryer', 'Shampoo', 'Conditioner', 'Body soap', 'Bidet', 'Outdoor shower', 'Hot water', 'Shower gel'],
      },
      {
        title: 'Bedroom and laundry',
        items: ['Washer and dryer in unit', 'Free laundry for stays of 5 nights or more', '$10/night laundry fee for the whole reservation on stays under 5 nights', 'Essentials', 'Hangers', 'Bed linens', 'Cotton linens', 'Extra pillows and blankets', 'Room-darkening shades', 'Iron', 'Safe', 'Clothing storage'],
      },
      {
        title: 'Kitchen and dining',
        items: ['Kitchen', 'Refrigerator', 'Microwave', 'Cooking basics', 'Dishes and silverware', 'Freezer', 'Electric stove', 'Oven', 'Coffee maker', 'Wine glasses', 'Toaster', 'Baking sheet', 'Blender', 'Rice cooker', 'Dining table'],
      },
      {
        title: 'Outdoor and location',
        items: ['Public beach access 5 minute walk', 'Private entrance', 'Private patio or balcony', 'Backyard', 'Outdoor furniture', 'Hammock', 'Shared gas barbecue grill', 'Sun loungers'],
      },
      {
        title: 'Parking and services',
        items: ['Free parking on premises', 'Shared saltwater infinity pool', 'Gym', 'Single-level home', 'Pets allowed for a fee', 'Long-term stays allowed', 'Self check-in with keypad', 'Housekeeping is available at an extra cost'],
      },
    ],
    notes: [
      {
        title: 'Guest access',
        items: ['Private parking is available for one car.', 'Guests have access to the grounds and pool.'],
      },
      {
        title: 'Other things to note',
        items: ['The home collects rainwater and uses UV and sediment filtration, making the water safe for cooking.', 'One 15-litre bottle of spring drinking water is provided.', 'Starlink high-speed internet is available on site.', 'There is a slope at the entrance that may be challenging for some guests.', 'Expect jungle sounds from howler monkeys, macaws, birds, and other wildlife.'],
      },
      {
        title: 'Not included',
        items: ['Exterior security cameras, carbon monoxide alarm, and heating are not available.'],
      },
    ],
    rateNote: standardRateNote,
    rates: {
      high: { weekday: 200, weekend: 225 },
      low: { weekday: 175, weekend: 200 },
    },
    holidayRates: [
      { start: '2026-12-19', end: '2026-12-30', rate: 300 },
      { start: '2026-12-31', end: '2027-01-02', rate: 400 },
    ],
  },
  {
    id: 6,
    name: 'Villa Cacha',
    location: 'Puerto Viejo',
    slug: 'villa-cacha',
    airbnbUrl: 'https://www.airbnb.ca/rooms/1248597947139254573',
    image: '/images/suites/cacha.webp',
    gallery: makeGalleryFromPhotoSections(cachaFeaturedGallery, cachaPhotoSections),
    featuredGallery: cachaFeaturedGallery,
    photoSections: cachaPhotoSections,
    bedrooms: 3,
    bathrooms: 2,
    sleeps: 6,
    maxGuests: 8,
    minNights: 2,
    bedsLabel: '3 beds',
    bathsLabel: '2 baths',
    cleaningFee: 125,
    petFriendly: true,
    shortDescription:
      'A natural wood three-bedroom home with expansive decks, private natural pool, and lush fruit-tree surroundings.',
    description:
      'Villa Cacha feels like stepping into a private slice of rainforest, with three bedrooms, two bathrooms, air conditioning, and a private natural pool filtered by plants and lava rock. The all-wood home sits on a lush 13-acre retreat surrounded by fruit trees, sloths, monkeys, and birds, about a seven-minute walk from Arrecife/Punta Uva Beach. Expansive decks, peaceful grounds, and a spring-like pool experience make it especially memorable for guests who want nature, privacy, and comfort in one place.',
    sleepingArrangements: [
      { label: 'Bedroom 1', bed: '1 King Bed', image: '/images/suites/cacha/cacha-24.webp' },
      { label: 'Bedroom 2', bed: '1 Queen Bed', image: '/images/suites/cacha/cacha-29.webp' },
      { label: 'Bedroom 3', bed: '1 Queen Bed', image: '/images/suites/cacha/cacha-37.webp' },
    ],
    features: [
      'Wood-style home',
      'Air conditioning',
      'Spacious wraparound terrace',
      'Private natural pool',
      'Abundant wildlife and exotic fruit trees',
      'Private tropical living with modern comforts',
    ],
    sharedAmenities: ['Private natural pool', 'Parking'],
    amenitiesPreview: ['Private natural pool', 'Public beach access 7 minute walk', 'Kitchen', 'Wi-Fi', 'Air conditioning', 'Private barbecue grill'],
    amenities: [
      {
        title: 'Bathroom',
        items: ['Hair dryer', 'Shampoo', 'Conditioner', 'Body soap', 'Bidet', 'Outdoor shower', 'Hot water', 'Shower gel'],
      },
      {
        title: 'Bedroom and laundry',
        items: ['Free washer and dryer in unit', 'Essentials', 'Hangers', 'Bed linens', 'Extra pillows and blankets', 'Room-darkening shades', 'Safe', 'Dresser storage'],
      },
      {
        title: 'Kitchen and dining',
        items: ['Kitchen', 'Refrigerator', 'Microwave', 'Cooking basics', 'Dishes and silverware', 'Freezer', 'Stove', 'Oven', 'Hot water kettle', 'Coffee maker', 'Wine glasses', 'Toaster', 'Baking sheet', 'Blender', 'Rice cooker', 'Dining table', 'Coffee'],
      },
      {
        title: 'Outdoor and location',
        items: ['Public beach access 7 minute walk', 'Private entrance', 'Patio or balcony', 'Backyard', 'Outdoor furniture', 'Outdoor dining area', 'Private gas barbecue grill'],
      },
      {
        title: 'Parking and services',
        items: ['Free parking on premises', 'Private outdoor natural pool', 'Pets allowed for a fee', 'Self check-in with keypad', 'Housekeeping is available at an extra cost'],
      },
    ],
    notes: [
      {
        title: 'Guest access',
        items: ['The whole home is yours to use.'],
      },
      {
        title: 'Other things to note',
        items: ['The private natural pool uses no chemicals and is filtered by plants, lava rocks, small fish, and harmless tadpoles.', 'Please shower thoroughly before entering the natural pool.', 'One bedroom and one bathroom are accessed from outside the main house.', 'Construction on the property is currently paused; guests will be notified if it resumes.'],
      },
      {
        title: 'Not included',
        items: ['Exterior security cameras, smoke alarm, carbon monoxide alarm, and heating are not available.'],
      },
    ],
    rateNote: standardRateNote,
    rates: {
      high: { weekday: 300, weekend: 325 },
      low: { weekday: 250, weekend: 275 },
    },
    holidayRates: [
      { start: '2026-12-19', end: '2026-12-30', rate: 400 },
      { start: '2026-12-31', end: '2027-01-02', rate: 500 },
    ],
  },
  {
    id: 7,
    name: 'Villa Carey',
    location: 'Puerto Viejo',
    slug: 'carey-house',
    airbnbUrl: 'https://www.airbnb.ca/rooms/1360877574407543821',
    image: '/images/suites/carey.webp',
    gallery: makeGalleryFromPhotoSections(careyFeaturedGallery, careyPhotoSections),
    featuredGallery: careyFeaturedGallery,
    photoSections: careyPhotoSections,
    bedrooms: 2,
    bathrooms: 1,
    sleeps: 4,
    maxGuests: 5,
    bedsLabel: '2 beds',
    bathsLabel: '1 bath',
    cleaningFee: 50,
    petFriendly: true,
    shortDescription:
      'A cozy two-bedroom wood home with air conditioning, porch seating, and shared infinity pool access nearby.',
    description:
      'Villa Carey is a charming two-bedroom wood home designed for quiet mornings, easy cooking, and relaxed wildlife watching from the porch. Each bedroom has a queen bed, TV, and air conditioning, while the beach is about a seven-minute stroll away. Set within a 13-acre retreat with exotic fruit trees and access to a shared infinity pool across the street, it is a cozy option for a peaceful Caribbean stay.',
    sleepingArrangements: [
      { label: 'Bedroom 1', bed: '1 Queen Bed', image: '/images/suites/carey/carey-10.webp' },
      { label: 'Bedroom 2', bed: '1 Queen Bed', image: '/images/suites/carey/carey-12.webp' },
    ],
    features: [
      'Cozy wood-style home',
      'Air conditioning',
      'Relaxing porch',
      'Abundant wildlife',
      'Exotic fruit trees',
      'Peaceful Caribbean setting',
    ],
    sharedAmenities: ['Parking'],
    amenitiesPreview: ['Public beach access 7 minute walk', 'Shared infinity pool', 'Kitchen', 'Wi-Fi', 'Air conditioning', 'Patio or balcony'],
    amenities: [
      {
        title: 'Bathroom',
        items: ['Shampoo', 'Conditioner', 'Body soap', 'Hot water', 'Shower gel'],
      },
      {
        title: 'Bedroom and laundry',
        items: ['Washer and dryer in unit', 'Free laundry for stays of 5 nights or more', '$10/night laundry fee for the whole reservation on stays under 5 nights', 'Bed linens', 'Cotton linens', 'Safe', 'Dresser storage'],
      },
      {
        title: 'Kitchen and dining',
        items: ['Kitchen', 'Refrigerator', 'Cooking basics', 'Dishes and silverware', 'Freezer', 'Stove', 'Oven', 'Drip coffee maker', 'Toaster', 'Baking sheet', 'Blender', 'Dining table', 'Coffee'],
      },
      {
        title: 'Outdoor and location',
        items: ['Public beach access 7 minute walk', 'Patio or balcony', 'Backyard'],
      },
      {
        title: 'Parking and services',
        items: ['Free parking on premises', 'Shared outdoor infinity pool', 'Pets allowed for a fee', 'Self check-in with keypad', 'Housekeeping is available at an extra cost'],
      },
    ],
    notes: [
      {
        title: 'Guest access',
        items: ['Guests have access to the entire home.'],
      },
      {
        title: 'Other things to note',
        items: ['Construction on the property is currently paused; guests will be notified if it resumes.'],
      },
      {
        title: 'Not included',
        items: ['Essentials, exterior security cameras, smoke alarm, carbon monoxide alarm, and heating are not available.'],
      },
    ],
    rateNote: standardRateNote,
    rates: {
      high: { weekday: 130, weekend: 150 },
      low: { weekday: 130, weekend: 150 },
    },
    holidayRates: [
      { start: '2026-12-19', end: '2026-12-30', rate: 200 },
      { start: '2026-12-31', end: '2027-01-02', rate: 250 },
    ],
  },
]

export const isLowSeasonDate = (date) => {
  const month = date.getMonth()
  return month >= 3 && month <= 5
}

export const isWeekendDate = (date) => {
  const day = date.getDay()
  return day === 5 || day === 6
}

function getHolidayRate(suite, date) {
  const ranges = suite.holidayRates ?? []
  const match = ranges.find((range) => date >= parseIsoDate(range.start) && date <= parseIsoDate(range.end))
  return match?.rate ?? null
}

export const getNightlyRate = (suite, date) => {
  const holidayRate = getHolidayRate(suite, date)
  if (holidayRate != null) return holidayRate

  const season = isLowSeasonDate(date) ? 'low' : 'high'
  const dayType = isWeekendDate(date) ? 'weekend' : 'weekday'
  return suite.rates[season][dayType]
}

export const getLowestNightlyRate = (suite) =>
  Math.min(
    suite.rates.high.weekday,
    suite.rates.high.weekend,
    suite.rates.low.weekday,
    suite.rates.low.weekend,
  )

export const getStayNights = (arrival, departure) => {
  if (!arrival || !departure || departure <= arrival) return []

  const nights = []
  const cursor = new Date(arrival.getFullYear(), arrival.getMonth(), arrival.getDate())
  const end = new Date(departure.getFullYear(), departure.getMonth(), departure.getDate())

  while (cursor < end) {
    nights.push(new Date(cursor))
    cursor.setDate(cursor.getDate() + 1)
  }

  return nights
}

function parseIsoDate(value) {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day)
}

// Checks the real Airbnb-synced reservations for this suite (not the
// minimum-nights rule, which is handled separately) — used to hide suites
// that are already booked for the requested dates from search results.
export const isSuiteAvailable = (slug, arrival, departure) => {
  if (!arrival || !departure) return true

  const ranges = airbnbAvailability[slug] ?? []

  return !ranges.some((range) => {
    const rangeStart = parseIsoDate(range.start)
    const rangeEnd = parseIsoDate(range.end)
    return arrival < rangeEnd && rangeStart < departure
  })
}

export const getDaysUntilArrival = (arrival) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const arrivalDate = new Date(arrival.getFullYear(), arrival.getMonth(), arrival.getDate())
  return Math.round((arrivalDate - today) / (1000 * 60 * 60 * 24))
}

export const EXTRA_GUEST_NIGHTLY_FEE = 15
export const PET_NIGHTLY_FEE = 10

export const calculateSuiteStay = (suite, arrival, departure, guests, pets = 0) => {
  const nights = getStayNights(arrival, departure)
  const nightlyRates = nights.map((date) => ({
    date,
    rate: getNightlyRate(suite, date),
  }))
  const nightlySubtotal = nightlyRates.reduce((total, night) => total + night.rate, 0)
  // Monthly (28+ nights) supersedes weekly (7+ nights) rather than stacking —
  // a 28-night stay already clears the weekly threshold too.
  const monthlyDiscount = nights.length >= 28 ? Math.round(nightlySubtotal * 0.35) : 0
  const weeklyDiscount = monthlyDiscount === 0 && nights.length >= 7 ? Math.round(nightlySubtotal * 0.1) : 0
  const daysUntilArrival = getDaysUntilArrival(arrival)
  const lastMinuteDiscount = daysUntilArrival >= 0 && daysUntilArrival <= 7 ? Math.round(nightlySubtotal * 0.1) : 0
  const discount = monthlyDiscount + weeklyDiscount + lastMinuteDiscount
  const extraGuests = Math.max(0, (guests ?? suite.sleeps) - suite.sleeps)
  const extraGuestFee = extraGuests * nights.length * EXTRA_GUEST_NIGHTLY_FEE
  const petCount = Math.max(0, Number(pets) || 0)
  const petFee = petCount * nights.length * PET_NIGHTLY_FEE
  const total = nightlySubtotal - discount + suite.cleaningFee + extraGuestFee + petFee

  return {
    nights,
    nightlyRates,
    nightlySubtotal,
    monthlyDiscount,
    weeklyDiscount,
    lastMinuteDiscount,
    discount,
    extraGuests,
    petCount,
    petFee,
    extraGuestFee,
    cleaningFee: suite.cleaningFee,
    total,
  }
}

const spanishSuiteText = {
  'Kitchen': 'Cocina', 'Dining Room': 'Comedor', 'Living Room': 'Sala', 'Patio': 'Patio', 'Pool': 'Piscina', 'Beach': 'Playa', 'Balcony': 'Balcón', 'Exterior': 'Exterior', 'Bathroom': 'Baño', 'Studio': 'Estudio',
  'Bedroom 1': 'Habitación 1', 'Bedroom 2': 'Habitación 2', 'Bedroom 3': 'Habitación 3', 'Bedroom 4': 'Habitación 4', 'Bedroom 5': 'Habitación 5', '1 King Bed': '1 cama king', '1 Queen Bed': '1 cama queen',
  'Infinity pool': 'Piscina infinita', 'Gym': 'Gimnasio', 'Yoga platform': 'Plataforma de yoga', 'Parking': 'Estacionamiento', 'Public beach access 5 minute walk': 'Acceso a la playa pública a 5 minutos caminando', 'Public beach access 7 minute walk': 'Acceso a la playa pública a 7 minutos caminando', 'Shared infinity pool': 'Piscina infinita compartida', 'Shared pool': 'Piscina compartida', 'Pool': 'Piscina', 'Shared outdoor pool': 'Piscina exterior compartida', 'Private natural pool': 'Piscina natural privada', 'Shared gym': 'Gimnasio compartido', 'Kitchen': 'Cocina', 'Chef-ready kitchen': 'Cocina lista para chef', 'Wi-Fi': 'Wi‑Fi', 'Air conditioning': 'Aire acondicionado', 'Private patio or balcony': 'Patio o balcón privado', 'Patio or balcony': 'Patio o balcón', 'Private rancho': 'Rancho privado', 'Hammock': 'Hamaca', 'Dedicated workspace': 'Espacio de trabajo dedicado',
  '5 beds': '5 camas', '3 beds': '3 camas', '2 beds': '2 camas', '1 bedroom studio': 'Estudio de 1 habitación', '5 baths': '5 baños', '2 baths': '2 baños', '1 bath': '1 baño',
  'Bathroom': 'Baño', 'Bedroom and laundry': 'Habitación y lavandería', 'Kitchen and dining': 'Cocina y comedor', 'Outdoor and location': 'Exteriores y ubicación', 'Location and outdoor': 'Ubicación y exteriores', 'Outdoor and facilities': 'Exteriores e instalaciones', 'Parking and services': 'Estacionamiento y servicios', 'Services': 'Servicios', 'Views and bathroom': 'Vistas y baño', 'Guest access': 'Acceso de huéspedes', 'Other things to note': 'Otros aspectos a tener en cuenta', 'Not included': 'No incluido',
  'Bathtub': 'Bañera', 'Hair dryer': 'Secadora de cabello', 'Body soap': 'Jabón corporal', 'Outdoor shower': 'Ducha exterior', 'Hot water': 'Agua caliente', 'Shower gel': 'Gel de ducha', 'Essentials': 'Artículos esenciales', 'Hangers': 'Ganchos', 'Bed linens': 'Ropa de cama', 'Cotton linens': 'Sábanas de algodón', 'Extra pillows and blankets': 'Almohadas y mantas adicionales', 'Room-darkening shades': 'Cortinas opacas', 'Iron': 'Plancha', 'Safe': 'Caja fuerte', 'Wardrobe storage': 'Armario', 'Clothing storage': 'Espacio para ropa', 'Dresser storage': 'Cómoda', 'Refrigerator': 'Refrigerador', 'Double refrigerator': 'Refrigerador doble', 'Microwave': 'Microondas', 'Dishwasher': 'Lavavajillas', 'Freezer': 'Congelador', 'Gas stove': 'Cocina de gas', 'Electric stove': 'Cocina eléctrica', 'Stove': 'Cocina', 'Oven': 'Horno', 'Coffee maker': 'Cafetera', 'Dining table': 'Mesa de comedor', 'Beach essentials': 'Artículos de playa', 'Sun loungers': 'Tumbonas', 'Pets allowed for a fee': 'Se permiten mascotas con costo adicional', 'Long-term stays allowed': 'Se permiten estadías largas', 'Self check-in with keypad': 'Entrada autónoma con teclado', 'Housekeeping is available at an extra cost': 'Servicio de limpieza disponible con costo adicional', 'Free parking on premises': 'Estacionamiento gratuito en el lugar', 'Luggage drop-off allowed': 'Se permite dejar equipaje', 'Private entrance': 'Entrada privada', 'Backyard': 'Patio trasero', 'Outdoor furniture': 'Muebles de exterior', 'Barbecue grill': 'Parrilla', 'Private barbecue grill': 'Parrilla privada', 'Private gas barbecue grill': 'Parrilla de gas privada', 'Shared gas barbecue grill': 'Parrilla de gas compartida', 'Shared barbecue grill': 'Parrilla compartida',
  'Paid washer and dryer in unit': 'Lavadora y secadora de pago en la unidad', 'Free washer and dryer in unit': 'Lavadora y secadora gratuitas en la unidad', 'Washer and dryer in unit': 'Lavadora y secadora en la unidad', 'Free laundry for stays of 5 nights or more': 'Lavandería gratuita para estadías de 5 noches o más', '$10/night laundry fee for the whole reservation on stays under 5 nights': 'Cargo de lavandería de $10/noche para toda la reserva en estadías de menos de 5 noches', 'Paid dryer': 'Secadora de pago', 'Cooking basics': 'Utensilios básicos para cocinar', 'Dishes and silverware': 'Vajilla y cubiertos', 'Mini fridge': 'Mini refrigerador', 'Hot water kettle': 'Hervidor de agua', 'Drip coffee maker': 'Cafetera de goteo', 'Rice cooker': 'Olla arrocera', 'Wine glasses': 'Copas de vino', 'Toaster': 'Tostadora', 'Baking sheet': 'Bandeja para hornear', 'Blender': 'Licuadora', 'Coffee': 'Café', 'Barbecue utensils': 'Utensilios para parrilla', 'Private backyard': 'Patio trasero privado', 'Outdoor dining area': 'Área de comedor exterior', 'Shared outdoor infinity pool': 'Piscina infinita exterior compartida', 'Shared saltwater infinity pool': 'Piscina infinita compartida de agua salada', 'Private outdoor natural pool': 'Piscina natural exterior privada', 'Shared gym nearby': 'Gimnasio compartido cercano', 'Shared gym in building': 'Gimnasio compartido en el edificio', 'Laundromat nearby': 'Lavandería cercana', '50-inch HDTV with Netflix': 'TV HD de 50 pulgadas con Netflix', 'Garden view': 'Vista al jardín', 'Pool view': 'Vista a la piscina', 'Single-level home': 'Casa de una sola planta',
  'Holiday pricing may vary, and stays of 7 nights or more receive a 10% discount. Kids 5 and under stay free and do not count as a guest.': 'Las tarifas de temporada pueden variar y las estadías de 7 noches o más reciben un 10% de descuento. Los niños de 5 años o menos se hospedan gratis y no cuentan como huésped.',
  'Each bedroom has its own private bathroom and patio': 'Cada habitación tiene su propio baño y patio privado', 'Spacious common areas for large groups': 'Amplias áreas comunes para grupos grandes', 'Large kitchen, living room, and dining area': 'Cocina grande, sala y comedor', 'Air conditioning throughout': 'Aire acondicionado en toda la villa', 'Outdoor barbecue area': 'Área de parrilla al aire libre', 'Access to shared infinity pool, gym, yoga platform, and parking': 'Acceso a piscina infinita compartida, gimnasio, plataforma de yoga y estacionamiento',
  'Caribbean-inspired design': 'Diseño inspirado en el Caribe', 'Fully equipped kitchen': 'Cocina totalmente equipada', 'Comfortable living room with a TV': 'Sala cómoda con televisión', 'Access to shared infinity pool, gym, and yoga platform': 'Acceso a piscina infinita compartida, gimnasio y plataforma de yoga', 'Surrounded by lush tropical nature': 'Rodeada de exuberante naturaleza tropical',
  'Each bedroom has its own private bathroom': 'Cada habitación tiene su propio baño privado', 'Spacious social areas for large groups': 'Amplias áreas sociales para grupos grandes', 'Beautiful wraparound veranda': 'Hermosa terraza envolvente',
  'Cozy studio layout': 'Distribución acogedora tipo estudio', 'Small kitchen': 'Cocina pequeña', 'Private rancho with a barbecue area': 'Rancho privado con área de parrilla', 'Outdoor lounge area': 'Área de descanso exterior',
  'Wood-style home': 'Casa de estilo madera', 'Spacious wraparound veranda': 'Amplia terraza envolvente', 'Hammocks for relaxing': 'Hamacas para relajarse', 'Private path to the shared infinity pool': 'Sendero privado hacia la piscina infinita compartida', 'Outdoor space for barbecuing': 'Espacio exterior para asar',
  'Spacious wraparound terrace': 'Amplia terraza envolvente', 'Abundant wildlife and exotic fruit trees': 'Abundante vida silvestre y árboles frutales exóticos', 'Private tropical living with modern comforts': 'Vida tropical privada con comodidades modernas', 'Cozy wood-style home': 'Acogedora casa de estilo madera', 'Relaxing porch': 'Porche para relajarse', 'Abundant wildlife': 'Abundante vida silvestre', 'Exotic fruit trees': 'Árboles frutales exóticos', 'Peaceful Caribbean setting': 'Entorno caribeño tranquilo',
}

const spanishSuiteNarratives = {
  1: {
    shortDescription: 'Una espaciosa villa caribeña de cinco habitaciones con suites king, cocina lista para chef, porches con vista a la selva y acceso a piscina infinita compartida.',
    description: 'Villa Mariposa es una residencia de lujo caribeña espaciosa, diseñada para familias y grupos que desean reunirse sin perder privacidad. Sus cinco habitaciones king, cinco baños, aire acondicionado y cocina lista para chef facilitan instalarse después de días en la playa Arrecife/Punta Uva. Los porches con vista a la selva, la piscina infinita compartida y el internet de fibra crean una experiencia tropical refinada.',
  },
  2: {
    shortDescription: 'Un refugio de selva de dos habitaciones con comodidades modernas, piscina compartida y fácil acceso a la playa.',
    description: 'Casa Tucan es un refugio de selva en un nivel superior con dos habitaciones, dos baños y aire acondicionado completo. La cocina luminosa, la cómoda sala y los grandes ventanales crean una base acogedora cerca de la playa Arrecife/Punta Uva. La piscina, el gimnasio y la plataforma de yoga compartidos ofrecen comodidad de resort, mientras los árboles cercanos traen perezosos, monos y aves a la experiencia.',
  },
  3: {
    shortDescription: 'Una amplia residencia caribeña de cinco habitaciones con piscina infinita compartida y vistas a la selva.',
    description: 'Villa Presidente ofrece espacio, privacidad y comodidad caribeña para familias y grupos. Disfrute habitaciones amplias, cocina bien equipada, aire acondicionado y acceso a las áreas compartidas de piscina, gimnasio y yoga, todo cerca de Punta Uva.',
  },
  4: {
    shortDescription: 'Un estudio tropical privado y acogedor con piscina, gimnasio y plataforma de yoga compartidos.',
    description: 'Villa Colibri es un estudio cómodo y tranquilo, pensado para una estadía relajada cerca de la playa. Cuenta con cocina, aire acondicionado, un rancho privado y acceso a la piscina infinita, gimnasio y plataforma de yoga compartidos.',
  },
  5: {
    shortDescription: 'Una villa de dos habitaciones rodeada de naturaleza, con piscina infinita compartida y comodidades modernas.',
    description: 'Villa Angel combina comodidad moderna con la tranquilidad de la costa caribeña. Sus dos habitaciones, cocina equipada, aire acondicionado y hamaca crean un lugar ideal para descansar, con acceso a la piscina infinita compartida y a los jardines.',
  },
  6: {
    shortDescription: 'Una casa de tres habitaciones en la selva con piscina natural privada y a pocos minutos de la playa.',
    description: 'Villa Cacha ofrece una experiencia privada de selva con tres habitaciones, aire acondicionado y una piscina natural filtrada por plantas y roca volcánica. La casa de madera está rodeada de árboles frutales y vida silvestre, a pocos minutos a pie de la playa Arrecife/Punta Uva.',
  },
  7: {
    shortDescription: 'Una villa cómoda de dos habitaciones, cerca de la playa y con acceso a piscina infinita compartida.',
    description: 'Villa Carey es una base cómoda para explorar Punta Uva y Puerto Viejo. Disfrute dos habitaciones, cocina, aire acondicionado, patio o balcón y acceso a la piscina infinita compartida.',
  },
}

function translateSuiteString(value) {
  if (spanishSuiteText[value]) return spanishSuiteText[value]
  return value
}

function translateSuiteValue(value) {
  if (typeof value === 'string') return translateSuiteString(value)
  if (Array.isArray(value)) return value.map(translateSuiteValue)
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, translateSuiteValue(item)]))
  return value
}

export function getLocalizedSuite(suite, language) {
  if (language !== 'es' || !suite) return suite
  const localizedSuite = translateSuiteValue(suite)
  return { ...localizedSuite, ...spanishSuiteNarratives[suite.id] }
}

export function getLocalizedSuites(language) {
  return suites.map((suite) => getLocalizedSuite(suite, language))
}
