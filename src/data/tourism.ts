export type TourismCategory = 'faith' | 'nature' | 'events' | 'resorts';

export type TourismProvider = 'city' | 'province' | 'pia';

export interface TourismLink {
  provider: TourismProvider;
  url: string;
}

export interface TourismAttraction {
  slug: string;
  name: string;
  category: TourismCategory;
  area: string;
  icon: string;
  description: string;
  links: TourismLink[];
}

export const cityTourismPage =
  'https://maasincity.gov.ph/index.php/tourism/maasin-city-tourism-website';

export const provinceTourismPage =
  'https://southernleyte.gov.ph/maasin-city/maasin-city-tourism/';

const cityBase = 'https://maasincity.gov.ph/index.php/tourism';
const provinceBase = 'https://southernleyte.gov.ph/maasin-city-tourism';

export const tourismCategories: TourismCategory[] = [
  'faith',
  'nature',
  'events',
  'resorts',
];

export const tourismAttractions: TourismAttraction[] = [
  {
    slug: 'jalleca-hills-shrine',
    name: "The Our Lady of Assumption's Shrine (Jalleca Hills)",
    category: 'faith',
    area: 'Brgy. Abgao',
    icon: 'Mountain',
    description:
      "A hilltop shrine to the 'mom of Maasin'. The Lady of Assumption is illuminated at night and visible from the city pier.",
    links: [
      { provider: 'city', url: `${cityBase}/38-jalleca` },
      {
        provider: 'province',
        url: `${provinceBase}/the-our-lady-of-assumptions-shrine/`,
      },
    ],
  },
  {
    slug: 'monte-cueva-shrine',
    name: 'Monte Cueva Shrine',
    category: 'faith',
    area: '2 km from City proper',
    icon: 'Gem',
    description:
      'A 30-foot Marian icon overlooks the Via Crucis, with a chapel inside the cave marked by the three red drops beneath the Piet\u00e0.',
    links: [
      { provider: 'city', url: `${cityBase}/16-monte-cueva` },
      { provider: 'province', url: `${provinceBase}/monte-cueva-shrine-2/` },
    ],
  },
  {
    slug: 'st-francis-xavier-shrine',
    name: 'St. Francis Xavier Shrine',
    category: 'faith',
    area: 'City proper',
    icon: 'Church',
    description:
      "A pilgrimage shrine known locally for the 'panaad' tradition.",
    links: [
      {
        provider: 'province',
        url: `${provinceBase}/st-francis-xavier-shrine/`,
      },
    ],
  },
  {
    slug: 'noahs-ark-replica',
    name: "Noah's Ark Replica (Hilltop Ark)",
    category: 'faith',
    area: 'Brgy. Hanginan',
    icon: 'Ship',
    description:
      "A hilltop replica of Noah's Ark in Barangay Hanginan offering a 360-degree view of the mountains and sea, part of the city's 'City of Faith' branding.",
    links: [
      {
        provider: 'pia',
        url: 'https://mirror.pia.gov.ph/features/noahs-ark-replica-in-southern-leyte-invites-tourists-for-physical-spiritual-journey/',
      },
    ],
  },
  {
    slug: 'cathedral-of-the-assumption',
    name: 'The Cathedral of Our Lady of the Assumption of Maasin',
    category: 'faith',
    area: 'City proper',
    icon: 'Landmark',
    description:
      "Seat of the Diocese of Maasin and the heart of the city's faith heritage.",
    links: [
      {
        provider: 'province',
        url: `${provinceBase}/the-cathedral-of-our-lady-of-the-assumption-of-maasin/`,
      },
    ],
  },
  {
    slug: 'guinsuhotan-falls-and-cave',
    name: 'Guinsuhotan Falls and Cave',
    category: 'nature',
    area: 'Countryside',
    icon: 'Waves',
    description: "A waterfall and cave tucked in the city's countryside.",
    links: [
      { provider: 'city', url: `${cityBase}/17-guinsuhotan` },
      {
        provider: 'province',
        url: `${provinceBase}/guinsuhotan-falls-and-cave-2/`,
      },
    ],
  },
  {
    slug: 'sakay-sakay-festival',
    name: 'Sakay-Sakay Festival',
    category: 'events',
    area: 'City proper',
    icon: 'PartyPopper',
    description:
      'An expression of gratitude and devotion to the \u201CSe\u00F1or Sto. Ni\u00F1o de Maasin\u201D, marked by a lively fluvial procession.',
    links: [{ provider: 'city', url: cityTourismPage }],
  },
  {
    slug: 'ajonay-festival',
    name: 'Ajonay Festival',
    category: 'events',
    area: 'City proper',
    icon: 'Sparkles',
    description:
      "The Cityhood Anniversary celebration capturing the city's 'ajonay' spirit of cooperation and voluntarism.",
    links: [
      { provider: 'city', url: cityTourismPage },
      { provider: 'province', url: `${provinceBase}/ajonay-festival/` },
    ],
  },
  {
    slug: 'espina-boulevard',
    name: 'Edgarino S. Espina Boulevard',
    category: 'resorts',
    area: 'Seafront',
    icon: 'Sunset',
    description:
      "The city's sunset boulevard, named after former Mayor Edgarino S. Espina - a seashore promenade famous for its afterglow tambay.",
    links: [{ provider: 'city', url: `${cityBase}/39-espina-blvd` }],
  },
  {
    slug: 'lawis-beach-resort',
    name: 'Lawis Beach Resort',
    category: 'resorts',
    area: 'Brgy. Bilibol',
    icon: 'Waves',
    description: 'A beach resort along the coast of Barangay Bilibol.',
    links: [
      {
        provider: 'province',
        url: `${provinceBase}/resorts-and-recreation-facilities/`,
      },
    ],
  },
  {
    slug: 'sofia-beach-resort',
    name: 'Sofia Beach Resort',
    category: 'resorts',
    area: 'Brgy. Bilibol',
    icon: 'Umbrella',
    description: 'A seaside resort in Barangay Bilibol.',
    links: [
      {
        provider: 'province',
        url: `${provinceBase}/resorts-and-recreation-facilities/`,
      },
    ],
  },
  {
    slug: 'cacao-mountain-resort',
    name: 'Cacao Mountain Resort',
    category: 'resorts',
    area: 'Brgy. Tagnipa',
    icon: 'TreePalm',
    description: 'A mountain resort high in Barangay Tagnipa.',
    links: [
      {
        provider: 'province',
        url: `${provinceBase}/resorts-and-recreation-facilities/`,
      },
    ],
  },
  {
    slug: 'dongon-hillside-resort',
    name: 'Dongon Hillside Resort',
    category: 'resorts',
    area: 'Brgy. Dongon',
    icon: 'Sunset',
    description: 'A hillside resort overlooking the Barangay Dongon area.',
    links: [
      {
        provider: 'province',
        url: `${provinceBase}/resorts-and-recreation-facilities/`,
      },
    ],
  },
  {
    slug: 'libhu-hills-resort',
    name: 'Libhu Hills Resort and Sports Complex',
    category: 'resorts',
    area: 'Brgy. Libhu',
    icon: 'Sunset',
    description: 'A hillside resort and sports complex in Barangay Libhu.',
    links: [
      {
        provider: 'province',
        url: `${provinceBase}/resorts-and-recreation-facilities/`,
      },
    ],
  },
];
