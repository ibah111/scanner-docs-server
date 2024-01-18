import {
  BelongsToManyAttribute,
  CreateLiteralAssociation,
  HasManyAttribute,
} from '@sql-tools/association-literal';
import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute,
} from '@sql-tools/sequelize';
import {
  AllowNull,
  AutoIncrement,
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from '@sql-tools/sequelize-typescript';
import { Arhive_DocMail } from './Arhive_DocMail.model';
import { Incoming_DocMail } from './Incoming_DocMail.model';
import { Role_DocMail } from './Role_DocMail.model';
import { User_Role_DocMail } from './User_Role_DocMail.model';

@Table({ tableName: 'Users' })
export class User_DocMail extends Model<
  InferAttributes<User_DocMail>,
  InferCreationAttributes<User_DocMail>,
  CreateLiteralAssociation<User_DocMail>
> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: CreationOptional<number>;
  @Unique
  @AllowNull(false)
  @Column(DataType.INTEGER)
  bitrix_id: number;

  @Unique
  @AllowNull(false)
  @Column(DataType.INTEGER)
  contact_id: number;

  @Column(DataType.STRING)
  f: string | null;

  @Column(DataType.STRING)
  i: string | null;

  @Column(DataType.STRING)
  o: string | null;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  login: string;

  @Column(DataType.STRING)
  position: string | null;

  @BelongsToMany(() => Role_DocMail, () => User_Role_DocMail)
  Roles: BelongsToManyAttribute<
    NonAttribute<Array<Role_DocMail & { User_Role?: User_Role_DocMail }>>,
    'id'
  >;
  @HasMany(() => Incoming_DocMail, { sourceKey: 'contact_id' })
  Incomings: HasManyAttribute<
    NonAttribute<Incoming_DocMail[]>,
    'id_kto_obrabotal'
  >;

  @HasMany(() => Incoming_DocMail, { sourceKey: 'bitrix_id' })
  Arhives: HasManyAttribute<NonAttribute<Arhive_DocMail[]>, 'user'>;
}
