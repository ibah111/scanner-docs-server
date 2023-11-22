import { QueryInterface } from '@sql-tools/sequelize';
import { MigrationFn } from 'umzug';

export const up: MigrationFn<QueryInterface> = ({ context }) =>
  context.sequelize.transaction((t) =>
    Promise.all([
      context.sequelize.models.User.bulkCreate(
        [
          {
            id: 1,
            bitrix_id: 4018,
            login: 'baledin@zakon43.ru',
            department: 39,
            position: 'Младший разработчик',
            firstname: 'Иван',
            secondname: 'Балезин',
            thirdname: '',
          },
        ],
        {
          transaction: t,
        },
      ),
    ]),
  );
