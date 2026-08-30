// Define types (copied from shared-components.tsx)
export type FilterState = {
  InfraYear: string;
  TypeofWork: string;
  Contractor: string;
};

// Utility function to build filter string
export const buildFilterString = (filters: FilterState): string => {
  // Start with an empty array - we'll add filters as needed
  const filterStrings: string[] = [];

  // Always filter by type
  filterStrings.push('type = "flood_control"');

  if (filters.InfraYear && filters.InfraYear.trim()) {
    filterStrings.push(`FundingYear = ${filters.InfraYear.trim()}`);
  }

  if (filters.TypeofWork && filters.TypeofWork.trim()) {
    filterStrings.push(`TypeofWork = "${filters.TypeofWork.trim()}"`);
  }

  if (filters.Contractor && filters.Contractor.trim()) {
    filterStrings.push(`Contractor = "${filters.Contractor.trim()}"`);
  }

  return filterStrings.join(' AND ');
};

export const generateUrlParams = (newFilters: FilterState): URLSearchParams => {
  const keyMap: Record<keyof FilterState, string> = {
    InfraYear: 'year',
    TypeofWork: 'typeOfWork',
    Contractor: 'contractor',
  };

  const newParams = new URLSearchParams();
  (Object.keys(newFilters) as Array<keyof FilterState>).forEach(key => {
    const urlKey = keyMap[key];
    const filterValue = newFilters[key];

    // Only set the parameter if the value is not an empty string
    if (filterValue) {
      newParams.set(urlKey, filterValue);
    }
  });

  return newParams;
};
