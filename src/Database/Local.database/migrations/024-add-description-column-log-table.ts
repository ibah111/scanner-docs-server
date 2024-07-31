import { DataTypes, QueryInterface } from '@sql-tools/sequelize';
import { MigrationFn } from 'umzug';

export const up: MigrationFn<QueryInterface> = ({ context }) =>
  context.addColumn('Log', 'description', {
    allowNull: true,
    type: DataTypes.STRING,
  });

export const down: MigrationFn<QueryInterface> = ({ context }) =>
  context.removeColumn('Log', 'description');
