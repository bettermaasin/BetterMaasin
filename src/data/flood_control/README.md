# Flood Control Projects Dashboard

This directory contains data and scripts for the Flood Control Projects Dashboard, which visualizes flood control infrastructure projects in Maasin City, Southern Leyte.

## Data Structure

The main data source is a large JSON file (`flood_control.json`) containing detailed information about flood control projects across the whole Philippines. The data has been processed to extract lookup values for key fields, which are stored in the `lookups` directory. Only projects from Maasin City, Southern Leyte are retained for the dashboard.

### Lookup Data Files

The following lookup files are available in the `lookups` directory:

- `InfraYear.json` / `InfraYear_with_counts.json`: Infrastructure years with project counts
- `Contractor.json` / `Contractor_with_counts.json`: Contractors with project counts
- `TypeofWork.json` / `TypeofWork_with_counts.json`: Types of work with project counts
- `Projects_Cost_UniqueContractors_Summary.json`: Precomputed totals for the dashboard (total projects, total cost, unique contractors)

Each `*_with_counts.json` file contains an array of objects with `value` and `count` properties, where `count` represents the number of projects for that value.

## Data Processing Scripts

- `extract_lookups_jsonstream.js`: The final extraction script that uses JSONStream to efficiently parse the large JSON file and extract lookup data with counts
- The same script also generates `lookups/Projects_Cost_UniqueContractors_Summary.json` with overall totals for the dashboard
- Other extraction scripts show the evolution of the data processing approach

## Meilisearch Integration

The flood control data is indexed in Meilisearch for efficient searching. The index name is `bettergov_flood_control`.

### Indexing Script

The script `scripts/index_flood_control_arcgis.js` is used to index the flood control data in Meilisearch. It processes the large JSON file and indexes each project with appropriate attributes for searching and filtering. The script filters to Maasin City (Southern Leyte) projects only, so the index contains Maasin data exclusively.

### Searchable Attributes

- ProjectDescription
- Municipality
- ContractID
- ProjectID
- Contractor

### Filterable Attributes

- Municipality
- StartDate
- CompletionDateActual
- FundingYear
- TypeofWork
- Contractor
- GlobalID

## Dashboard Features

The flood control projects dashboard (`/flood-control-projects`) provides:

1. Interactive visualizations of project data:
   - Projects by year (bar chart)
   - Distribution by type of work (pie chart)
   - Top contractors (bar chart)

2. Filtering capabilities for:
   - Infrastructure Year
   - Type of Work
   - Contractor

3. Search functionality using Meilisearch to find specific projects

4. Summary statistics showing key metrics about the flood control projects

## Data Source

The data is sourced from the Department of Public Works and Highways (DPWH) Flood Control Information System.
