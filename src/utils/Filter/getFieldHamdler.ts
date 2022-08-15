import { GridColumns } from '@mui/x-data-grid-premium';

export default function getFieldHandler(columnModel: GridColumns) {
  return (name: string) => columnModel.find((column) => column.field === name);
}
