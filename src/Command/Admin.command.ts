import { Command, CommandRunner } from 'nest-commander';
import { User } from '../Database/Local.database/models/User.model';
import { InjectModel } from '@sql-tools/nestjs-sequelize';
import { User_Role } from '../Database/Local.database/models/User_Role.model';
import { Role } from '../Database/Local.database/models/Role.model';
@Command({
  name: 'admin',
  arguments: '<login>',
  description: 'Insert login after command',
})
export class BasicCommand extends CommandRunner {
  constructor(
    @InjectModel(User, 'local') private readonly modelUser: typeof User,
    @InjectModel(User_Role, 'local')
    private readonly modelUserRole: typeof User_Role,
    @InjectModel(Role, 'local')
    private readonly modelRole: typeof Role,
  ) {
    super();
  }
  async run(logins: string[]): Promise<void> {
    for (const login of logins) {
      await this.addRole(login);
    }
  }

  async addRole(login: string): Promise<void> {
    const user = await this.modelUser.findOne({
      where: { login },
      rejectOnEmpty: true,
      logging: console.log,
    });

    const login_role = await this.modelUserRole.findAll({
      where: {
        user_id: user.id,
      },
      include: {
        model: this.modelRole,
      },
    });
    if (login_role) {
      throw Error(
        `Пользователю ${login}, присвоен(ы) роль(и) ${login_role
          .map((i) => i.Role!.title)
          .join(' ')}`,
      );
    } else {
      return await user.$add('Role', 1).then(() => {
        console.log(
          `Пользователь с логином ${login} добавлен в администраторы`,
        );
      });
    }
  }
}
