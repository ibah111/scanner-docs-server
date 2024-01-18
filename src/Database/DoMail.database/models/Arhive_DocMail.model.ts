import {
  BelongsToAttribute,
  CreateLiteralAssociation,
} from '@sql-tools/association-literal';
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
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
import { Incoming_DocMail } from './Incoming_DocMail.model';
import { User_DocMail } from './User_DocMail.model';
@Table({ tableName: 'arhives' })
export class Arhive_DocMail extends Model<
  InferAttributes<Arhive_DocMail>,
  InferCreationAttributes<Arhive_DocMail>,
  CreateLiteralAssociation<Arhive_DocMail>
> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: CreationOptional<number>;

  @ForeignKey(() => Incoming_DocMail)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  incoming_id: number;
  @BelongsTo(() => Incoming_DocMail)
  Incoming?: NonAttribute<Incoming_DocMail>;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  typ: number;

  @Column(DataType.INTEGER)
  korob: number | null;

  @Column(DataType.STRING)
  doc_name: string | null;

  @ForeignKey(() => User_DocMail)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  user: number;

  @Column(DataType.BOOLEAN)
  out_worktime: boolean | null;
  @BelongsTo(() => User_DocMail, { targetKey: 'bitrix_id' })
  User?: NonAttribute<BelongsToAttribute<User_DocMail>>;
}
