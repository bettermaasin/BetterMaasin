import { FC, useState } from 'react';
import hotlinesData from '../../data/hotlines/hotlines.json';
import {
  ExternalLinkIcon,
  ShieldAlertIcon,
  PhoneIcon,
  SearchIcon,
  AlertCircleIcon,
  AlertTriangleIcon,
  CloudLightningIcon,
  ShieldIcon,
  BusIcon,
  DropletIcon,
  HeartIcon,
  CrossIcon,
  FlameIcon,
  PinIcon,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/Dialog';

interface Hotline {
  name: string;
  category: string;
  numbers: string[];
  description?: string;
}

type CategoryKey =
  | 'all'
  | 'emergency'
  | 'disaster'
  | 'security'
  | 'transport'
  | 'weather'
  | 'utility'
  | 'social';

const categories: { id: CategoryKey; name: string; icon: JSX.Element }[] = [
  { id: 'all', name: 'All Hotlines', icon: <PhoneIcon className='w-5 h-5' /> },
  {
    id: 'emergency',
    name: 'Emergency',
    icon: <AlertCircleIcon className='w-5 h-5' />,
  },
  {
    id: 'disaster',
    name: 'Disaster',
    icon: <AlertTriangleIcon className='w-5 h-5' />,
  },
  {
    id: 'security',
    name: 'Security',
    icon: <ShieldIcon className='w-5 h-5' />,
  },
  {
    id: 'transport',
    name: 'Transport',
    icon: <BusIcon className='w-5 h-5' />,
  },
  {
    id: 'weather',
    name: 'Weather',
    icon: <CloudLightningIcon className='w-5 h-5' />,
  },
  {
    id: 'utility',
    name: 'Utilities',
    icon: <DropletIcon className='w-5 h-5' />,
  },
  {
    id: 'social',
    name: 'Social Services',
    icon: <HeartIcon className='w-5 h-5' />,
  },
];

const categoryData: Record<Exclude<CategoryKey, 'all'>, Hotline[]> = {
  emergency: hotlinesData.emergencyHotlines as Hotline[],
  disaster: hotlinesData.disasterHotlines as Hotline[],
  security: hotlinesData.securityHotlines as Hotline[],
  transport: hotlinesData.transportHotlines as Hotline[],
  weather: hotlinesData.weatherHotlines as Hotline[],
  utility: hotlinesData.utilityHotlines as Hotline[],
  social: hotlinesData.socialServicesHotlines as Hotline[],
};

const allHotlines: Hotline[] = Object.values(categoryData).flat();

const priorityStyles: Record<string, { card: string; badge: string }> = {
  Police: {
    card: 'bg-blue-50 border-blue-200 border-l-4 hover:shadow-xl',
    badge: 'bg-blue-600 text-white',
  },
  Fire: {
    card: 'bg-red-50 border-red-200 border-l-4 hover:shadow-xl',
    badge: 'bg-red-600 text-white',
  },
  Medical: {
    card: 'bg-green-50 border-green-200 border-l-4 hover:shadow-xl',
    badge: 'bg-green-600 text-white',
  },
  Disaster: {
    card: 'bg-yellow-50 border-yellow-200 border-l-4 hover:shadow-xl',
    badge: 'bg-yellow-600 text-white',
  },
  '911': {
    card: 'bg-purple-50 border-purple-200 border-l-4 hover:shadow-xl',
    badge: 'bg-purple-600 text-white',
  },
};

const defaultStyle = {
  card: 'bg-white border-gray-200',
  badge: 'bg-green-600 text-white',
};

const getPriorityLabel = (hotline: Hotline): string | null => {
  const text = (
    hotline.name +
    ' ' +
    (hotline.category || '') +
    ' ' +
    (hotline.description || '')
  ).toLowerCase();
  if (/\b(police|pnp)\b/.test(text)) return 'Police';
  if (/\b(fire|bfp)\b/.test(text)) return 'Fire';
  if (/\b(medical|hospital)\b/.test(text)) return 'Medical';
  if (/\b(disaster)\b/.test(text)) return 'Disaster';
  if (/\b(national)\b/.test(text)) return '911';
  return null;
};

const getPriorityClasses = (hotline: Hotline) => {
  const label = getPriorityLabel(hotline);
  if (!label) return defaultStyle;
  return priorityStyles[label] ?? defaultStyle;
};

const findHotlineByText = (list: Hotline[], text: string) =>
  list.find(hotline => {
    const haystack =
      hotline.name +
      ' ' +
      (hotline.description || '') +
      ' ' +
      hotline.numbers.join(' ');
    return haystack.toLowerCase().includes(text);
  });

const pinnedHotlines = [
  {
    label: 'National',
    icon: <AlertCircleIcon className='h-4 w-4 text-red-600' />,
    hotline: findHotlineByText(categoryData.emergency, '911'),
  },
  {
    label: 'Police',
    icon: <ShieldIcon className='h-4 w-4 text-blue-600' />,
    hotline: findHotlineByText(categoryData.security, 'police'),
  },
  {
    label: 'Fire',
    icon: <FlameIcon className='h-4 w-4 text-orange-600' />,
    hotline: findHotlineByText(categoryData.disaster, 'fire'),
  },
  {
    label: 'SOYMPH-ER',
    icon: <CrossIcon className='h-4 w-4 text-emerald-600' />,
    hotline: findHotlineByText(categoryData.emergency, 'soymph'),
  },
].filter(item => item.hotline) as {
  label: string;
  icon: JSX.Element;
  hotline: Hotline;
}[];

const Hotlines: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all');

  const visibleTabs = categories.filter(
    category =>
      category.id === 'all' ||
      categoryData[category.id as Exclude<CategoryKey, 'all'>].length > 0
  );

  const categoryHotlines =
    activeCategory === 'all'
      ? allHotlines
      : categoryData[activeCategory as Exclude<CategoryKey, 'all'>];

  const filteredHotlines = categoryHotlines.filter(
    hotline =>
      hotline.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotline.numbers.some(number => number.includes(searchTerm))
  );

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='text-center mb-8'>
        <h1 className='text-3xl font-bold mb-2'>Maasin Emergency Hotlines</h1>
        <p className='text-gray-800'>
          Important contact numbers for emergencies and public services
        </p>
      </div>

      {/* Search Bar */}
      <div className='relative max-w-md mx-auto mb-8'>
        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
          <SearchIcon className='h-5 w-5 text-gray-400' />
        </div>
        <input
          type='text'
          className='block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-xs focus:ring-blue-500 focus:border-blue-500'
          placeholder='Search for hotlines...'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Category Tabs */}
      <div className='flex flex-wrap justify-center gap-2 mb-8'>
        {visibleTabs.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex items-center px-4 py-2 rounded-full cursor-pointer ${
              activeCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
          >
            <span className='mr-2'>{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>

      {/* Pinned Hotlines */}
      {pinnedHotlines.length > 0 && (
        <div className='mb-5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5'>
          <div className='mb-2 flex items-center gap-2 text-xs font-semibold text-gray-600 uppercase tracking-wide'>
            <PinIcon className='h-3.5 w-3.5 text-gray-500' />
            Pinned Hotlines
          </div>
          <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4'>
            {pinnedHotlines.map(item => (
              <div
                key={item.label}
                className='flex items-center gap-2 rounded-md border border-gray-200 bg-white px-2.5 py-2 text-xs sm:text-sm'
              >
                {item.icon}
                <span className='font-semibold text-gray-900 whitespace-nowrap'>
                  {item.label}
                </span>
                <a
                  href={`tel:${item.hotline.numbers[0].replace(/\D/g, '')}`}
                  className='min-w-0 flex-1 text-blue-700 hover:underline truncate'
                >
                  {item.hotline.numbers[0]}
                </a>
                {item.hotline.numbers.length > 1 && (
                  <span className='text-[11px] text-gray-500 whitespace-nowrap'>
                    +{item.hotline.numbers.length - 1} more
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hotlines List */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {filteredHotlines.length > 0 ? (
          filteredHotlines.map((hotline, index) => (
            <div
              key={index}
              className={`relative rounded-lg shadow-md overflow-hidden border transition-shadow hover:shadow-lg ${getPriorityClasses(hotline).card}`}
            >
              <div className='p-5'>
                <div className='flex items-start justify-between'>
                  <h3 className='font-bold text-lg mb-2 pr-4 flex-1 break-words'>
                    {hotline.name}
                  </h3>
                  {getPriorityLabel(hotline) && (
                    <span
                      className={`ml-3 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold shrink-0 ${getPriorityClasses(hotline).badge}`}
                    >
                      {getPriorityLabel(hotline)}
                    </span>
                  )}
                </div>
                {hotline.description && (
                  <p className='text-gray-800 text-sm mb-3'>
                    {hotline.description}
                  </p>
                )}
                <div className='space-y-2'>
                  {hotline.numbers.map((number, idx) => (
                    <div key={idx} className='flex items-center'>
                      <PhoneIcon className='h-4 w-4 text-blue-500 mr-2' />
                      <a
                        href={`tel:${number.replace(/\D/g, '')}`}
                        className='text-blue-600 hover:underline'
                      >
                        {number}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='col-span-full text-center py-10'>
            <AlertCircleIcon className='h-12 w-12 text-gray-400 mx-auto mb-4' />
            <h3 className='text-lg font-medium text-gray-900'>
              No hotlines found
            </h3>
            <p className='mt-1 text-gray-800'>
              Try adjusting your search or filter.
            </p>
          </div>
        )}
      </div>

      {/* Data Source Card */}
      <div className='rounded-lg border border-yellow-100 bg-yellow-50/60 p-4 md:p-5 mt-8'>
        <div className='flex items-start gap-3'>
          <div className='rounded-full bg-white p-2 border border-yellow-100'>
            <ShieldAlertIcon className='h-4 w-4 text-yellow-700' />
          </div>

          <div className='min-w-0'>
            <h2 className='text-sm font-semibold text-yellow-900'>
              Data Source and Freshness
            </h2>
            <p className='mt-1 text-sm text-yellow-900/90 leading-relaxed'>
              These hotlines are collected from official government sources and
              various publicly available online sources. If you notice any
              outdated information, please report it.
            </p>

            <div className='mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-yellow-800'>
              <Dialog>
                <DialogTrigger asChild>
                  <button className='text-blue-600 underline'>
                    Sources
                    <ExternalLinkIcon className='h-3.5 w-3.5 inline-block ml-1' />
                  </button>
                </DialogTrigger>
                <DialogContent className='max-w-md'>
                  <DialogHeader>
                    <DialogTitle className='text-base'>
                      Data Sources
                    </DialogTitle>
                  </DialogHeader>
                  <div className='space-y-2 text-sm text-gray-800'>
                    <a
                      href='https://urlr.me/md4Zsb'
                      target='_blank'
                      rel='noreferrer'
                      className='flex items-center gap-2 hover:underline'
                    >
                      Maasin City Facebook Page (Web Archived)
                      <ExternalLinkIcon className='h-3.5 w-3.5' />
                    </a>
                    <a
                      href='https://primewatercorp.com/contact-us/'
                      target='_blank'
                      rel='noreferrer'
                      className='flex items-center gap-2 hover:underline'
                    >
                      Prime Water Contact
                      <ExternalLinkIcon className='h-3.5 w-3.5' />
                    </a>
                    <a
                      href='https://lto.gov.ph/directory/'
                      target='_blank'
                      rel='noreferrer'
                      className='flex items-center gap-2 hover:underline'
                    >
                      LTO Directory
                      <ExternalLinkIcon className='h-3.5 w-3.5' />
                    </a>
                    <a
                      href='https://www.soleco.com.ph/aboutus/contactus'
                      target='_blank'
                      rel='noreferrer'
                      className='flex items-center gap-2 hover:underline'
                    >
                      SOLECO Contact Us
                      <ExternalLinkIcon className='h-3.5 w-3.5' />
                    </a>
                    <a
                      href='https://healthspace.ph/facility/livinghope-hospital-inc-FCD01381'
                      target='_blank'
                      rel='noreferrer'
                      className='flex items-center gap-2 hover:underline'
                    >
                      HealthSpace
                      <ExternalLinkIcon className='h-3.5 w-3.5' />
                    </a>
                  </div>
                </DialogContent>
              </Dialog>
              <span>Coverage: Maasin local hotlines</span>
              <span>Last verified: April 2026</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotlines;
