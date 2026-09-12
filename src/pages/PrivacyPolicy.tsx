import { FC, ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Scale,
  Shield,
  FileText,
  AlertTriangle,
  Mail,
  User,
  Server,
  Cookie,
  Lock,
  Clock,
  Users,
  RefreshCw,
  Activity,
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

const PrivacyPolicy: FC = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className='min-h-screen bg-gray-50'>
      <Helmet>
        <title>Privacy Notice | BetterMaasin.org</title>
        <meta
          name='description'
          content='Privacy Notice for BetterMaasin.org - an independent, volunteer-supported civic technology project for the City of Maasin, Southern Leyte.'
        />
        <link rel='canonical' href='https://bettermaasin.org/privacy-policy' />
        <meta property='og:title' content='Privacy Notice | BetterMaasin.org' />
        <meta
          property='og:description'
          content='Privacy Notice for BetterMaasin.org - an independent, volunteer-supported civic technology project for the City of Maasin, Southern Leyte.'
        />
        <meta property='og:type' content='website' />
        <meta
          property='og:url'
          content='https://bettermaasin.org/privacy-policy'
        />
      </Helmet>

      {/* Header Section */}
      <section className='bg-gradient-to-r from-primary-600 to-blue-700 text-white py-16'>
        <div className='container mx-auto px-4'>
          <div className='text-center max-w-4xl mx-auto'>
            <div className='flex justify-center mb-6'>
              <div className='p-4 bg-white/20 rounded-full backdrop-blur-sm'>
                <Shield className='h-12 w-12 text-white' />
              </div>
            </div>
            <h1 className='text-4xl md:text-5xl font-bold mb-2'>
              Privacy Notice
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
              <p>
                BetterMaasin.org (&ldquo;BetterMaasin,&rdquo; &ldquo;we,&rdquo;
                &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is an independent,
                volunteer-supported civic technology project.
              </p>
              <p>
                This Privacy Notice applies to the BetterMaasin development
                website and explains the limited personal information that may
                be processed while you use or interact with the site.
              </p>
            </div>
          </section>

          <div className='border-t border-gray-200 pt-8 space-y-8'>
            {/* 1. What We May Receive */}
            <Section
              icon={<User className='h-6 w-6' />}
              title='1. What We May Receive'
            >
              <div className='space-y-4 text-gray-700 leading-relaxed'>
                <p>
                  Depending on how you interact with the development site, we
                  may receive:
                </p>
                <p className='font-semibold'>Information You Provide</p>
                <ul className='list-disc list-inside space-y-1 ml-4'>
                  <li>Name, if you choose to provide it;</li>
                  <li>Email address;</li>
                  <li>
                    Message content, such as feedback, inquiries, or reports;
                    and
                  </li>
                  <li>Other information you voluntarily provide.</li>
                </ul>
                <p className='font-semibold pt-2'>Technical Information</p>
                <p>
                  The services used to host and operate this development website
                  may process technical information associated with your visit,
                  which may include:
                </p>
                <ul className='list-disc list-inside space-y-1 ml-4'>
                  <li>IP address;</li>
                  <li>browser and device information;</li>
                  <li>operating system;</li>
                  <li>requested pages or resources;</li>
                  <li>date and time of access; and</li>
                  <li>
                    technical, traffic, performance, or security information.
                  </li>
                </ul>
                <p>
                  The exact information processed may depend on the services and
                  features used by the development site.
                </p>
              </div>
            </Section>

            {/* 2. How We Use Information */}
            <Section
              icon={<Activity className='h-6 w-6' />}
              title='2. How We Use Information'
            >
              <div className='space-y-4 text-gray-700 leading-relaxed'>
                <p>
                  We may use information for purposes including, but not limited
                  to:
                </p>
                <ul className='list-disc list-inside space-y-1 ml-4'>
                  <li>responding to inquiries and feedback;</li>
                  <li>reviewing corrections or reports;</li>
                  <li>maintaining and improving the website;</li>
                  <li>understanding general website usage and performance;</li>
                  <li>addressing security or technical issues; and</li>
                  <li>complying with applicable law.</li>
                </ul>
                <p>
                  We aim to collect only information reasonably necessary for
                  these purposes.
                </p>
              </div>
            </Section>

            {/* 3. Hosting and Website Services */}
            <Section
              icon={<Server className='h-6 w-6' />}
              title='3. Hosting and Website Services'
            >
              <div className='space-y-4 text-gray-700 leading-relaxed'>
                <p>
                  The current development website is hosted through Netlify.
                </p>
                <p>
                  Netlify may process technical and usage information as part of
                  providing hosting, delivery, security, monitoring, and related
                  services.
                </p>
                <p>
                  For information about Netlify&rsquo;s own handling of personal
                  information, please refer to Netlify&rsquo;s Privacy Policy.
                </p>
              </div>
            </Section>

            {/* 4. Analytics */}
            <Section
              icon={<Activity className='h-6 w-6' />}
              title='4. Analytics'
            >
              <div className='space-y-4 text-gray-700 leading-relaxed'>
                <p>
                  The development site does not use a separate analytics
                  provider.
                </p>
                <p>
                  Where analytics are enabled, they are provided through
                  services available within the website&rsquo;s hosting
                  platform.
                </p>
                <p>
                  Analytics are used for general purposes such as understanding
                  website usage and performance and improving the development
                  site.
                </p>
              </div>
            </Section>

            {/* 5. Cookies and Similar Technologies */}
            <Section
              icon={<Cookie className='h-6 w-6' />}
              title='5. Cookies and Similar Technologies'
            >
              <div className='space-y-4 text-gray-700 leading-relaxed'>
                <p>
                  The development site does not intentionally use advertising
                  cookies to build visitor profiles.
                </p>
                <p>
                  The website or its hosting and technical services may
                  nevertheless use cookies or similar technologies where
                  necessary for security, functionality, traffic management, or
                  other technical purposes.
                </p>
              </div>
            </Section>

            {/* 6. Information We Do Not Intentionally Seek */}
            <Section
              icon={<AlertTriangle className='h-6 w-6 text-amber-600' />}
              title='6. Information We Do Not Intentionally Seek'
            >
              <div className='space-y-4 text-gray-700 leading-relaxed'>
                <p>
                  The development site is not designed to intentionally collect
                  sensitive personal information.
                </p>
                <p className='font-semibold'>
                  Please avoid submitting unnecessary:
                </p>
                <ul className='list-disc list-inside space-y-1 ml-4'>
                  <li>government identification numbers;</li>
                  <li>passwords;</li>
                  <li>financial information;</li>
                  <li>medical information;</li>
                  <li>biometric information; or</li>
                  <li>confidential information belonging to another person.</li>
                </ul>
              </div>
            </Section>

            {/* 7. Public Records and Civic Information */}
            <Section
              icon={<FileText className='h-6 w-6' />}
              title='7. Public Records and Civic Information'
            >
              <div className='space-y-4 text-gray-700 leading-relaxed'>
                <p>
                  BetterMaasin may publish or reference government records,
                  official documents, public datasets, information concerning
                  public officials and their official functions, and other
                  matters of public interest.
                </p>
                <p>
                  Certain information made publicly accessible concerning
                  matters of public concern may be treated differently under
                  Philippine data-protection law.
                </p>
                <p>
                  We may review, update, annotate, restrict, or remove
                  information where appropriate.
                </p>
              </div>
            </Section>

            {/* 8. Data Security */}
            <Section
              icon={<Lock className='h-6 w-6' />}
              title='8. Data Security'
            >
              <div className='space-y-4 text-gray-700 leading-relaxed'>
                <p>
                  We use reasonable measures to protect information processed
                  through the development site.
                </p>
                <p>
                  However, no internet-connected system can be guaranteed to be
                  completely secure.
                </p>
                <p>
                  Because this is a development environment, technical
                  configurations and security measures may change as the project
                  develops.
                </p>
              </div>
            </Section>

            {/* 9. Data Retention */}
            <Section
              icon={<Clock className='h-6 w-6' />}
              title='9. Data Retention'
            >
              <div className='space-y-4 text-gray-700 leading-relaxed'>
                <p>
                  Information is retained only for as long as reasonably
                  necessary for the purposes for which it was processed,
                  applicable legal requirements, or other legitimate purposes.
                </p>
                <p>
                  Actual retention periods may also depend on the technical
                  services used by the development site.
                </p>
              </div>
            </Section>

            {/* 10. Your Privacy Rights */}
            <Section
              icon={<Scale className='h-6 w-6' />}
              title='10. Your Privacy Rights'
            >
              <p className='text-gray-700 leading-relaxed'>
                Under the Data Privacy Act of 2012, you have rights concerning
                your personal information, including the right to know how it is
                used, access or correct your information, object to certain
                processing, and request deletion or other applicable actions
                where permitted by law.
              </p>
            </Section>

            {/* 11. Exercising Your Privacy Rights */}
            <Section
              icon={<Mail className='h-6 w-6' />}
              title='11. Exercising Your Privacy Rights'
            >
              <div className='space-y-4 text-gray-700 leading-relaxed'>
                <p>
                  For privacy questions, requests, or concerns, please contact
                  us using the contact information published on BetterMaasin.
                </p>
                <p>
                  For certain requests, we may need reasonable information to
                  verify your identity and protect against unauthorized access
                  or disclosure.
                </p>
              </div>
            </Section>

            {/* 12. Children's Privacy */}
            <Section
              icon={<Users className='h-6 w-6' />}
              title="12. Children's Privacy"
            >
              <div className='space-y-4 text-gray-700 leading-relaxed'>
                <p>
                  BetterMaasin is a general-audience civic information website
                  and is not specifically directed at children.
                </p>
                <p>
                  We do not intentionally seek to collect unnecessary personal
                  information from children.
                </p>
                <p>
                  Parents or legal guardians who have privacy concerns may
                  contact us using the contact information published on the
                  website.
                </p>
              </div>
            </Section>

            {/* 13. Changes to This Privacy Notice */}
            <Section
              icon={<RefreshCw className='h-6 w-6' />}
              title='13. Changes to This Privacy Notice'
            >
              <div className='space-y-4 text-gray-700 leading-relaxed'>
                <p>
                  We may update, modify, or revise this Privacy Notice at any
                  time.
                </p>
                <p>
                  When changes are made, we will update the Last Updated date on
                  this page. We encourage you to review this Notice from time to
                  time so you are aware of any updates.
                </p>
              </div>
            </Section>

            {/* 14. Contact */}
            <Section icon={<Mail className='h-6 w-6' />} title='14. Contact'>
              <div className='space-y-4 text-gray-700 leading-relaxed'>
                <p>
                  For privacy questions, correction requests, security concerns,
                  or other matters relating to this Privacy Notice:
                </p>
                <div className='bg-primary-50 border border-primary-200 rounded-lg p-6'>
                  <p className='text-sm font-semibold text-primary-800 mb-2'>
                    Privacy Contact
                  </p>
                  <p className='text-xl font-semibold text-primary-900'>
                    <a
                      href='mailto:bettermaasin.org@outlook.ph'
                      className='hover:text-primary-700 transition-colors'
                    >
                      bettermaasin.org@outlook.ph
                    </a>
                  </p>
                </div>
              </div>
            </Section>
          </div>

          {/* Footer Tagline */}
          <div className='border-t pt-8 text-center'>
            <p className='text-gray-500 italic'>
              BetterMaasin is an independent, volunteer-supported civic
              technology project currently under development.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
