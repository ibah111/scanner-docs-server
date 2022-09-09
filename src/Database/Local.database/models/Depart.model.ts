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
import { Optional } from '@contact/sequelize';
import { DocData } from './DocData.model';
import { Log } from './Log.model';
import { User } from './User.model';

export interface DepartAttributes {
  id: number;
  bitrix_id: number;
  name: string;
  title: string;
  parent_id: number;
}
export type DepartCreationAttributes = Optional<DepartAttributes, 'id'>;

@Table({ tableName: 'Departs' })
export class Depart extends Model<DepartAttributes, DepartCreationAttributes> {
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
