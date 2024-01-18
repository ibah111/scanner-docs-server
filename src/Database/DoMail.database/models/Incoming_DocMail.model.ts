import type {
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
  Default,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from '@sql-tools/sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Doc_DocMail } from './Doc_DocMail.model';
import { Logging_DocMail } from './Logging_DocMail.model';
import {
  BelongsToAttribute,
  CreateLiteralAssociation,
  HasManyAttribute,
  HasOneAttribute,
} from '@sql-tools/association-literal';
import { User_DocMail } from './User_DocMail.model';
import { Arhive_DocMail } from './Arhive_DocMail.model';
@Table({ tableName: 'Incomings', paranoid: true })
export class Incoming_DocMail extends Model<
  InferAttributes<Incoming_DocMail>,
  InferCreationAttributes<Incoming_DocMail>,
  CreateLiteralAssociation<Incoming_DocMail>
> {
  /**
   * ID записи
   */
  @ApiProperty()
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: CreationOptional<number>;

  /**
   * Дата поступления
   */
  @ApiProperty()
  @AllowNull(false)
  @Column(DataType.DATE)
  date_post: Date;

  /**
   * Учет конвертов
   */
  @ApiProperty()
  @Default(false)
  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  convert: CreationOptional<boolean>;

  /**
   * Приставы
   */
  @ApiProperty()
  @Column(DataType.BOOLEAN)
  pristavi: boolean | null;

  /**
   * Адрес отправителя
   */
  @ApiProperty()
  @Column(DataType.STRING)
  adr_otp: string | null;

  /**
   * Отправитель
   */
  @ApiProperty()
  @Column(DataType.STRING)
  otprav: string | null;

  /**
   * Реестр
   */
  @ApiProperty()
  @Column(DataType.STRING)
  reestr: string | null;

  /**
   * Название документа
   */
  @ApiProperty()
  @Column(DataType.STRING)
  doc_name: string | null;

  /**
   * Название документа в архиве
   */
  @ApiProperty()
  @Column(DataType.STRING)
  doc_name_arhive: string | null;

  /**
   * Название документа в Архиве ИД
   */
  @ApiProperty()
  @Column(DataType.STRING)
  doc_name_arhive_id: string | null;

  /**
   * ID документа (не используется)
   */
  @ApiProperty()
  @Column(DataType.INTEGER)
  id_doc_name: number | null;

  /**
   * ID дела
   */
  @ApiProperty()
  @Column(DataType.INTEGER)
  id_dela: number | null;

  /**
   * ID долга
   */
  @ApiProperty()
  @Column(DataType.INTEGER)
  id_dolga: number | null;

  /**
   * ID должника
   */
  @ApiProperty()
  @Column(DataType.INTEGER)
  id_dolgnika: number | null;

  /**
   * Статья и пункт
   */
  @ApiProperty()
  @Column(DataType.STRING)
  st_pnkt: string | null;

  /**
   * ГД - Гражданское дело
   */
  @ApiProperty()
  @Column(DataType.STRING)
  gd: string | null;

  /**
   * ФИО должника
   */
  @ApiProperty()
  @Column(DataType.STRING)
  fio_dol: string | null;

  /**
   * КД - Кредитный договор
   */
  @ApiProperty()
  @Column(DataType.STRING)
  kd: string | null;

  /**
   * Исполнитель задачи
   */
  @ApiProperty()
  @Column(DataType.STRING)
  ispol_zadach: string | null;

  /**
   * ID исполнителя задачи
   */
  @ApiProperty()
  @Column(DataType.INTEGER)
  id_ispol_zadach: number | null;

  /**
   * ФИО взыскателя
   */
  @ApiProperty()
  @Column(DataType.STRING)
  vsisk: string | null;

  /**
   * ID взыскателя
   */
  @ApiProperty()
  @Column(DataType.INTEGER)
  id_vsisk: number | null;

  /**
   * Когда обработано
   */
  @ApiProperty()
  @AllowNull(false)
  @Column(DataType.DATE)
  kogda_otdano: Date;

  /**
   * Кто обработал
   */
  @ApiProperty()
  @AllowNull(false)
  @Column(DataType.STRING)
  kto_obrabotal: string;

  /**
   * ID кто обработал
   */
  @ForeignKey(() => User_DocMail)
  @ApiProperty()
  @Column(DataType.INTEGER)
  id_kto_obrabotal: number | null;
  @BelongsTo(() => User_DocMail, { targetKey: 'contact_id' })
  User?: BelongsToAttribute<NonAttribute<User_DocMail>>;

  /**
   * Скан
   */
  @ApiProperty()
  @Column(DataType.BOOLEAN)
  nal_skan: boolean | null;

  /**
   * ID Задачи
   */
  @ApiProperty()
  @Column(DataType.INTEGER)
  id_zadach: number | null;

  /**
   * Проверено взыскателем
   */
  @ApiProperty()
  @Default(false)
  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  check_vsisk: CreationOptional<boolean>;

  /**
   * Кем проверено
   */
  @ApiProperty()
  @Column(DataType.STRING)
  check_vsisk_name: string | null;

  /**
   * Тип почты
   */
  @ApiProperty()
  @Default(1)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  mode: CreationOptional<number>;

  /**
   * Истец, взыскатель
   */
  @ApiProperty()
  @Column(DataType.STRING)
  ist: string | null;

  /**
   * Дата вынесения документа
   */
  @ApiProperty()
  @Column(DataType.DATE)
  dateDoc: Date | null;

  /**
   * ЕЦП
   */
  @ApiProperty()
  @Column(DataType.STRING)
  ecp: string | null;

  /**
   * Откуда
   */
  @ApiProperty()
  @Column(DataType.STRING)
  adres: string | null;

  /**
   * На какую почту
   */
  @ApiProperty()
  @Column(DataType.STRING)
  mail: string | null;

  @ApiProperty({ type: () => [Doc_DocMail] })
  @HasMany(() => Doc_DocMail, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  Docs?: HasManyAttribute<NonAttribute<Doc_DocMail[]>, 'incoming_id'>;

  @HasMany(() => Logging_DocMail, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  Loggings?: HasManyAttribute<NonAttribute<Logging_DocMail[]>, 'parent_id'>;

  @HasOne(() => Arhive_DocMail, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  Arhive?: HasOneAttribute<NonAttribute<Arhive_DocMail>, 'incoming_id'>;
  @HasMany(() => Arhive_DocMail, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  Arhives?: HasManyAttribute<NonAttribute<Arhive_DocMail[]>, 'incoming_id'>;

  @Column(DataType.DATE)
  deletedAt: Date | null;
}
