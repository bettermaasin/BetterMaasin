import { FC } from 'react';
import { ConstructionIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import MeilisearchInstantSearch from '../search/MeilisearchInstantSearch';
import { Link } from 'react-router-dom';

const Hero: FC = () => {
  const { t } = useTranslation('common');

  return (
    <div className='bg-linear-to-r from-primary-600 to-primary-700 text-white py-12 md:py-24'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-center'>
          {/* Left section with title and search */}
          <div className='animate-fade-in'>
            <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight'>
              {t('hero.title')}
            </h1>
            <p className='text-lg text-blue-200 mb-8 max-w-lg'>
              {t('hero.subtitle')}
            </p>
            {/* Meilisearch component will be full width and include its own styling */}
            {/* The background of Hero is dark, MeilisearchInstantSearch has a light theme by default */}
            {/* Consider adjusting MeilisearchInstantSearch styles or Hero background for better blending */}
            <div className='mb-8'>
              <MeilisearchInstantSearch />
            </div>
            <div className='mt-4'>
              <Link
                to='/services'
                className='inline-flex items-center gap-2 bg-amber-400/20 text-amber-100 border border-amber-300/40 hover:bg-amber-400/30 py-2 px-4 rounded-xl text-sm transition-colors'
              >
                <ConstructionIcon className='h-4 w-4' aria-hidden='true' />
                {t('comingSoon.badge')}
              </Link>
            </div>
          </div>

          {/* Right section with quick access services */}
          <div className='bg-white/10 backdrop-blur-xs rounded-xl p-6 shadow-lg animate-slide-in'>
            <h2 className='text-2xl font-semibold mb-4'>
              {t('services.title')}
            </h2>
            <Link
              to='/services'
              className='flex items-start gap-3 bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-all duration-200'
            >
              <div className='bg-amber-400/20 text-amber-100 p-3 rounded-full shrink-0'>
                <ConstructionIcon className='h-6 w-6' aria-hidden='true' />
              </div>
              <span className='flex-1'>
                <span className='block font-medium text-left'>
                  {t('comingSoon.heading')}
                </span>
                <span className='block text-sm text-blue-100 mt-1 text-left'>
                  {t('comingSoon.description')}
                </span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
