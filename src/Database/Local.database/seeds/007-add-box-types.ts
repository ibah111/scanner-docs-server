import { QueryInterface } from '@sql-tools/sequelize';
import { MigrationFn } from 'umzug';

const who_added_type = 'Добавлено скриптом/разработчиком';
export const up: MigrationFn<QueryInterface> = ({ context }) =>
  context.sequelize.transaction((transaction) =>
    Promise.all([
      context.sequelize.models.BoxTypes.bulkCreate(
        [
          {
            id: 1,
            title: 'Банкрот, не освобожден',
            who_added_type,
          },
          {
            id: 2,
            title: 'Банкрот, освобожден',
            who_added_type,
          },
          {
            id: 3,
            title: 'Архив',
            who_added_type,
          },
          {
            id: 4,
            title: 'Ждет определения',
            who_added_type,
          },
          {
            id: 5,
            title: 'Двойники',
            who_added_type,
          },
          {
            id: 6,
            title: 'Арест',
            who_added_type,
          },
          {
            id: 7,
            title: 'Ждет срок',
            who_added_type,
          },
          {
            id: 8,
            title: 'Срок истек',
            who_added_type,
          },
        ],
        {
          transaction,
        },
      ),
    ]),
  );
