import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from '@contact/sequelize-typescript';
import { Barcode } from './Barcode.model';
import { BarcodeTypes } from './BarcodeTypes.model';
import { Doc } from './Doc.model';
@Table({ tableName: 'Box' })
export class Box extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @AllowNull(false)
  @Column
  code: number;

  @AllowNull(false)
  @ForeignKey(() => BarcodeTypes)
  @Column
  type: number;
  @BelongsTo(() => BarcodeTypes)
  BarcodeTypes: BarcodeTypes;

  @HasMany(() => Doc)
  Doc: Doc[];

  @HasOne(() => Barcode, {
    scope: {
      type: 2,
    },
  })
  Barcode: Barcode;
}
