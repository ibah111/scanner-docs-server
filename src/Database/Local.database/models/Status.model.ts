import {
  AutoIncrement,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from '@contact/sequelize-typescript';
import { Barcode } from './Barcode.model';
import { Log } from './Log.model';
@Table({ tableName: 'status' })
export class Status extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Unique
  @Column
  name: string;

  @Column
  title: string;

  @HasMany(() => Barcode)
  Barcodes: Barcode[];

  @HasMany(() => Log)
  Logs: Log[];
}
