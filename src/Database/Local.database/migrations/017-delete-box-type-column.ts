import { DataTypes, QueryInterface } from '@sql-tools/sequelize';
import { MigrationFn } from 'umzug';

export const up: MigrationFn<QueryInterface> = ({ context }) =>
  context.removeColumn('Barcodes', 'type');

export const down: MigrationFn<QueryInterface> = ({ context }) =>
  context.addColumn('Barcodes', 'type', {
    type: DataTypes.INTEGER,
  });
