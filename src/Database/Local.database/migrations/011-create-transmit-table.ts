import { DataTypes, QueryInterface } from '@sql-tools/sequelize';
import { MigrationFn } from 'umzug';

export const up: MigrationFn<QueryInterface> = ({ context }) =>
  context.sequelize.transaction((t) =>
    Promise.all([
      context.createTable(
        'Transmits',
        {
          id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          },
          doc_data_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          sender: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          date_send: {
            type: DataTypes.DATE,
            allowNull: false,
          },
          where_send: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          date_return: {
            type: DataTypes.DATE,
          },
        },
        { transaction: t },
      ),
    ]),
  );
export const down: MigrationFn<QueryInterface> = ({ context }) =>
  context.sequelize.transaction((t) =>
    Promise.all([context.dropTable('Status', { transaction: t })]),
  );
