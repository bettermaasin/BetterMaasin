import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Home,
  Building2,
  FileText,
  Globe,
  Briefcase,
  FileCheck,
  Waves,
  ExternalLink,
} from 'lucide-react';
import SEO from '../../components/SEO';

interface SitemapSection {
  title: string;
  icon: ReactNode;
  links: {
    title: string;
    url: string;
    description?: string;
  }[];
}

const SitemapPage: FC = () => {
  const sitemapSections: SitemapSection[] = [
    {
      title: 'Main Pages',
      icon: <Home className='h-5 w-5' />,
      links: [
        { title: 'Home', url: '/', description: 'Main landing page' },
        {
          title: 'About',
          url: '/about',
          description: 'About BetterMaasin.org',
        },
        {
          title: 'Accessibility',
          url: '/accessibility',
          description: 'Accessibility statement and features',
        },
        {
          title: 'Search',
          url: '/search',
          description: 'Search the entire site',
        },
      ],
    },
    {
      title: 'Philippines',
      icon: <Globe className='h-5 w-5' />,
      links: [
        {
          title: 'About the Philippines',
          url: '/philippines/about',
          description: 'General information about the Philippines',
        },
        {
          title: 'History',
          url: '/philippines/history',
          description: 'Historical timeline of the Philippines',
        },
        {
          title: 'Culture',
          url: '/philippines/culture',
          description: 'Cultural heritage and traditions',
        },
        {
          title: 'Regions',
          url: '/philippines/regions',
          description: 'Administrative regions of the Philippines',
        },
        {
          title: 'Map',
          url: '/philippines/map',
          description: 'Interactive map of the Philippines',
        },
        {
          title: 'Public Holidays',
          url: '/holidays',
          description: 'Official holidays in the Philippines',
        },
        {
          title: 'Hotlines',
          url: '/philippines/hotlines',
          description: 'Emergency and important contact numbers',
        },
      ],
    },
    {
      title: 'Government',
      icon: <Building2 className='h-5 w-5' />,
      links: [
        {
          title: 'Executive Branch',
          url: '/government/executive',
          description: 'Office of the President and executive offices',
        },
        {
          title: 'Office of the President',
          url: '/government/executive/office-of-the-president',
          description: 'Information about the Office of the President',
        },
        {
          title: 'Office of the Vice President',
          url: '/government/executive/office-of-the-vice-president',
          description: 'Information about the Office of the Vice President',
        },
        {
          title: 'Presidential Communications Office',
          url: '/government/executive/presidential-communications-office',
          description:
            'Information about the Presidential Communications Office',
        },
        {
          title: 'Other Executive Offices',
          url: '/government/executive/other-executive-offices',
          description: 'Other offices under the Executive branch',
        },
        {
          title: 'Departments',
          url: '/government/departments',
          description: 'Government departments and agencies',
        },
        {
          title: 'Constitutional Bodies',
          url: '/government/constitutional',
          description: 'Constitutional commissions and offices',
        },
        {
          title: 'GOCCs',
          url: '/government/constitutional/goccs',
          description: 'Government-Owned and Controlled Corporations',
        },
        {
          title: 'SUCs',
          url: '/government/constitutional/sucs',
          description: 'State Universities and Colleges',
        },
        {
          title: 'Legislative Branch',
          url: '/government/legislative',
          description: 'Senate and House of Representatives',
        },
        {
          title: 'Senate Committees',
          url: '/government/legislative/senate-committees',
          description: 'Committees in the Senate',
        },
        {
          title: 'House Members',
          url: '/government/legislative/house-members',
          description: 'Members of the House of Representatives',
        },
        {
          title: 'Diplomatic Missions',
          url: '/government/diplomatic/missions',
          description: 'Philippine diplomatic missions abroad',
        },
        {
          title: 'Consulates',
          url: '/government/diplomatic/consulates',
          description: 'Philippine consulates',
        },
        {
          title: 'International Organizations',
          url: '/government/diplomatic/organizations',
          description: 'International organizations in the Philippines',
        },
        {
          title: 'Local Government',
          url: '/government/local',
          description: 'Local government units by region',
        },
      ],
    },
    {
      title: 'Services (Coming Soon)',
      icon: <FileText className='h-5 w-5' />,
      links: [
        {
          title: 'All Services',
          url: '/services',
          description:
            'Government services directory — under research, coming soon',
        },
      ],
    },
    {
      title: 'Travel',
      icon: <Briefcase className='h-5 w-5' />,
      links: [
        {
          title: 'Visa Information',
          url: '/travel/visa',
          description: 'Visa requirements for the Philippines',
        },
        {
          title: 'Visa Types',
          url: '/travel/visa-types',
          description: 'Different types of Philippine visas',
        },
        {
          title: 'Special Work Permit',
          url: '/travel/visa-types/swp-c',
          description: 'Information about Special Work Permits',
        },
      ],
    },
    {
      title: 'Data Services',
      icon: <FileCheck className='h-5 w-5' />,
      links: [
        {
          title: 'Weather',
          url: '/data/weather',
          description: 'Real-time weather information',
        },
        {
          title: 'Foreign Exchange Rates',
          url: '/data/forex',
          description: 'Current foreign exchange rates',
        },
      ],
    },
    {
      title: 'Infrastructure',
      icon: <Waves className='h-5 w-5' />,
      links: [
        {
          title: 'Flood Control Projects',
          url: '/statistics/flood-control-projects',
          description: 'Overview of flood control infrastructure projects',
        },
        {
          title: 'Projects Table View',
          url: '/statistics/flood-control-projects/table',
          description: 'Detailed table view of all flood control projects',
        },
        {
          title: 'Projects Map View',
          url: '/statistics/flood-control-projects/map',
          description:
            'Interactive map showing flood control project locations',
        },
      ],
    },
  ];

  return (
    <div className='min-h-screen bg-gray-50 py-12'>
      <SEO
        title='Sitemap'
        description='Complete sitemap of BetterMaasin.org - Find all pages and services available on the Philippine Government Portal.'
        keywords={[
          'sitemap',
          'navigation',
          'government services',
          'philippines government',
          'website map',
        ]}
      />

      <div className='container mx-auto px-4'>
        <div className='max-w-5xl mx-auto'>
          <div className='bg-white rounded-xl shadow-xs overflow-hidden'>
            <div className='p-6 md:p-8 border-b border-gray-200'>
              <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                <div>
                  <h1 className='text-3xl font-bold text-gray-900'>Sitemap</h1>
                  <p className='mt-2 text-gray-800'>
                    A complete guide to all pages and services available on
                    BetterMaasin.org
                  </p>
                </div>
                <a
                  href='/sitemap.xml'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-2 rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600'
                >
                  <ExternalLink className='h-4 w-4' />
                  View raw sitemap.xml
                </a>
              </div>
            </div>

            <div className='p-6 md:p-8'>
              <div className='space-y-12'>
                {sitemapSections.map((section, index) => (
                  <div key={index}>
                    <div className='flex items-center mb-4'>
                      <div className='p-2 rounded-md bg-primary-50 text-primary-600 mr-3'>
                        {section.icon}
                      </div>
                      <h2 className='text-xl font-bold text-gray-900'>
                        {section.title}
                      </h2>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                      {section.links.map((link, linkIndex) => (
                        <Link
                          key={linkIndex}
                          to={link.url}
                          className='group flex flex-col p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors'
                        >
                          <div className='flex items-center justify-between mb-2'>
                            <h3 className='font-medium text-gray-900 group-hover:text-primary-700'>
                              {link.title}
                            </h3>
                            <ChevronRight className='h-4 w-4 text-gray-400 group-hover:text-primary-500' />
                          </div>
                          {link.description && (
                            <p className='text-sm text-gray-800'>
                              {link.description}
                            </p>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className='mt-8 text-center text-sm text-gray-800'>
            <p>
              Can&apos;t find what you&apos;re looking for? Try using our{' '}
              <Link to='/search' className='text-primary-600 hover:underline'>
                search feature
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SitemapPage;
