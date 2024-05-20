import { QueryInterface } from '@sql-tools/sequelize';
import { MigrationFn } from 'umzug';

export const up: MigrationFn<QueryInterface> = ({ context }) =>
  context.sequelize.transaction((t) =>
    Promise.all([
      context.sequelize.models.DocTypes.bulkCreate(
        [
          {
            id: 1,
            name: 'List',
            title: 'Исполнительный лист',
          },
          {
            id: 2,
            name: 'Order',
            title: 'Судебный приказ',
          },
        ],
        {
          transaction: t,
        },
      ),
    ]),
  );
