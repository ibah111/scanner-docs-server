import { DataTypes, QueryInterface } from '@sql-tools/sequelize';
import { MigrationFn } from 'umzug';

export const up: MigrationFn<QueryInterface> = ({ context }) =>
  context.createTable('DocData', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    parent_id: { type: DataTypes.INTEGER },
    status: { type: DataTypes.INTEGER },
    user: { type: DataTypes.INTEGER },
    depart: { type: DataTypes.INTEGER },
    result: { type: DataTypes.INTEGER },
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
export const down: MigrationFn<QueryInterface> = ({ context }) =>
  context.dropTable('DocData');
