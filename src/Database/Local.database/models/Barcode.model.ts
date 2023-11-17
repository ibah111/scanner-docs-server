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
  Unique,
} from '@sql-tools/sequelize-typescript';
import { BarcodeTypes } from './BarcodeTypes.model';
import { Box } from './Box.model';
import { Doc } from './Doc.model';
@Table({ tableName: 'Barcodes', paranoid: true })
export class Barcode extends Model<
  InferAttributes<Barcode>,
  InferCreationAttributes<Barcode>
> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: CreationOptional<number>;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  code: string;

  @ForeignKey(() => Box)
  @ForeignKey(() => Doc)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  item_id: FK<number>;

  @BelongsTo(() => Doc, {
    constraints: false,
    scope: {
      type: 1,
    },
  })
  Doc?: NonAttribute<Doc>;
  @BelongsTo(() => Box, {
    constraints: false,
    scope: {
      type: 2,
    },
  })
  Box?: NonAttribute<Box>;
  @AllowNull(false)
  @ForeignKey(() => BarcodeTypes)
  @Column(DataType.INTEGER)
  type: FK<number>;
  @BelongsTo(() => BarcodeTypes)
  BarcodeTypes?: NonAttribute<BarcodeTypes>;
}
