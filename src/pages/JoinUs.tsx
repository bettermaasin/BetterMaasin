import {
  ArrowRight,
  GitBranch,
  HeartHandshake,
  Languages,
  Lightbulb,
  MapPin,
  MessageCircle,
  Search,
  Sparkles,
  Users,
} from 'lucide-react';
import { FC, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const roles = [
  'Developers & engineers',
  'Designers & UX',
  'Writers & translators (Cebuano/Tagalog)',
  'Researchers & data folks',
  'Community & Discord',
  'Accessibility champions',
];

const ways = [
  {
    icon: GitBranch,
    title: 'Contribute code',
    desc: 'Open issues, fix bugs, or ship features on GitHub.',
  },
  {
    icon: Search,
    title: 'Improve data & accuracy',
    desc: 'Help keep Maasin City information current and correct.',
  },
  {
    icon: Sparkles,
    title: 'Design & UX',
    desc: 'Make the portal clearer, faster, and more usable.',
  },
  {
    icon: Languages,
    title: 'Write & translate',
    desc: 'Editorial work plus Cebuano and Tagalog translation.',
  },
  {
    icon: MessageCircle,
    title: 'Community & Discord',
    desc: 'Welcome newcomers and help spread the word.',
  },
  {
    icon: MapPin,
    title: 'Start your own Better LGU',
    desc: 'Use BetterMaasin as a template for your city.',
  },
];

const motion = [
  {
    href: 'https://bettergov.ph',
    img: '/logos/svg/BetterGov_Horizontal-Primary.svg',
    alt: 'BetterGov.ph',
    name: 'Better movement / Better LGU',
    desc: 'Civic-tech & transparency movement',
    imgClass: 'h-auto max-w-full',
    imgStyle: { width: '18rem', height: 'auto' },
  },
  {
    href: 'https://ossph.org',
    img: '/logos/png/ossph-logo.png',
    alt: 'Open Source Software Philippines (OSSPH)',
    name: 'Open Source Software PH',
    desc: 'Open-source software community',
    imgClass: 'h-18 w-auto max-w-full',
  },
];

const JoinUs: FC = () => {
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = revealRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    node.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className='min-h-screen bg-gray-50'>
      <Helmet>
        <title>Join Us | BetterMaasin.org</title>
        <meta
          name='description'
          content='Help build BetterMaasin.org — an open-source, volunteer-run civic-tech portal for Maasin City. No permission needed to make government data accessible.'
        />
        <meta
          name='keywords'
          content='BetterMaasin, Maasin City, civic tech, Better movement, volunteer, open source, transparency'
        />
        <link rel='canonical' href='https://bettermaasin.org/join-us' />
        <meta property='og:title' content='Join Us | BetterMaasin.org' />
        <meta
          property='og:description'
          content='An open-source, volunteer-run civic-tech portal for Maasin City. Contribute code, data, writing, or community — no permission needed.'
        />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://bettermaasin.org/join-us' />
        <meta
          property='og:image'
          content='https://bettermaasin.org/ph-logo.png'
        />
      </Helmet>

      <div className='container mx-auto px-4 py-6 md:py-10'>
        <div
          ref={revealRef}
          className='overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-sm'
        >
          {/* Hero */}
          <div className='relative overflow-hidden bg-linear-to-br from-primary-700 via-primary-600 to-blue-600 px-6 py-16 md:px-12 md:py-24'>
            <HeartHandshake className='animate-float absolute -bottom-6 right-6 h-52 w-52 text-white/10 rotate-12' />
            <div className='pointer-events-none absolute -right-10 -top-24 h-72 w-72 rounded-full bg-white/5 blur-2xl' />
            <div className='relative max-w-2xl'>
              <span className='animate-pulse-soft inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/90'>
                Be a Part of the Movement
              </span>
              <h1 className='mt-5 text-4xl font-extrabold leading-tight text-white md:text-5xl'>
                Join the BetterMaasin movement
              </h1>
              <p className='mt-4 max-w-xl text-base text-white/90 md:text-lg'>
                BetterMaasin.org is an open-source, volunteer-driven effort to
                bring Maasin City&apos;s government, services, and data together
                in one transparent, accessible place. Builders, writers,
                researchers, and everyday citizens are all welcome — no
                permission needed.
              </p>
              <div className='mt-7 flex flex-col gap-3 sm:flex-row'>
                <a
                  href='mailto:volunteer@bettermaasin.org'
                  className='animate-pulse-soft inline-flex items-center justify-center gap-2 rounded-lg bg-yellow-400 px-6 py-3 text-sm font-bold text-gray-900 transition-colors hover:bg-yellow-300'
                >
                  Volunteer now
                  <ArrowRight className='h-4 w-4' />
                </a>
                <a
                  href='/redirect?to=discord'
                  className='inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-primary-600'
                >
                  <MessageCircle className='h-4 w-4' />
                  Join Discord
                </a>
                <a
                  href='/redirect?to=github'
                  className='inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-primary-600'
                >
                  <GitBranch className='h-4 w-4' />
                  GitHub
                </a>
              </div>
            </div>
          </div>

          {/* Movement */}
          <div className='px-6 py-12 md:px-12 md:py-14'>
            <div className='reveal'>
              <h2 className='text-center text-2xl font-bold text-gray-900 md:text-3xl'>
                Built on the spirit of open source
              </h2>
              <p className='mx-auto mt-2 max-w-lg text-center text-base text-gray-600'>
                Made with open source, alongside communities that share the same
                spirit — build in the open, for everyone.
              </p>
            </div>
            <div className='mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2'>
              {motion.map((m, index) => (
                <a
                  key={m.name}
                  href={m.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='reveal group flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-10 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary-400 hover:shadow-lg'
                >
                  <div className='flex h-32 items-center justify-center'>
                    <div className='relative overflow-hidden'>
                      <img
                        src={m.img}
                        alt={m.alt}
                        style={m.imgStyle}
                        className={`${m.imgClass} object-contain saturate-0 brightness-[1.05] contrast-[1.1] transition-[filter,transform] duration-300 group-hover:saturate-100 group-hover:brightness-100 group-hover:contrast-100 group-hover:scale-105`}
                      />
                      <div
                        className='pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-300 group-hover:opacity-0'
                        style={{
                          mixBlendMode: 'screen',
                          background:
                            'linear-gradient(180deg, #eef1f6 0%, #d9dee9 38%, #b9c1d2 60%, #6b7a93 100%)',
                        }}
                      />
                      <div
                        className='shine pointer-events-none absolute inset-0'
                        style={{ animationDelay: `${index * 0.8}s` }}
                      />
                    </div>
                  </div>
                  <p className='mt-5 text-lg font-extrabold tracking-tight text-gray-900'>
                    {m.name}
                  </p>
                  <p className='mt-1 text-sm text-gray-500'>{m.desc}</p>
                </a>
              ))}
            </div>
          </div>

          {/* Why / Who */}
          <div className='border-t border-gray-200 px-6 py-12 md:px-12 md:py-14'>
            <div className='grid gap-10 md:grid-cols-2'>
              <div className='reveal'>
                <h2 className='text-2xl font-bold text-gray-900'>Why join</h2>
                <p className='mt-3 leading-relaxed text-gray-700'>
                  Local information is scattered, disconnected, and hard to find
                  when you need it most. BetterMaasin.org exists so the answers
                  are easy to find, easy to understand, and easy to trust.
                </p>
                <p className='mt-3 text-sm text-gray-600'>
                  You don&apos;t need the LGU&apos;s permission to build civic
                  transparency. BetterMaasin is one of many{' '}
                  <a
                    href='https://lgu.bettergov.ph/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='font-medium text-primary-600 hover:underline'
                  >
                    Better LGU portals
                  </a>{' '}
                  across the Philippines — independent, volunteer-built, and
                  open.
                </p>
                <Link
                  to='/ideas'
                  className='mt-5 inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700'
                >
                  Explore project ideas
                  <ArrowRight className='h-4 w-4' />
                </Link>
              </div>
              <div className='reveal'>
                <h2 className='text-2xl font-bold text-gray-900'>
                  Who we need
                </h2>
                <p className='mt-3 text-sm text-gray-600'>
                  Code is only part of the work — most of it happens beyond
                  code.
                </p>
                <ul className='mt-4 space-y-3 text-gray-700'>
                  {roles.map(role => (
                    <li
                      key={role}
                      className='rounded-lg bg-primary-50 px-4 py-3 font-medium text-primary-800'
                    >
                      {role}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* How you can help */}
          <div className='border-t border-gray-200 px-6 py-12 md:px-12 md:py-14'>
            <h2 className='text-2xl font-bold text-gray-900'>
              How you can help
            </h2>
            <div className='mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
              {ways.map(w => (
                <div
                  key={w.title}
                  className='reveal group rounded-xl border border-gray-200 p-6 transition-all hover:border-primary-400 hover:shadow-sm'
                >
                  <div className='flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white'>
                    <w.icon className='h-6 w-6' />
                  </div>
                  <h3 className='mt-4 text-lg font-semibold text-gray-900'>
                    {w.title}
                  </h3>
                  <p className='mt-1.5 text-sm text-gray-600'>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* DONE WAITING — bold standalone */}
          <div className='border-t border-gray-200 px-6 py-12 md:px-12 md:py-16'>
            <div className='reveal relative overflow-hidden rounded-2xl bg-linear-to-br from-gray-900 via-primary-900 to-blue-900 px-6 py-12 text-center md:px-12 md:py-16'>
              <Users className='absolute -top-5 left-4 h-28 w-28 text-white/5 rotate-12' />
              <MapPin className='absolute -bottom-5 right-4 h-28 w-28 text-white/5 -rotate-12' />
              <h2 className='text-3xl font-black uppercase tracking-wide text-white md:text-4xl'>
                We&apos;re done waiting
              </h2>
              <p className='mt-4 text-xl font-semibold text-white/90 md:text-2xl'>
                No permission needed. Grassroots style. Open source.
              </p>
              <p className='mx-auto mt-3 max-w-xl text-base text-white/80 md:text-lg'>
                We will keep building — relentlessly, in the open, at high
                quality — for the city. We&apos;re looking for people smarter
                than us.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className='border-t border-gray-200 bg-gray-50 px-6 py-12 text-center md:px-12 md:py-16'>
            <p className='text-2xl font-bold text-gray-900'>Get involved</p>
            <p className='mx-auto mt-2 max-w-md text-base text-gray-600'>
              Whether you code, write, design, or just want to lend a hand —
              there&apos;s a place for you here.
            </p>
            <div className='mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row'>
              <a
                href='mailto:volunteer@bettermaasin.org'
                className='inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700'
              >
                Volunteer
                <ArrowRight className='h-4 w-4' />
              </a>
              <a
                href='/redirect?to=github'
                className='inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:border-primary-400 hover:text-primary-600'
              >
                <GitBranch className='h-4 w-4' />
                Contribute on GitHub
              </a>
              <a
                href='/redirect?to=discord'
                className='inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:border-primary-400 hover:text-primary-600'
              >
                <MessageCircle className='h-4 w-4' />
                Join Discord
              </a>
            </div>
            <p className='mt-7 inline-flex items-center gap-1.5 text-sm text-gray-500'>
              <Lightbulb className='h-4 w-4 text-primary-500' />
              Open source • Volunteer-run • Cost to the people: ₱0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
