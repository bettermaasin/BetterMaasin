import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  AlertCircleIcon,
  ArrowRightIcon,
  CrossIcon,
  FlameIcon,
  ShieldIcon,
  TriangleAlertIcon,
} from 'lucide-react';
import hotlinesData from '../../data/hotlines/hotlines.json';

interface Hotline {
  name: string;
  category: string;
  numbers: string[];
  description?: string;
}

const findHotlineByText = (list: Hotline[], text: string): Hotline | null =>
  list.find(hotline => {
    const haystack =
      hotline.name +
      ' ' +
      (hotline.description || '') +
      ' ' +
      hotline.numbers.join(' ');
    return haystack.toLowerCase().includes(text);
  }) ?? null;

const emergencyHotlines = hotlinesData.emergencyHotlines as Hotline[];
const disasterHotlines = hotlinesData.disasterHotlines as Hotline[];
const securityHotlines = hotlinesData.securityHotlines as Hotline[];

const pinned = [
  {
    label: 'Unified 911',
    icon: <AlertCircleIcon className='h-4 w-4' />,
    hotline: findHotlineByText(emergencyHotlines, '911'),
    chip: 'bg-purple-100 text-purple-700',
  },
  {
    label: 'Police',
    icon: <ShieldIcon className='h-4 w-4' />,
    hotline: findHotlineByText(securityHotlines, 'police'),
    chip: 'bg-blue-100 text-blue-700',
  },
  {
    label: 'Fire',
    icon: <FlameIcon className='h-4 w-4' />,
    hotline: findHotlineByText(disasterHotlines, 'fire'),
    chip: 'bg-red-100 text-red-700',
  },
  {
    label: 'Disaster',
    icon: <TriangleAlertIcon className='h-4 w-4' />,
    hotline: findHotlineByText(disasterHotlines, 'cdrrmo'),
    chip: 'bg-yellow-100 text-yellow-800',
  },
  {
    label: 'Medical',
    icon: <CrossIcon className='h-4 w-4' />,
    hotline: findHotlineByText(emergencyHotlines, 'soymph'),
    chip: 'bg-green-100 text-green-700',
  },
].filter(item => item.hotline) as {
  label: string;
  icon: JSX.Element;
  hotline: Hotline;
  chip: string;
}[];

const QuickHotlines: FC = () => {
  const { t } = useTranslation('common');

  return (
    <section className='bg-gray-50 py-6'>
      <div className='container mx-auto px-4'>
        <div className='rounded-xl border border-red-100 bg-white p-4 shadow-xs'>
          <div className='mb-3 flex flex-wrap items-center justify-between gap-2'>
            <h2 className='flex items-center gap-2 text-lg md:text-xl font-bold text-gray-900'>
              <span className='flex h-7 w-7 items-center justify-center rounded-full bg-red-50 text-red-600'>
                <AlertCircleIcon className='h-4 w-4' />
              </span>
              {t('emergency.title')}
            </h2>
            <Link
              to='/hotlines'
              className='inline-flex items-center text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors'
            >
              {t('emergency.viewAll')}
              <ArrowRightIcon className='ml-1 h-4 w-4' />
            </Link>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2'>
            {pinned.map(item => (
              <div
                key={item.label}
                className='flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 shadow-xs transition-shadow hover:shadow-sm'
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${item.chip}`}
                >
                  {item.icon}
                </span>
                <div className='min-w-0'>
                  <div className='text-[11px] font-medium text-gray-500 uppercase tracking-wide'>
                    {item.label}
                  </div>
                  <a
                    href={`tel:${item.hotline.numbers[0].replace(/\D/g, '')}`}
                    className='block truncate text-sm font-semibold text-gray-900 hover:text-primary-700'
                  >
                    {item.hotline.numbers[0]}
                  </a>
                  <div
                    className='block truncate text-xs text-gray-500'
                    title={item.hotline.name}
                  >
                    {item.hotline.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickHotlines;
