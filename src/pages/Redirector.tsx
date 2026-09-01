import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { LoaderIcon, ExternalLinkIcon, HomeIcon } from 'lucide-react';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';

const LINKS: Record<string, string> = {
  discord: 'https://discord.gg/BvSDVFj82',
  github: 'https://github.com/bettermaasin',
  facebook: 'https://www.facebook.com/bettermaasin.org',
};

const LABELS: Record<string, string> = {
  discord: 'Discord',
  github: 'GitHub',
  facebook: 'Facebook',
};

export default function Redirector() {
  const [searchParams] = useSearchParams();
  const to = searchParams.get('to') ?? 'discord';
  const url = LINKS[to];

  useEffect(() => {
    if (!url) return;

    const timer = setTimeout(() => {
      window.location.assign(url);
    }, 5000);

    return () => clearTimeout(timer);
  }, [url]);

  return (
    <div className='bg-gradient-to-br from-primary-50 via-white to-accent-50'>
      <div className='flex min-h-[calc(100svh-7.5rem)] flex-col items-center justify-center gap-6 px-6 py-12 text-center'>
        <div className='inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 sm:h-20 sm:w-20'>
          {url ? (
            <LoaderIcon className='h-8 w-8 animate-spin text-primary-600 sm:h-10 sm:w-10' />
          ) : (
            <ExternalLinkIcon className='h-8 w-8 text-primary-600 sm:h-10 sm:w-10' />
          )}
        </div>
        <div className='max-w-lg'>
          <h1 className='text-xl font-semibold text-gray-900 sm:text-2xl'>
            {url
              ? `Redirecting to ${LABELS[to] ?? 'the requested page'}...`
              : 'Invalid redirect link'}
          </h1>
          <p className='mt-2 text-sm text-gray-600 sm:text-base'>
            {url
              ? 'If nothing happens, tap the link below.'
              : 'This redirect link is not recognized.'}
          </p>
        </div>

        {url && (
          <a
            href={url}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center justify-center'
          >
            <Button className='px-8 font-semibold' size='lg'>
              <ExternalLinkIcon className='mr-2 h-4 w-4' />
              Open {LABELS[to] ?? 'link'}
            </Button>
          </a>
        )}

        <Link to='/'>
          <Button variant='outline' size='lg' className='px-8'>
            <HomeIcon className='mr-2 h-4 w-4' />
            Return to Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
}
