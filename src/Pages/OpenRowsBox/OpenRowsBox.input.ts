import { GridFilterModel, GridSortModel } from '@mui/x-data-grid-premium';

export class OpenRowsBoxInput {
  filterModel: GridFilterModel;
  sortModel: GridSortModel;
  page: number;
  pageSize: number;
  token: any;
}
