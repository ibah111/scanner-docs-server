import {
  AllowNull,
  AutoIncrement,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from '@contact/sequelize-typescript';
import { DocData } from './DocData.model';
import { Log } from './Log.model';
@Table({ tableName: 'status' })
export class Status extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Unique
  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Column
  title: string;

  @HasMany(() => DocData)
  DocData: DocData[];

  @HasMany(() => Log)
  Logs: Log[];
}
