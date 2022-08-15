import { GridFilterModel, GridSortModel } from '@mui/x-data-grid-premium';

export class GetDocsInput {
  filterModel: GridFilterModel;
  sortModel: GridSortModel;
  page: number;
  pageSize: number;
}
