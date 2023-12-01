import { GridValidRowModel, GridColDef } from '@mui/x-data-grid-premium';
import { Literal } from '@sql-tools/sequelize/types/utils';
interface ColumnFunction {
  name: string;
  args: unknown[];
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GridColDefExtend<T extends GridValidRowModel = any> = {
  modelName: string;
  filterCol: string | ColumnFunction | Literal;
  sortCol: string | ColumnFunction | Literal;
} & GridColDef<T>;
