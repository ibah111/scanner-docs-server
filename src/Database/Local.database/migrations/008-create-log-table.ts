import { DataTypes, QueryInterface } from '@sql-tools/sequelize';
import { MigrationFn } from 'umzug';

export const up: MigrationFn<QueryInterface> = ({ context }) =>
  context.sequelize.transaction((t) =>
    Promise.all([
      context.createTable(
        'Log',
        {
          id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          user: {
            type: DataTypes.INTEGER,
          },
          doc_data_id: {
            type: DataTypes.INTEGER,
          },
          status: {
            type: DataTypes.INTEGER,
          },
          depart: {
            type: DataTypes.INTEGER,
          },
          transmit: {
            type: DataTypes.INTEGER,
          },
          date: {
            type: DataTypes.INTEGER,
          },
          createdAt: {
            type: DataTypes.BOOLEAN,
          },
          updatedAt: {
            type: DataTypes.BOOLEAN,
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
