import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from '@sql-tools/sequelize';
import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from '@sql-tools/sequelize-typescript';

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
}
