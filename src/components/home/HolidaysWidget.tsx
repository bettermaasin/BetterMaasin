import { FC } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader } from '../ui/Card';
import {
  CATEGORY_A,
  CATEGORY_B,
  CATEGORY_C,
  HOLIDAY_CATEGORY_COLORS,
  LOCAL_HOLIDAYS,
  REGULAR_HOLIDAYS,
  SPECIAL_HOLIDAYS,
  getUpcomingHolidays,
} from '../../data/holidays';

const allHolidays = [
  ...REGULAR_HOLIDAYS.map(holiday => ({ ...holiday, category: CATEGORY_A })),
  ...SPECIAL_HOLIDAYS.map(holiday => ({ ...holiday, category: CATEGORY_B })),
  ...LOCAL_HOLIDAYS.map(holiday => ({ ...holiday, category: CATEGORY_C })),
];

const HolidaysWidget: FC = () => {
  const { t } = useTranslation('common');
  const nextHolidays = getUpcomingHolidays(allHolidays, 3);

  if (nextHolidays.length === 0) return null;

  const [next, ...upcoming] = nextHolidays;
  const nextDot = HOLIDAY_CATEGORY_COLORS[next.category ?? '']?.dot;

  const formatDate = (dateObj: Date, withYear = false) =>
    dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      ...(withYear ? { year: 'numeric' } : {}),
    });

  return (
    <Card>
      <CardHeader className='border-b border-primary-100 bg-primary-50'>
        <h3 className='flex items-center text-xl font-semibold text-gray-900'>
          <CalendarDays className='mr-2 h-5 w-5 text-primary-600' />
          {t('holidays.title')}
        </h3>
      </CardHeader>
      <CardContent>
        <div className='flex items-center gap-4 rounded-lg border border-primary-100 bg-gradient-to-br from-primary-50 via-sky-50 to-indigo-100 p-4'>
          <span
            className={`h-3 w-3 shrink-0 rounded-full ${nextDot ?? 'bg-blue-600'}`}
          />
          <div className='min-w-0'>
            <p className='text-xs font-medium uppercase tracking-wide text-primary-700'>
              {t('holidays.nextHoliday')}
            </p>
            <p className='mt-0.5 truncate text-lg font-bold text-gray-900'>
              {next.event}
            </p>
            <p className='text-sm text-gray-700'>
              {formatDate(next.dateObj, true)}
            </p>
          </div>
        </div>

        {upcoming.length > 0 && (
          <ul className='mt-4 divide-y divide-gray-100'>
            {upcoming.map(holiday => {
              const dot = HOLIDAY_CATEGORY_COLORS[holiday.category ?? '']?.dot;
              return (
                <li
                  key={holiday.event}
                  className='flex items-center gap-3 py-2'
                >
                  <span
                    className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                      dot ?? 'bg-blue-600'
                    }`}
                  />
                  <div className='flex min-w-0 flex-1 items-baseline justify-between gap-3'>
                    <span className='truncate text-sm font-medium text-gray-900'>
                      {holiday.event}
                    </span>
                    <span className='shrink-0 text-sm text-gray-600'>
                      {formatDate(holiday.dateObj)}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <div className='mt-4 text-right'>
          <Link
            to='/holidays'
            className='inline-flex items-center text-primary-600 text-sm hover:underline'
          >
            {t('holidays.viewAll')}
            <ChevronRight className='h-4 w-4' />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default HolidaysWidget;
