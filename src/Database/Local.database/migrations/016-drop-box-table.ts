import { DataTypes, QueryInterface } from '@sql-tools/sequelize';
import { MigrationFn } from 'umzug';

export const up: MigrationFn<QueryInterface> = ({ context }) =>
  context.dropTable('Box');

export const down: MigrationFn<QueryInterface> = ({ context }) =>
  context.createTable('Box', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    type: { type: DataTypes.INTEGER },
    user: { type: DataTypes.INTEGER },
    depart: { type: DataTypes.INTEGER },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });
