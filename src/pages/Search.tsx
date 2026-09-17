import { FC } from 'react';
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  Snippet,
  Stats,
  RefinementList,
  Pagination,
} from 'react-instantsearch';
import 'instantsearch.css/themes/satellite.css';
import '../components/search/MeilisearchInstantSearch.css';
import { Helmet } from 'react-helmet-async';
import { useLocation, Link } from 'react-router-dom';
import { searchClient } from '../lib/meilisearch';

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
  type?: string;
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
    type?: string;
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
          {hit.type && (
            <span className='bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-sm ml-2'>
              {hit.type}
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

const SearchActive: FC<{ focusSearch: boolean }> = ({ focusSearch }) => (
  <InstantSearch searchClient={searchClient!} indexName='bettergov'>
    <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
      <div className='lg:col-span-1'>
        <div className='bg-white rounded-lg shadow-sm p-4 mb-6'>
          <h3 className='text-lg font-semibold mb-4'>Filter By</h3>

          <div className='mb-6'>
            <h4 className='font-medium mb-3'>Type</h4>
            <RefinementList
              attribute='type'
              classNames={{
                root: '',
                list: 'space-y-2',
                item: '',
                label: '',
                checkbox: '',
                count:
                  'ml-2 text-xs text-gray-800 bg-gray-100 px-2 py-0.5 rounded-full',
              }}
            />
          </div>

          <div className='mb-6'>
            <h4 className='font-medium mb-3'>Category</h4>
            <RefinementList
              attribute='category'
              classNames={{
                root: '',
                list: 'space-y-2',
                item: '',
                label: '',
                checkbox: '',
                count:
                  'ml-2 text-xs text-gray-800 bg-gray-100 px-2 py-0.5 rounded-full',
              }}
            />
          </div>

          <div>
            <h4 className='font-medium mb-3'>Subcategory</h4>
            <RefinementList
              attribute='subcategory'
              classNames={{
                root: '',
                list: 'space-y-2',
                item: '',
                label: '',
                checkbox: '',
                count:
                  'ml-2 text-xs text-gray-800 bg-gray-100 px-2 py-0.5 rounded-full',
              }}
            />
          </div>
        </div>
      </div>

      <div className='lg:col-span-3'>
        <div className='mb-6'>
          <SearchBox
            placeholder='Search for government services, offices, and resources...'
            autoFocus={focusSearch}
            classNames={{
              root: 'w-full',
              form: 'relative',
              input:
                'text-lg w-full p-4 pl-12 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-hidden transition duration-150 ease-in-out',
              submit:
                'absolute top-0 right-0 h-full px-4 text-gray-800 hover:text-blue-600',
              reset:
                'absolute top-0 right-10 h-full px-3 text-gray-400 hover:text-gray-800',
            }}
          />
        </div>

        <div className='bg-white rounded-lg shadow-sm overflow-hidden'>
          <div className='p-4 border-b border-gray-200 flex justify-between items-center'>
            <h2 className='text-xl font-semibold'>Results</h2>
            <Stats
              classNames={{
                root: 'text-sm text-gray-800',
              }}
            />
          </div>

          <div>
            <Hits
              hitComponent={Hit}
              classNames={{
                list: 'divide-y divide-gray-200',
                item: 'w-full',
              }}
            />
          </div>

          <div className='p-4 border-t border-gray-200'>
            <Pagination
              className='text-black'
              classNames={{
                root: 'flex justify-center',
                list: 'flex items-center space-x-1',
                item: 'px-1',
                link: 'px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors',
                disabledItem: 'opacity-50 cursor-not-allowed',
                selectedItem: 'text-black',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  </InstantSearch>
);

const SearchPage: FC = () => {
  const location = useLocation();
  const focusSearch =
    (location.state as { focusSearch?: boolean } | null)?.focusSearch ?? false;

  return (
    <div className='container mx-auto px-4 py-8'>
      <Helmet>
        <title>Search - Better Government Portal</title>
        <meta
          name='description'
          content='Search for government services and resources'
        />
      </Helmet>

      <h1 className='text-3xl font-bold mb-6'>Search</h1>

      {searchClient ? (
        <SearchActive focusSearch={focusSearch} />
      ) : (
        <div className='bg-white rounded-xl shadow-sm p-8 max-w-xl'>
          <p className='text-lg font-medium text-gray-900'>
            Search is temporarily unavailable.
          </p>
          <p className='mt-2 text-gray-600'>
            You can browse{' '}
            <Link
              to='/services'
              className='font-medium text-primary-600 hover:underline'
            >
              government services
            </Link>
            , check the{' '}
            <Link
              to='/sitemap'
              className='font-medium text-primary-600 hover:underline'
            >
              site map
            </Link>
            , or use the navigation menu to find what you need.
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
