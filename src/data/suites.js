const makeGallery = (folder, count, skipped = []) =>
  Array.from({ length: count }, (_, index) => index + 1)
    .filter((number) => !skipped.includes(number))
    .map((number) => `/images/suites/${folder}/${folder}-${number}.webp`)

const sharedAmenities = [
  'Infinity pool',
  'Gym',
  'Yoga platform',
  'Parking',
]

const standardRateNote =
  'Holiday pricing may vary, and stays of 7 nights or more receive a 10% discount.'

export const suites = [
  {
    id: 1,
    name: 'Villa Mariposa',
    location: 'Punta Uva',
    slug: 'villa-mariposa',
    image: '/images/suites/mariposa.webp',
    gallery: makeGallery('mariposa', 65),
    bedrooms: 5,
    bathrooms: 5,
    sleeps: 10,
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
    amenitiesPreview: ['Beach access', 'Shared infinity pool', 'Chef-ready kitchen', 'Wi-Fi', 'Air conditioning', 'Private patio or balcony'],
    amenities: [
      {
        title: 'Bathroom',
        items: ['Bathtub', 'Hair dryer', 'Shampoo', 'Conditioner', 'Body soap', 'Bidet', 'Outdoor shower', 'Hot water', 'Shower gel'],
      },
      {
        title: 'Bedroom and laundry',
        items: ['Paid washer and dryer in unit', 'Essentials', 'Bed linens', 'Cotton linens', 'Extra pillows and blankets', 'Room-darkening shades', 'Iron', 'Safe', 'Wardrobe storage'],
      },
      {
        title: 'Kitchen and dining',
        items: ['Chef-ready kitchen', 'Double refrigerator', 'Microwave', 'Dishwasher', 'Gas stove', 'Oven', 'Coffee maker', 'Rice cooker', 'Dining table', 'Barbecue utensils'],
      },
      {
        title: 'Outdoor and location',
        items: ['Beach access', 'Private entrance', 'Private patio or balcony', 'Private backyard', 'Outdoor furniture', 'Barbecue grill', 'Beach essentials', 'Sun loungers'],
      },
      {
        title: 'Parking and services',
        items: ['Free driveway parking for 4 cars', 'Shared outdoor infinity pool', 'Shared gym nearby', 'Pets allowed', 'Luggage drop-off allowed', 'Long-term stays allowed', 'Self check-in with keypad', 'Housekeeping is available at an extra cost'],
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
  },
  {
    id: 2,
    name: 'Villa Tucan',
    location: 'Punta Uva',
    slug: 'villa-tucan',
    image: '/images/suites/tucan.webp',
    gallery: makeGallery('tucan', 27),
    bedrooms: 2,
    bathrooms: 2,
    sleeps: 4,
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
    amenitiesPreview: ['Beach access', 'Pool', 'Shared gym', 'Wi-Fi', 'Kitchen', '50-inch HDTV with Netflix'],
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
        items: ['Beach access', 'Laundromat nearby', 'Shared barbecue grill', 'Sun loungers'],
      },
      {
        title: 'Parking and services',
        items: ['Free parking on premises', 'Pool', 'Shared gym', 'Pets allowed', 'Self check-in with keypad', 'Housekeeping is available at an extra cost'],
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
  },
  {
    id: 3,
    name: 'Villa Presidente',
    location: 'Punta Uva',
    slug: 'villa-presidente',
    image: '/images/suites/presidente.webp',
    gallery: makeGallery('presidente', 35),
    bedrooms: 5,
    bathrooms: 5,
    sleeps: 10,
    bedsLabel: '5 beds',
    bathsLabel: '5 baths',
    cleaningFee: 150,
    petFriendly: true,
    shortDescription:
      'An elegant five-bedroom residence with private bathrooms, balconies, a chef-ready kitchen, and shared resort-style amenities.',
    description:
      'Villa Presidente is the most elegant large-group residence at Villas Punta Uva, with five bedrooms, private bathrooms, balconies, and full air conditioning. Four king beds and one queen bed give families and groups generous comfort, while the chef-ready kitchen, quartz dining table, and spacious living room are designed for gathering. A gated setting, shared infinity pool, yoga platform, workout area, and five-minute walk to Arrecife/Punta Uva Beach make this a refined Caribbean base.',
    sleepingArrangements: [
      { label: 'Bedroom 1', bed: '1 King Bed' },
      { label: 'Bedroom 2', bed: '1 Queen Bed', image: '/images/suites/presidente/presidente-22.webp' },
      { label: 'Bedroom 3', bed: '1 King Bed', image: '/images/suites/presidente/presidente-32.webp' },
      { label: 'Bedroom 4', bed: '1 King Bed' },
      { label: 'Bedroom 5', bed: '1 King Bed' },
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
    amenitiesPreview: ['Shared beach access', 'Shared pool', 'Gym', 'Chef-ready kitchen', 'Wi-Fi', 'Dedicated workspace'],
    amenities: [
      {
        title: 'Views and bathroom',
        items: ['Garden view', 'Pool view', 'Bathtub', 'Hair dryer', 'Shampoo', 'Conditioner', 'Body soap', 'Bidet', 'Outdoor shower', 'Hot water', 'Shower gel'],
      },
      {
        title: 'Bedroom and laundry',
        items: ['Paid washer and dryer in unit', 'Essentials', 'Hangers', 'Bed linens', 'Extra pillows and blankets', 'Room-darkening shades', 'Iron', 'Clothing storage'],
      },
      {
        title: 'Kitchen and dining',
        items: ['Kitchen', 'Double refrigerator', 'Microwave', 'Dishwasher', 'Mini fridge', 'Freezer', 'Stove', 'Oven', 'Hot water kettle', 'Coffee maker', 'Rice cooker', 'Dining table', 'Barbecue utensils'],
      },
      {
        title: 'Location and outdoor',
        items: ['Shared beach access', 'Private entrance', 'Laundromat nearby', 'Patio or balcony', 'Private backyard', 'Private gas barbecue grill', 'Beach essentials', 'Sun loungers'],
      },
      {
        title: 'Parking and services',
        items: ['Free parking on premises', 'Shared pool', 'Gym', 'Pets allowed', 'Luggage drop-off allowed', 'Long-term stays allowed', 'Self check-in with keypad', 'Housekeeping is available at an extra cost'],
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
  },
  {
    id: 4,
    name: 'Villa Colibri',
    location: 'Punta Uva',
    slug: 'villa-colibri',
    image: '/images/suites/colibri.webp',
    gallery: makeGallery('colibri', 21),
    bedrooms: 1,
    bathrooms: 1,
    sleeps: 2,
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
    amenitiesPreview: ['Shared outdoor pool', 'Shared gym', 'Kitchen', 'Wi-Fi', 'Air conditioning', 'Private rancho'],
    amenities: [
      {
        title: 'Bathroom',
        items: ['Hair dryer', 'Shampoo', 'Conditioner', 'Body soap', 'Outdoor shower', 'Hot water', 'Shower gel'],
      },
      {
        title: 'Bedroom and laundry',
        items: ['Paid dryer', 'Essentials', 'Hangers', 'Bed linens', 'Extra pillows and blankets', 'Room-darkening shades', 'Iron', 'Dresser storage'],
      },
      {
        title: 'Kitchen and dining',
        items: ['Kitchen', 'Refrigerator', 'Microwave', 'Cooking basics', 'Dishes and silverware', 'Freezer', 'Gas stove', 'Oven', 'Drip coffee maker', 'Wine glasses', 'Toaster', 'Baking sheet', 'Blender', 'Dining table', 'Coffee'],
      },
      {
        title: 'Outdoor and facilities',
        items: ['Sun loungers', 'Free parking on premises', 'Shared outdoor pool', 'Shared gym in building'],
      },
      {
        title: 'Services',
        items: ['Pets allowed', 'Luggage drop-off allowed', 'Long-term stays allowed', 'Self check-in with keypad', 'Housekeeping is available at an extra cost'],
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
      high: { weekday: 80, weekend: 90 },
      low: { weekday: 80, weekend: 90 },
    },
  },
  {
    id: 5,
    name: 'Villa Angel',
    location: 'Punta Uva',
    slug: 'villa-angel',
    image: '/images/suites/angel.webp',
    gallery: makeGallery('angel', 37),
    bedrooms: 2,
    bathrooms: 2,
    sleeps: 4,
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
    amenitiesPreview: ['Beach access', 'Shared infinity pool', 'Kitchen', 'Wi-Fi', 'Air conditioning', 'Hammock'],
    amenities: [
      {
        title: 'Bathroom',
        items: ['Hair dryer', 'Shampoo', 'Conditioner', 'Body soap', 'Bidet', 'Outdoor shower', 'Hot water', 'Shower gel'],
      },
      {
        title: 'Bedroom and laundry',
        items: ['Paid washer and dryer in unit', 'Essentials', 'Hangers', 'Bed linens', 'Cotton linens', 'Extra pillows and blankets', 'Room-darkening shades', 'Iron', 'Safe', 'Clothing storage'],
      },
      {
        title: 'Kitchen and dining',
        items: ['Kitchen', 'Refrigerator', 'Microwave', 'Cooking basics', 'Dishes and silverware', 'Freezer', 'Electric stove', 'Oven', 'Coffee maker', 'Wine glasses', 'Toaster', 'Baking sheet', 'Blender', 'Rice cooker', 'Dining table'],
      },
      {
        title: 'Outdoor and location',
        items: ['Beach access', 'Private entrance', 'Private patio or balcony', 'Backyard', 'Outdoor furniture', 'Hammock', 'Shared gas barbecue grill', 'Sun loungers'],
      },
      {
        title: 'Parking and services',
        items: ['Free parking on premises', 'Shared saltwater infinity pool', 'Gym', 'Single-level home', 'Pets allowed', 'Long-term stays allowed', 'Self check-in with keypad', 'Housekeeping is available at an extra cost'],
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
  },
  {
    id: 6,
    name: 'Villa Cacha',
    location: 'Arrecife',
    slug: 'villa-cacha',
    image: '/images/suites/cacha.webp',
    gallery: makeGallery('cacha', 37, [34]),
    bedrooms: 3,
    bathrooms: 2,
    sleeps: 6,
    bedsLabel: '3 beds',
    bathsLabel: '2 baths',
    cleaningFee: 125,
    petFriendly: true,
    shortDescription:
      'A natural wood three-bedroom home with expansive decks, private natural pool, and lush fruit-tree surroundings.',
    description:
      'Villa Cacha feels like stepping into a private slice of rainforest, with three bedrooms, two bathrooms, air conditioning, and a private natural pool filtered by plants and lava rock. The all-wood home sits on a lush 13-acre retreat surrounded by fruit trees, sloths, monkeys, and birds, just a five-minute walk from Arrecife/Punta Uva Beach. Expansive decks, peaceful grounds, and a spring-like pool experience make it especially memorable for guests who want nature, privacy, and comfort in one place.',
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
    amenitiesPreview: ['Private natural pool', 'Beach access', 'Kitchen', 'Wi-Fi', 'Air conditioning', 'Private barbecue grill'],
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
        items: ['Beach access', 'Private entrance', 'Patio or balcony', 'Backyard', 'Outdoor furniture', 'Outdoor dining area', 'Private gas barbecue grill'],
      },
      {
        title: 'Parking and services',
        items: ['Free parking on premises', 'Private outdoor natural pool', 'Pets allowed', 'Self check-in with keypad', 'Housekeeping is available at an extra cost'],
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
  },
  {
    id: 7,
    name: 'Carey House',
    location: 'Arrecife',
    slug: 'carey-house',
    image: '/images/suites/carey.webp',
    gallery: makeGallery('carey', 12),
    bedrooms: 2,
    bathrooms: 1,
    sleeps: 4,
    bedsLabel: '2 beds',
    bathsLabel: '1 bath',
    cleaningFee: 50,
    petFriendly: true,
    shortDescription:
      'A cozy two-bedroom wood home with air conditioning, porch seating, beach access, and shared infinity pool access nearby.',
    description:
      'Carey House is a charming two-bedroom wood home designed for quiet mornings, easy cooking, and relaxed wildlife watching from the porch. Each bedroom has a queen bed, TV, and air conditioning, while the beach is only a five-minute stroll away. Set within a 13-acre retreat with exotic fruit trees and access to a shared infinity pool across the street, it is a cozy option for a peaceful Caribbean stay.',
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
    amenitiesPreview: ['Beach access', 'Shared infinity pool', 'Kitchen', 'Wi-Fi', 'Air conditioning', 'Patio or balcony'],
    amenities: [
      {
        title: 'Bathroom',
        items: ['Shampoo', 'Conditioner', 'Body soap', 'Hot water', 'Shower gel'],
      },
      {
        title: 'Bedroom and laundry',
        items: ['Paid washer and dryer in unit', 'Bed linens', 'Cotton linens', 'Dresser storage'],
      },
      {
        title: 'Kitchen and dining',
        items: ['Kitchen', 'Refrigerator', 'Cooking basics', 'Dishes and silverware', 'Freezer', 'Stove', 'Oven', 'Drip coffee maker', 'Toaster', 'Baking sheet', 'Blender', 'Dining table', 'Coffee'],
      },
      {
        title: 'Outdoor and location',
        items: ['Beach access', 'Patio or balcony', 'Backyard'],
      },
      {
        title: 'Parking and services',
        items: ['Free parking on premises', 'Shared outdoor infinity pool', 'Pets allowed', 'Self check-in with keypad', 'Housekeeping is available at an extra cost'],
      },
    ],
    notes: [
      {
        title: 'Guest access',
        items: ['Guests have access to the entire home.'],
      },
      {
        title: 'Other things to note',
        items: ['A new home may be constructed nearby in the future, about 75 yards away.', 'Construction is currently paused due to permits, and guests will be updated if it resumes.', 'There will be no construction noise between December 14 and January 3, 2026.', 'Pricing reflects this temporary nearby work.'],
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

export const getNightlyRate = (suite, date) => {
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

export const calculateSuiteStay = (suite, arrival, departure) => {
  const nights = getStayNights(arrival, departure)
  const nightlyRates = nights.map((date) => ({
    date,
    rate: getNightlyRate(suite, date),
  }))
  const nightlySubtotal = nightlyRates.reduce((total, night) => total + night.rate, 0)
  const discount = nights.length >= 7 ? Math.round(nightlySubtotal * 0.1) : 0
  const total = nightlySubtotal - discount + suite.cleaningFee

  return {
    nights,
    nightlyRates,
    nightlySubtotal,
    discount,
    cleaningFee: suite.cleaningFee,
    total,
  }
}
