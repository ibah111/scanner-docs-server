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
import { DocData } from './DocData.model';
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

  @ForeignKey(() => DocData)
  @AllowNull(false)
  @Column
  doc_data_id: number;
  @BelongsTo(() => DocData)
  DocData: DocData;

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
