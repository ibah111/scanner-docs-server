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
  Default,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from '@sql-tools/sequelize-typescript';
import { DocData } from './DocData.model';
import { Log } from './Log.model';
import { User } from './User.model';

@Table({ tableName: 'Transmits' })
export class Transmit extends Model<
  InferAttributes<Transmit>,
  InferCreationAttributes<Transmit>
> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: CreationOptional<number>;

  @Default(false)
  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  active: CreationOptional<boolean>;

  @ForeignKey(() => DocData)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  doc_data_id: FK<number>;
  @BelongsTo(() => DocData)
  DocData?: NonAttribute<DocData>;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  sender: FK<number>;
  @BelongsTo(() => User)
  User: NonAttribute<User>;

  @AllowNull(false)
  @Column(DataType.DATE)
  date_send: Date;

  @AllowNull(false)
  @Column(DataType.STRING)
  where_send: string;

  @Column(DataType.DATE)
  date_return: Date;

  @HasMany(() => Log)
  Logs?: NonAttribute<Log[]>;
}
