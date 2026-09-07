import { ReactNode, useState } from 'react';
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Card, CardContent, CardHeader } from './Card';

export interface CalendarEvent {
  date: string;
  event: string;
  category?: string;
}

export interface AccentSet {
  cell: string;
  dot: string;
  badge: string;
  event: string;
}

interface EventCalendarProps {
  events: CalendarEvent[];
  month?: number;
  year?: number;
  title?: string;
  countLabel?: (count: number) => string;
  emptyMessage?: string;
  emptyIcon?: ReactNode;
  categoryColors?: Record<string, AccentSet>;
  minYear?: number;
  maxYear?: number;
  className?: string;
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
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const DEFAULT_ACCENT: AccentSet = {
  cell: 'bg-blue-100 font-semibold text-blue-800',
  dot: 'bg-blue-600',
  badge: 'bg-blue-600',
  event: 'text-blue-900',
};

export const EventCalendar = ({
  events,
  month,
  year,
  title,
  countLabel,
  emptyMessage,
  emptyIcon,
  categoryColors,
  minYear,
  maxYear,
  className,
}: EventCalendarProps) => {
  const now = new Date();
  const [view, setView] = useState<{ m: number; y: number }>(() => ({
    m: month ?? now.getMonth(),
    y: year ?? now.getFullYear(),
  }));
  const viewMonth = view.m;
  const viewYear = view.y;

  const shiftMonth = (delta: number) => {
    setView(prev => {
      const nextMonth = prev.m + delta;
      if (nextMonth < 0) {
        if (minYear != null && prev.y - 1 < minYear) return prev;
        return { m: 11, y: prev.y - 1 };
      }
      if (nextMonth > 11) {
        if (maxYear != null && prev.y + 1 > maxYear) return prev;
        return { m: 0, y: prev.y + 1 };
      }
      return { m: nextMonth, y: prev.y };
    });
  };

  const canGoPrev = viewMonth > 0 || minYear == null || viewYear - 1 >= minYear;
  const canGoNext =
    viewMonth < 11 || maxYear == null || viewYear + 1 <= maxYear;

  const accentOf = (event: CalendarEvent): AccentSet =>
    (event.category && categoryColors?.[event.category]) || DEFAULT_ACCENT;

  const lastDay = new Date(viewYear, viewMonth + 1, 0).getDate();

  const monthEvents = events.reduce<Record<number, CalendarEvent[]>>(
    (acc, event) => {
      const [monthName, dayStr] = event.date.split(' ');
      if (MONTHS[viewMonth] === monthName) {
        const day = parseInt(dayStr, 10);
        (acc[day] = acc[day] || []).push(event);
      }
      return acc;
    },
    {}
  );

  const eventDays = Object.keys(monthEvents)
    .map(Number)
    .sort((a, b) => a - b);

  const cells: (number | null)[] = [
    ...Array(new Date(viewYear, viewMonth, 1).getDay()).fill(null),
    ...Array.from({ length: lastDay }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const isCurrentMonth =
    viewMonth === now.getMonth() && viewYear === now.getFullYear();

  const resolvedCountLabel =
    countLabel ??
    ((count: number) => `${count} event${count === 1 ? '' : 's'} this month`);

  return (
    <Card className={cn('mb-8', className)}>
      <CardHeader className='border-b border-blue-100 bg-blue-50'>
        <div className='flex flex-wrap items-center justify-between gap-2'>
          <div className='grid grid-cols-[2.25rem_10rem_2.25rem] items-center gap-1'>
            <button
              type='button'
              onClick={() => shiftMonth(-1)}
              disabled={!canGoPrev}
              aria-label='Previous month'
              className={`justify-self-start rounded-md p-1 text-blue-600 transition-colors hover:bg-blue-100 ${
                canGoPrev
                  ? ''
                  : 'cursor-not-allowed opacity-40 hover:bg-transparent'
              }`}
            >
              <ChevronLeft className='h-5 w-5' />
            </button>
            <h3 className='flex min-w-0 items-center justify-self-center truncate px-1 text-lg font-semibold text-blue-800'>
              <CalendarIcon className='mr-2 h-5 w-5 shrink-0 text-blue-600' />
              {title ? `${title} ` : ''}
              {MONTHS[viewMonth]} {viewYear}
            </h3>
            <button
              type='button'
              onClick={() => shiftMonth(1)}
              disabled={!canGoNext}
              aria-label='Next month'
              className={`justify-self-end rounded-md p-1 text-blue-600 transition-colors hover:bg-blue-100 ${
                canGoNext
                  ? ''
                  : 'cursor-not-allowed opacity-40 hover:bg-transparent'
              }`}
            >
              <ChevronRight className='h-5 w-5' />
            </button>
          </div>
          <span className='text-sm font-medium text-blue-700'>
            {resolvedCountLabel(eventDays.length)}
          </span>
        </div>
      </CardHeader>
      <CardContent className='p-6'>
        <div className='relative'>
          <div
            className={`grid grid-cols-7 gap-1 transition-opacity ${
              eventDays.length === 0
                ? 'pointer-events-none select-none opacity-40 grayscale'
                : ''
            }`}
          >
            {WEEKDAYS.map(weekday => (
              <div
                key={weekday}
                className='pb-2 text-center text-xs font-semibold uppercase tracking-wide text-gray-500'
              >
                {weekday}
              </div>
            ))}
            {cells.map((day, i) => {
              if (day === null) return <div key={`empty-${i}`} />;
              const dayEvents = monthEvents[day] || [];
              const isToday = isCurrentMonth && day === now.getDate();
              const activeAccent = dayEvents.length
                ? accentOf(dayEvents[0])
                : null;
              return (
                <div
                  key={day}
                  className={`flex min-h-12 flex-col items-center justify-center rounded-lg py-1.5 text-sm transition-colors ${
                    activeAccent?.cell ?? 'text-gray-700'
                  } ${isToday ? 'ring-2 ring-blue-500 ring-offset-1' : ''}`}
                >
                  <span>{day}</span>
                  {dayEvents.length > 0 && (
                    <span className='mt-0.5 flex gap-0.5'>
                      {dayEvents.map((event, dot) => (
                        <span
                          key={dot}
                          className={`h-1 w-1 rounded-full ${accentOf(event).dot}`}
                        />
                      ))}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {eventDays.length === 0 && emptyMessage && (
            <div className='absolute inset-0 flex items-center justify-center px-6 py-8'>
              <div className='max-w-md rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50/40 px-6 py-5 text-center shadow-sm backdrop-blur-sm'>
                {emptyIcon && (
                  <div className='text-2xl leading-none tracking-wide'>
                    {emptyIcon}
                  </div>
                )}
                <p className='mt-2 text-base font-medium leading-relaxed text-amber-900'>
                  {emptyMessage}
                </p>
              </div>
            </div>
          )}
        </div>

        {eventDays.length > 0 && (
          <ul className='mt-5 divide-y divide-gray-100'>
            {eventDays.map(day => {
              const first = monthEvents[day][0];
              const accent = accentOf(first);
              return (
                <li key={day} className='flex items-start gap-3 py-2'>
                  <span
                    className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${accent.badge}`}
                  >
                    {day}
                  </span>
                  <div>
                    {monthEvents[day].map((event, i) => (
                      <div
                        key={i}
                        className={`text-sm font-medium ${accentOf(event).event}`}
                      >
                        {event.event}
                      </div>
                    ))}
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {categoryColors && Object.keys(categoryColors).length > 0 && (
          <div className='mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-gray-200 pt-4'>
            {Object.entries(categoryColors).map(([category, accent]) => (
              <span
                key={category}
                className='inline-flex items-center gap-2 text-sm text-gray-600'
              >
                <span className={`h-2.5 w-2.5 rounded-full ${accent.dot}`} />
                {category}
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
