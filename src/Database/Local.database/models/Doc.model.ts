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
import { Box } from './Box.model';
import { DocData } from './DocData.model';
import { DocTypes } from './DocTypes.model';

@Table({ tableName: 'docs' })
export class Doc extends Model {
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

  @AllowNull(false)
  @ForeignKey(() => DocTypes)
  @Column
  type: number;
  @BelongsTo(() => DocTypes)
  DocTypes: DocTypes;

  @HasOne(() => DocData)
  DocData: DocData;

  @HasOne(() => Barcode, {
    scope: {
      type: 1,
    },
  })
  Barcode: Barcode;
}
