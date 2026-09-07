import { FC } from 'react';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';
import {
  CalendarEvent,
  EventCalendar,
} from '../../../components/ui/EventCalendar';
import {
  CalendarIcon,
  ExternalLinkIcon,
  InfoIcon,
  ShieldAlertIcon,
} from 'lucide-react';
import {
  Holiday,
  REGULAR_HOLIDAYS,
  SPECIAL_HOLIDAYS,
  LOCAL_HOLIDAYS,
  CATEGORY_A,
  CATEGORY_B,
  CATEGORY_C,
  HOLIDAY_CATEGORY_COLORS,
  HOLIDAY_EMPTY_MESSAGE,
  HOLIDAY_SOURCES,
  getHolidayWithDynamicDay,
} from '../../../data/holidays';

const HolidayTable = ({
  holidays,
  title,
}: {
  holidays: Holiday[];
  title: string;
}) => (
  <div className='mb-8'>
    <h2 className='text-2xl font-bold text-gray-800 mb-4 flex items-center'>
      <CalendarIcon className='mr-2 h-6 w-6 text-blue-600' />
      {title}
    </h2>
    <Card className='overflow-hidden'>
      <CardHeader className='bg-blue-50 border-b border-blue-100'>
        <h3 className='text-lg font-semibold text-blue-800'>
          {title} ({holidays.length})
        </h3>
      </CardHeader>
      <CardContent className='p-0'>
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider'
                >
                  Event
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider'
                >
                  Date
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider'
                >
                  Day
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {holidays.map((holiday, index) => (
                <tr key={index} className='hover:bg-gray-50'>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm font-medium text-gray-900'>
                      {holiday.event}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-900'>{holiday.date}</div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800'>
                      {holiday.day}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </div>
);

const PublicHolidays: FC = () => {
  const currentYear = new Date().getFullYear();

  const regularHolidays = REGULAR_HOLIDAYS.map(holiday =>
    getHolidayWithDynamicDay(holiday, currentYear)
  );
  const specialHolidays = SPECIAL_HOLIDAYS.map(holiday =>
    getHolidayWithDynamicDay(holiday, currentYear)
  );
  const localHolidays = LOCAL_HOLIDAYS.map(holiday =>
    getHolidayWithDynamicDay(holiday, currentYear)
  );

  const calendarEvents: CalendarEvent[] = [
    ...regularHolidays.map(holiday => ({ ...holiday, category: CATEGORY_A })),
    ...specialHolidays.map(holiday => ({ ...holiday, category: CATEGORY_B })),
    ...localHolidays.map(holiday => ({ ...holiday, category: CATEGORY_C })),
  ];

  return (
    <div className='max-w-6xl px-4 py-8 sm:mx-auto sm:px-6 lg:px-8'>
      <div className='text-center mb-12'>
        <h1 className='text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl'>
          Holidays {currentYear}
        </h1>
        <p className='mt-3 max-w-2xl mx-auto text-xl text-gray-800 sm:mt-4'>
          Official non-working holidays in Maasin
        </p>
      </div>

      <div className='mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 rounded-md border border-yellow-100 bg-yellow-50/60 px-4 py-2.5 text-sm text-yellow-800'>
        <InfoIcon className='h-4 w-4 shrink-0 text-yellow-600' />
        <span>
          Dates are based on official announcements and may change. Always
          verify from the sourced government links.
        </span>
        <button
          type='button'
          onClick={() =>
            document
              .getElementById('holidays-data-sources')
              ?.scrollIntoView({ behavior: 'smooth' })
          }
          className='text-blue-600 underline'
        >
          See data sources
          <ExternalLinkIcon className='ml-0.5 inline-block h-3 w-3' />
        </button>
      </div>

      <EventCalendar
        events={calendarEvents}
        minYear={currentYear}
        maxYear={currentYear}
        countLabel={count =>
          `${count} holiday${count === 1 ? '' : 's'} this month`
        }
        emptyMessage={HOLIDAY_EMPTY_MESSAGE}
        emptyIcon={<span>💀🥀</span>}
        categoryColors={HOLIDAY_CATEGORY_COLORS}
      />

      <div className='space-y-12'>
        <HolidayTable title='A. Regular Holidays' holidays={regularHolidays} />

        <HolidayTable
          title='B. Special (Non-Working) Holidays'
          holidays={specialHolidays}
        />

        <HolidayTable
          title='C. Local Special (Non-Working) Holidays'
          holidays={localHolidays}
        />
      </div>

      {/* Data Source Card */}
      <div
        id='holidays-data-sources'
        className='mt-8 scroll-mt-24 rounded-lg border border-yellow-100 bg-yellow-50/60 p-4 md:p-5'
      >
        <div className='flex items-start gap-3'>
          <div className='rounded-full border border-yellow-100 bg-white p-2'>
            <ShieldAlertIcon className='h-4 w-4 text-yellow-700' />
          </div>

          <div className='min-w-0'>
            <h2 className='text-sm font-semibold text-yellow-900'>
              Data Source and Freshness
            </h2>
            <p className='mt-1 text-sm leading-relaxed text-yellow-900/90'>
              National holiday dates are based on the official proclamations
              published in the Official Gazette (for {currentYear}: Proclamation
              No. 1006, s. 2025). Local holidays apply within the City of Maasin
              and the Province of Southern Leyte per R.A. No. 7740 (Adlaw ng
              Southern Leyte, July 1) and R.A. No. 9202 (Maasin City Charter
              Day, August 10). Dates may be subject to change based on official
              announcements.
            </p>

            <div className='mt-3 space-y-2'>
              <p className='text-xs font-medium text-yellow-800'>Sources:</p>
              <ul className='space-y-2 text-xs text-yellow-800'>
                {HOLIDAY_SOURCES.map(source => (
                  <li
                    key={source.url}
                    className='flex flex-wrap items-baseline gap-x-2 gap-y-0.5'
                  >
                    <a
                      href={source.url}
                      className='text-blue-600 underline'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {source.label}
                      <ExternalLinkIcon className='mb-0.5 ml-1 inline-block h-3 w-3' />
                    </a>
                    <span className='text-yellow-800/70'>
                      {source.coverage}
                    </span>
                  </li>
                ))}
              </ul>

              <p className='pt-1 text-xs text-yellow-800'>
                Coverage: National & Maasin local holidays
                <span className='mx-2'>•</span>
                Last verified: September 2026
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicHolidays;
