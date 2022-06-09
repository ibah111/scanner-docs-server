import {
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

  @Column
  title: string;

  @Column
  contact_doc_id: number;

  @Column
  law_act_id: number;

  @Column
  law_exec_id: number;

  @Column
  date: Date;

  @HasOne(() => Barcode)
  Barcode: Barcode;
}
