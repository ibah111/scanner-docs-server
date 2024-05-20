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
import { Doc } from './Doc.model';
import { BoxTypes } from './BoxTypes.model';
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

  @ForeignKey(() => Doc)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  item_id: FK<number>;

  @BelongsTo(() => Doc, {
    constraints: false,
  })
  Doc?: NonAttribute<Doc>;

  @ForeignKey(() => BoxTypes)
  @Column(DataType.INTEGER)
  box_type_id?: FK<number> | null;

  @BelongsTo(() => BoxTypes)
  BoxType?: FK<number> | null;
}
