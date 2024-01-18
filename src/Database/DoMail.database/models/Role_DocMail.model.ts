import {
  BelongsToManyAttribute,
  CreateLiteralAssociation,
} from '@sql-tools/association-literal';
import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute,
} from '@sql-tools/sequelize';
import {
  AllowNull,
  AutoIncrement,
  BelongsToMany,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from '@sql-tools/sequelize-typescript';
import { User_DocMail } from './User_DocMail.model';
import { User_Role_DocMail } from './User_Role_DocMail.model';

@Table({ tableName: 'Roles' })
export class Role_DocMail extends Model<
  InferAttributes<Role_DocMail>,
  InferCreationAttributes<Role_DocMail>,
  CreateLiteralAssociation<Role_DocMail>
> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: CreationOptional<number>;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  title: string;

  @BelongsToMany(() => User_DocMail, () => User_Role_DocMail)
  Users?: BelongsToManyAttribute<
    NonAttribute<Array<User_DocMail & { User_Role?: User_Role_DocMail }>>,
    'id'
  >;
}
