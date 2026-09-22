import { FC } from 'react';
import { ConstructionIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../ui/Button';

const ServicesSection: FC = () => {
  const { t } = useTranslation('common');

  return (
    <section className='py-12 bg-white'>
      <div className='container mx-auto px-4'>
        <div className='max-w-2xl mx-auto rounded-xl border border-amber-200 bg-amber-50 p-6 md:p-8 text-center'>
          <div className='inline-flex items-center justify-center w-14 h-14 rounded-full bg-amber-100 text-amber-700 mb-4'>
            <ConstructionIcon className='h-7 w-7' aria-hidden='true' />
          </div>
          <p className='inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-amber-700'>
            {t('comingSoon.badge')}
          </p>
          <h2 className='mt-3 text-2xl md:text-3xl font-bold text-gray-900'>
            {t('comingSoon.heading')}
          </h2>
          <p className='mt-3 text-sm md:text-base leading-relaxed text-gray-700'>
            {t('comingSoon.noteTitle')}
          </p>
          <p className='mt-2 text-sm md:text-base leading-relaxed text-amber-800'>
            {t('comingSoon.noteBody')}
          </p>
          <div className='mt-6'>
            <Link to='/services'>
              <Button className='bg-primary-600 text-white rounded-lg px-6 py-2'>
                {t('navbar.services')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
