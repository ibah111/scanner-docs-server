import { DataTypes, QueryInterface } from '@sql-tools/sequelize';
import { MigrationFn } from 'umzug';

export const up: MigrationFn<QueryInterface> = ({ context }) =>
  context.removeColumn('Docs', 'barcode_type');

export const down: MigrationFn<QueryInterface> = ({ context }) =>
  context.addColumn('Docs', 'barcode_type', {
    type: DataTypes.INTEGER,
  });
