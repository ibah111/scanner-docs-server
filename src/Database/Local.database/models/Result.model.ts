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
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from '@sql-tools/sequelize-typescript';
import { DocData } from './DocData.model';

@Table({ tableName: 'Result', timestamps: false })
export class Result extends Model<
  InferAttributes<Result>,
  InferCreationAttributes<Result>
> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: CreationOptional<number>;

  @Column(DataType.STRING)
  kd: string | null;
  @Column(DataType.STRING)
  st_pnkt: string | null;

  @AllowNull(false)
  @Column(DataType.STRING)
  reestr: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  fio_dol: string;

  @AllowNull(true)
  @Column(DataType.DATE)
  date_post: Date | null;

  @HasOne(() => DocData)
  DocData?: NonAttribute<DocData>;
}
