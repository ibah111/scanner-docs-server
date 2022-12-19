import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute,
} from '@contact/sequelize';
import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from '@contact/sequelize-typescript';
import { DocData } from './DocData.model';

@Table({ tableName: 'Result' })
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

  @AllowNull(false)
  @Column(DataType.DATE)
  date_post: Date;

  @HasOne(() => DocData)
  DocData?: NonAttribute<DocData>;
}
