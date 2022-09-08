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

  @ForeignKey(() => Box)
  @ForeignKey(() => Doc)
  @AllowNull(false)
  @Column
  item_id: number;

  @BelongsTo(() => Doc, {
    constraints: false,
    scope: {
      type: 1,
    },
  })
  Doc: Doc;
  @BelongsTo(() => Box, {
    constraints: false,
    scope: {
      type: 2,
    },
  })
  Box: Box;
  @AllowNull(false)
  @ForeignKey(() => BarcodeTypes)
  @Column
  type: number;
  @BelongsTo(() => BarcodeTypes)
  BarcodeTypes: BarcodeTypes;
}
