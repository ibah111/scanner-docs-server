import {
  BelongsToAttribute,
  CreateLiteralAssociation,
} from '@sql-tools/association-literal';
import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  ForeignKey as FK,
  NonAttribute,
} from '@sql-tools/sequelize';
import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from '@sql-tools/sequelize-typescript';
import { Role_DocMail } from './Role_DocMail.model';
import { User_DocMail } from './User_DocMail.model';

@Table({ tableName: 'Users_Roles' })
export class User_Role_DocMail extends Model<
  InferAttributes<User_Role_DocMail>,
  InferCreationAttributes<User_Role_DocMail>,
  CreateLiteralAssociation<User_Role_DocMail>
> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: CreationOptional<number>;

  @ForeignKey(() => User_DocMail)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  user_id: FK<number>;
  @BelongsTo(() => User_DocMail)
  User?: BelongsToAttribute<NonAttribute<User_DocMail>>;

  @ForeignKey(() => Role_DocMail)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  role_id: FK<number>;
  @BelongsTo(() => Role_DocMail)
  Role?: BelongsToAttribute<NonAttribute<Role_DocMail>>;
}
