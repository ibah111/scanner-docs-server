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
import { Barcode } from './Barcode.model';
import { DocData } from './DocData.model';
import { Log } from './Log.model';
import { User } from './User.model';

@Table({ tableName: 'Departs' })
export class Depart extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @AllowNull(false)
  @Column
  bitrix_id: number;

  @AllowNull(false)
  @Unique
  @Column
  name: string;

  @AllowNull(false)
  @Column
  title: string;

  @Column
  parent_id: number;

  @HasMany(() => DocData)
  DocData: DocData[];

  @HasMany(() => User)
  Users: User[];

  @HasMany(() => Log)
  Logs: Log[];
}
