import { GridFilterItem } from '@mui/x-data-grid-premium';
import { Sequelize } from '@sql-tools/sequelize-typescript';
import { Utils } from '@sql-tools/sequelize';
import { GridColDefExtend } from './GridColDefExtndsClass';
import Operators from './Filter/Operator';

export default function getItem(
  item: GridFilterItem,
  column: GridColDefExtend,
) {
  if (typeof column.filterCol === 'string') {
    return Sequelize.where(
      Sequelize.col(column.filterCol),
      Operators(item.operator || 'and', item.value, column.type ?? 'string'),
    );
  } else if (column.filterCol instanceof Utils.Literal) {
    return Sequelize.where(
      column.filterCol,
      Operators(
        item.operator || 'and',
        item.value || '',
        column.type ?? 'string',
      ),
    );
  } else {
    return Sequelize.where(
      Sequelize.fn(column.filterCol.name, ...column.filterCol.args),
      Operators(
        item.operator || 'and',
        item.value || '',
        column.type ?? 'string',
      ),
    );
  }
}
