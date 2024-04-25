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
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from '@sql-tools/sequelize-typescript';
import { Barcode } from './Barcode.model';
import { BarcodeTypes } from './BarcodeTypes.model';
import { Box } from './Box.model';
import { DocData } from './DocData.model';
import { DocTypes } from './DocTypes.model';
@Table({ tableName: 'Docs', timestamps: false })
export class Doc extends Model<
  InferAttributes<Doc>,
  InferCreationAttributes<Doc>
> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: CreationOptional<number>;

  @AllowNull(false)
  @Column(DataType.STRING)
  title: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  contact_doc_id: FK<number>;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  mail_id: FK<number>;

  @Column(DataType.INTEGER)
  law_act_id: FK<number | null>;

  @Column(DataType.INTEGER)
  law_exec_id: FK<number | null>;

  @AllowNull(false)
  @Column(DataType.DATE)
  date: Date;

  @ForeignKey(() => Box)
  @Column(DataType.INTEGER)
  box_id: FK<number | null>;
  @BelongsTo(() => Box)
  Box?: NonAttribute<Box>;

  @AllowNull(false)
  @ForeignKey(() => DocTypes)
  @Column(DataType.INTEGER)
  doc_type: FK<number>;
  @BelongsTo(() => DocTypes)
  DocTypes?: NonAttribute<DocTypes>;

  @AllowNull(false)
  @ForeignKey(() => BarcodeTypes)
  @Column(DataType.INTEGER)
  barcode_type: FK<number>;
  @BelongsTo(() => BarcodeTypes)
  BarcodeTypes?: NonAttribute<BarcodeTypes>;

  @HasOne(() => DocData)
  DocData?: NonAttribute<DocData>;

  @HasOne(() => Barcode, {
    constraints: false,
  })
  Barcode?: NonAttribute<Barcode>;
}
