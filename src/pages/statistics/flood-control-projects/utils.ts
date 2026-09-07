// Define types (copied from shared-components.tsx)
export type FilterState = {
  InfraYear: string;
  TypeofWork: string;
  Contractor: string;
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
