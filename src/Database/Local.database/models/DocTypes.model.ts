import {
  AllowNull,
  AutoIncrement,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from '@contact/sequelize-typescript';

import { Doc } from './Doc.model';

@Table({ tableName: 'docTypes' })
export class DocTypes extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @AllowNull(false)
  @Unique
  @Column
  name: string;

  @AllowNull(false)
  @Column
  title: string;

  @HasMany(() => Doc)
  Doc: Doc[];
}
