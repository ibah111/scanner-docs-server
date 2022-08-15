import { GridColType, GridFilterItem } from '@mui/x-data-grid-premium';
import Operators from './Operator';

export default function getItem(item: GridFilterItem, type: GridColType) {
  console.log(Operators(item.operatorValue, item.value, type));
  return {
    [`$${item.columnField}$`]: Operators(item.operatorValue, item.value, type),
  };
}
