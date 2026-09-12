import { FC, ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Scale,
  Shield,
  FileText,
  AlertTriangle,
  Mail,
  ExternalLink,
  Info,
  RefreshCw,
  HelpCircle,
} from 'lucide-react';

interface SectionProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}

const Section: FC<SectionProps> = ({ icon, title, children }) => (
  <section>
    <div className='flex items-center gap-3 mb-4'>
      <span className='text-primary-600'>{icon}</span>
      <h2 className='text-2xl font-bold text-gray-900'>{title}</h2>
    </div>
    {children}
  </section>
);

const TermsOfService: FC = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className='min-h-screen bg-gray-50'>
      <Helmet>
        <title>Terms of Use | BetterMaasin.org</title>
        <meta
          name='description'
          content='Terms of Use for BetterMaasin.org - an independent, volunteer-supported civic technology project for the City of Maasin, Southern Leyte.'
        />
        <link
          rel='canonical'
          href='https://bettermaasin.org/terms-of-service'
        />
        <meta property='og:title' content='Terms of Use | BetterMaasin.org' />
        <meta
          property='og:description'
          content='Terms of Use for BetterMaasin.org - an independent, volunteer-supported civic technology project for the City of Maasin, Southern Leyte.'
        />
        <meta property='og:type' content='website' />
        <meta
          property='og:url'
          content='https://bettermaasin.org/terms-of-service'
        />
      </Helmet>

      {/* Header Section */}
      <section className='bg-gradient-to-r from-primary-600 to-blue-700 text-white py-16'>
        <div className='container mx-auto px-4'>
          <div className='text-center max-w-4xl mx-auto'>
            <div className='flex justify-center mb-6'>
              <div className='p-4 bg-white/20 rounded-full backdrop-blur-sm'>
                <Scale className='h-12 w-12 text-white' />
              </div>
            </div>
            <h1 className='text-4xl md:text-5xl font-bold mb-2'>
              Terms of Use
            </h1>
            <p className='text-lg font-medium text-amber-200 mb-2'>
              Development / Demo Version
            </p>
            <p className='text-xl opacity-90'>Last Updated: {currentDate}</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className='container mx-auto px-4 py-12 max-w-4xl'>
        <div className='bg-white rounded-lg shadow-lg p-8 space-y-8'>
          {/* Introduction */}
          <section>
            <div className='space-y-4 text-gray-700 leading-relaxed'>
              <p className='text-lg font-semibold text-gray-900'>
                Welcome to the BetterMaasin development website.
              </p>
              <p>
                BetterMaasin.org (&ldquo;BetterMaasin,&rdquo; &ldquo;we,&rdquo;
                &ldquo;us,&rdquo; or &ldquo;our&rdquo;) refers to the
                independent, volunteer-supported civic technology project behind
                this website.
              </p>
              <p>
                BetterMaasin is being developed as a civic platform to make
                information about the City of Maasin, Southern Leyte easier to
                find, understand, and verify.
              </p>
            </div>
          </section>

          <div className='border-t border-gray-200 pt-8 space-y-8'>
            {/* 1. Independent Civic Project */}
            <Section
              icon={<FileText className='h-6 w-6' />}
              title='1. Independent Civic Project'
            >
              <div className='space-y-4 text-gray-700 leading-relaxed'>
                <p>
                  BetterMaasin is an independent project and is not the official
                  website or online service of the City Government of Maasin,
                  the Province of Southern Leyte, or any national government
                  agency, unless expressly stated otherwise.
                </p>
                <p>
                  Information shown on this development site may be incomplete,
                  outdated, or still under development.
                </p>
                <p>
                  For official information, transactions, applications, or
                  government services, please consult the appropriate government
                  office or official source.
                </p>
              </div>
            </Section>

            {/* 2. Use of the Development Site */}
            <Section
              icon={<Shield className='h-6 w-6' />}
              title='2. Use of the Development Site'
            >
              <div className='space-y-4 text-gray-700 leading-relaxed'>
                <p>
                  By accessing or using BetterMaasin, you acknowledge and agree
                  to be bound by these Terms of Use.
                </p>
                <p>
                  This development site is provided primarily for demonstration,
                  testing, feedback, and civic-information purposes.
                </p>
                <p className='font-semibold'>
                  Please use the site responsibly and do not:
                </p>
                <ul className='list-disc list-inside space-y-1 ml-4'>
                  <li>attempt to disrupt or damage the website;</li>
                  <li>gain unauthorized access to systems or information;</li>
                  <li>introduce malicious code or other harmful material;</li>
                  <li>
                    impersonate BetterMaasin, government officials, or other
                    persons;
                  </li>
                  <li>knowingly submit fraudulent or malicious material; or</li>
                  <li>misuse personal information belonging to others.</li>
                </ul>
              </div>
            </Section>

            {/* 3. Development and Accuracy */}
            <Section
              icon={<RefreshCw className='h-6 w-6' />}
              title='3. Development and Accuracy'
            >
              <div className='space-y-4 text-gray-700 leading-relaxed'>
                <p className='font-semibold'>
                  This website is a work in progress.
                </p>
                <p>
                  Features, information, layouts, links, datasets, and other
                  content may be added, changed, removed, or corrected at any
                  time.
                </p>
                <p>
                  We make reasonable efforts to keep information useful and
                  properly sourced, but information on this development site
                  should not be treated as a substitute for official records or
                  government communications.
                </p>
              </div>
            </Section>

            {/* 4. General Information */}
            <Section
              icon={<Info className='h-6 w-6' />}
              title='4. General Information'
            >
              <div className='space-y-4 text-gray-700 leading-relaxed'>
                <p>
                  Information provided through BetterMaasin is intended for
                  general civic, educational, and informational purposes.
                </p>
                <p className='font-semibold'>It is not a substitute for:</p>
                <ul className='list-disc list-inside space-y-1 ml-4'>
                  <li>legal advice;</li>
                  <li>medical advice;</li>
                  <li>financial or investment advice;</li>
                  <li>tax or accounting advice;</li>
                  <li>engineering or technical advice; or</li>
                  <li>other professional advice.</li>
                </ul>
                <p>
                  For matters requiring official or professional guidance,
                  please consult the appropriate government office or qualified
                  professional.
                </p>
              </div>
            </Section>

            {/* 5. Content and Licensing */}
            <Section
              icon={<FileText className='h-6 w-6' />}
              title='5. Content and Licensing'
            >
              <div className='space-y-4 text-gray-700 leading-relaxed'>
                <p>
                  BetterMaasin may contain government records, public documents,
                  original materials, community contributions, and third-party
                  content.
                </p>
                <p>
                  Different materials may be subject to different rights or
                  licenses. Not everything on the website is automatically
                  public domain.
                </p>
                <p>
                  Where a license or rights notice is provided, it governs the
                  applicable material.
                </p>
                <p>
                  BetterMaasin software and original materials may be made
                  available under separate open-source or content licenses.
                </p>
              </div>
            </Section>

            {/* 6. External Websites */}
            <Section
              icon={<ExternalLink className='h-6 w-6' />}
              title='6. External Websites'
            >
              <div className='space-y-4 text-gray-700 leading-relaxed'>
                <p>
                  The site may contain links to government websites and other
                  third-party resources.
                </p>
                <p>
                  We do not control those websites and are not responsible for
                  their content, availability, security, or privacy practices.
                </p>
              </div>
            </Section>

            {/* 7. Availability and Disclaimer */}
            <Section
              icon={<AlertTriangle className='h-6 w-6 text-amber-600' />}
              title='7. Availability and Disclaimer'
            >
              <div className='space-y-4 text-gray-700 leading-relaxed'>
                <div className='bg-amber-50 border-l-4 border-amber-400 p-4 mb-4'>
                  <p className='font-semibold text-amber-800 mb-2'>
                    The development site is provided on an &ldquo;AS IS&rdquo;
                    and &ldquo;AS AVAILABLE&rdquo; basis to the fullest extent
                    permitted by law.
                  </p>
                </div>
                <p>
                  Because this is a development environment, the website may
                  occasionally experience:
                </p>
                <ul className='list-disc list-inside space-y-1 ml-4'>
                  <li>errors or bugs;</li>
                  <li>incomplete features;</li>
                  <li>unavailable pages or links;</li>
                  <li>temporary interruptions; or</li>
                  <li>changes without notice.</li>
                </ul>
                <p>
                  We do our best to improve the platform as development
                  continues.
                </p>
              </div>
            </Section>

            {/* 8. Feedback and Corrections */}
            <Section
              icon={<HelpCircle className='h-6 w-6' />}
              title='8. Feedback and Corrections'
            >
              <div className='space-y-4 text-gray-700 leading-relaxed'>
                <p>
                  We welcome feedback, corrections, broken-link reports, and
                  other suggestions that can help improve BetterMaasin.
                </p>
                <p>
                  Please use the contact information provided on the website to
                  report an issue or concern.
                </p>
              </div>
            </Section>

            {/* 9. Changes to These Terms */}
            <Section
              icon={<RefreshCw className='h-6 w-6' />}
              title='9. Changes to These Terms'
            >
              <div className='space-y-4 text-gray-700 leading-relaxed'>
                <p>
                  We reserve the right to update, modify, or revise these Terms
                  of Use at any time and without prior individual notice.
                </p>
                <p>
                  When changes are made, we will update the Last Updated date on
                  this page. We encourage you to review these Terms from time to
                  time so you are aware of any updates.
                </p>
                <p>
                  By continuing to access or use BetterMaasin after updated
                  Terms take effect, you acknowledge and agree to be bound by
                  the revised Terms.
                </p>
              </div>
            </Section>

            {/* 10. Governing Law */}
            <Section
              icon={<Scale className='h-6 w-6' />}
              title='10. Governing Law'
            >
              <p className='text-gray-700 leading-relaxed'>
                These Terms are governed by the laws of the Republic of the
                Philippines.
              </p>
            </Section>

            {/* 11. Contact */}
            <Section icon={<Mail className='h-6 w-6' />} title='11. Contact'>
              <div className='space-y-4 text-gray-700 leading-relaxed'>
                <p>
                  For questions, feedback, corrections, or other concerns
                  regarding the development site, please use the contact
                  information published on BetterMaasin.
                </p>
                <div className='bg-primary-50 border border-primary-200 rounded-lg p-6'>
                  <p className='text-xl font-semibold text-primary-900'>
                    <a
                      href='mailto:contact@bettermaasin.org'
                      className='hover:text-primary-700 transition-colors'
                    >
                      contact@bettermaasin.org
                    </a>
                  </p>
                </div>
              </div>
            </Section>
          </div>

          {/* Footer Tagline */}
          <div className='border-t pt-8 text-center'>
            <p className='text-gray-800 font-semibold'>BetterMaasin.org</p>
            <p className='text-gray-500 italic'>
              Independent &bull; Volunteer-Supported &bull; Civic Technology
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
