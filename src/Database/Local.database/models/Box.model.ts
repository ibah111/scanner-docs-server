import type {
  InferAttributes,
  InferCreationAttributes,
  ForeignKey as FK,
  CreationOptional,
  NonAttribute,
} from '@contact/sequelize';
import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from '@contact/sequelize-typescript';
import { Barcode } from './Barcode.model';
import { BarcodeTypes } from './BarcodeTypes.model';
import { Depart } from './Depart.model';
import { Doc } from './Doc.model';
import { User } from './User.model';
@Table({ tableName: 'Box' })
export class Box extends Model<
  InferAttributes<Box>,
  InferCreationAttributes<Box>
> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: CreationOptional<number>;

  @AllowNull(false)
  @ForeignKey(() => BarcodeTypes)
  @Column(DataType.INTEGER)
  type: FK<number>;
  @BelongsTo(() => BarcodeTypes)
  BarcodeTypes?: NonAttribute<BarcodeTypes>;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  user: FK<number>;
  @BelongsTo(() => User)
  User?: NonAttribute<User>;

  @AllowNull(false)
  @ForeignKey(() => Depart)
  @Column(DataType.INTEGER)
  depart: FK<number>;
  @BelongsTo(() => Depart)
  Depart?: NonAttribute<Depart>;

  @HasMany(() => Doc)
  Docs?: NonAttribute<Doc[]>;

  @HasOne(() => Barcode, {
    constraints: false,
    scope: {
      type: 2,
    },
  })
  Barcode?: NonAttribute<Barcode>;
}
