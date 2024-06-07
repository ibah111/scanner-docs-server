import { QueryInterface } from '@sql-tools/sequelize';
import { MigrationFn } from 'umzug';

export const up: MigrationFn<QueryInterface> = ({ context }) =>
  context.renameColumn('Docs', 'law_exec_id', 'law_case_id');

export const down: MigrationFn<QueryInterface> = ({ context }) =>
  context.renameColumn('Docs', 'law_case_id', 'law_exec_id');
