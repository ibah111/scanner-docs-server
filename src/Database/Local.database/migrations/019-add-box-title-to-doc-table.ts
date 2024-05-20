import { DataTypes, QueryInterface } from '@sql-tools/sequelize';
import { MigrationFn } from 'umzug';

export const up: MigrationFn<QueryInterface> = ({ context }) =>
  context.addColumn('Barcodes', 'box_type_id', {
    allowNull: true,
    type: DataTypes.INTEGER,
  });

export const down: MigrationFn<QueryInterface> = ({ context }) =>
  context.removeColumn('Barcodes', 'box_type_id');
