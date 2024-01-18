import {
  BelongsToAttribute,
  CreateLiteralAssociation,
} from '@sql-tools/association-literal';
import {
  NonAttribute,
  ForeignKey as FK,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
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
import { Incoming_DocMail } from './Incoming_DocMail.model';

@Table({ tableName: 'Loggings' })
export class Logging_DocMail extends Model<
  InferAttributes<Logging_DocMail>,
  InferCreationAttributes<Logging_DocMail>,
  CreateLiteralAssociation<Logging_DocMail>
> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: CreationOptional<number>;

  @AllowNull(false)
  @ForeignKey(() => Incoming_DocMail)
  @Column(DataType.INTEGER)
  parent_id: FK<number>;

  @BelongsTo(() => Incoming_DocMail)
  Result?: BelongsToAttribute<NonAttribute<Incoming_DocMail>>;

  @AllowNull(false)
  @Column(DataType.STRING)
  column_name: string;

  @Column(DataType.STRING)
  old_value: string | null;

  @Column(DataType.STRING)
  new_value: string | null;

  @AllowNull(false)
  @Column(DataType.STRING)
  editor: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  operation_time: Date;

  @Column(DataType.INTEGER)
  bitrix_id_check_debtor: number | null;
}
