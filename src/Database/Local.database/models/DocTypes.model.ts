import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute,
} from '@sql-tools/sequelize';
import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from '@sql-tools/sequelize-typescript';

import { Doc } from './Doc.model';

@Table({ tableName: 'DocTypes', timestamps: false })
export class DocTypes extends Model<
  InferAttributes<DocTypes>,
  InferCreationAttributes<DocTypes>
> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: CreationOptional<number>;

  @AllowNull(false)
  @Unique
  @Column(DataType.INTEGER)
  name: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  title: string;

  @HasMany(() => Doc)
  Doc: NonAttribute<Doc[]>;
}
