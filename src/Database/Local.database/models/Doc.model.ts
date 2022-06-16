import {
  AllowNull,
  AutoIncrement,
  Column,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from '@contact/sequelize-typescript';
import { Barcode } from './Barcode.model';

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

  @HasOne(() => Barcode)
  Barcode: Barcode;
}
