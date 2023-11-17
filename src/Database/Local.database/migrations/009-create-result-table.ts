import { DataTypes, QueryInterface } from '@sql-tools/sequelize';
import { MigrationFn } from 'umzug';

export const up: MigrationFn<QueryInterface> = ({ context }) =>
  context.sequelize.transaction((t) =>
    Promise.all([
      context.createTable(
        'Result',
        {
          id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          kd: {
            type: DataTypes.STRING,
          },
          st_pnkt: {
            type: DataTypes.STRING,
          },
          reestr: {
            type: DataTypes.STRING,
          },
          fio_dol: {
            type: DataTypes.STRING,
          },
          date_post: {
            type: DataTypes.DATE,
          },
        },
        { transaction: t },
      ),
    ]),
  );
export const down: MigrationFn<QueryInterface> = ({ context }) =>
  context.sequelize.transaction((t) =>
    Promise.all([context.dropTable('Log', { transaction: t })]),
  );
