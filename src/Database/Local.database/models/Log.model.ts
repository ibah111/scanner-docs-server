import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  ForeignKey as FK,
  NonAttribute,
} from '@sql-tools/sequelize';
import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from '@sql-tools/sequelize-typescript';
import { Depart } from './Depart.model';
import { DocData } from './DocData.model';
import { Status } from './Status.model';
import { Transmit } from './Transmit.model';
import { User } from './User.model';
@Table({ tableName: 'Log' })
export class Log extends Model<
  InferAttributes<Log>,
  InferCreationAttributes<Log>
> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: CreationOptional<number>;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  user: FK<number>;
  @BelongsTo(() => User)
  User?: NonAttribute<User>;

  @AllowNull(false)
  @ForeignKey(() => DocData)
  @Column(DataType.INTEGER)
  doc_data_id: FK<number>;
  @BelongsTo(() => DocData)
  DocData?: NonAttribute<DocData>;

  @AllowNull(false)
  @ForeignKey(() => Depart)
  @Column(DataType.INTEGER)
  depart: FK<number>;
  @BelongsTo(() => Depart)
  Depart?: NonAttribute<Depart[]>;

  @AllowNull(false)
  @ForeignKey(() => Status)
  @Column(DataType.INTEGER)
  status: FK<number>;
  @BelongsTo(() => Status)
  Status?: NonAttribute<Status[]>;

  @ForeignKey(() => Transmit)
  @Column(DataType.INTEGER)
  transmit: FK<number | null>;
  @BelongsTo(() => Transmit)
  Transmit?: NonAttribute<Transmit[]>;

  @AllowNull(false)
  @Column(DataType.DATE)
  date: Date;
}
