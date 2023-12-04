import { User } from '../../Database/Local.database/models/User.model';
import { GridColDefExtend } from '../GridColDefExtndsClass';
/**
 * @TODO Переписать
 * @returns
 */
export const userListColumns = (): GridColDefExtend<User>[] => [
  {
    type: 'number',
    modelName: 'Users',
    field: 'id',
    sortCol: 'id',
    filterCol: 'id',
  },
  {
    type: 'string',
    modelName: 'Users',
    field: 'f',
    sortCol: 'f',
    filterCol: 'f',
  },
  {
    type: 'string',
    modelName: 'Users',
    field: 'i',
    sortCol: 'i',
    filterCol: 'i',
  },
  {
    type: 'string',
    modelName: 'Users',
    field: 'o',
    sortCol: 'o',
    filterCol: 'o',
  },
  {
    type: 'string',
    modelName: 'Users',
    field: 'login',
    sortCol: 'login',
    filterCol: 'login',
  },
  {
    type: 'string',
    modelName: 'Users',
    field: 'position',
    sortCol: 'position',
    filterCol: 'position',
  },
  {
    type: 'number',
    modelName: 'Users',
    field: 'bitrix_id',
    sortCol: 'bitrix_id',
    filterCol: 'bitrix_id',
  },
  {
    type: 'number',
    modelName: 'Users',
    field: 'depart',
    sortCol: 'depart',
    filterCol: 'depart',
  },
  {
    type: 'date',
    modelName: 'Users',
    field: 'createdAt',
    sortCol: 'createdAt',
    filterCol: 'createdAt',
  },
  {
    type: 'date',
    modelName: 'Users',
    field: 'updatedAt',
    sortCol: 'updatedAt',
    filterCol: 'updatedAt',
  },
];
