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
import { Depart } from './Depart.model';
import { Status } from './Status.model';
import { Transmit } from './Transmit.model';
import { User } from './User.model';
@Table({ tableName: 'Logs' })
export class Log extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column
  user: number;
  @BelongsTo(() => User)
  User: User;

  @AllowNull(false)
  @ForeignKey(() => Barcode)
  @Column
  barcode: number;
  @BelongsTo(() => Barcode)
  Barcode: Barcode;

  @AllowNull(false)
  @ForeignKey(() => Depart)
  @Column
  depart: number;
  @BelongsTo(() => Depart)
  Depart: Depart[];

  @AllowNull(false)
  @ForeignKey(() => Status)
  @Column
  status: number;
  @BelongsTo(() => Status)
  Status: Status[];

  @ForeignKey(() => Transmit)
  @Column
  transmit: number;
  @BelongsTo(() => Transmit)
  Transmit: Transmit[];

  @AllowNull(false)
  @Column
  date: Date;
}
