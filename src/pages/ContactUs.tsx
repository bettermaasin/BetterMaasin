import {
  ArrowRight,
  HeartHandshake,
  HelpCircle,
  Mail,
  MessageCircle,
  Plus,
  Users,
  Globe,
} from 'lucide-react';
import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const contactMethods = [
  {
    icon: Mail,
    title: 'Email Us',
    description: 'General questions, feedback, or suggestions for us',
    contact: 'contact@bettermaasin.org',
    action: 'mailto:contact@bettermaasin.org',
  },
  {
    icon: MessageCircle,
    title: 'Discord Community',
    description: 'Join the Better movement for discussion and support',
    contact: 'discord.gg/BvSDVFj82',
    action: '/redirect?to=discord',
  },
  {
    icon: Users,
    title: 'Volunteer',
    description: 'Help keep BetterMaasin.org accurate and useful',
    contact: 'volunteer@bettermaasin.org',
    action: 'mailto:volunteer@bettermaasin.org',
  },
  {
    icon: Globe,
    title: 'Report Issues',
    description: 'Found a bug or have a suggestion? Open an issue on GitHub',
    contact: 'GitHub Issues',
    action: 'https://github.com/bettermaasin/BetterMaasin/issues',
  },
];

const faqs = [
  {
    q: 'How can I volunteer?',
    a: 'We welcome volunteers with various skills! Check out our Get Involved page to see how to help, and reach out to us anytime.',
  },
  {
    q: 'Is BetterMaasin.org affiliated with the government?',
    a: 'No. BetterMaasin.org is an independent civic-tech project built in support of transparency. We are not affiliated with the Maasin City LGU or any government office in any way.',
  },
  {
    q: 'How do I report a bug or request a feature?',
    a: 'The best way is to open an issue on our GitHub repository. This helps us track and prioritize all requests.',
  },
  {
    q: 'Can I use BetterMaasin content for my project?',
    a: 'Yes! BetterMaasin.org is released under Creative Commons CC0 / public domain, so its content can be used freely for any purpose unless otherwise stated.',
  },
  {
    q: 'Where does the data on BetterMaasin come from?',
    a: 'Our data is aggregated from various publicly available government sources, and sources are credited wherever they appear.',
  },
];

const ContactUs: FC = () => {
  return (
    <div className='min-h-screen bg-gray-50'>
      <Helmet>
        <title>Contact Us | BetterMaasin.org</title>
        <meta
          name='description'
          content='Contact the BetterMaasin.org team. Get in touch, report issues, ask questions, or join the Better movement community.'
        />
        <meta
          name='keywords'
          content='contact, BetterMaasin, better movement, feedback, support, Maasin City'
        />
        <link rel='canonical' href='https://bettermaasin.org/contact' />
        <meta property='og:title' content='Contact Us | BetterMaasin.org' />
        <meta
          property='og:description'
          content='Contact the BetterMaasin.org team. Get in touch, report issues, ask questions, or join the Better movement community.'
        />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://bettermaasin.org/contact' />
        <meta
          property='og:image'
          content='https://bettermaasin.org/ph-logo.png'
        />
      </Helmet>

      <div className='container mx-auto px-4 py-6 md:py-10'>
        <div className='overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-sm'>
          {/* Hero */}
          <div className='relative bg-linear-to-br from-primary-700 via-primary-600 to-blue-600 px-6 py-12 md:px-12 md:py-16'>
            <HeartHandshake className='absolute -bottom-6 right-6 h-40 w-40 text-white/10 rotate-12' />
            <div className='relative max-w-2xl'>
              <span className='inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/90'>
                We&apos;d love to hear from you
              </span>
              <h1 className='mt-4 text-3xl font-extrabold leading-tight text-white md:text-4xl'>
                Get in Touch
              </h1>
              <p className='mt-3 max-w-xl text-base text-white/90 md:text-lg'>
                BetterMaasin.org is a community effort. Whether you have a
                question, a suggestion, want to help keep information accurate,
                or join the Better movement — reach out.
              </p>
            </div>
          </div>

          {/* Contact methods */}
          <div className='px-6 py-8 md:px-12'>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              {contactMethods.map(m => (
                <a
                  key={m.title}
                  href={m.action}
                  target={m.action.startsWith('http') ? '_blank' : '_self'}
                  rel={
                    m.action.startsWith('http')
                      ? 'noopener noreferrer'
                      : undefined
                  }
                  className='group rounded-xl border border-gray-200 p-5 transition-all hover:border-primary-400 hover:shadow-sm'
                >
                  <div className='flex h-11 w-11 items-center justify-center rounded-lg bg-primary-100 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white'>
                    <m.icon className='h-5 w-5' />
                  </div>
                  <h3 className='mt-3 font-semibold text-gray-900'>
                    {m.title}
                  </h3>
                  <p className='mt-1 text-sm text-gray-600'>{m.description}</p>
                  <p className='mt-2 inline-flex items-center text-sm font-medium text-primary-600'>
                    {m.contact}
                    <ArrowRight className='ml-1 h-4 w-4 transition-transform group-hover:translate-x-1' />
                  </p>
                </a>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className='border-t border-gray-200 px-6 py-8 md:px-12'>
            <h2 className='flex items-center gap-2 text-xl font-bold text-gray-900'>
              <HelpCircle className='h-5 w-5 text-primary-600' />
              Frequently asked questions
            </h2>
            <div className='mt-5 space-y-3'>
              {faqs.map(faq => (
                <details
                  key={faq.q}
                  className='group rounded-xl border border-gray-200 bg-white px-5 py-4 open:border-primary-400'
                >
                  <summary className='flex cursor-pointer list-none items-center justify-between gap-3 font-semibold text-gray-900'>
                    {faq.q}
                    <span className='shrink-0 text-primary-500 transition-transform group-open:rotate-45'>
                      <Plus className='h-4 w-4' />
                    </span>
                  </summary>
                  <p className='mt-2 text-sm leading-relaxed text-gray-600'>
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
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

export default ContactUs;
