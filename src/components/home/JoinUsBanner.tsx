import {
  ArrowRightIcon,
  HeartHandshakeIcon,
  MessageCircleIcon,
} from 'lucide-react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const JoinUsBanner: FC = () => {
  const { t } = useTranslation('common');

  return (
    <section className='bg-linear-to-r from-primary-700 to-primary-600 py-14 text-white'>
      <div className='container mx-auto px-4'>
        <div className='text-center max-w-4xl mx-auto'>
          <div className='flex justify-center mb-5'>
            <div className='rounded-full bg-white/15 p-3'>
              <HeartHandshakeIcon className='h-7 w-7 text-white' />
            </div>
          </div>

          <h2 className='text-3xl md:text-4xl font-bold mb-4 leading-tight'>
            {t('joinUs.bannerTitle')}
          </h2>

          <p className='text-base md:text-lg mb-8 text-blue-100 leading-relaxed max-w-3xl mx-auto'>
            {t('joinUs.bannerSubtitle')}
            <strong className='text-white'>
              {' '}
              {t('joinUs.bannerHighlight')}
            </strong>
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
            <Link
              to='/join-us'
              className='inline-flex items-center justify-center px-6 py-3 bg-white text-primary-700 font-semibold rounded-md hover:bg-blue-50 transition-colors'
            >
              {t('joinUs.joinMovement')}
              <ArrowRightIcon className='h-5 w-5 ml-2' />
            </Link>

            <div className='text-blue-100 font-medium'>{t('joinUs.or')}</div>

            <a
              href='/redirect?to=discord'
              className='inline-flex items-center justify-center px-6 py-3 border border-white text-white font-semibold rounded-md hover:bg-white/10 transition-colors'
            >
              <MessageCircleIcon className='h-5 w-5 mr-2' />
              {t('joinUs.joinDiscord')}
            </a>
          </div>

          <p className='mt-6 text-sm text-blue-200'>{t('joinUs.features')}</p>
        </div>
      </div>
    </section>
  );
};

export default JoinUsBanner;
