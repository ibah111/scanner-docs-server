import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from '@contact/sequelize-typescript';
import { Barcode } from './Barcode.model';
import { BarcodeTypes } from './BarcodeTypes.model';
import { Box } from './Box.model';
import { DocData } from './DocData.model';
import { DocTypes } from './DocTypes.model';
import { Optional } from '@contact/sequelize';
export interface DocAttributes {
  id: number;
  title: string;
  contact_doc_id: number;
  mail_id: number;
  law_act_id: number;
  law_exec_id: number;
  date: Date;
  box_id: number;
  type_doc: number;
  type: number;
}
export interface DocCreationAttributes extends Optional<DocAttributes, 'id'> {}
@Table({ tableName: 'docs' })
export class Doc extends Model<DocAttributes, DocCreationAttributes> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @AllowNull(false)
  @Column
  title: string;

  @AllowNull(false)
  @Column
  contact_doc_id: number;

  @AllowNull(false)
  @Column
  mail_id: number;

  @Column
  law_act_id: number;

  @Column
  law_exec_id: number;

  @AllowNull(false)
  @Column
  date: Date;

  @AllowNull(true)
  @ForeignKey(() => Box)
  @Column
  box_id: number;
  @BelongsTo(() => Box)
  Box: Box;

  @AllowNull(false)
  @ForeignKey(() => DocTypes)
  @Column
  type_doc: number;
  @BelongsTo(() => DocTypes)
  DocTypes: DocTypes;

  @AllowNull(false)
  @ForeignKey(() => BarcodeTypes)
  @Column
  type: number;
  @BelongsTo(() => BarcodeTypes)
  BarcodeTypes: BarcodeTypes;

  @HasOne(() => DocData)
  DocData: DocData;

  @HasOne(() => Barcode, {
    constraints: false,
    scope: {
      type: 1,
    },
  })
  Barcode: Barcode;
}
