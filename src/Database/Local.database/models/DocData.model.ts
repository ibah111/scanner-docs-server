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
import { Depart } from './Depart.model';
import { Doc } from './Doc.model';
import { Log } from './Log.model';
import { Status } from './Status.model';
import { Transmit } from './Transmit.model';
import { User } from './User.model';
import { Optional } from '@contact/sequelize';
export interface DocDataAttributes {
  id: number;
  parent_id: number;
  status: number;
  user: number;
  depart: number;
  Doc: Doc;
  Status: Status;
  User: User;
}

export type DocDataCreationAttributes = Optional<DocDataAttributes, 'id'>;

@Table({ tableName: 'docData' })
export class DocData extends Model<
  DocDataAttributes,
  DocDataCreationAttributes
> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @AllowNull(false)
  @ForeignKey(() => Doc)
  @Column
  parent_id: number;
  @BelongsTo(() => Doc)
  Doc: Doc;

  @AllowNull(false)
  @ForeignKey(() => Status)
  @Column
  status: number;
  @BelongsTo(() => Status)
  Status: Status;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column
  user: number;
  @BelongsTo(() => User)
  User: User;

  @AllowNull(false)
  @ForeignKey(() => Depart)
  @Column
  depart: number;
  @BelongsTo(() => Depart)
  Depart: Depart;

  @HasMany(() => Log)
  Logs: Log[];

  @HasMany(() => Transmit)
  Transmits: Transmit[];
}
