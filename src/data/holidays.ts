import { AccentSet } from '../components/ui/EventCalendar';

export interface Holiday {
  event: string;
  date: string;
  day?: string;
  category?: string;
}

export const REGULAR_HOLIDAYS: Holiday[] = [
  { event: "New Year's Day", date: 'January 1', day: 'Thursday' },
  { event: 'Maundy Thursday', date: 'April 2', day: 'Thursday' },
  { event: 'Good Friday', date: 'April 3', day: 'Friday' },
  { event: 'Araw ng Kagitingan', date: 'April 9', day: 'Thursday' },
  { event: 'Labor Day', date: 'May 1', day: 'Friday' },
  { event: 'Independence Day', date: 'June 12', day: 'Friday' },
  { event: 'National Heroes Day', date: 'August 31', day: 'Monday' },
  { event: 'Bonifacio Day', date: 'November 30', day: 'Monday' },
  { event: 'Christmas Day', date: 'December 25', day: 'Friday' },
  { event: 'Rizal Day', date: 'December 30', day: 'Wednesday' },
];

export const SPECIAL_HOLIDAYS: Holiday[] = [
  { event: 'Chinese New Year', date: 'February 17', day: 'Tuesday' },
  { event: 'Black Saturday', date: 'April 4', day: 'Saturday' },
  { event: 'Ninoy Aquino Day', date: 'August 21', day: 'Friday' },
  { event: "All Saints' Day", date: 'November 1', day: 'Sunday' },
  { event: "All Souls' Day", date: 'November 2', day: 'Monday' },
  {
    event: 'Feast of the Immaculate Conception of Mary',
    date: 'December 8',
    day: 'Tuesday',
  },
  { event: 'Christmas Eve', date: 'December 24', day: 'Thursday' },
  { event: 'Last Day of the Year', date: 'December 31', day: 'Thursday' },
];

export const LOCAL_HOLIDAYS: Holiday[] = [
  {
    event: 'Adlaw ng Southern Leyte (Province Day)',
    date: 'July 1',
    day: '',
  },
  { event: 'Maasin City Charter Day', date: 'August 10', day: '' },
];

export const CATEGORY_A = 'A. Regular Holidays';
export const CATEGORY_B = 'B. Special (Non-Working) Holidays';
export const CATEGORY_C = 'C. Local (Special Non-Working) Holidays';

export const HOLIDAY_CATEGORY_COLORS: Record<string, AccentSet> = {
  [CATEGORY_A]: {
    cell: 'bg-blue-100 font-semibold text-blue-800',
    dot: 'bg-blue-600',
    badge: 'bg-blue-600',
    event: 'text-blue-900',
  },
  [CATEGORY_B]: {
    cell: 'bg-amber-100 font-semibold text-amber-800',
    dot: 'bg-amber-500',
    badge: 'bg-amber-500',
    event: 'text-amber-900',
  },
  [CATEGORY_C]: {
    cell: 'bg-emerald-100 font-semibold text-emerald-800',
    dot: 'bg-emerald-600',
    badge: 'bg-emerald-600',
    event: 'text-emerald-900',
  },
};

export const HOLIDAY_EMPTY_MESSAGE =
  'Checking the calendar for a long weekend and finding nothing is the ultimate jumpscare';

export function getHolidayWithDynamicDay(
  holiday: Holiday,
  currentYear: number
): Holiday {
  const fullDate = new Date(`${holiday.date} ${currentYear}`);

  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const dayName = days[fullDate.getDay()];

  return {
    ...holiday,
    day: dayName,
  };
}

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export type UpcomingHoliday = Holiday & { dateObj: Date };

export function getUpcomingHolidays(
  holidays: Holiday[],
  count: number,
  from: Date = new Date()
): UpcomingHoliday[] {
  const startOfDay = new Date(
    from.getFullYear(),
    from.getMonth(),
    from.getDate()
  );

  const dated = holidays.map(holiday => {
    const [monthName, dayStr] = holiday.date.split(' ');
    const month = MONTHS.indexOf(monthName);
    const day = parseInt(dayStr, 10);
    let year = from.getFullYear();
    let dateObj = new Date(year, month, day);

    if (dateObj < startOfDay) {
      year += 1;
      dateObj = new Date(year, month, day);
    }

    return { ...holiday, dateObj };
  });

  dated.sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime());

  return dated.slice(0, count);
}

export interface HolidaySource {
  label: string;
  url: string;
  coverage: string;
}

export const HOLIDAY_SOURCES: HolidaySource[] = [
  {
    label: 'Official Gazette - Nationwide Holidays',
    url: 'https://www.officialgazette.gov.ph/nationwide-holidays/',
    coverage:
      'National regular holidays and special (non-working) days, per Proclamation No. 1006 (s. 2025)',
  },
  {
    label: 'Republic Act No. 7740 - Adlaw ng Southern Leyte',
    url: 'https://elibrary.judiciary.gov.ph/thebookshelf/showdocsfriendly/2/2394',
    coverage:
      'Local special (non-working) holiday on July 1 in the Province of Southern Leyte',
  },
  {
    label: 'Republic Act No. 9202 - Maasin City Charter Day',
    url: 'https://elibrary.judiciary.gov.ph/thebookshelf/showdocsfriendly/2/322',
    coverage:
      'Local special (non-working) holiday on August 10 in the City of Maasin',
  },
];
