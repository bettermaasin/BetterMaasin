import { ArrowLeftIcon, ConstructionIcon, MailIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { getSiteUrl } from '../../lib/site-url';

export default function ServicesPage() {
  const { t } = useTranslation('common');
  const canonicalUrl = `${getSiteUrl()}/services`;

  return (
    <div className='min-h-screen bg-gray-50'>
      <Helmet key={canonicalUrl}>
        <title>{t('comingSoon.title')}</title>
        <meta name='description' content={t('comingSoon.description')} />
        <meta name='robots' content='noindex, nofollow' />
        <link rel='canonical' href={canonicalUrl} />

        <meta property='og:title' content={t('comingSoon.title')} />
        <meta property='og:description' content={t('comingSoon.description')} />
        <meta property='og:type' content='website' />
        <meta property='og:url' content={canonicalUrl} />
      </Helmet>

      {/* Page header */}
      <header className='bg-linear-to-r from-primary-700 to-primary-900 text-white'>
        <div className='container mx-auto px-4 py-14 md:py-20'>
          <div className='flex items-center gap-4 mb-4'>
            <div className='inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 shrink-0'>
              <ConstructionIcon className='h-6 w-6' aria-hidden='true' />
            </div>
            <h1 className='text-3xl md:text-4xl font-bold leading-tight'>
              {t('comingSoon.heading')}
            </h1>
          </div>
          <p className='text-lg text-blue-100 max-w-2xl leading-relaxed'>
            {t('comingSoon.description')}
          </p>
        </div>
      </header>

      {/* Content */}
      <div className='container mx-auto px-4 py-10 md:py-14'>
        <div className='max-w-3xl mx-auto'>
          <div className='rounded-2xl bg-white shadow-xs p-6 md:p-10'>
            <div className='flex items-center gap-3 mb-6'>
              <span className='inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-700'>
                <ConstructionIcon className='h-3.5 w-3.5' aria-hidden='true' />
                {t('comingSoon.badge')}
              </span>
              <span
                className='h-px w-full bg-gray-100'
                aria-hidden='true'
              ></span>
            </div>

            <h2 className='text-xl md:text-2xl font-semibold text-gray-900 mb-3'>
              {t('comingSoon.noteTitle')}
            </h2>
            <div className='rounded-xl border border-amber-200 bg-amber-50 p-5 md:p-6'>
              <p className='text-sm md:text-base leading-relaxed text-amber-800'>
                {t('comingSoon.noteBody')}
              </p>
            </div>

            <p className='mt-4 text-xs md:text-sm text-gray-400 leading-relaxed'>
              {t('comingSoon.devNotice')}
            </p>

            <p className='mt-6 text-gray-600 leading-relaxed'>
              {t('comingSoon.whatsNext')}
            </p>

            <div className='mt-8 flex flex-col sm:flex-row gap-3'>
              <Link
                to='/'
                className='inline-flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700 focus:outline-hidden focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
              >
                <ArrowLeftIcon className='h-4 w-4' aria-hidden='true' />
                {t('comingSoon.backHome')}
              </Link>
              <Link
                to='/contact'
                className='inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-hidden focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
              >
                <MailIcon className='h-4 w-4' aria-hidden='true' />
                {t('comingSoon.contactHelp')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
