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
} from '@contact/sequelize-typescript';
import { Depart } from './Depart.model';
import { Doc } from './Doc.model';
import { Log } from './Log.model';
import { Status } from './Status.model';
import { Transmit } from './Transmit.model';
import { User } from './User.model';
import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute,
  ForeignKey as FK,
} from '@contact/sequelize';
import { Result } from './Result.model';

@Table({ tableName: 'docData' })
export class DocData extends Model<
  InferAttributes<DocData>,
  InferCreationAttributes<DocData>
> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: CreationOptional<number>;

  @AllowNull(false)
  @ForeignKey(() => Doc)
  @Column(DataType.INTEGER)
  parent_id: FK<number>;
  @BelongsTo(() => Doc)
  Doc?: NonAttribute<Doc>;

  @AllowNull(false)
  @ForeignKey(() => Status)
  @Column(DataType.INTEGER)
  status: FK<number>;
  @BelongsTo(() => Status)
  Status?: NonAttribute<Status>;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  user: FK<number>;
  @BelongsTo(() => User)
  User?: NonAttribute<User>;

  @AllowNull(false)
  @ForeignKey(() => Depart)
  @Column(DataType.INTEGER)
  depart: FK<number>;
  @BelongsTo(() => Depart)
  Depart?: NonAttribute<Depart>;

  @AllowNull(true)
  @ForeignKey(() => Result)
  @Column(DataType.INTEGER)
  result: FK<number>;
  @BelongsTo(() => Result)
  Result?: NonAttribute<Result>;

  @HasMany(() => Log)
  Logs?: NonAttribute<Log[]>;

  @HasMany(() => Transmit)
  Transmits?: NonAttribute<Transmit[]>;
}
