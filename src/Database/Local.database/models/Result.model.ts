import {
  AllowNull,
  AutoIncrement,
  Column,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from '@contact/sequelize-typescript';
import { DocData } from './DocData.model';

@Table({ tableName: 'Result' })
export class Result extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @AllowNull(true)
  @Column
  kd: string;
  @AllowNull(true)
  @Column
  st_pnkt: string;

  @AllowNull(false)
  @Column
  reestr: string;

  @AllowNull(false)
  @Column
  fio_dol: string;

  @AllowNull(false)
  @Column
  date_post: Date;

  @HasOne(() => DocData)
  DocData: DocData;
}
