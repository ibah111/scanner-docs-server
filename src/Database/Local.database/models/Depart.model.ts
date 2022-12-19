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
} from '@contact/sequelize-typescript';
import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute,
} from '@contact/sequelize';
import { DocData } from './DocData.model';
import { Log } from './Log.model';
import { User } from './User.model';
import { Box } from './Box.model';

@Table({ tableName: 'Departs' })
export class Depart extends Model<
  InferAttributes<Depart>,
  InferCreationAttributes<Depart>
> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: CreationOptional<number>;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  bitrix_id: number;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  name: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  title: string;

  @Column(DataType.INTEGER)
  parent_id: number | null;

  @HasMany(() => DocData)
  DocData?: NonAttribute<DocData[]>;

  @HasMany(() => User)
  Users?: NonAttribute<User[]>;

  @HasMany(() => Log)
  Logs?: NonAttribute<Log[]>;
  @HasMany(() => Box)
  Boxs?: NonAttribute<Box[]>;
}
