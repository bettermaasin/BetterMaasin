import { cacheGet, cacheSet } from './cache';

export interface MaasinCensusEntry {
  year: number;
  population: number;
}

export interface MaasinOverviewData {
  population: number | null;
  populationYear: number | null;
  areaKm2: number | null;
  elevationM: number | null;
  latitude: number | null;
  longitude: number | null;
  inception: number | null;
  cityhood: string | null;
  officialName: string | null;
  postalCode: string | null;
  dialingCode: string | null;
  households: number | null;
  electorate: number | null;
  climate: string | null;
  languages: string[];
  incomeClass: string | null;
  capitalOf: string | null;
  electoralDistrict: string | null;
  povertyRate: number | null;
  povertyYear: number | null;
  censusHistory: MaasinCensusEntry[];
}

interface WikidataClaim {
  mainsnak?: {
    datavalue?: {
      value?:
        | string
        | number
        | { amount?: string; unit?: string }
        | { latitude?: number; longitude?: number }
        | { time?: string }
        | { text?: string; language?: string }
        | { id?: string }
        | null;
    } | null;
  };
  qualifiers?: {
    P585?: { datavalue?: { value?: { time?: string } | null } | null }[];
  };
}

const WIKIDATA_ITEM_ID = 'Q1025387';

const CITYHOOD = '2000-08-10';

const PROP = {
  POPULATION: 'P1082',
  AREA: 'P2046',
  ELEVATION: 'P2044',
  COORDINATES: 'P625',
  INCEPTION: 'P571',
  OFFICIAL_NAME: 'P1448',
  POSTAL_CODE: 'P281',
  DIALING_CODE: 'P473',
  HOUSEHOLDS: 'P1538',
  ELECTORATE: 'P1831',
  CLIMATE: 'P2564',
  LANGUAGES: 'P2936',
  INCOME_CLASS: 'P1879',
  CAPITAL_OF: 'P1376',
  POVERTY_RATE: 'P8843',
  ELECTORAL_DISTRICT: 'P7938',
} as const;

const CACHE_KEY = 'maasinOverview:v3';
const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function getSource() {
  return `https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${WIKIDATA_ITEM_ID}&props=claims&format=json&formatversion=2&origin=*`;
}

function parseYear(time?: string): number | null {
  if (!time) return null;
  const match = time.match(/^[+-](\d{4})/);
  return match ? Number(match[1]) : null;
}

function amountToNumber(amount?: unknown): number | null {
  if (typeof amount !== 'string') return null;
  const n = Number(amount);
  return isNaN(n) ? null : n;
}

function claimValueToNumber(value: unknown): number | null {
  if (!value) return null;
  if (typeof value === 'string') return amountToNumber(value);
  if (typeof value === 'number') return value;
  if (typeof value === 'object' && !Array.isArray(value)) {
    return amountToNumber((value as { amount?: string }).amount);
  }
  return null;
}

function claimValueToId(value: unknown): string | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const id = (value as { id?: string }).id;
  return typeof id === 'string' ? id : null;
}

function claimYear(claim: WikidataClaim): number | null {
  return parseYear(claim.qualifiers?.P585?.[0]?.datavalue?.value?.time);
}

function latestClaimByYear(
  claims: WikidataClaim[] | undefined,
  pick: (claim: WikidataClaim) => number | null
): number | null {
  if (!claims || claims.length === 0) return null;
  const withYear = claims
    .map(claim => ({ year: claimYear(claim), value: pick(claim) }))
    .filter(item => item.value != null);
  if (withYear.length === 0) return null;

  const dated = withYear.filter(item => item.year != null);
  const source = dated.length > 0 ? dated : withYear;
  source.sort((a, b) => (a.year ?? 0) - (b.year ?? 0));
  return source[source.length - 1].value;
}

function claimAmount(
  claims: Record<string, WikidataClaim[]>,
  prop: keyof typeof PROP
): number | null {
  const value = claims[PROP[prop]]?.[0]?.mainsnak?.datavalue?.value;
  return claimValueToNumber(value);
}

function collectEntityIds(
  claims: Record<string, WikidataClaim[]>,
  props: (keyof typeof PROP)[]
): string[] {
  const ids = new Set<string>();
  for (const prop of props) {
    for (const claim of claims[PROP[prop]] || []) {
      const id = claimValueToId(claim.mainsnak?.datavalue?.value);
      if (id) ids.add(id);
    }
  }
  return Array.from(ids);
}

async function resolveEntityLabels(
  ids: string[]
): Promise<Map<string, string>> {
  const labels = new Map<string, string>();
  if (ids.length === 0) return labels;
  try {
    const url = `https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${ids.join(
      '%7C'
    )}&props=labels&languages=en&format=json&formatversion=2&origin=*`;
    const response = await fetch(url);
    if (!response.ok) return labels;
    const data = await response.json();
    for (const id of ids) {
      const label = data?.entities?.[id]?.labels?.en?.value;
      if (typeof label === 'string') labels.set(id, label);
    }
  } catch {
    // fallback
  }
  return labels;
}

