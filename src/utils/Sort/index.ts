import { OrderItem, Sequelize } from '@sql-tools/sequelize';
import { GridSortModel } from '@mui/x-data-grid-premium';
import getFieldHandler from '../getFieldHamdler';
import { GridColDefExtend } from '../GridColDefExtndsClass';

export default function Sort(
  columns: GridColDefExtend[],
  sortModel: GridSortModel,
) {
  const getField = getFieldHandler(columns);
  const orders: OrderItem[] = [];
  if (sortModel.length > 0) {
    sortModel.forEach((sort) => {
      const field = getField(sort.field);
      if (field) {
        const item: OrderItem = [Sequelize.col(`${sort.field}`), sort.sort!];
        orders.push(item);
      }
    });
  } else {
    const item: OrderItem = ['id', 'asc'];
    orders.push(item);
  }
  return orders;
}
