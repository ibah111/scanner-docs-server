import { QueryInterface } from '@sql-tools/sequelize';
import { MigrationFn } from 'umzug';

export const up: MigrationFn<QueryInterface> = ({ context }) =>
  context.sequelize.transaction((transaction) =>
    Promise.all([
      context.sequelize.models.BoxTypes.bulkCreate(
        [
          {
            id: 1,
            title: 'Банкрот, не освобожден',
          },
          {
            id: 2,
            title: 'Банкрот, освобожден',
          },
          {
            id: 3,
            title: 'Архив',
          },
          {
            id: 4,
            title: 'Ждет определения',
          },
          {
            id: 5,
            title: 'Двойники',
          },
          {
            id: 6,
            tite: 'Арест',
          },
          {
            id: 7,
            tite: 'Ждет срок',
          },
          {
            id: 8,
            tite: 'Срок истек',
          },
        ],
        {
          transaction,
        },
      ),
    ]),
  );
