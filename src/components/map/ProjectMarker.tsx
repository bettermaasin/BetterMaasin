import { FC } from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import {
  Waves,
  Calendar,
  MapPin,
  Building2,
  Banknote,
  FileText,
  Database,
  ExternalLink,
  HardHat,
} from 'lucide-react';

interface FloodControlProject {
  GlobalID?: string;
  objectID?: string;
  ProjectDescription?: string;
  InfraYear?: string;
  Municipality?: string;
  TypeofWork?: string;
  Contractor?: string;
  ContractCost?: string;
  ContractID?: string;
  Latitude?: string;
  Longitude?: string;
}

interface ProjectMarkerProps {
  project: FloodControlProject;
  icon: L.Icon;
}

const sumbongUrl = 'https://sumbongsapangulo.ph/flood-control-map/';

const fallback = (value?: string | number): string => {
  if (value === undefined || value === null) return 'Not available';
  const str = String(value).trim();
  return str !== '' ? str : 'Not available';
};

const formatCost = (value?: string | number): string => {
  if (value === undefined || value === null) return 'Not available';
  const num = Number(value);
  return isNaN(num) ? 'Not available' : `₱${num.toLocaleString()}`;
};

const ProjectMarker: FC<ProjectMarkerProps> = ({ project, icon }) => {
  const lat = parseFloat(project.Latitude!);
  const lng = parseFloat(project.Longitude!);
  const description = fallback(project.ProjectDescription);
  const typeOfWork = fallback(project.TypeofWork);
  const cost = formatCost(project.ContractCost);
  const contractId = fallback(project.ContractID);

  const rows = [
    { icon: Calendar, label: 'Year', value: fallback(project.InfraYear) },
    {
      icon: MapPin,
      label: 'Municipality',
      value: fallback(project.Municipality),
    },
    {
      icon: Building2,
      label: 'Contractor',
      value: fallback(project.Contractor),
    },
    {
      icon: Banknote,
      label: 'Cost',
      value: cost,
      valueClass: 'font-semibold text-primary-700',
    },
    {
      icon: FileText,
      label: 'Contract ID',
      value: contractId,
      valueClass: 'break-all font-mono text-xs font-medium text-primary-700',
      mono: true,
    },
  ];

  return (
    <Marker position={[lat, lng]} icon={icon}>
      <Popup>
        <div
          className='w-[330px] overflow-hidden rounded-lg'
          aria-label='Flood control project details'
        >
          {/* Colored header */}
          <div className='bg-primary-500 px-3.5 py-2'>
            <p className='flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/85'>
              <Waves className='h-3.5 w-3.5' />
              Flood Control Project
            </p>
            <h3 className='mt-0.5 text-[14px] font-bold leading-snug text-white'>
              {description}
            </h3>
          </div>

          <div className='bg-white px-3.5 py-2.5'>
            {/* Type of work badge */}
            <span className='inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700'>
              <HardHat className='h-3.5 w-3.5' />
              {typeOfWork}
            </span>

            {/* Compact details list */}
            <ul className='mt-2 space-y-1'>
              {rows.map(({ icon: Icon, label, value, valueClass, mono }) => (
                <li
                  key={label}
                  className='flex items-baseline gap-1.5 text-[13px]'
                >
                  <Icon className='h-3.5 w-3.5 shrink-0 self-center text-primary-500' />
                  <span className='shrink-0 text-[11px] font-medium uppercase tracking-wide text-gray-500'>
                    {label}
                  </span>
                  <span
                    className={`min-w-0 text-gray-900 ${mono ? 'font-mono' : 'font-medium'} ${valueClass ?? ''}`}
                  >
                    {value}
                  </span>
                </li>
              ))}
            </ul>

            {/* Source footer */}
            <div className='mt-2.5 border-t border-gray-100 pt-1.5'>
              <div className='flex items-center gap-1.5 text-xs leading-snug text-gray-600'>
                <Database className='h-3.5 w-3.5 shrink-0 text-primary-500' />
                <span>
                  Source:{' '}
                  <span className='font-medium text-gray-700'>
                    DPWH Flood Control Information System (FCIS)
                  </span>
                </span>
              </div>
              <a
                href={sumbongUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='mt-2 flex w-full items-center justify-center gap-1.5 rounded-md bg-primary-100 px-2 py-1.5 text-primary text-xs font-semibold transition-colors hover:bg-primary-600'
                aria-label='Open the DPWH ArcGIS flood control map'
              >
                <ExternalLink className='h-3.5 w-3.5' />
                Open DPWH ArcGIS flood control map
              </a>
            </div>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default ProjectMarker;
export type { FloodControlProject };
