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
import { Depart } from './Depart.model';
import { Doc } from './Doc.model';
import { Log } from './Log.model';
import { Status } from './Status.model';
import { User } from './User.model';
@Table({ tableName: 'Barcodes' })
export class Barcode extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @AllowNull(false)
  @Column
  code: string;

  @AllowNull(false)
  @ForeignKey(() => Doc)
  @Column
  doc_id: number;
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
  dapart: number;
  @BelongsTo(() => Depart)
  Depart: Depart[];

  @HasMany(() => Log)
  Logs: Log[];
}
