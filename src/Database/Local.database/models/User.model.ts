import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from '@contact/sequelize-typescript';
import { Barcode } from './Barcode.model';
import { Depart } from './Depart.model';
import { Log } from './Log.model';
@Table({ tableName: 'Users' })
export class User extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  f: string;

  @Column
  i: string;

  @Column
  o: string;

  @Unique
  @Column
  login: string;

  @Column
  position: string;

  @Unique
  @Column
  bitrix_id: number;

  @ForeignKey(() => Depart)
  @Column
  depart: number;
  @BelongsTo(() => Depart)
  Depart: Depart;

  @HasMany(() => Barcode)
  Barcodes: Barcode[];

  @HasMany(() => Log)
  Logs: Log[];
}
