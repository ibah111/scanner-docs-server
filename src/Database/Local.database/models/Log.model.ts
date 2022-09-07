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
import { Depart } from './Depart.model';
import { DocData } from './DocData.model';
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
  @ForeignKey(() => DocData)
  @Column
  doc_data_id: number;
  @BelongsTo(() => DocData)
  DocData: DocData;

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
