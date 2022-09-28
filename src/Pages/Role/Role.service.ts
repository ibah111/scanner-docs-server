import { InjectModel } from '@contact/nestjs-sequelize';
import { Injectable } from '@nestjs/common';
import { Role } from 'src/Database/Local.database/models/Role.model';
import { User } from 'src/Database/Local.database/models/User.model';
import { User_Role } from 'src/Database/Local.database/models/User_Role.model';
import { RoleInputAddRole } from './Role.input';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(User) private readonly modelUser: typeof User,
    @InjectModel(Role) private readonly modelRole: typeof Role,
    @InjectModel(User_Role) private readonly modelUser_Role: typeof User_Role,
  ) {}
  async get() {
    return {
      roles: await this.modelRole.findAll(),
      users: await this.modelUser.findAll({
        include: [{ model: this.modelUser_Role, include: [this.modelRole] }],
      }),
    };
  }
  async removeRole(id: number) {
    const role = await this.modelUser_Role.findByPk(id);
    await role.destroy();
    return true;
  }
  async addRole(body: RoleInputAddRole) {
    await this.modelUser_Role.create({ ...body });
    return true;
  }
}
