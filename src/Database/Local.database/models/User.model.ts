import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from '@sql-tools/sequelize-typescript';
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
} from '@sql-tools/sequelize';
import { Box } from './Box.model';
import { Role } from './Role.model';

@Table({ tableName: 'Users' })
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

  @BelongsToMany(() => Role, () => User_Role)
  Roles?: NonAttribute<Array<Role & { User_Role: User_Role }>>;
  @HasMany(() => Box)
  Boxs?: NonAttribute<Box[]>;
}
