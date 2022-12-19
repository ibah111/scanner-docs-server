import { OrderItem, Sequelize } from '@contact/sequelize';
import { GridColumns, GridSortModel } from '@mui/x-data-grid-premium';
import getFieldHandler from '../Filter/getFieldHamdler';

export default function Sort(sortModel: GridSortModel, columns: GridColumns) {
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