export async function fetchMaasinOverview(): Promise<MaasinOverviewData> {
  const cached = cacheGet<MaasinOverviewData>(CACHE_KEY);
  if (cached) return cached;

  const response = await fetch(getSource());
  if (!response.ok) {
    throw new Error(`Wikidata request failed: ${response.status}`);
  }

  const data = await response.json();
  const entity = data?.entities?.[WIKIDATA_ITEM_ID];
  const claims: Record<string, WikidataClaim[]> | undefined = entity?.claims;

  if (!claims) {
    throw new Error('Wikidata entity not found');
  }

  const populations: MaasinCensusEntry[] = (claims[PROP.POPULATION] || [])
    .map(claim => {
      const year = parseYear(
        claim.qualifiers?.P585?.[0]?.datavalue?.value?.time
      );
      const population = claimValueToNumber(claim.mainsnak?.datavalue?.value);
      return {
        year: year ?? 0,
        population: population ?? 0,
      };
    })
    .filter(entry => entry.year > 0 && entry.population > 0)
    .sort((a, b) => a.year - b.year);

  const latest =
    populations.length > 0 ? populations[populations.length - 1] : null;

  const coords = claims[PROP.COORDINATES]?.[0]?.mainsnak?.datavalue?.value;
  const coordsObj = coords && typeof coords === 'object' ? coords : null;
  const latitude =
    coordsObj &&
    'latitude' in coordsObj &&
    typeof coordsObj.latitude === 'number'
      ? coordsObj.latitude
      : null;
  const longitude =
    coordsObj &&
    'longitude' in coordsObj &&
    typeof coordsObj.longitude === 'number'
      ? coordsObj.longitude
      : null;

  const officialNameClaim =
    claims[PROP.OFFICIAL_NAME]?.[0]?.mainsnak?.datavalue?.value;
  const officialName =
    officialNameClaim &&
    typeof officialNameClaim === 'object' &&
    'text' in officialNameClaim
      ? (officialNameClaim.text ?? null)
      : null;

  const postalClaim = claims[PROP.POSTAL_CODE]?.[0]?.mainsnak?.datavalue?.value;
  const postalCode = typeof postalClaim === 'string' ? postalClaim : null;

  const dialingClaim =
    claims[PROP.DIALING_CODE]?.[0]?.mainsnak?.datavalue?.value;
  const dialingCode = typeof dialingClaim === 'string' ? dialingClaim : null;

  const households = latestClaimByYear(claims[PROP.HOUSEHOLDS], claim =>
    claimValueToNumber(claim.mainsnak?.datavalue?.value)
  );
  const electorate = latestClaimByYear(claims[PROP.ELECTORATE], claim =>
    claimValueToNumber(claim.mainsnak?.datavalue?.value)
  );

  const povertyClaims = (claims[PROP.POVERTY_RATE] || [])
    .map(claim => ({
      year: claimYear(claim) ?? 0,
      rate: claimValueToNumber(claim.mainsnak?.datavalue?.value) ?? 0,
    }))
    .filter(item => item.rate > 0)
    .sort((a, b) => a.year - b.year);
  const latestPoverty =
    povertyClaims.length > 0 ? povertyClaims[povertyClaims.length - 1] : null;

  const entityIds = collectEntityIds(claims, [
    'LANGUAGES',
    'CLIMATE',
    'INCOME_CLASS',
    'CAPITAL_OF',
    'ELECTORAL_DISTRICT',
  ]);
  const labels = await resolveEntityLabels(entityIds);

  const languageIds = (claims[PROP.LANGUAGES] || [])
    .map(claim => claimValueToId(claim.mainsnak?.datavalue?.value))
    .filter((id): id is string => Boolean(id));

  const result: MaasinOverviewData = {
    population: latest?.population ?? null,
    populationYear: latest?.year ?? null,
    areaKm2: claimAmount(claims, 'AREA'),
    elevationM: claimAmount(claims, 'ELEVATION'),
    latitude,
    longitude,
    inception: parseYear(
      (
        claims[PROP.INCEPTION]?.[0]?.mainsnak?.datavalue?.value as {
          time?: string;
        } | null
      )?.time
    ),
    cityhood: CITYHOOD,
    officialName,
    postalCode,
    dialingCode,
    households: households || null,
    electorate: electorate || null,
    climate:
      labels.get(
        claimValueToId(claims[PROP.CLIMATE]?.[0]?.mainsnak?.datavalue?.value) ??
          ''
      ) ?? null,
    languages: languageIds
      .map(id => labels.get(id))
      .filter((name): name is string => Boolean(name)),
    incomeClass:
      labels.get(
        claimValueToId(
          claims[PROP.INCOME_CLASS]?.[0]?.mainsnak?.datavalue?.value
        ) ?? ''
      ) ?? null,
    capitalOf:
      labels.get(
        claimValueToId(
          claims[PROP.CAPITAL_OF]?.[0]?.mainsnak?.datavalue?.value
        ) ?? ''
      ) ?? null,
    electoralDistrict:
      labels.get(
        claimValueToId(
          claims[PROP.ELECTORAL_DISTRICT]?.[0]?.mainsnak?.datavalue?.value
        ) ?? ''
      ) ?? null,
    povertyRate: latestPoverty?.rate ?? null,
    povertyYear: latestPoverty?.year ?? null,
    censusHistory: populations,
  };

  cacheSet(CACHE_KEY, result, CACHE_TTL_MS);
  return result;
}
