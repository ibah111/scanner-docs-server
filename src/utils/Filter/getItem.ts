import { GridColType, GridFilterItem } from '@mui/x-data-grid-premium';
import Operators from './Operator';

export default function getItem(item: GridFilterItem, type: GridColType) {
  return {
    [`$${item.columnField}$`]: Operators(item.operatorValue, item.value, type),
  };
}
