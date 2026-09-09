import { FC } from 'react';
import { MapPinIcon } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { useTranslation } from 'react-i18next';
import maasinBoundary from '../../data/flood_control/maasin_boundary.json';

const cityHallPosition: LatLngExpression = [10.1315, 124.8384];
const initialZoom = 15;

const cityHallIcon = L.icon({
  iconUrl: '/marker-icon-2x.webp',
  iconSize: [16, 24],
  iconAnchor: [8, 24],
  popupAnchor: [0, -28],
});

const MaasinMapWidget: FC = () => {
  const { t } = useTranslation('common');

  return (
    <Card>
      <CardHeader className='bg-primary-50'>
        <h3 className='flex items-center text-xl font-semibold text-gray-900'>
          <MapPinIcon className='mr-2 h-5 w-5 text-primary-600' />
          {t('map.title')}
        </h3>
      </CardHeader>
      <CardContent>
        <div className='h-80 overflow-hidden rounded-xl md:h-96'>
          <MapContainer
            center={cityHallPosition}
            zoom={initialZoom}
            scrollWheelZoom={false}
            className='z-0'
            style={{ width: '100%', height: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            <GeoJSON
              data={maasinBoundary}
              interactive={false}
              style={{
                color: '#0066eb',
                weight: 3,
                fillColor: '#0066eb',
                fillOpacity: 0.06,
              }}
            />
            <Marker position={cityHallPosition} icon={cityHallIcon}>
              <Popup>
                <strong>{t('map.cityHall')}</strong>
                <br />
                City Government Center, Maasin City, Southern Leyte 6600
              </Popup>
            </Marker>
          </MapContainer>
        </div>
        <p className='mt-4 text-sm text-gray-700'>{t('map.subtitle')}</p>
      </CardContent>
    </Card>
  );
};

export default MaasinMapWidget;
