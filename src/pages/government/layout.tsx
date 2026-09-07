import { ReactNode } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  StarIcon,
  Building2Icon,
  HouseIcon,
  LandmarkIcon,
  ArrowRightIcon,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import officialsData from '../../data/lgu/officials.json';

interface GovernmentLayoutProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

export default function GovernmentLayout({ children }: GovernmentLayoutProps) {
  // Get current path to highlight active tab
  const location = useLocation();
  const currentPath = location.pathname;

  // Define branch data
  const branches = [
    {
      title: 'City Officials',
      description: `Meet the City Mayor, Vice Mayor, and ${officialsData.legislative.officials.length} Sangguniang Panlungsod members serving Maasin City.`,
      icon: <StarIcon className='h-5 w-5' />,
      path: '/government/city-officials',
    },
    {
      title: 'City Departments',
      description:
        'Browse the city offices and departments that handle public services, programs, and daily administration.',
      icon: <Building2Icon className='h-5 w-5' />,
      path: '/government/city-departments',
    },
    {
      title: 'The Barangays',
      description:
        'Explore the barangays of Maasin City and access community-level contact and local information.',
      icon: <HouseIcon className='h-5 w-5' />,
      path: '/government/barangays',
    },
  ];

  // Check if we're on the main government page
  const isMainPage =
    currentPath === '/government' || currentPath === '/government/';

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='container mx-auto px-4 py-6 md:py-10'>
        <div className='overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-sm'>
          {/* Hero */}
          <div className='relative bg-linear-to-br from-primary-700 via-primary-600 to-blue-600 px-6 py-12 md:px-12 md:py-16'>
            <LandmarkIcon className='absolute -bottom-6 right-6 h-40 w-40 text-white/10 rotate-12' />
            <div className='relative max-w-2xl'>
              <span className='inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/90'>
                Your public servants, in one place
              </span>
              <h1 className='mt-4 text-3xl font-extrabold leading-tight text-white md:text-4xl'>
                The Maasin City Government Directory
              </h1>
              <p className='mt-3 max-w-xl text-base text-white/90 md:text-lg'>
                Explore local officials, city offices, and barangays in one
                place — easy to find, understand, and trust.
              </p>
            </div>
          </div>

          {/* Branch navigation */}
          <div className='px-6 py-8 md:px-12'>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
              {branches.map(branch => {
                const isActive = currentPath.includes(branch.path);
                return (
                  <Link
                    key={branch.path}
                    to={branch.path}
                    state={{ scrollToContent: true }}
                    className={cn(
                      'group flex flex-col rounded-xl border p-5 transition-all hover:shadow-sm',
                      isActive
                        ? 'border-primary-400 bg-primary-50'
                        : 'border-gray-200 bg-white hover:border-primary-400'
                    )}
                  >
                    <div
                      className={cn(
                        'flex h-11 w-11 items-center justify-center rounded-lg transition-colors',
                        isActive
                          ? 'bg-primary-600 text-white'
                          : 'bg-primary-100 text-primary-600 group-hover:bg-primary-600 group-hover:text-white'
                      )}
                    >
                      {branch.icon}
                    </div>
                    <h3 className='mt-3 font-semibold text-gray-900'>
                      {branch.title}
                    </h3>
                    <p className='mt-1 text-sm text-gray-600'>
                      {branch.description}
                    </p>
                    <span className='mt-2 inline-flex items-center text-sm font-medium text-primary-600'>
                      Browse
                      <ArrowRightIcon className='ml-1 h-4 w-4 transition-transform group-hover:translate-x-1' />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {!isMainPage && <div className='pt-8'>{children || <Outlet />}</div>}
      </div>
    </div>
  );
}
