import { DataTypes, QueryInterface } from '@sql-tools/sequelize';
import { MigrationFn } from 'umzug';

export const up: MigrationFn<QueryInterface> = ({ context }) =>
  context.sequelize.transaction((t) =>
    Promise.all([
      context.createTable(
        'Users',
        {
          id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          f: {
            type: DataTypes.STRING,
          },
          i: {
            type: DataTypes.STRING,
          },
          o: {
            type: DataTypes.STRING,
          },
          login: { type: DataTypes.STRING, unique: true, allowNull: false },
          position: {
            type: DataTypes.STRING,
          },
          bitrix_id: {
            type: DataTypes.INTEGER,
          },
          depart: {
            type: DataTypes.INTEGER,
          },
          createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
          },
          updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
          },
        },
        { transaction: t },
      ),
    ]),
  );
export const down: MigrationFn<QueryInterface> = ({ context }) =>
  context.sequelize.transaction((t) =>
    Promise.all([context.dropTable('Users', { transaction: t })]),
  );
