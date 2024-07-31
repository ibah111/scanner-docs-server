import { QueryInterface } from '@sql-tools/sequelize';
import { MigrationFn } from 'umzug';

export const up: MigrationFn<QueryInterface> = ({ context }) =>
  context.sequelize.transaction((t) =>
    Promise.all([
      context.sequelize.models.Status.bulkCreate(
        [
          {
            id: 5,
            name: 'Deleted',
            title: 'Удалён',
          },
        ],
        {
          transaction: t,
        },
      ),
    ]),
  );
