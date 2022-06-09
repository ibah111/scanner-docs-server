import {
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
import { Doc } from './Doc.models';
import { Log } from './Log.model';
import { Status } from './Status.model';
import { User } from './User.model';
@Table({ tableName: 'Barcodes' })
export class Barcode extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  code: string;

  @ForeignKey(() => Doc)
  @Column
  doc_id: number;
  @BelongsTo(() => Doc)
  Doc: Doc;

  @ForeignKey(() => Status)
  @Column
  status: number;
  @BelongsTo(() => Status)
  Status: Status;

  @ForeignKey(() => User)
  @Column
  user: number;
  @BelongsTo(() => User)
  User: User;

  @ForeignKey(() => Depart)
  @Column
  dapart: number;
  @BelongsTo(() => Depart)
  Depart: Depart[];

  @HasMany(() => Log)
  Logs: Log[];
}
