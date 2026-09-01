import {
  ArrowRight,
  Building2,
  Flame,
  Heart,
  MapPin,
  Search,
  Sparkles,
  Waves,
} from 'lucide-react';
import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const stats = [
  { value: 'One', label: 'Local portal' },
  { value: 'Open', label: 'Source & data' },
  { value: 'All', label: 'Free for everyone' },
];

const features = [
  {
    icon: Building2,
    title: 'Services',
    desc: 'Find public services and how to get them.',
  },
  {
    icon: MapPin,
    title: 'Government',
    desc: 'Officials, barangays, departments & agencies.',
  },
  {
    icon: Waves,
    title: 'Statistics',
    desc: 'Local data & maps, incl. flood-control projects.',
  },
  {
    icon: Sparkles,
    title: 'Everyday tools',
    desc: 'Hotlines, weather, forex & holidays.',
  },
  {
    icon: Search,
    title: 'One search',
    desc: 'Search across the whole portal at once.',
  },
  {
    icon: Heart,
    title: 'Built for the city',
    desc: 'Part of the Better movement, free to reuse (CC0).',
  },
];

const AboutPage: FC = () => {
  return (
    <div className='min-h-screen bg-gray-50'>
      <Helmet>
        <title>About | BetterMaasin.org</title>
        <meta
          name='description'
          content='BetterMaasin.org gathers Maasin City’s government, services, and data into one transparent, accessible civic-tech portal.'
        />
        <meta
          name='keywords'
          content='Maasin City, civic tech, Better movement, transparency, government'
        />
        <link rel='canonical' href='https://bettermaasin.org/about' />
        <meta property='og:title' content='About | BetterMaasin.org' />
        <meta
          property='og:description'
          content='BetterMaasin.org gathers Maasin City’s government, services, and data into one transparent, accessible civic-tech portal.'
        />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://bettermaasin.org/about' />
        <meta
          property='og:image'
          content='https://bettermaasin.org/ph-logo.png'
        />
      </Helmet>

      <div className='container mx-auto px-4 py-6 md:py-10'>
        <div className='overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-sm'>
          {/* Hero */}
          <div className='relative bg-linear-to-br from-primary-700 via-primary-600 to-blue-600 px-6 py-12 md:px-12 md:py-16'>
            <Waves className='absolute -bottom-6 right-6 h-40 w-40 text-white/10 rotate-12' />
            <div className='relative max-w-2xl'>
              <span className='inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/90'>
                <Flame className='h-3.5 w-3.5' />A Better movement portal
              </span>
              <h1 className='mt-4 text-3xl font-extrabold leading-tight text-white md:text-4xl'>
                About BetterMaasin.org
              </h1>
              <p className='mt-3 max-w-xl text-base text-white/90 md:text-lg'>
                A civic-tech portal that brings Maasin City&apos;s government,
                services, and data together in one transparent, accessible place
                — built in the spirit of doing things{' '}
                <strong className='text-white'>better</strong>.
              </p>
            </div>
            {/* Stats bar */}
            <div className='relative mt-8 grid grid-cols-3 gap-3 border-t border-white/20 pt-6'>
              {stats.map(s => (
                <div key={s.label}>
                  <p className='text-xl font-bold text-white md:text-2xl'>
                    {s.value}
                  </p>
                  <p className='text-xs text-white/80'>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Why */}
          <div className='px-6 py-8 md:px-12'>
            <div className='grid gap-8 md:grid-cols-2'>
              <div>
                <h2 className='text-xl font-bold text-gray-900'>
                  Why build it
                </h2>
                <p className='mt-3 leading-relaxed text-gray-700'>
                  Local information is scattered, disconnected, and hard to find
                  when you need it most. BetterMaasin.org exists so the answers
                  are easy to find, easy to understand, and easy to trust.
                </p>
                <p className='mt-3 text-sm text-gray-600'>
                  BetterMaasin.org is an independent project and is{' '}
                  <strong>not affiliated</strong> with the Maasin City LGU or
                  any government office in any way.
                </p>
                <Link
                  to='/contact'
                  className='mt-5 inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700'
                >
                  Get in touch
                  <ArrowRight className='h-4 w-4' />
                </Link>
              </div>
              <div>
                <h2 className='text-xl font-bold text-gray-900'>
                  What we stand for
                </h2>
                <ul className='mt-3 space-y-2 text-gray-700'>
                  <li className='rounded-lg bg-primary-50 px-4 py-3 font-medium text-primary-800'>
                    Transparent — information open &amp; easy to see
                  </li>
                  <li className='rounded-lg bg-primary-50 px-4 py-3 font-medium text-primary-800'>
                    Accessible — works for everyone, any device
                  </li>
                  <li className='rounded-lg bg-primary-50 px-4 py-3 font-medium text-primary-800'>
                    Local-first &amp; open — no permission needed
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className='border-t border-gray-200 px-6 py-8 md:px-12'>
            <h2 className='text-xl font-bold text-gray-900'>
              What&apos;s inside
            </h2>
            <div className='mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
              {features.map(f => (
                <div
                  key={f.title}
                  className='group rounded-xl border border-gray-200 p-5 transition-all hover:border-primary-400 hover:shadow-sm'
                >
                  <div className='flex h-11 w-11 items-center justify-center rounded-lg bg-primary-100 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white'>
                    <f.icon className='h-5 w-5' />
                  </div>
                  <h3 className='mt-3 font-semibold text-gray-900'>
                    {f.title}
                  </h3>
                  <p className='mt-1 text-sm text-gray-600'>{f.desc}</p>
                </div>
              ))}
            </div>

            {/* License & data */}
            <div className='mt-8 rounded-2xl bg-gray-50 px-6 py-8 md:px-8'>
              <h2 className='text-xl font-bold text-gray-900'>
                License &amp; data
              </h2>
              <p className='mt-3 text-lg font-semibold text-gray-800'>
                Everything here is{' '}
                <a
                  href='https://creativecommons.org/publicdomain/zero/1.0/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='font-bold text-primary-600 hover:underline'
                >
                  CC0 / public domain
                </a>{' '}
                unless otherwise stated.
              </p>
              <p className='mt-2 text-base leading-relaxed text-gray-700'>
                You&apos;re free to copy, reuse, remix, and build on the portal
                and its data — no permission needed. Any third-party data
                sources (like the DPWH Flood Control Information System) are
                credited wherever they appear. Some information may be under
                other open licenses, such as CC BY 4.0 (for example, data from
                the Philippine Statistics Authority).
              </p>
            </div>

            <p className='mt-6 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-relaxed text-amber-900'>
              <strong>No guarantee of accuracy or timeliness.</strong> This
              portal is a community effort, so information may change or become
              outdated. That’s why we need people like you to help keep it
              accurate, up to date, and useful for everyone.
            </p>
          </div>

          {/* CTA */}
          <div className='border-t border-gray-200 bg-gray-50 px-6 py-8 text-center md:px-12'>
            <p className='text-lg font-semibold text-gray-900'>
              Part of something bigger
            </p>
            <p className='mx-auto mt-1 max-w-md text-sm text-gray-600'>
              One of many local expressions of the Better movement — citizens
              building open, transparent government tech.
            </p>
            <Link
              to='/join-us'
              className='mt-4 inline-flex items-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700'
            >
              Get involved
              <ArrowRight className='h-4 w-4' />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
