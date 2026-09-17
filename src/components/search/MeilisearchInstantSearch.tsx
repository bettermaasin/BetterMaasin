import { useState, useEffect, useRef, FC } from 'react';
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  Snippet,
  Configure,
  Stats,
} from 'react-instantsearch';
import { Link } from 'react-router-dom';
import 'instantsearch.css/themes/satellite.css';
import './MeilisearchInstantSearch.css';
import { searchClient } from '../../lib/meilisearch';

interface SearchHit {
  objectID: string;
  name?: string;
  office_name?: string;
  office?: string;
  service?: string;
  description?: string;
  website?: string;
  url?: string;
  category?: string | { name: string };
  subcategory?: string | { name: string };
  address?: string;
  slug?: string;
}

interface HitProps {
  hit: {
    name?: string;
    office_name?: string;
    office?: string;
    service?: string;
    website?: string;
    category?:
      | string
      | {
          name: string;
          slug: string;
        };
    address?: string;
    subcategory?:
      | string
      | {
          name: string;
          slug: string;
        };
    description?: string;
    slug?: string;
    url?: string;
  };
}

const Hit: FC<HitProps> = ({ hit }) => {
  const title = hit.service || hit.name || hit.office_name || hit.office;
  const link = hit.url || `/directory/${hit.slug}`;

  return (
    <article className='hit-item p-4 border-b border-gray-200 hover:bg-gray-50'>
      <a
        href={link}
        target='_blank'
        rel='noopener noreferrer'
        className='block'
      >
        <h2 className='text-lg font-semibold text-blue-600 hover:underline'>
          {title}
        </h2>
        {hit.description && (
          <p className='text-sm text-gray-800 mt-1'>
            <Snippet attribute='description' hit={hit as SearchHit} />
          </p>
        )}
        <div className='text-xs text-gray-800'>
          {hit.category && (
            <span>
              <Highlight
                attribute={hit.category?.name ? 'category.name' : 'category'}
                hit={hit as SearchHit}
              />
              {' > '}
            </span>
          )}
          {hit.subcategory && (
            <span>
              <Highlight
                attribute={
                  hit.subcategory?.name ? 'subcategory.name' : 'subcategory'
                }
                hit={hit as SearchHit}
              />{' '}
            </span>
          )}
          {hit.address && (
            <span>
              <Highlight attribute='address' hit={hit as SearchHit} />
              {' > '}
            </span>
          )}
        </div>
        {(hit.url || hit.website) && (
          <p className='text-xs text-blue-500 mt-1 truncate'>
            {hit.url || hit.website}
          </p>
        )}
      </a>
    </article>
  );
};

const MeiliSearchActive: FC = () => {
  const [hasInteracted, setHasInteracted] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setHasInteracted(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setHasInteracted(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [setHasInteracted]);

  return (
    <InstantSearch
      searchClient={searchClient!}
      indexName='bettergov'
      initialUiState={{
        bettergov: {
          query: undefined,
          hitsPerPage: 4,
        },
      }}
    >
      <Configure hitsPerPage={10} />
      <div className='ais-InstantSearch rounded-lg'>
        <div className='mb-2 w-full' ref={searchContainerRef}>
          <SearchBox
            placeholder='Search for services, directory items...'
            className='w-full'
            onFocus={() => setHasInteracted(true)}
            classNames={{
              root: 'mb-2',
              form: 'relative',
              input:
                'w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-hidden transition duration-150 ease-in-out placeholder:text-gray-500',
              submit:
                'absolute top-0 right-0 h-full px-3 text-gray-800 hover:text-blue-600',
              reset:
                'absolute top-0 right-8 h-full px-3 text-gray-400 hover:text-gray-800',
            }}
          />

          {hasInteracted && (
            <div className='bg-white rounded-lg shadow-sm overflow-y-scroll h-96 absolute z-30 w-[calc(100%-2rem)] max-w-[calc(100%-4rem)] lg:w-1/2'>
              <Stats
                classNames={{
                  root: 'text-sm text-gray-800 p-2 text-right text-xs',
                }}
              />
              <Hits
                hitComponent={Hit}
                className='w-full'
                classNames={{
                  list: 'w-full p-0',
                  item: 'w-full  py-0 px-0 border-none',
                }}
              />
            </div>
          )}
        </div>
      </div>
    </InstantSearch>
  );
};

const SearchDisabledNotice: FC = () => (
  <div className='rounded-lg bg-gray-900/70 backdrop-blur-sm border border-white/10 p-5'>
    <p className='text-gray-100 font-medium'>
      Search is temporarily unavailable.
    </p>
    <p className='text-sm text-gray-300 mt-1'>
      Browse{' '}
      <Link to='/services' className='text-primary-300 underline'>
        government services
      </Link>{' '}
      or the{' '}
      <Link to='/sitemap' className='text-primary-300 underline'>
        site map
      </Link>{' '}
      instead.
    </p>
  </div>
);

const MeilisearchInstantSearch: FC = () =>
  searchClient ? <MeiliSearchActive /> : <SearchDisabledNotice />;

export default MeilisearchInstantSearch;
