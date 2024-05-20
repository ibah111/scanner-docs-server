import { QueryInterface } from '@sql-tools/sequelize';
import { MigrationFn } from 'umzug';

export const up: MigrationFn<QueryInterface> = ({ context }) =>
  context.sequelize.transaction((t) =>
    Promise.all([
      context.sequelize.models.Status.bulkCreate(
        [
          {
            id: 1,
            name: 'Forming',
            title: 'Формирование',
          },
          {
            id: 2,
            name: 'Working',
            title: 'В работе',
          },
          {
            id: 3,
            name: 'Sending',
            title: 'Отправление',
          },
          {
            id: 4,
            name: 'Returning',
            title: 'Возврат',
          },
        ],
        {
          transaction: t,
        },
      ),
    ]),
  );
