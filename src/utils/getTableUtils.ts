import {
  GridFilterModel,
  GridSortModel,
  GridValidRowModel,
} from '@mui/x-data-grid-premium';
import Filter from 'src/utils/Filter';
import Sort from './Sort';
import { GridColDefExtend } from './GridColDefExtndsClass';

export function getTableUtils<T extends GridValidRowModel>(
  columns: GridColDefExtend<T>[],
) {
  const utils = {
    getColumns: () => columns,
    getColumn: (name: string) =>
      columns.find((column) => column.field === name),
    getFilter: (modelName: string, filter?: GridFilterModel) =>
      Filter(columns, modelName, filter),
    getSort: (sort: GridSortModel) => Sort(columns, sort),
  };
  return utils;
}
