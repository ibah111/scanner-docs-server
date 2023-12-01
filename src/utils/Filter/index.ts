import { Op, WhereOptions } from '@sql-tools/sequelize';
import { GridColumns, GridFilterModel } from '@mui/x-data-grid-premium';
import getFieldHandler from '../getFieldHamdler';
import getItem from '../getItem';

export default function Filter(
  filterModel: GridFilterModel,
  columnModel: GridColumns,
): WhereOptions {
  const where: WhereOptions[] = [];
  const result: Record<symbol, WhereOptions[]> = {};
  const getField = getFieldHandler(columnModel);
  filterModel.items.forEach((item) => {
    const Field = getField(item.columnField);
    if (Field) where.push(getItem(item, Field.type!));
  });

  if (filterModel.items.length > 0) {
    switch (filterModel.linkOperator) {
      case 'and':
        result[Op.and] = where;
        break;
      case 'or':
        result[Op.or] = where;
        break;
      default:
        result[Op.and] = where;
        break;
    }
  }
  return result;
}
