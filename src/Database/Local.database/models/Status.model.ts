import {
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
import { DocData } from './DocData.model';
import { Log } from './Log.model';
@Table({ tableName: 'Status', timestamps: false })
export class Status extends Model<
  InferAttributes<Status>,
  InferCreationAttributes<Status>
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

  @HasMany(() => DocData)
  DocData?: NonAttribute<DocData[]>;

  @HasMany(() => Log)
  Logs?: NonAttribute<Log[]>;
}
