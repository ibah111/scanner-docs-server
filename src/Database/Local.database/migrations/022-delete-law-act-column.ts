import { DataTypes, QueryInterface } from '@sql-tools/sequelize';
import { MigrationFn } from 'umzug';

export const up: MigrationFn<QueryInterface> = ({ context }) =>
  context.removeColumn('Docs', 'law_act_id');

export const down: MigrationFn<QueryInterface> = ({ context }) =>
  context.addColumn('Docs', 'law_act_id', {
    type: DataTypes.INTEGER,
  });
