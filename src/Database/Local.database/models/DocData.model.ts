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
import { Box } from './Box.model';
import { Depart } from './Depart.model';
import { Doc } from './Doc.model';
import { Log } from './Log.model';
import { Status } from './Status.model';
import { Transmit } from './Transmit.model';
import { User } from './User.model';

@Table({ tableName: 'docData' })
export class DocData extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @AllowNull(false)
  @Column
  barcode: string;

  @AllowNull(false)
  @ForeignKey(() => Doc)
  @Column
  parent_id: number;
  @BelongsTo(() => Doc)
  Doc: Doc;

  @AllowNull(false)
  @ForeignKey(() => Status)
  @Column
  status: number;
  @BelongsTo(() => Status)
  Status: Status;

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
  Depart: Depart[];

  @AllowNull(true)
  @ForeignKey(() => Box)
  @Column
  box_id: number;
  @BelongsTo(() => Box)
  Box: Box;

  @HasMany(() => Log)
  Logs: Log[];

  @HasMany(() => Transmit)
  Transmits: Transmit[];
}
