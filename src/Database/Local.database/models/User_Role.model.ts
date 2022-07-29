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

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  user_id: number;
  @BelongsTo(() => User)
  User: User;

  @ForeignKey(() => Role)
  @AllowNull(false)
  @Column
  role_id: number;
  @BelongsTo(() => Role)
  Role: Role;
}
