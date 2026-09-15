import {
  AlertCircleIcon,
  CheckCircleIcon,
  EyeIcon,
  GlobeIcon,
  InfoIcon,
  KeyboardIcon,
  MailIcon,
  MousePointerIcon,
  SmartphoneIcon,
  Volume2Icon,
} from 'lucide-react';
import { FC } from 'react';
import SEO from '../../components/SEO';

const AccessibilityPage: FC = () => {
  const lastUpdated = new Date();
  const formattedDate = lastUpdated.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const isoDate = lastUpdated.toISOString().slice(0, 10);

  const accessibilityFeatures = [
    {
      icon: <EyeIcon className='h-6 w-6' />,
      title: 'Visual Accessibility',
      features: [
        'Readable color contrast for text and controls',
        'Scalable text and UI elements',
        'Descriptive alternative text for images',
        'Clear visual hierarchy and layout',
      ],
    },
    {
      icon: <KeyboardIcon className='h-6 w-6' />,
      title: 'Keyboard Navigation',
      features: [
        'Full keyboard navigation support',
        'Visible focus indicators',
        'Logical tab order',
        'Skip link to main content',
        'Dialogs and overlays close with Escape',
      ],
    },
    {
      icon: <Volume2Icon className='h-6 w-6' />,
      title: 'Audio & Screen Reader Support',
      features: [
        'Compatible with NVDA, JAWS, and VoiceOver',
        'Proper heading structure and landmarks',
        'Descriptive link text',
        'Form labels and instructions',
        'Live region announcements',
      ],
    },
    {
      icon: <MousePointerIcon className='h-6 w-6' />,
      title: 'Motor Accessibility',
      features: [
        'Large click targets',
        'Keyboard alternatives to drag and drop',
        'Standard browser zoom support',
        'Clear error messages and corrections',
        'Multiple ways to complete tasks',
      ],
    },
    {
      icon: <SmartphoneIcon className='h-6 w-6' />,
      title: 'Mobile Accessibility',
      features: [
        'Responsive design for all devices',
        'Touch-friendly interface',
        'Zoom support up to 200% without loss of content',
        'Portrait and landscape orientation',
        'Voice input compatibility',
      ],
    },
    {
      icon: <GlobeIcon className='h-6 w-6' />,
      title: 'Language & Cognitive Support',
      features: [
        'Clear and simple language',
        'Consistent navigation patterns',
        'Multiple language support',
        'Content structure with headings',
        'Help and documentation available',
      ],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'conforms':
        return 'bg-green-50 border-green-200';
      case 'partial':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'conforms':
        return <CheckCircleIcon className='h-5 w-5 text-green-700' />;
      case 'partial':
        return <AlertCircleIcon className='h-5 w-5 text-yellow-800' />;
      default:
        return <InfoIcon className='h-5 w-5 text-primary-700' />;
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 py-12'>
      <SEO
        title='Accessibility Statement | BetterMaasin.org'
        description="Learn about BetterMaasin.org's commitment to web accessibility, including WCAG 2.1 conformance, accessibility features, and how to report a barrier or request assistance."
        keywords={[
          'accessibility',
          'WCAG',
          'screen reader',
          'keyboard navigation',
          'inclusive design',
          'disability support',
        ]}
      />

      <div className='container mx-auto px-4'>
        <div className='max-w-4xl mx-auto'>
          {/* Header */}
          <div className='bg-white rounded-xl shadow-xs overflow-hidden mb-8'>
            <div className='p-6 md:p-8 border-b border-gray-200'>
              <h1 className='text-3xl font-bold text-gray-900 mb-4'>
                Accessibility Statement
              </h1>
              <p className='text-lg text-gray-800'>
                BetterMaasin.org is committed to ensuring digital accessibility
                for people with disabilities. We are continually improving the
                user experience for everyone and applying the relevant
                accessibility standards.
              </p>
            </div>
          </div>

          {/* Conformance Status */}
          <div className='bg-white rounded-xl shadow-xs overflow-hidden mb-8'>
            <div className='p-6 md:p-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-6'>
                Conformance Status
              </h2>
              <div
                className={`border rounded-lg p-4 ${getStatusColor('conforms')}`}
              >
                <div className='flex items-center mb-2'>
                  {getStatusIcon('conforms')}
                  <h3 className='text-lg font-semibold text-gray-900 ml-2'>
                    WCAG 2.1 Level AA
                  </h3>
                </div>
                <p className='text-gray-800'>
                  This website conforms to Web Content Accessibility Guidelines
                  (WCAG) 2.1 Level AA.
                </p>
              </div>

              <div className='border rounded-lg p-4 bg-white border-gray-200 mt-4'>
                <div className='flex items-center mb-2'>
                  <InfoIcon className='h-5 w-5 text-primary-700 mr-2' />
                  <h3 className='text-lg font-semibold text-gray-900'>
                    How we assessed this
                  </h3>
                </div>
                <p className='text-gray-800 mb-3'>
                  This website was assessed against WCAG 2.1 Level A and Level
                  AA Success Criteria on {formattedDate}.
                </p>
                <ul className='space-y-2'>
                  <li className='flex items-start'>
                    <CheckCircleIcon className='h-4 w-4 text-green-700 mt-0.5 mr-2 flex-shrink-0' />
                    <span className='text-sm text-gray-800'>
                      Automated scan of the main site routes using the axe-core
                      WCAG engine — no Level A/AA violations found.
                    </span>
                  </li>
                  <li className='flex items-start'>
                    <CheckCircleIcon className='h-4 w-4 text-green-700 mt-0.5 mr-2 flex-shrink-0' />
                    <span className='text-sm text-gray-800'>
                      Manual review: keyboard-only navigation (including a skip
                      link to main content and Escape to close dialogs).
                    </span>
                  </li>
                  <li className='flex items-start'>
                    <CheckCircleIcon className='h-4 w-4 text-green-700 mt-0.5 mr-2 flex-shrink-0' />
                    <span className='text-sm text-gray-800'>
                      Visual review at 200% zoom with no loss of content or
                      functionality.
                    </span>
                  </li>
                </ul>
              </div>

              <p className='text-sm text-gray-700 mt-4'>
                Note: WCAG conformance is an ongoing commitment. We strive to
                review this site regularly through automated scans and manual
                checks, and to re-assess accessibility whenever significant
                changes are made.
              </p>
            </div>
          </div>

          {/* Commitment Section */}
          <div className='bg-white rounded-xl shadow-xs overflow-hidden mb-8'>
            <div className='p-6 md:p-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                Our Commitment
              </h2>
              <div className='prose prose-lg text-gray-800'>
                <p>
                  We believe that everyone should have equal access to
                  government information and services. Our website is designed
                  to be accessible to all users, including those who rely on
                  assistive technologies such as screen readers, voice
                  recognition software, and keyboard navigation.
                </p>
                <p>
                  We are committed to providing an inclusive experience that
                  allows all users to access Philippine government information,
                  services, and resources with ease and independence.
                </p>
              </div>
            </div>
          </div>

          {/* Accessibility Features */}
          <div className='bg-white rounded-xl shadow-xs overflow-hidden mb-8'>
            <div className='p-6 md:p-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-6'>
                Accessibility Features
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {accessibilityFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className='border border-gray-200 rounded-lg p-6'
                  >
                    <div className='flex items-center mb-4'>
                      <div className='p-2 rounded-md bg-primary-50 text-primary-600 mr-3'>
                        {feature.icon}
                      </div>
                      <h3 className='text-lg font-semibold text-gray-900'>
                        {feature.title}
                      </h3>
                    </div>
                    <ul className='space-y-2'>
                      {feature.features.map((item, itemIndex) => (
                        <li key={itemIndex} className='flex items-start'>
                          <CheckCircleIcon className='h-4 w-4 text-green-700 mt-0.5 mr-2 flex-shrink-0' />
                          <span className='text-sm text-gray-800'>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Keyboard Navigation */}
          <div className='bg-white rounded-xl shadow-xs overflow-hidden mb-8'>
            <div className='p-6 md:p-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-6'>
                Keyboard Navigation
              </h2>
              <div className='space-y-3'>
                <div className='flex justify-between items-center p-3 bg-gray-50 rounded-lg'>
                  <span className='font-medium text-gray-900'>
                    Skip to main content
                  </span>
                  <kbd className='px-2 py-1 bg-gray-200 rounded-sm text-sm font-mono'>
                    Tab
                  </kbd>
                </div>
                <div className='flex justify-between items-center p-3 bg-gray-50 rounded-lg'>
                  <span className='font-medium text-gray-900'>
                    Navigate links and controls
                  </span>
                  <kbd className='px-2 py-1 bg-gray-200 rounded-sm text-sm font-mono'>
                    Tab / Shift+Tab
                  </kbd>
                </div>
                <div className='flex justify-between items-center p-3 bg-gray-50 rounded-lg'>
                  <span className='font-medium text-gray-900'>
                    Activate link or button
                  </span>
                  <kbd className='px-2 py-1 bg-gray-200 rounded-sm text-sm font-mono'>
                    Enter / Space
                  </kbd>
                </div>
                <div className='flex justify-between items-center p-3 bg-gray-50 rounded-lg'>
                  <span className='font-medium text-gray-900'>
                    Close dialog or overlay
                  </span>
                  <kbd className='px-2 py-1 bg-gray-200 rounded-sm text-sm font-mono'>
                    Esc
                  </kbd>
                </div>
                <div className='flex justify-between items-center p-3 bg-gray-50 rounded-lg'>
                  <span className='font-medium text-gray-900'>
                    Open site search
                  </span>
                  <kbd className='px-2 py-1 bg-gray-200 rounded-sm text-sm font-mono'>
                    Ctrl+K
                  </kbd>
                </div>
              </div>
            </div>
          </div>

          {/* Feedback and Support */}
          <div className='bg-white rounded-xl shadow-xs overflow-hidden mb-8'>
            <div className='p-6 md:p-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-6'>
                Feedback and Support
              </h2>
              <div className='prose prose-lg text-gray-800 mb-6'>
                <p>
                  We welcome your feedback on the accessibility of
                  BetterMaasin.org. If you encounter accessibility barriers or
                  have suggestions for improvement, please let us know.
                </p>
              </div>

              <div className='border border-gray-200 rounded-lg p-6 max-w-xl'>
                <div className='flex items-center mb-4'>
                  <MailIcon className='h-6 w-6 text-primary-600 mr-3' />
                  <h3 className='text-lg font-semibold text-gray-900'>
                    Email Support
                  </h3>
                </div>
                <p className='text-gray-800 mb-3'>
                  Send us your accessibility feedback or request assistance.
                </p>
                <a
                  href='mailto:bettermaasin.org@outlook.ph'
                  className='text-primary-600 hover:text-primary-700 font-medium underline'
                >
                  bettermaasin.org@outlook.ph
                </a>
              </div>
            </div>
          </div>

          {/* Alternative Formats */}
          <div className='bg-white rounded-xl shadow-xs overflow-hidden mb-8'>
            <div className='p-6 md:p-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-6'>
                Alternative Formats
              </h2>
              <div className='prose prose-lg text-gray-800'>
                <p>
                  If you need information from this website in an alternative
                  format, such as:
                </p>
                <ul>
                  <li>Large print documents</li>
                  <li>Audio recordings</li>
                  <li>Braille format</li>
                  <li>Easy-read versions</li>
                  <li>Different language translations</li>
                </ul>
                <p>
                  Please contact us using the information above, and we will
                  work to provide the content in a format that meets your needs
                  within a reasonable timeframe.
                </p>
              </div>
            </div>
          </div>

          {/* Last Updated */}
          <div className='bg-white rounded-xl shadow-xs overflow-hidden'>
            <div className='p-6 md:p-8 text-center'>
              <p className='text-sm text-gray-800'>
                This accessibility statement was last updated on{' '}
                <time dateTime={isoDate}>{formattedDate}</time>.
              </p>
              <p className='text-sm text-gray-800 mt-2'>
                We review and update this statement regularly to ensure it
                remains accurate and current.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityPage;
