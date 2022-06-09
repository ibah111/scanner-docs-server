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
import { User } from './User.model';

@Table({ tableName: 'Departs' })
export class Depart extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  bitrix_id: number;

  @Unique
  @Column
  name: string;

  @Column
  title: string;

  @Column
  parent_id: number;

  @HasMany(() => Barcode)
  Barcodes: Barcode[];

  @HasMany(() => User)
  Users: User[];
}
