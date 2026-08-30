import {
  Building2Icon,
  ExternalLinkIcon,
  ScrollTextIcon,
  ShieldAlertIcon,
} from 'lucide-react';
import {
  Card,
  CardAvatar,
  CardContent,
  CardDivider,
  CardHeader,
} from '../../../components/ui/CardList';
import officialsData from '../../../data/lgu/officials.json';

type Official = {
  role: string;
  name: string;
};

type OfficialsData = {
  executive: {
    officials: Official[];
  };
  legislative: {
    officials: Official[];
  };
};

const officials = officialsData as OfficialsData;

const HONORIFICS = ['hon', 'atty', 'dr', 'dir', 'mayor', 'vice'];

const getAvatarName = (name: string): string => {
  const parts = name
    .split(/\s+/)
    .filter(
      part => !HONORIFICS.includes(part.replace(/[.,]/g, '').toLowerCase())
    );
  return parts.join(' ') || name;
};

const branches = [
  {
    id: 'executive' as const,
    label: 'Executive Branch',
    shortLabel: 'Executive',
    icon: Building2Icon,
    officials: officials.executive.officials,
    accent: 'bg-primary-50 text-primary-700 border-primary-200',
  },
  {
    id: 'legislative' as const,
    label: 'Sangguniang Panlungsod',
    shortLabel: 'Legislative',
    icon: ScrollTextIcon,
    officials: officials.legislative.officials,
    accent: 'bg-gray-100 text-gray-700 border-gray-200',
  },
];

export default function CityOfficialsIndex() {
  const executiveCount = officials.executive.officials.length;
  const legislativeCount = officials.legislative.officials.length;

  return (
    <div className='@container space-y-6'>
      {/* Header */}
      <div className='flex flex-col md:flex-row md:items-end md:justify-between gap-4'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>
            City Officials
          </h1>
          <p className='text-gray-800 max-w-2xl'>
            Meet the current executive and legislative officials serving the
            City of Maasin.
          </p>
        </div>

        <div className='flex flex-wrap items-center gap-2 md:gap-3 shrink-0'>
          <div className='flex items-center gap-2 rounded-md border border-primary-200 bg-primary-50 px-3 py-2'>
            <Building2Icon className='h-4 w-4 text-primary-700' />
            <div className='leading-tight'>
              <p className='text-lg font-bold text-primary-900'>
                {executiveCount}
              </p>
              <p className='text-[11px] font-medium uppercase tracking-wide text-primary-700'>
                Executive
              </p>
            </div>
          </div>
          <div className='flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-3 py-2'>
            <ScrollTextIcon className='h-4 w-4 text-gray-700' />
            <div className='leading-tight'>
              <p className='text-lg font-bold text-gray-900'>
                {legislativeCount}
              </p>
              <p className='text-[11px] font-medium uppercase tracking-wide text-gray-600'>
                SP Members
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Officials Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {branches.map(branch => {
          const BranchIcon = branch.icon;
          return (
            <Card
              key={branch.id}
              hover={false}
              className='h-full flex flex-col'
            >
              <CardHeader>
                <div className='flex items-center justify-between gap-3'>
                  <div className='flex items-center gap-2.5'>
                    <span
                      className={`inline-flex items-center justify-center rounded-lg p-2 ${branch.accent}`}
                    >
                      <BranchIcon className='h-5 w-5' />
                    </span>
                    <h3 className='font-bold text-lg text-gray-900'>
                      {branch.label}
                    </h3>
                  </div>
                  <span className='inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-sm font-semibold text-gray-700'>
                    {branch.officials.length}
                  </span>
                </div>
              </CardHeader>
              <CardDivider />
              <CardContent className='flex-1 space-y-2'>
                {branch.officials.map(official => (
                  <div
                    key={`${branch.id}-${official.name}`}
                    className='flex items-center gap-3 rounded-md border border-gray-200 bg-gray-50/60 px-3 py-2.5 transition-colors hover:border-primary-200 hover:bg-primary-50/40'
                  >
                    <CardAvatar name={getAvatarName(official.name)} size='sm' />
                    <div className='min-w-0 flex-1'>
                      <p className='text-sm font-semibold text-gray-900 leading-tight break-words'>
                        {official.name}
                      </p>
                      <p className='text-xs font-medium text-primary-600'>
                        {official.role}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Data Source Card */}
      <div className='rounded-lg border border-yellow-100 bg-yellow-50/60 p-4 md:p-5'>
        <div className='flex items-start gap-3'>
          <div className='rounded-full bg-white p-2 border border-yellow-100'>
            <ShieldAlertIcon className='h-4 w-4 text-yellow-700' />
          </div>

          <div className='min-w-0'>
            <h2 className='text-sm font-semibold text-yellow-900'>
              Data Source and Freshness
            </h2>
            <p className='mt-1 text-sm text-yellow-900/90 leading-relaxed'>
              Information shown are sourced from official Maasin City Government
              records and publicly published office directories. Information may
              change without prior notice. Verify the information through the
              source link or contact the relevant office.
            </p>

            <div className='mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-yellow-800'>
              <span>
                <span>Source: </span>
                <a
                  href='https://maasincity.gov.ph/index.php/government/directory'
                  className='text-blue-600 underline'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  City Government Website
                  <ExternalLinkIcon
                    className='h-3 w-3 inline-block ml-1 mb-0.75'
                    aria-hidden='true'
                  />
                </a>
              </span>
              <span>Coverage: Executive and legislative officials</span>
              <span>Last verified: April 2026</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
