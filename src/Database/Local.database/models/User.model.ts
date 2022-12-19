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
  Unique,
} from '@contact/sequelize-typescript';
import { Depart } from './Depart.model';
import { DocData } from './DocData.model';
import { Log } from './Log.model';
import { Transmit } from './Transmit.model';
import { User_Role } from './User_Role.model';
import { Optional } from '@contact/sequelize';
import { Box } from './Box.model';

@Table({ tableName: 'Users', timestamps: false })
export class User extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  f: string;

  @Column
  i: string;

  @Column
  o: string;

  @AllowNull(false)
  @Unique
  @Column
  login: string;

  @Column
  position: string;

  @AllowNull(false)
  @Unique
  @Column
  bitrix_id: number;

  @ForeignKey(() => Depart)
  @Column
  depart: number;
  @BelongsTo(() => Depart)
  Depart: Depart;

  @HasMany(() => DocData)
  DocData: DocData[];

  @HasMany(() => Log)
  Logs: Log[];

  @HasMany(() => Transmit)
  Transmits: Transmit;

  @HasMany(() => User_Role)
  Users_Roles: User_Role[];
  @HasMany(() => Box)
  Boxs: Box[];
}
