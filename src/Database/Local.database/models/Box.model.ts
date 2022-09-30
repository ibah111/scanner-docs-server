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
import { Depart } from './Depart.model';
import { Doc } from './Doc.model';
import { User } from './User.model';
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

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column
  user: number;
  @BelongsTo(() => User)
  User: User;

  @AllowNull(false)
  @ForeignKey(() => Depart)
  @Column
  depart: number;
  @BelongsTo(() => Depart)
  Depart: Depart;

  @HasMany(() => Doc)
  Docs: Doc[];

  @HasOne(() => Barcode, {
    constraints: false,
    scope: {
      type: 2,
    },
  })
  Barcode: Barcode;
}
