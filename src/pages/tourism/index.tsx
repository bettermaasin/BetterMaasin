import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  BedDoubleIcon,
  BinocularsIcon,
  CompassIcon,
  ExternalLinkIcon,
  MapPinIcon,
  ShieldAlertIcon,
  TreePalmIcon,
  type LucideIcon,
} from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import {
  cityTourismPage,
  provinceTourismPage,
  tourismAttractions,
  tourismCategories,
  TourismCategory,
} from '../../data/tourism';
import * as LucideIcons from 'lucide-react';

const categoryMeta: Record<
  TourismCategory,
  {
    gradient: string;
    iconBg: string;
    labelBg: string;
    labelText: string;
    pillBg: string;
    pillText: string;
    pillBorder: string;
    pillActiveBg: string;
    lucideName: string;
  }
> = {
  faith: {
    gradient: 'bg-linear-to-br from-primary-400 to-primary-700',
    iconBg: 'bg-primary-500/30',
    labelBg: 'bg-primary-800/30',
    labelText: 'text-white',
    pillBg: 'bg-primary-50',
    pillText: 'text-primary-700',
    pillBorder: 'border-primary-200',
    pillActiveBg: 'bg-primary-600',
    lucideName: 'Church',
  },
  nature: {
    gradient: 'bg-linear-to-br from-emerald-400 to-emerald-700',
    iconBg: 'bg-emerald-500/30',
    labelBg: 'bg-emerald-800/30',
    labelText: 'text-white',
    pillBg: 'bg-emerald-50',
    pillText: 'text-emerald-700',
    pillBorder: 'border-emerald-200',
    pillActiveBg: 'bg-emerald-600',
    lucideName: 'TreePalm',
  },
  events: {
    gradient: 'bg-linear-to-br from-orange-400 to-orange-700',
    iconBg: 'bg-orange-500/30',
    labelBg: 'bg-orange-800/30',
    labelText: 'text-white',
    pillBg: 'bg-orange-50',
    pillText: 'text-orange-700',
    pillBorder: 'border-orange-200',
    pillActiveBg: 'bg-orange-600',
    lucideName: 'PartyPopper',
  },
  resorts: {
    gradient: 'bg-linear-to-br from-teal-400 to-teal-700',
    iconBg: 'bg-teal-500/30',
    labelBg: 'bg-teal-800/30',
    labelText: 'text-white',
    pillBg: 'bg-teal-50',
    pillText: 'text-teal-700',
    pillBorder: 'border-teal-200',
    pillActiveBg: 'bg-teal-600',
    lucideName: 'Umbrella',
  },
};

const whereToStayPage =
  'https://maasincity.gov.ph/index.php/tourism/where-to-stay';

