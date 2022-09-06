import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from '@contact/sequelize-typescript';
import { BarcodeTypes } from './BarcodeTypes.model';
import { Box } from './Box.model';
import { Doc } from './Doc.model';
@Table({ tableName: 'Barcodes' })
export class Barcode extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @AllowNull(false)
  @Unique
  @Column
  code: string;

  @AllowNull(false)
  @Column
  item_id: number;

  @AllowNull(false)
  @ForeignKey(() => Doc)
  @Column
  doc_id: number;
  @BelongsTo(() => Doc)
  Doc: Doc;

  @AllowNull(true)
  @ForeignKey(() => Box)
  @Column
  box_id: number;
  @BelongsTo(() => Doc)
  Box: Box;

  @AllowNull(false)
  @ForeignKey(() => BarcodeTypes)
  @Column
  type: number;
  @BelongsTo(() => BarcodeTypes)
  BarcodeTypes: BarcodeTypes;
}
