import { useState, useEffect, useMemo, useRef, FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { useFloodControlSearch } from '../../../hooks/useFloodControlSearch';
import { exportToCSV } from '../../../lib/exportData';
import { DownloadIcon, InfoIcon, ZoomInIcon, ZoomOutIcon } from 'lucide-react';
import Button from '../../../components/ui/Button';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-cluster/dist/assets/MarkerCluster.css';
import 'react-leaflet-cluster/dist/assets/MarkerCluster.Default.css';
import FloodControlProjectsTab from './tab';
import ProjectMarker from '../../../components/map/ProjectMarker';
import maasinBoundary from '../../../data/flood_control/maasin_boundary.json';

// Define types for our data
interface FloodControlProject {
  GlobalID?: string;
  objectID?: string;
  ProjectDescription?: string;
  InfraYear?: string;
  Region?: string;
  Province?: string;
  Municipality?: string;
  TypeofWork?: string;
  Contractor?: string;
  ContractCost?: string;
  Latitude?: string;
  Longitude?: string;
}

const FloodControlProjectsMap: FC = () => {
  // Loading state for export
  const [isExporting, setIsExporting] = useState<boolean>(false);

  // Map states
  const [mapProjects, setMapProjects] = useState<FloodControlProject[]>([]);
  const mapRef = useRef<L.Map>(null);

  const initialCenter: LatLngExpression = [10.133, 124.844]; // Maasin City, Southern Leyte
  const initialZoom = 12;

  // Client-side hits for the map (no filters — show all Maasin projects)
  const { hits } = useFloodControlSearch();

  useEffect(() => {
    setMapProjects(hits as FloodControlProject[]);
  }, [hits]);

  // Export data function
  const handleExportData = async () => {
    // Set loading state
    setIsExporting(true);

    try {
      if (hits.length === 0) {
        alert('No data to export.');
        return;
      }
      exportToCSV(
        hits as Record<string, unknown>[],
        'flood-control-projects-map'
      );
      alert('Data exported successfully!');
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Failed to export data. Please try again.');
    } finally {
      // Reset loading state
      setIsExporting(false);
    }
  };

  // filteredProjects is just the mapProjects returned from the search
  const filteredProjects = mapProjects;

  // Memoize valid projects and marker rendering
  const { validProjects, shouldCluster, markerIcon } = useMemo(() => {
    const valid = filteredProjects.filter((project: FloodControlProject) => {
      if (!project.Latitude || !project.Longitude) return false;
      const lat = parseFloat(project.Latitude);
      const lng = parseFloat(project.Longitude);
      return !isNaN(lat) && !isNaN(lng);
    });

    const icon = L.icon({
      iconUrl: '/marker-icon-2x.webp',
      iconSize: [16, 24],
      iconAnchor: [8, 8],
      popupAnchor: [0, -25],
    });

    return {
      validProjects: valid,
      shouldCluster: valid.length > 10,
      markerIcon: icon,
    };
  }, [filteredProjects]);

  const handleZoomIn = () => mapRef.current?.zoomIn();
  const handleZoomOut = () => mapRef.current?.zoomOut();

  return (
    <div className='min-h-screen bg-gray-50'>
      <Helmet>
        <title>Flood Control Projects Map | BetterGov.ph</title>
        <meta
          name='description'
          content='Explore flood control projects on an interactive map'
        />
      </Helmet>

      {/* Simplified layout with minimal filters */}
      <div className='container mx-auto px-4 py-8'>
        <div className='flex flex-col gap-6'>
          {/* Page header */}
          <div className='flex justify-between items-center'>
            <h1 className='text-2xl font-bold text-gray-900'>
              Flood Control Projects Map
            </h1>
            <Button
              variant='outline'
              leftIcon={
                isExporting ? null : <DownloadIcon className='w-4 h-4' />
              }
              onClick={handleExportData}
              disabled={isExporting}
              className='cursor-pointer'
            >
              {isExporting ? 'Exporting...' : 'Export Data'}
            </Button>
          </div>

          {/* View Tabs */}
          <FloodControlProjectsTab selectedTab='map' />

          {/* Map View */}
          <div className='bg-white rounded-lg shadow-md p-4'>
            <div className='h-[700px] relative'>
              <MapContainer
                center={initialCenter}
                zoom={initialZoom}
                style={{ height: '100%', width: '100%' }}
                className='z-0'
                ref={mapRef}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />

                {/* Maasin City boundary */}
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

                {/* Show project markers */}
                {validProjects.length > 0 &&
                  (shouldCluster ? (
                    <MarkerClusterGroup
                      chunkedLoading
                      spiderfyOnMaxZoom={true}
                      showCoverageOnHover={false}
                      zoomToBoundsOnClick={true}
                    >
                      {validProjects.map((project: FloodControlProject) => (
                        <ProjectMarker
                          key={project.GlobalID || project.objectID}
                          project={project}
                          icon={markerIcon}
                        />
                      ))}
                    </MarkerClusterGroup>
                  ) : (
                    validProjects.map((project: FloodControlProject) => (
                      <ProjectMarker
                        key={project.GlobalID || project.objectID}
                        project={project}
                        icon={markerIcon}
                      />
                    ))
                  ))}
              </MapContainer>

              {/* Zoom Controls */}
              <div className='absolute top-4 right-4 z-10 flex flex-col gap-2'>
                <Button
                  variant='primary'
                  size='sm'
                  onClick={handleZoomIn}
                  aria-label='Zoom in'
                >
                  <ZoomInIcon className='h-4 w-4' />
                </Button>
                <Button
                  variant='primary'
                  size='sm'
                  onClick={handleZoomOut}
                  aria-label='Zoom out'
                >
                  <ZoomOutIcon className='h-4 w-4' />
                </Button>
              </div>
            </div>
          </div>

          {/* Data Source Information */}
          <div className='bg-white rounded-lg shadow-md p-4'>
            <div className='flex items-center mb-4'>
              <InfoIcon className='w-5 h-5 text-blue-600 mr-2' />
              <h2 className='text-lg font-semibold text-gray-800'>
                About This Data
              </h2>
            </div>
            <p className='text-gray-800 mb-4'>
              This map displays flood control infrastructure projects in Maasin
              City, Southern Leyte. Click on the markers to view project
              details. You can also use the filters to narrow down projects by
              year, type of work, and contractor.
            </p>
            <p className='text-sm text-gray-800'>
              Source: Department of Public Works and Highways (DPWH) Flood
              Control Information System
            </p>
            <p className='text-xs text-gray-800 mt-1'>
              City boundary: 2023 GADM-derived barangays via{' '}
              <a
                href='https://github.com/faeldon/philippines-json-maps/tree/master/2023/geojson/municities/medres'
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-600 underline'
              >
                faeldon/philippines-json-maps
              </a>{' '}
              (MIT)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloodControlProjectsMap;