const Tourism: FC = () => {
  const { t } = useTranslation('tourism');

  const getIcon = (lucideName: string): LucideIcon | null => {
    const icon = LucideIcons[lucideName as keyof typeof LucideIcons];
    return typeof icon === 'function' ? (icon as LucideIcon) : null;
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <Helmet>
        <title>{t('page.title')}</title>
        <meta name='description' content={t('page.description')} />
      </Helmet>

      <div className='container mx-auto px-4 py-6 md:py-10'>
        <div className='overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm'>
          {/* Hero */}
          <div className='relative bg-linear-to-br from-primary-700 via-primary-600 to-blue-600 px-6 py-12 md:px-12 md:py-16'>
            <CompassIcon className='absolute -bottom-6 right-6 h-40 w-40 text-white/10 rotate-12' />
            <div className='relative max-w-2xl'>
              <span className='inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/90'>
                {t('page.eyebrow')}
              </span>
              <h1 className='mt-4 text-3xl font-extrabold leading-tight text-white md:text-4xl'>
                {t('page.title')}
              </h1>
              <p className='mt-3 max-w-xl text-base text-white/90 md:text-lg'>
                {t('page.subtitle')}
              </p>
            </div>
          </div>

          {/* Stats bar */}
          <div className='border-b border-gray-200 px-6 py-4 md:px-12'>
            <div className='flex items-center gap-5 text-sm text-gray-500'>
              <span className='flex items-center gap-1.5'>
                <TreePalmIcon className='h-4 w-4 text-gray-400' />
                <span className='font-medium text-gray-700'>
                  {tourismAttractions.length}
                </span>{' '}
                places
              </span>
              <span className='flex items-center gap-1.5'>
                <CompassIcon className='h-4 w-4 text-gray-400' />
                <span className='font-medium text-gray-700'>
                  {tourismCategories.length}
                </span>{' '}
                categories
              </span>
            </div>
          </div>

          {/* Attraction card grid */}
          <div className='px-6 py-8 md:px-12'>
            <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {tourismAttractions.map(attraction => {
                const meta = categoryMeta[attraction.category];
                const Icon = getIcon(attraction.icon);

                return (
                  <Card
                    key={attraction.slug}
                    hoverable
                    className='group flex flex-col'
                  >
                    <div
                      className={`relative h-36 w-full overflow-hidden ${meta.gradient}`}
                    >
                      {Icon && (
                        <div className='absolute inset-0 flex items-center justify-center'>
                          <div
                            className={`flex h-14 w-14 items-center justify-center rounded-full ${meta.iconBg}`}
                          >
                            <Icon className='h-7 w-7 text-white/80' />
                          </div>
                        </div>
                      )}
                      <span
                        className={`absolute bottom-2.5 left-2.5 rounded-full px-2.5 py-0.5 text-xs font-medium backdrop-blur-xs ${meta.labelBg} ${meta.labelText}`}
                      >
                        {t(`categories.${attraction.category}`)}
                      </span>
                    </div>

                    <CardContent className='flex flex-1 flex-col p-4'>
                      <h3 className='text-sm font-semibold leading-snug text-gray-900'>
                        {attraction.name}
                      </h3>
                      <p className='mt-0.5 text-xs text-gray-500'>
                        {attraction.area}
                      </p>
                      <p className='mt-2 flex-1 text-sm leading-relaxed text-gray-600 line-clamp-3'>
                        {attraction.description}
                      </p>
                      {attraction.links.length > 0 && (
                        <div className='mt-3'>
                          <a
                            href={attraction.links[0].url}
                            target='_blank'
                            rel='noreferrer'
                            className='inline-flex items-center gap-1 rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-900'
                          >
                            {t('sources.moreInfo')}
                            <ExternalLinkIcon className='h-3 w-3' />
                          </a>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Plan your visit */}
          <div className='border-t border-gray-200 px-6 py-8 md:px-12'>
            <h2 className='text-xl font-bold text-gray-900 md:text-2xl'>
              {t('plan.title')}
            </h2>
            <div className='mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3'>
              <Card>
                <CardContent className='p-5'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100'>
                    <BinocularsIcon className='h-5 w-5 text-primary-600' />
                  </div>
                  <h3 className='mt-3 font-semibold text-gray-900'>
                    {t('office.title')}
                  </h3>
                  <p className='mt-1 text-sm text-gray-600'>
                    {t('office.officeName')}
                  </p>
                  <p className='mt-1 text-sm font-medium text-gray-800'>
                    {t('office.contact')}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className='p-5'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100'>
                    <BedDoubleIcon className='h-5 w-5 text-primary-600' />
                  </div>
                  <h3 className='mt-3 font-semibold text-gray-900'>
                    {t('stay.title')}
                  </h3>
                  <p className='mt-1 text-sm text-gray-600'>
                    {t('stay.subtitle')}
                  </p>
                  <a
                    href={whereToStayPage}
                    target='_blank'
                    rel='noreferrer'
                    className='mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700'
                  >
                    {t('stay.visit')}
                    <ExternalLinkIcon className='h-3 w-3' />
                  </a>
                </CardContent>
              </Card>
              <Card>
                <CardContent className='p-5'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100'>
                    <MapPinIcon className='h-5 w-5 text-primary-600' />
                  </div>
                  <h3 className='mt-3 font-semibold text-gray-900'>
                    {t('location.title')}
                  </h3>
                  <p className='mt-1 text-sm text-gray-600'>
                    {t('location.subtitle')}
                  </p>
                  <Link
                    to='/'
                    className='mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700'
                  >
                    {t('location.visit')}
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Data Source and Freshness */}
          <div className='px-6 pb-6 md:px-12'>
            <div className='rounded-lg border border-yellow-100 bg-yellow-50/60 p-4 md:p-5'>
              <div className='flex items-start gap-3'>
                <div className='rounded-full border border-yellow-100 bg-white p-2'>
                  <ShieldAlertIcon className='h-4 w-4 text-yellow-700' />
                </div>

                <div className='min-w-0'>
                  <h2 className='text-sm font-semibold text-yellow-900'>
                    {t('dataSource.title')}
                  </h2>
                  <p className='mt-1 text-sm leading-relaxed text-yellow-900/90'>
                    {t('dataSource.description')}
                  </p>

                  <div className='mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-yellow-800'>
                    <span>
                      <span>{t('dataSource.sourceLabel')} </span>
                      <a
                        href={cityTourismPage}
                        target='_blank'
                        rel='noreferrer'
                        className='text-blue-600 underline'
                      >
                        {t('dataSource.citySource')}
                        <ExternalLinkIcon className='mb-0.75 ml-1 inline-block h-3 w-3' />
                      </a>
                    </span>
                    <a
                      href={provinceTourismPage}
                      target='_blank'
                      rel='noreferrer'
                      className='text-blue-600 underline'
                    >
                      {t('dataSource.provinceSource')}
                      <ExternalLinkIcon className='mb-0.75 ml-1 inline-block h-3 w-3' />
                    </a>
                    <span>{t('dataSource.coverage')}</span>
                    <span>{t('dataSource.lastVerified')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tourism;
