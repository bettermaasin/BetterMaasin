// src/hooks/useFloodControlSearch.ts
// Client-side replacement for the Meilisearch-powered flood control search.
// Loads the pre-built Maasin-only dataset and filters it in-memory, so the
// flood control pages work on fully static hosting (no backend needed).
import { useMemo } from 'react';
import floodControlData from '../data/flood_control/maasin_flood_control.json';

export interface FloodControlRecord {
  GlobalID?: string;
  ProjectDescription?: string;
  InfraYear?: string | number;
  Region?: string;
  Province?: string;
  Municipality?: string;
  TypeofWork?: string;
  Contractor?: string;
  ContractCost?: string | number;
  DistrictEngineeringOffice?: string;
  LegislativeDistrict?: string;
  ContractID?: string;
  ProjectID?: string;
  FundingYear?: string;
  Latitude?: string | number;
  Longitude?: string | number;
  slug?: string;
  type?: string;
  [key: string]: unknown;
}

export interface FloodControlFilters {
  InfraYear: string;
  TypeofWork: string;
  Contractor: string;
}

export interface FloodControlSearchOptions {
  query?: string;
  filters?: FloodControlFilters;
}

export interface FloodControlSearchResult {
  hits: FloodControlRecord[];
  results: { nbHits: number } | null;
}

const data = floodControlData as FloodControlRecord[];

const SEARCH_FIELDS = [
  'ProjectDescription',
  'Contractor',
  'ContractID',
  'ProjectID',
  'TypeofWork',
];

function matchesQuery(record: FloodControlRecord, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return SEARCH_FIELDS.some(field => {
    const value = record[field];
    return value != null && String(value).toLowerCase().includes(q);
  });
}

function matchesFilters(
  record: FloodControlRecord,
  filters?: FloodControlFilters
): boolean {
  if (!filters) return true;

  if (filters.InfraYear && filters.InfraYear.trim()) {
    const infraMatches =
      record.InfraYear != null &&
      String(record.InfraYear) === filters.InfraYear.trim();
    const fundingMatches = record.FundingYear === filters.InfraYear.trim();
    if (!infraMatches && !fundingMatches) return false;
  }

  if (filters.TypeofWork && filters.TypeofWork.trim()) {
    if (record.TypeofWork !== filters.TypeofWork.trim()) return false;
  }

  if (filters.Contractor && filters.Contractor.trim()) {
    if (record.Contractor !== filters.Contractor.trim()) return false;
  }

  return true;
}

export function useFloodControlSearch(
  options: FloodControlSearchOptions = {}
): FloodControlSearchResult {
  const { query = '', filters } = options;

  return useMemo(() => {
    const hits = data.filter(
      record => matchesQuery(record, query) && matchesFilters(record, filters)
    );
    return { hits, results: { nbHits: hits.length } };
  }, [query, filters]);
}
