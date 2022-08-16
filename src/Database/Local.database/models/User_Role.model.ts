import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from '@contact/sequelize-typescript';
import { Role } from './Role.model';
import { User } from './User.model';

@Table({ tableName: 'Users_Roles' })
export class User_Role extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column
  user_id: number;
  @BelongsTo(() => User)
  User: User;

  @AllowNull(false)
  @ForeignKey(() => Role)
  @Column
  role_id: number;
  @BelongsTo(() => Role)
  Role: Role;
}
