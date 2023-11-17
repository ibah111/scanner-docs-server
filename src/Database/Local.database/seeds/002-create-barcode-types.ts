import { QueryInterface } from '@sql-tools/sequelize';
import { MigrationFn } from 'umzug';

export const up: MigrationFn<QueryInterface> = ({ context }) =>
  context.sequelize.transaction((t) =>
    Promise.all([
      context.sequelize.models.BarcodeTypes.bulkCreate(
        [
          {
            id: 1,
            name: 'Doc',
            title: 'Документ',
          },
          {
            id: 2,
            name: 'Box',
            title: 'Короб',
          },
        ],
        {
          transaction: t,
        },
      ),
    ]),
  );
