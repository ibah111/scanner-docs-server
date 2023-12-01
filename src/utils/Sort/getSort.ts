import { Utils, Sequelize } from '@sql-tools/sequelize';
import { GridColDefExtend } from '../GridColDefExtndsClass';

export default function getSort(Field: GridColDefExtend) {
  if (typeof Field.sortCol === 'string') {
    return Sequelize.col(Field.sortCol);
  } else if (Field.sortCol instanceof Utils.Literal) {
    return Field.sortCol;
  } else {
    return Sequelize.fn(Field.sortCol.name, ...Field.sortCol.args);
  }
}
