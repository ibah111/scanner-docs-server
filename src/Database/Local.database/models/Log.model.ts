import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from '@contact/sequelize-typescript';
import { Barcode } from './Barcode.model';
import { Status } from './Status.model';
import { User } from './User.model';
@Table({ tableName: 'Logs' })
export class Log extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @ForeignKey(() => User)
  @Column
  user: number;
  @BelongsTo(() => User)
  User: User;

  @ForeignKey(() => Barcode)
  @Column
  barcode: number;
  @BelongsTo(() => Barcode)
  Barcode: Barcode;

  @ForeignKey(() => Status)
  @Column
  status: number;
  @BelongsTo(() => Status)
  Status: Status[];

  @Column
  date: Date;
}
