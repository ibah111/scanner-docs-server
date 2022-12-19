import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
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
import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  ForeignKey as FK,
  NonAttribute,
} from '@contact/sequelize';
import { Box } from './Box.model';

@Table({ tableName: 'Users', timestamps: false })
export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: CreationOptional<number>;

  @Column(DataType.STRING)
  f: string | null;

  @Column(DataType.STRING)
  i: string | null;

  @Column(DataType.STRING)
  o: string | null;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  login: string;

  @Column(DataType.STRING)
  position: string | null;

  @AllowNull(false)
  @Unique
  @Column(DataType.INTEGER)
  bitrix_id: number;

  @ForeignKey(() => Depart)
  @Column(DataType.INTEGER)
  depart: FK<number>;
  @BelongsTo(() => Depart)
  Depart?: NonAttribute<Depart>;

  @HasMany(() => DocData)
  DocData?: NonAttribute<DocData[]>;

  @HasMany(() => Log)
  Logs?: NonAttribute<Log[]>;

  @HasMany(() => Transmit)
  Transmits?: NonAttribute<Transmit[]>;

  @HasMany(() => User_Role)
  Users_Roles?: NonAttribute<User_Role[]>;
  @HasMany(() => Box)
  Boxs?: NonAttribute<Box[]>;
}
