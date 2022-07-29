import {
  AllowNull,
  AutoIncrement,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from '@contact/sequelize-typescript';
import { User_Role } from './User_Role.model';

@Table({ tableName: 'Roles' })
export class Role extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Column
  title: string;

  @HasMany(() => User_Role)
  Users_Roles: User_Role[];
}
