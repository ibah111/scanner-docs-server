import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from '@contact/sequelize-typescript';
import { Barcode } from './Barcode.model';

@Table({ tableName: 'Transmit' })
export class Transmit extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;


  @ForeignKey(() => Barcode)
  @Column
  barcode: number;
  @BelongsTo(() => Barcode)
  Barcode: Barcode;

  @Column
  date_send: Date;

  @Column
  where_send: string;

  @Column
  date_return: Date;
}
