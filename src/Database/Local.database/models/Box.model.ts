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
import { DocData } from './DocData.model';
@Table({ tableName: 'Box' })
export class Box extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @AllowNull(false)
  @ForeignKey(() => BarcodeTypes)
  @Column
  type: number;
  @BelongsTo(() => BarcodeTypes)
  BarcodeTypes: BarcodeTypes;

  @HasMany(() => DocData)
  DocData: DocData[];

  @HasOne(() => Barcode, {
    scope: {
      type: 2,
    },
  })
  Barcode: Barcode;
}
