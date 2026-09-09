import { useState, useEffect, FC } from 'react';
import * as LucideIcons from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { WeatherData, ForexRate } from '../../types';
import { useTranslation } from 'react-i18next';
import { fetchWeatherData } from '../../lib/weather';
import { fetchForexData } from '../../lib/forex';
import HolidaysWidget from './HolidaysWidget';
import MaasinMapWidget from './MaasinMapWidget';

const InfoWidgets: FC = () => {
  const { t } = useTranslation('common');
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [forexRates, setForexRates] = useState<ForexRate[]>([]);
  const [isLoadingWeather, setIsLoadingWeather] = useState<boolean>(true);
  const [isLoadingForex, setIsLoadingForex] = useState<boolean>(true);
  const [weatherError, setWeatherError] = useState<string | null>(null);
  const [forexError, setForexError] = useState<string | null>(null);

  // Function to get weather icon component
  const getWeatherIcon = (iconName: string, className = 'h-8 w-8') => {
    const Icon = LucideIcons[iconName as keyof typeof LucideIcons];
    return Icon ? <Icon className={className} /> : null;
  };

  // Fetch weather data
  useEffect(() => {
    const getWeatherData = async () => {
      try {
        setIsLoadingWeather(true);
        setWeatherError(null);

        const transformedData = await fetchWeatherData();
        setWeatherData(transformedData);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setWeatherError(
          error instanceof Error
            ? error.message
            : 'Failed to fetch weather data'
        );
      } finally {
        setIsLoadingWeather(false);
      }
    };

    getWeatherData();
  }, []);

  // Fetch forex data
  useEffect(() => {
    const getForexData = async () => {
      try {
        setIsLoadingForex(true);
        setForexError(null);

        // Get forex data for the top 6 currencies
        const transformedData = await fetchForexData([
          'USD',
          'EUR',
          'JPY',
          'GBP',
          'AUD',
          'SGD',
        ]);
        setForexRates(transformedData);
      } catch (error) {
        console.error('Error fetching forex data:', error);
        setForexError(
          error instanceof Error ? error.message : 'Failed to fetch forex data'
        );
      } finally {
        setIsLoadingForex(false);
      }
    };

    getForexData();
  }, []);

  return (
    <section className='py-12 bg-gray-50'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold text-gray-900 mb-4'>
            {t('data.title')}
          </h2>
          <p className='text-lg text-gray-800 max-w-2xl mx-auto'>
            {t('data.description')}
          </p>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {/* Weather Widget */}
          <Card>
            <CardHeader className='bg-primary-50'>
              <h3 className='text-xl font-semibold text-gray-900 flex items-center'>
                <LucideIcons.Cloud className='h-5 w-5 mr-2 text-primary-600' />
                {t('weather.title')}
              </h3>
            </CardHeader>
            <CardContent className='@container relative overflow-hidden bg-gradient-to-br from-primary-50 via-sky-50 to-indigo-100'>
              <LucideIcons.CloudSnow className='pointer-events-none absolute -bottom-6 -left-6 h-32 w-32 text-white/70' />
              <LucideIcons.CloudRain className='pointer-events-none absolute -right-8 -top-8 h-36 w-36 text-white/60 [transform:rotate(12deg)]' />
              {isLoadingWeather ? (
                <div className='relative flex justify-center items-center h-40'>
                  <LucideIcons.Loader className='h-8 w-8 animate-spin text-primary-600' />
                </div>
              ) : weatherError ? (
                <div className='relative text-center p-4 text-red-500'>
                  <LucideIcons.AlertCircle className='h-8 w-8 mx-auto mb-2' />
                  <p>{weatherError}</p>
                </div>
              ) : (
                <div
                  className={`relative grid gap-4 ${
                    weatherData.length > 1
                      ? 'grid-cols-1 @md:grid-cols-2'
                      : 'grid-cols-1'
                  }`}
                >
                  {weatherData.map(location => (
                    <div
                      key={location.location}
                      className='group relative overflow-hidden rounded-xl border border-white/60 bg-white/60 p-5 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md'
                    >
                      <div className='absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-primary-200/50 to-sky-200/40 blur-xl' />
                      <div className='relative flex items-start justify-between'>
                        <div>
                          <div className='font-semibold text-lg text-gray-900'>
                            {location.location}
                          </div>
                          <div className='text-sm text-gray-700 capitalize'>
                            {location.condition}
                          </div>
                        </div>
                        <div className='text-accent-500'>
                          {getWeatherIcon(location.icon, 'h-12 w-12')}
                        </div>
                      </div>
                      <div className='relative mt-1 flex items-baseline'>
                        <span className='text-4xl font-bold text-gray-900'>
                          {location.temperature}°
                        </span>
                        <span className='ml-1 text-lg text-gray-600'>C</span>
                      </div>
                      <div className='relative mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-700'>
                        <span className='inline-flex items-center gap-1'>
                          <LucideIcons.Droplets className='h-3.5 w-3.5 text-primary-500' />
                          {location.humidity}% humidity
                        </span>
                        <span className='inline-flex items-center gap-1'>
                          <LucideIcons.Wind className='h-3.5 w-3.5 text-primary-500' />
                          {Math.round(location.windSpeed * 3.6)} km/h wind
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className='relative flex items-center justify-between'>
                <p className='text-sm text-gray-700 mt-4 text-right'>
                  Weather data provided by{' '}
                  <a
                    href='https://openweathermap.org/'
                    className='text-gray-800 hover:text-gray-900 underline'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    OpenWeather
                  </a>
                </p>
                <div className='mt-4 flex-1 text-right'>
                  <a
                    href='/data/weather'
                    className='text-primary-600 text-sm hover:underline'
                  >
                    Detailed Forecast
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Forex Widget */}
          <Card>
            <CardHeader className='bg-primary-50'>
              <h3 className='text-xl font-semibold text-gray-900 flex items-center'>
                <LucideIcons.BarChart3 className='h-5 w-5 mr-2 text-primary-600' />
                {t('forex.title')}
              </h3>
            </CardHeader>
            <CardContent>
              <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-gray-200'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th className='px-3 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider'>
                        Currency
                      </th>
                      <th className='px-3 py-3 text-right text-xs font-medium text-gray-800 uppercase tracking-wider'>
                        ₱ Rate
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-200'>
                    {isLoadingForex ? (
                      <tr>
                        <td colSpan={3} className='px-3 py-8 text-center'>
                          <LucideIcons.Loader className='h-6 w-6 animate-spin mx-auto text-primary-600' />
                        </td>
                      </tr>
                    ) : forexError ? (
                      <tr>
                        <td
                          colSpan={3}
                          className='px-3 py-4 text-center text-red-500'
                        >
                          <LucideIcons.AlertCircle className='h-6 w-6 mx-auto mb-2' />
                          <p>{forexError}</p>
                        </td>
                      </tr>
                    ) : forexRates.length === 0 ? (
                      <tr>
                        <td
                          colSpan={3}
                          className='px-3 py-4 text-center text-gray-800'
                        >
                          No forex data available
                        </td>
                      </tr>
                    ) : (
                      forexRates.map(rate => (
                        <tr key={rate.code} className='hover:bg-gray-50'>
                          <td className='px-3 py-2 whitespace-nowrap'>
                            <div className='flex items-center'>
                              <div className='font-medium text-gray-900'>
                                {rate.code}
                              </div>
                              <div className='text-gray-800 text-sm ml-2'>
                                {rate.currency}
                              </div>
                            </div>
                          </td>
                          <td className='px-3 py-2 whitespace-nowrap text-right text-sm font-medium'>
                            ₱{rate.rate.toFixed(2)}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <div className='text-right mt-4'>
                <a
                  href='/data/forex'
                  className='text-primary-600 text-sm hover:underline'
                >
                  More Currencies
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className='mt-6'>
          <HolidaysWidget />
        </div>
        <div className='mt-6'>
          <MaasinMapWidget />
        </div>
      </div>
    </section>
  );
};

export default InfoWidgets;
