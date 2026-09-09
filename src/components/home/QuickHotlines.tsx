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
  },
  {
    label: 'Police',
    icon: <ShieldIcon className='h-4 w-4' />,
    hotline: findHotlineByText(securityHotlines, 'police'),
  },
  {
    label: 'Fire',
    icon: <FlameIcon className='h-4 w-4' />,
    hotline: findHotlineByText(disasterHotlines, 'fire'),
  },
  {
    label: 'Disaster',
    icon: <TriangleAlertIcon className='h-4 w-4' />,
    hotline: findHotlineByText(disasterHotlines, 'cdrrmo'),
  },
  {
    label: 'Medical',
    icon: <CrossIcon className='h-4 w-4' />,
    hotline: findHotlineByText(emergencyHotlines, 'soym'),
  },
].filter(item => item.hotline) as {
  label: string;
  icon: JSX.Element;
  hotline: Hotline;
}[];

const QuickHotlines: FC = () => {
  const { t } = useTranslation('common');

  return (
    <section className='text-white'>
      <div className='relative h-2 overflow-hidden bg-linear-to-r from-red-800 via-red-700 to-red-600'>
        <span aria-hidden='true' className='transition-line' />
      </div>
      <div className='bg-linear-to-r from-red-800 via-red-700 to-red-600 py-5'>
        <div className='container mx-auto px-4'>
          <div className='mb-3 flex flex-wrap items-center justify-between gap-2'>
            <h2 className='flex items-center gap-2 text-base md:text-lg font-bold text-white'>
              <span className='flex h-6 w-6 items-center justify-center rounded-full bg-white/15'>
                <AlertCircleIcon className='h-3.5 w-3.5 text-white' />
              </span>
              {t('emergency.title')}
            </h2>
            <Link
              to='/hotlines'
              className='hotline-btn-shine inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700 ring-1 ring-white/40 transition-colors hover:bg-white'
            >
              {t('emergency.viewAll')}
              <ArrowRightIcon className='ml-1 h-3.5 w-3.5' />
            </Link>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2'>
            {pinned.map(item => (
              <div
                key={item.label}
                className='flex items-center gap-2.5 rounded-lg border border-white/40 bg-red-50 p-2.5'
              >
                <span className='flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white text-red-600'>
                  {item.icon}
                </span>
                <div className='min-w-0'>
                  <div className='text-[10px] font-medium text-red-800/70 uppercase tracking-wide'>
                    {item.label}
                  </div>
                  <a
                    href={`tel:${item.hotline.numbers[0].replace(/\D/g, '')}`}
                    className='block truncate text-sm font-semibold text-red-900 hover:text-red-700'
                  >
                    {item.hotline.numbers[0]}
                  </a>
                  <div
                    className='block truncate text-xs text-red-800/60'
                    title={item.hotline.name}
                  >
                    {item.hotline.name}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className='mt-3 text-xs text-white/90'>
            {t('emergency.quickNote')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default QuickHotlines;
