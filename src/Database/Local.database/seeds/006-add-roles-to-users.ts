import { QueryInterface } from '@sql-tools/sequelize';
import { MigrationFn } from 'umzug';

export const up: MigrationFn<QueryInterface> = ({ context }) =>
  context.sequelize.transaction((t) =>
    Promise.all([
      context.sequelize.models.User_Role.bulkCreate(
        [
          {
            id: 1,
            user_id: 1,
            role_id: 1,
          },
          {
            id: 2,
            user_id: 1,
            role_id: 2,
          },
          {
            id: 3,
            user_id: 1,
            role_id: 3,
          },
          {
            id: 4,
            user_id: 1,
            role_id: 4,
          },
        ],

        {
          transaction: t,
        },
      ),
    ]),
  );
