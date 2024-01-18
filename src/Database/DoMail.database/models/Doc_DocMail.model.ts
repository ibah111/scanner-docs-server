import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from '@sql-tools/sequelize-typescript';
import type {
  InferAttributes,
  InferCreationAttributes,
  ForeignKey as FK,
  NonAttribute,
  CreationOptional,
} from '@sql-tools/sequelize';
import { Incoming_DocMail } from './Incoming_DocMail.model';
import { ApiProperty } from '@nestjs/swagger';
import { DocAttach } from '@contact/models';
import {
  BelongsToAttribute,
  CreateLiteralAssociation,
} from '@sql-tools/association-literal';
@Table({ tableName: 'Docs' })
export class Doc_DocMail extends Model<
  InferAttributes<Doc_DocMail>,
  InferCreationAttributes<Doc_DocMail>,
  CreateLiteralAssociation<Doc_DocMail>
> {
  /**
   * Внутренний id документа
   */
  @ApiProperty()
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: CreationOptional<number>;

  /**
   * ID почта
   */
  @ApiProperty()
  @AllowNull(false)
  @ForeignKey(() => Incoming_DocMail)
  @Column(DataType.INTEGER)
  incoming_id: FK<number>;
  /**
   * Почта
   */
  @ApiProperty({ type: () => Incoming_DocMail })
  @BelongsTo(() => Incoming_DocMail)
  Result?: BelongsToAttribute<NonAttribute<Incoming_DocMail>>;

  /**
   * ID документа
   */
  @ApiProperty()
  @AllowNull(false)
  @Column(DataType.INTEGER)
  doc_id: FK<number>;

  /**
   * Требуется ли отправить документы в сканер
   */
  @ApiProperty()
  @Default(false)
  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  sender: CreationOptional<boolean>;

  /**
   * Отправлен ли документ в Doc-scanner
   */
  @ApiProperty()
  @Default(false)
  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  sended: CreationOptional<boolean>;

  /**
   * Штрих-код
   */
  @ApiProperty()
  @Column(DataType.STRING)
  barcode: string | null;

  /**
   * Привязанные DocAttach
   */
  DocAttach?: BelongsToAttribute<NonAttribute<DocAttach>>;
}
