import { QueryInterface } from '@sql-tools/sequelize';
import { MigrationFn } from 'umzug';

const who_added_type = 'Добавлено скриптом/разработчиком';
export const up: MigrationFn<QueryInterface> = ({ context }) =>
  context.sequelize.transaction((transaction) =>
    Promise.all([
      context.sequelize.models.BoxTypes.bulkCreate(
        [
          {
            title: 'Подано',
            who_added_type,
          },
        ],
        {
          transaction,
        },
      ),
    ]),
  );
