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

@Table({ tableName: 'BarcodeTypes', timestamps: false })
export class BarcodeTypes extends Model<
  InferAttributes<BarcodeTypes>,
  InferCreationAttributes<BarcodeTypes>
> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: CreationOptional<number>;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  name: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  title: string;

  @HasMany(() => Barcode)
  Barcodes?: NonAttribute<Barcode[]>;
}
