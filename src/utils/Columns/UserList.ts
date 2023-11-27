import { GridColDef } from '@mui/x-data-grid-premium';
import { User } from '../../Database/Local.database/models/User.model';

export const userListColumns = (): GridColDef<User>[] => [
  {
    field: 'Users.id',
    headerName: 'id',
    type: 'number',
  },
  {
    field: 'Users.f',
    headerName: 'f',
    type: 'string',
  },
  {
    field: 'Users.i',
    headerName: 'i',
    type: 'string',
  },
  {
    field: 'Users.o',
    headerName: 'o',
    type: 'string',
  },
  {
    field: 'Users.login',
    headerName: 'login',
    type: 'string',
  },
  {
    field: 'Users.position',
    headerName: 'position',
    type: 'string',
  },
  {
    field: 'Users.bitrix_id',
    headerName: 'bitrix_id',
    type: 'number',
  },
  {
    field: 'Users.depart',
    headerName: 'depart',
    type: 'number',
  },
  {
    field: 'Roles.id',
    headerName: 'id',
    type: 'number',
  },
  {
    field: 'Roles.name',
    headerName: 'name',
    type: 'string',
  },
  {
    field: 'Roles.title',
    headerName: 'title',
    type: 'string',
  },
];
