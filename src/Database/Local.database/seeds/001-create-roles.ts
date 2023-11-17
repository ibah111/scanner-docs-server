import { QueryInterface } from '@sql-tools/sequelize';
import { MigrationFn } from 'umzug';

export const up: MigrationFn<QueryInterface> = ({ context }) =>
  context.sequelize.transaction((t) =>
    Promise.all([
      context.sequelize.models.Role.bulkCreate(
        [
          { id: 1, name: 'admin', title: 'Администратор' },
          { id: 2, name: 'sender', title: 'Отправщик' },
          { id: 3, name: 'viewer_logs', title: 'Просмотрщик логов' },
          {
            id: 4,
            name: 'former_box',
            title: 'Формировщик коробки',
          },
        ],
        { transaction: t },
      ),
    ]),
  );
