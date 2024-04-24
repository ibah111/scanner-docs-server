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
import { Barcode } from './Barcode.model';

@Table({ tableName: 'BoxTypes', paranoid: true })
export class BoxTypes extends Model<
  InferAttributes<BoxTypes>,
  InferCreationAttributes<BoxTypes>
> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: CreationOptional<number>;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  title: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  who_added_type: string;

  @HasMany(() => Barcode)
  Barcodes: NonAttribute<Barcode[]>;
}
