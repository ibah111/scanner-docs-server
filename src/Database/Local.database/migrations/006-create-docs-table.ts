import { DataTypes, QueryInterface } from '@sql-tools/sequelize';
import { MigrationFn } from 'umzug';

export const up: MigrationFn<QueryInterface> = ({ context }) =>
  context.sequelize.transaction((t) =>
    Promise.all([
      context.createTable(
        'Docs',
        {
          id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          title: {
            type: DataTypes.STRING,
          },
          contact_doc_id: {
            type: DataTypes.INTEGER,
          },
          mail_id: {
            type: DataTypes.INTEGER,
          },
          law_act_id: {
            type: DataTypes.INTEGER,
          },
          law_exec_id: {
            type: DataTypes.INTEGER,
          },
          date: {
            type: DataTypes.DATE,
          },
          box_id: {
            type: DataTypes.INTEGER,
          },
          doc_type: {
            type: DataTypes.INTEGER,
          },
          barcode_type: {
            type: DataTypes.INTEGER,
          },
        },
        { transaction: t },
      ),
    ]),
  );
export const down: MigrationFn<QueryInterface> = ({ context }) =>
  context.sequelize.transaction((t) =>
    Promise.all([context.dropTable('DocData', { transaction: t })]),
  );
