import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';

const HOST = import.meta.env.VITE_MEILISEARCH_HOST as string | undefined;
const PORT = import.meta.env.VITE_MEILISEARCH_PORT || '7700';
const SEARCH_API_KEY =
  (import.meta.env.VITE_MEILISEARCH_SEARCH_API_KEY as string | undefined) ||
  'your_public_search_key_here';

function isPrivateNetworkHost(host: string): boolean {
  try {
    const hostname = new URL(host).hostname.toLowerCase();
    if (
      hostname === 'localhost' ||
      hostname === '0.0.0.0' ||
      hostname === '::1' ||
      hostname.endsWith('.local')
    ) {
      return true;
    }
    return (
      /^127\./.test(hostname) ||
      /^10\./.test(hostname) ||
      /^192\.168\./.test(hostname) ||
      /^172\.(1[6-9]|2\d|3[01])\./.test(hostname) ||
      // Bare IPv4/IPv6 literals are almost never a public search host in practice.
      /^(\d{1,3}\.){3}\d{1,3}$/.test(hostname)
    );
  } catch {
    return true;
  }
}

const searchEnabled = Boolean(HOST && !isPrivateNetworkHost(HOST));

const searchClient = searchEnabled
  ? instantMeiliSearch(`${HOST}:${PORT}`, SEARCH_API_KEY, {
      primaryKey: 'slug',
      keepZeroFacets: true,
      meiliSearchParams: {
        attributesToHighlight: [
          'name',
          'office_name',
          'office',
          'service',
          'description',
        ],
        attributesToSearchOn: [
          'name',
          'office_name',
          'office',
          'service',
          'website',
          'description',
          'category',
          'subcategory',
          'address',
        ],
      },
    })
  : null;

export { searchClient, searchEnabled };
