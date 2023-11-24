import { InjectModel } from '@sql-tools/nestjs-sequelize';
import { Injectable } from '@nestjs/common';
import { Role } from 'src/Database/Local.database/models/Role.model';
import { User } from 'src/Database/Local.database/models/User.model';
import { User_Role } from 'src/Database/Local.database/models/User_Role.model';
import { RoleInputAddRole } from './Role.input';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(User, 'local') private readonly modelUser: typeof User,
    @InjectModel(Role, 'local') private readonly modelRole: typeof Role,
    @InjectModel(User_Role, 'local')
    private readonly modelUser_Role: typeof User_Role,
  ) {}
  async get() {
    const users = await this.modelUser.findAll({
      include: [
        {
          model: this.modelRole,
        },
      ],
    });
    return users;
  }
  async removeRole(id: number) {
    const role = await this.modelUser_Role.findByPk(id);
    await role!.destroy();
    return true;
  }
  async addRole(body: RoleInputAddRole) {
    await this.modelUser_Role.create({ ...body });
    return true;
  }
}
