import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from '@contact/sequelize-typescript';
import { Barcode } from './Barcode.model';
import { Log } from './Log.model';
import { User } from './User.model';

@Table({ tableName: 'Transmits' })
export class Transmit extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  active: boolean;

  @ForeignKey(() => Barcode)
  @AllowNull(false)
  @Column
  barcode: number;
  @BelongsTo(() => Barcode)
  Barcode: Barcode;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  sender: number;
  @BelongsTo(() => User)
  User: User;

  @AllowNull(false)
  @Column
  date_send: Date;

  @AllowNull(false)
  @Column
  where_send: string;

  @Column
  date_return: Date;

  @HasMany(() => Log)
  Logs: Log[];
}
