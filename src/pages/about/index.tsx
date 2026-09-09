import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronDown,
  Heart,
  MapPin,
  Maximize2,
  Minimize2,
  Search,
  ShieldAlert,
  Sparkles,
  Waves,
  XCircle,
} from 'lucide-react';
import { FC, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const stats = [
  { value: 'One', label: 'Local portal' },
  { value: 'Open', label: 'Source & data' },
  { value: 'All', label: 'Free for everyone' },
];

const values = [
  {
    title: 'Transparent',
    desc: 'Information open and easy to see.',
  },
  {
    title: 'Accessible',
    desc: 'Easy to use on phones and computers.',
  },
  {
    title: 'Local & Open',
    desc: 'Built around Maasin City, and its data is free to reuse.',
  },
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

const dos = [
  'Gather publicly available government info into one place',
  'Make it easier to search, compare, and understand',
  'Surface hotlines, services, officials, and local data',
  'Stay free to use, and release our own work under CC0',
];

const donts = [
  'We are not the official Maasin City website or any gov.ph / LGU portal, always verify on official sites',
  "We don't process payments, appointments, or official transactions",
  "We can't issue documents, certificates, or official decisions",
  "We're not a government office and don't act on the city's behalf",
];

const slides = ['intro', 'why', 'values', 'features', 'scope', 'close'];

const AboutPage: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [deckHeight, setDeckHeight] = useState('100dvh');
  const [immersive, setImmersive] = useState(true);

  useEffect(() => {
    document.body.classList.toggle('immersive', immersive);
    return () => document.body.classList.remove('immersive');
  }, [immersive]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const top = el.getBoundingClientRect().top;
      setDeckHeight(`${Math.max(300, Math.floor(window.innerHeight - top))}px`);
    };
    update();
    window.addEventListener('resize', update);
    const ro = new ResizeObserver(update);
    ro.observe(document.body);
    return () => {
      window.removeEventListener('resize', update);
      ro.disconnect();
    };
  }, [immersive]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const slideEls = Array.from(
      container.querySelectorAll<HTMLElement>('[data-slide]')
    );

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = slideEls.indexOf(entry.target as HTMLElement);
            if (index >= 0) setActiveIndex(index);
          }
        });
      },
      { root: container, rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    slideEls.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle('about-ticker-hidden', activeIndex > 0);
    return () => document.body.classList.remove('about-ticker-hidden');
  }, [activeIndex]);

  const scrollToSlide = (index: number) => {
    const container = containerRef.current;
    const slide = container?.querySelector<HTMLElement>(
      `[data-slide="${slides[index]}"]`
    );
    if (container && slide) {
      container.scrollTo({ top: slide.offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <div>
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

      <div
        ref={containerRef}
        className='overflow-y-auto snap-y snap-mandatory scroll-smooth'
        style={{ height: deckHeight }}
      >
        {/* Slide 1 - Intro */}
        <section
          data-slide='intro'
          className='relative flex min-h-full snap-start overflow-hidden bg-linear-to-br from-primary-700 via-primary-600 to-blue-600 text-white'
        >
          <Waves className='absolute -bottom-8 right-6 h-48 w-48 text-white/10 rotate-12 animate-float' />
          <div className='relative flex w-full flex-col items-center justify-center overflow-y-auto -translate-y-[4vh] px-4 py-12 text-center md:translate-y-0'>
            <div
              key={activeIndex === 0 ? 'in' : 'out'}
              className={activeIndex === 0 ? 'about-anim-in' : 'about-anim-out'}
            >
              <span className='about-fade-up inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/90'>
                A Better movement portal
              </span>
              <h1
                className='text-sweep mt-5 text-center text-4xl font-extrabold leading-tight text-white md:text-6xl'
                style={{ animationDelay: '100ms' }}
              >
                About BetterMaasin.org
              </h1>
              <p
                className='text-sweep-p mx-auto mt-4 max-w-2xl text-base text-white/90 md:text-lg'
                style={{ animationDelay: '350ms' }}
              >
                A community project that gathers Maasin City&apos;s government,
                services, and data into one place, so they&apos;re easier to
                find and understand.
              </p>
            </div>
            <div
              key={`stats-${activeIndex === 0 ? 'in' : 'out'}`}
              className='mx-auto mt-10 grid w-full max-w-xl grid-cols-3 gap-3 border-t border-white/20 pt-6'
            >
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className='about-card'
                  style={{ animationDelay: `${450 + i * 100}ms` }}
                >
                  <p className='text-xl font-bold text-white md:text-3xl'>
                    {s.value}
                  </p>
                  <p className='text-xs text-white/80 md:text-sm'>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={() => scrollToSlide(1)}
            aria-label='Scroll to next slide'
            className='absolute bottom-20 left-1/2 -translate-x-1/2 animate-bounce text-white/80 transition-colors hover:text-white md:bottom-4'
          >
            <ChevronDown className='h-7 w-7' />
          </button>
        </section>

        {/* Slide 2 - Why */}
        <section
          data-slide='why'
          className='flex min-h-full snap-start bg-white'
        >
          <div className='flex w-full items-center -translate-y-[4vh] px-4 py-12 md:translate-y-0 md:px-12'>
            <div
              key={activeIndex === 1 ? 'in' : 'out'}
              className={`mx-auto max-w-3xl text-center ${activeIndex === 1 ? 'about-anim-in' : 'about-anim-out'}`}
            >
              <p className='about-fade-up text-xs font-semibold uppercase tracking-wider text-primary-600'>
                The problem
              </p>
              <h2
                className='text-sweep mt-2 text-center text-3xl font-extrabold text-gray-900 md:text-4xl'
                style={{ animationDelay: '100ms' }}
              >
                Why build it
              </h2>
              <p
                className='text-sweep-p mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-700 md:text-xl'
                style={{ animationDelay: '300ms' }}
              >
                Much of the city&apos;s public information is spread out across
                government websites, social media pages, PDFs, and wall-posted
                announcements. It can take a while to piece together, and
                sources don&apos;t always match up. BetterMaasin.org is our
                attempt to gather it into one place, clearly and with sources
                noted, so it&apos;s a bit less work to find.
              </p>
              <p
                className='about-fade-up mx-auto mt-6 max-w-2xl rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm leading-relaxed text-gray-600'
                style={{ animationDelay: '500ms' }}
              >
                BetterMaasin.org is an independent project and is{' '}
                <strong className='text-gray-800'>not affiliated</strong> with
                the Maasin City LGU or any government office in any way.
              </p>
              <Link
                to='/contact'
                style={{ animationDelay: '650ms' }}
                className='about-fade-up mt-7 inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700'
              >
                Get in touch
                <ArrowRight className='h-4 w-4' />
              </Link>
            </div>
          </div>
        </section>

        {/* Slide 3 - Values */}
        <section
          data-slide='values'
          className='flex min-h-full snap-start bg-gray-50'
        >
          <div className='flex w-full items-center -translate-y-[4vh] px-4 py-12 md:translate-y-0 md:px-12'>
            <div
              key={activeIndex === 2 ? 'in' : 'out'}
              className={`mx-auto w-full max-w-3xl ${activeIndex === 2 ? 'about-anim-in' : 'about-anim-out'}`}
            >
              <p className='about-fade-up text-center text-xs font-semibold uppercase tracking-wider text-primary-600'>
                Our values
              </p>
              <h2
                className='text-sweep mt-2 text-center text-3xl font-extrabold text-gray-900 md:text-4xl'
                style={{ animationDelay: '100ms' }}
              >
                What we stand for
              </h2>
              <p
                className='about-fade-up mx-auto mt-4 max-w-2xl text-center text-base text-gray-600'
                style={{ animationDelay: '200ms' }}
              >
                At our core, we believe in transparency: a city works better
                when its people can actually see what&apos;s going on.
              </p>
              <div className='mt-8 grid gap-4 sm:grid-cols-3'>
                {values.map((v, i) => (
                  <div
                    key={v.title}
                    className='about-card rounded-xl border border-gray-200 bg-white p-6 text-center shadow-xs transition-all hover:border-primary-400 hover:shadow-sm'
                    style={{ animationDelay: `${260 + i * 90}ms` }}
                  >
                    <h3 className='font-semibold text-gray-900'>{v.title}</h3>
                    <p className='mt-1 text-sm text-gray-600'>{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Slide 4 - Features */}
        <section
          data-slide='features'
          className='flex min-h-full snap-start bg-white'
        >
          <div className='flex w-full items-center -translate-y-[4vh] px-4 py-12 md:translate-y-0 md:px-12'>
            <div
              key={activeIndex === 3 ? 'in' : 'out'}
              className={`mx-auto w-full max-w-4xl ${activeIndex === 3 ? 'about-anim-in' : 'about-anim-out'}`}
            >
              <p className='about-fade-up text-center text-xs font-semibold uppercase tracking-wider text-primary-600'>
                A quick tour
              </p>
              <h2
                className='text-sweep mt-2 text-center text-3xl font-extrabold text-gray-900 md:text-4xl'
                style={{ animationDelay: '100ms' }}
              >
                What&apos;s inside
              </h2>
              <div className='mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                {features.map((f, i) => (
                  <div
                    key={f.title}
                    className='about-card group rounded-xl border border-gray-200 p-5 transition-all hover:border-primary-400 hover:shadow-sm'
                    style={{ animationDelay: `${150 + i * 80}ms` }}
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
            </div>
          </div>
        </section>

        {/* Slide 5 - Do vs Don't */}
        <section
          data-slide='scope'
          className='flex min-h-full snap-start bg-gray-50'
        >
          <div className='flex w-full items-center -translate-y-[4vh] px-4 py-12 md:translate-y-0 md:px-12'>
            <div
              key={activeIndex === 4 ? 'in' : 'out'}
              className={`mx-auto w-full max-w-4xl ${activeIndex === 4 ? 'about-anim-in' : 'about-anim-out'}`}
            >
              <p className='about-fade-up text-center text-xs font-semibold uppercase tracking-wider text-primary-600'>
                The honest part
              </p>
              <h2
                className='text-sweep mt-2 text-center text-3xl font-extrabold text-gray-900 md:text-4xl'
                style={{ animationDelay: '100ms' }}
              >
                What we do, and what we don&apos;t
              </h2>
              <p
                className='text-sweep-p mx-auto mt-3 max-w-2xl text-center text-gray-600'
                style={{ animationDelay: '300ms' }}
              >
                This site is our best effort to make information easier to find,
                but it&apos;s not an official source. When it matters, always
                check directly with the city government.
              </p>
              <div className='mt-8 grid gap-6 md:grid-cols-2'>
                <div
                  className='about-card rounded-xl border border-emerald-200 bg-white p-6 shadow-xs'
                  style={{ animationDelay: '400ms' }}
                >
                  <h3 className='flex items-center gap-2 text-lg font-bold text-emerald-700'>
                    <CheckCircle2 className='h-5 w-5' />
                    What we do
                  </h3>
                  <ul className='mt-4 space-y-3'>
                    {dos.map((item, i) => (
                      <li
                        key={item}
                        className='about-card flex items-start gap-2.5 text-sm text-gray-700'
                        style={{ animationDelay: `${500 + i * 80}ms` }}
                      >
                        <CheckCircle2 className='mt-0.5 h-4 w-4 shrink-0 text-emerald-500' />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className='about-card rounded-xl border border-red-200 bg-white p-6 shadow-xs'
                  style={{ animationDelay: '550ms' }}
                >
                  <h3 className='flex items-center gap-2 text-lg font-bold text-red-700'>
                    <XCircle className='h-5 w-5' />
                    What we don&apos;t do
                  </h3>
                  <ul className='mt-4 space-y-3'>
                    {donts.map((item, i) => (
                      <li
                        key={item}
                        className='about-card flex items-start gap-2.5 text-sm text-gray-700'
                        style={{ animationDelay: `${650 + i * 80}ms` }}
                      >
                        <XCircle className='mt-0.5 h-4 w-4 shrink-0 text-red-500' />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 6 - License + CTA */}
        <section
          data-slide='close'
          className='flex min-h-full snap-start bg-white'
        >
          <div className='flex w-full items-center -translate-y-[4vh] px-4 py-12 md:translate-y-0 md:px-12'>
            <div
              key={activeIndex === 5 ? 'in' : 'out'}
              className={`mx-auto w-full max-w-3xl text-center ${activeIndex === 5 ? 'about-anim-in' : 'about-anim-out'}`}
            >
              <p className='about-fade-up text-xs font-semibold uppercase tracking-wider text-primary-600'>
                Free to reuse
              </p>
              <h2
                className='text-sweep mt-2 text-center text-3xl font-extrabold text-gray-900 md:text-4xl'
                style={{ animationDelay: '100ms' }}
              >
                License &amp; data
              </h2>
              <p
                className='text-sweep-p mx-auto mt-5 max-w-2xl text-lg font-semibold text-gray-800'
                style={{ animationDelay: '250ms' }}
              >
                We release the work we create for this site under{' '}
                <a
                  href='https://creativecommons.org/publicdomain/zero/1.0/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='font-bold text-primary-600 hover:underline'
                >
                  CC0, the public domain
                </a>
                , so it&apos;s free to reuse where possible.
              </p>
              <p
                className='text-sweep-p mx-auto mt-3 max-w-2xl text-base leading-relaxed text-gray-700'
                style={{ animationDelay: '400ms' }}
              >
                Third-party data keeps its own license, like DPWH flood-control
                information or PSA statistics under CC BY 4.0, and we credit
                those sources wherever they appear.
              </p>
              <p
                className='about-fade-up mx-auto mt-6 max-w-2xl rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-relaxed text-amber-900'
                style={{ animationDelay: '600ms' }}
              >
                <strong>No guarantee of accuracy or timeliness.</strong> This
                portal is a community effort, so information may change or
                become outdated. That&apos;s why we need people like you to help
                keep it accurate, up to date, and useful for everyone.
              </p>
              <div
                className='about-fade-up mt-8 border-t border-gray-200 pt-8'
                style={{ animationDelay: '750ms' }}
              >
                <p className='flex items-center justify-center gap-2 text-lg font-semibold text-gray-900'>
                  <ShieldAlert className='h-5 w-5 text-primary-600' />
                  Part of something bigger
                </p>
                <p className='mx-auto mt-1 max-w-md text-sm text-gray-600'>
                  Part of the Better movement, a community effort to build open
                  tools that make civic information easier to find.
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
        </section>
      </div>

      {/* Dot navigator */}
      <nav
        aria-label='About sections'
        className='fixed bottom-4 left-1/2 z-40 -translate-x-1/2 md:top-1/2 md:right-4 md:bottom-auto md:left-auto md:-translate-y-1/2 md:translate-x-0'
      >
        <div className='flex items-center gap-2.5 rounded-full border border-gray-200 bg-white/90 px-3 py-2 shadow-md backdrop-blur-sm md:flex-col md:gap-3 md:px-2 md:py-3'>
          {slides.map((id, index) => (
            <button
              key={id}
              onClick={() => scrollToSlide(index)}
              aria-label={`Go to section ${index + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? 'scale-125 bg-primary-600'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </nav>

      {/* Immersive mode toggle */}
      <button
        onClick={() => setImmersive(v => !v)}
        aria-label={immersive ? 'Exit immersive mode' : 'Enter immersive mode'}
        title={immersive ? 'Exit immersive mode' : 'Enter immersive mode'}
        className='fixed bottom-4 right-4 z-40 inline-flex items-center justify-center rounded-full border border-gray-200 bg-white/90 p-2.5 shadow-md backdrop-blur-sm transition-colors hover:bg-white'
      >
        {immersive ? (
          <Minimize2 className='h-4 w-4 text-gray-700' />
        ) : (
          <Maximize2 className='h-4 w-4 text-gray-700' />
        )}
      </button>
    </div>
  );
};

export default AboutPage;
