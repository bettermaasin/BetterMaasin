import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  LandPlotIcon,
  MountainIcon,
  MapPinIcon,
  UsersIcon,
  Building2Icon,
  ShieldAlertIcon,
  LandmarkIcon,
  SparklesIcon,
  SunIcon,
  LanguagesIcon,
  CalendarIcon,
  CrownIcon,
  FlagIcon,
  HeartHandshakeIcon,
} from 'lucide-react';
import {
  fetchMaasinOverview,
  MaasinOverviewData,
} from '../../../lib/maasinOverview';
import { cacheGet, cacheSet } from '../../../lib/cache';
import barangaysData from '../../../data/lgu/barangays.json';

interface WikipediaSummary {
  extract?: string;
  content_urls?: { desktop?: { page?: string } };
}

function useMaasinOverview() {
  const [data, setData] = useState<MaasinOverviewData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchMaasinOverview()
      .then(result => {
        if (!cancelled) setData(result);
      })
      .catch(err => {
        if (!cancelled)
          setError(err instanceof Error ? err.message : 'Unknown');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, error };
}

const WIKI_CACHE_KEY = 'maasin-description';
const WIKI_CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 1 day

function useWikipediaDescription() {
  const [summary, setSummary] = useState<WikipediaSummary | null>(
    () => cacheGet<WikipediaSummary>(WIKI_CACHE_KEY) ?? null
  );
  const [loading, setLoading] = useState(
    () => cacheGet<WikipediaSummary>(WIKI_CACHE_KEY) === null
  );

  useEffect(() => {
    if (summary) return; // served from cache
    let cancelled = false;
    fetch('https://en.wikipedia.org/api/rest_v1/page/summary/Maasin')
      .then(res => (res.ok ? res.json() : null))
      .then(result => {
        if (cancelled || !result) return;
        setSummary(result);
        cacheSet(WIKI_CACHE_KEY, result, WIKI_CACHE_TTL_MS);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [summary]);

  return { summary, loading };
}

export default function OverviewPage() {
  const { t } = useTranslation('statistics');
  const { data, error } = useMaasinOverview();
  const { summary, loading } = useWikipediaDescription();

  const barangayCount = barangaysData.barangays.length;
  const chartData = (data?.censusHistory || []).map(entry => ({
    year: String(entry.year),
    population: entry.population,
  }));

  const statCards = [
    {
      label: t('statistics.population'),
      value: data?.population != null ? data.population.toLocaleString() : null,
      hint:
        data?.populationYear != null
          ? `(${t('statistics.populationYearSuffix', { year: data.populationYear })})`
          : null,
      icon: UsersIcon,
    },
    {
      label: t('statistics.area'),
      value:
        data?.areaKm2 != null ? `${data.areaKm2.toLocaleString()} km²` : null,
      icon: LandPlotIcon,
    },
    {
      label: t('statistics.barangays'),
      value: barangayCount.toLocaleString(),
      icon: Building2Icon,
    },
    {
      label: t('statistics.elevation'),
      value: data?.elevationM != null ? `${data.elevationM} m` : null,
      icon: MountainIcon,
    },
  ];

  const funFacts = [
    {
      label: t('statistics.climate'),
      value: data?.climate ?? null,
      icon: SunIcon,
    },
    {
      label: t('statistics.founded'),
      value: data?.inception != null ? String(data.inception) : null,
      icon: CalendarIcon,
    },
    {
      label: t('statistics.cityhood'),
      value: data?.cityhood
        ? new Date(data.cityhood + 'T00:00:00').toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        : null,
      icon: FlagIcon,
    },
    {
      label: t('statistics.capitalOf'),
      value: data?.capitalOf ?? null,
      icon: CrownIcon,
    },
    {
      label: t('statistics.languages'),
      value:
        data?.languages?.length != null && data.languages.length > 0
          ? data.languages.join(', ')
          : null,
      icon: LanguagesIcon,
    },
    {
      label: t('statistics.incomeClass'),
      value: data?.incomeClass ?? null,
      icon: Building2Icon,
    },
    {
      label: t('statistics.povertyRate'),
      value:
        data?.povertyRate != null
          ? `${data.povertyRate.toLocaleString()}% ${
              data.povertyYear != null ? `(${data.povertyYear})` : ''
            }`
          : null,
      icon: HeartHandshakeIcon,
    },
  ];

  return (
    <div className='min-h-screen bg-gray-50'>
      <Helmet>
        <title>{t('page.title')}</title>
        <meta name='description' content={t('page.description')} />
      </Helmet>

      <div className='container mx-auto px-4 py-8 md:py-10'>
        <div className='mb-8'>
          <p className='text-sm font-semibold uppercase tracking-[0.2em] text-gray-500'>
            {t('page.eyebrow')}
          </p>
          <h1 className='mt-1 text-3xl font-bold text-gray-900'>
            {t('page.heading')}
          </h1>
          <p className='mt-2 max-w-2xl text-gray-700'>
            {data?.officialName ? `${data.officialName} — ` : ''}
            {t('page.subtitle')}
          </p>
        </div>

        {error && (
          <div className='mb-6 rounded-lg border border-red-100 bg-red-50/60 p-4 text-sm text-red-800'>
            {t('description.unavailable')} ({error})
          </div>
        )}

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {statCards.map(card => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className='bg-white rounded-lg shadow-xs p-4'
              >
                <div className='flex items-center justify-between'>
                  <h3 className='text-sm font-medium text-gray-700'>
                    {card.label}
                  </h3>
                  <Icon className='h-4 w-4 text-gray-400' />
                </div>
                <p className='mt-2 text-2xl font-bold text-gray-900'>
                  {card.value ?? '—'}
                </p>
                {card.hint && (
                  <p className='mt-1 text-xs text-gray-500'>{card.hint}</p>
                )}
              </div>
            );
          })}
        </div>

        {chartData.length > 0 && (
          <div className='mt-6 bg-white rounded-lg shadow-xs p-4 md:p-6'>
            <h2 className='text-lg font-semibold text-gray-900 mb-4'>
              {t('sections.censusHistory')}
            </h2>
            <div className='h-72 w-full'>
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='year' tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Bar dataKey='population' fill='#2563eb' name='Population' />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        <div className='mt-6 bg-white rounded-lg shadow-xs p-4 md:p-6'>
          <div className='mb-4 flex items-center gap-2'>
            <SparklesIcon className='h-5 w-5 text-primary-600' />
            <h2 className='text-lg font-semibold text-gray-900'>
              {t('sections.didYouKnow')}
            </h2>
          </div>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {funFacts.map(fact => {
              const Icon = fact.icon;
              return (
                <div key={fact.label} className='flex items-start gap-3'>
                  <div className='rounded-full bg-gray-100 p-2'>
                    <Icon className='h-4 w-4 text-gray-600' />
                  </div>
                  <div>
                    <p className='text-sm text-gray-600'>{fact.label}</p>
                    <p className='text-base font-semibold text-gray-900'>
                      {fact.value ?? '—'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className='mt-6 bg-white rounded-lg shadow-xs p-4 md:p-6'>
          <div className='mb-2 flex items-center gap-2'>
            <LandmarkIcon className='h-5 w-5 text-primary-600' />
            <h2 className='text-lg font-semibold text-gray-900'>
              {t('sections.description')}
            </h2>
          </div>
          {loading ? (
            <p className='text-sm text-gray-500'>{t('description.loading')}</p>
          ) : summary?.extract ? (
            <>
              <p className='text-sm leading-relaxed text-gray-700'>
                {summary.extract}
              </p>
              {summary.content_urls?.desktop?.page && (
                <a
                  href={summary.content_urls.desktop.page}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700'
                >
                  <MapPinIcon className='h-4 w-4' />
                  {t('description.learnMore')}
                </a>
              )}
            </>
          ) : (
            <p className='text-sm text-gray-500'>
              {t('description.unavailable')}
            </p>
          )}
        </div>

        <div className='mt-6 rounded-lg border border-yellow-100 bg-yellow-50/60 p-4 md:p-5'>
          <div className='flex items-start gap-3'>
            <div className='rounded-full bg-white p-2 border border-yellow-100'>
              <ShieldAlertIcon className='h-4 w-4 text-yellow-700' />
            </div>
            <div className='min-w-0'>
              <h2 className='text-sm font-semibold text-yellow-900'>
                {t('dataSource.title')}
              </h2>
              <p className='mt-1 text-sm text-yellow-900/90 leading-relaxed'>
                {t('dataSource.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
