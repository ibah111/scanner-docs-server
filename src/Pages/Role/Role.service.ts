import { InjectModel } from '@contact/nestjs-sequelize';
import { User_Role } from 'src/Database/Local.database/models/User_Role.model';
import { RoleInputAddRole, RoleInputRemoveRole } from './Role.input';

export class RoleService {
  constructor(
    @InjectModel(User_Role) private readonly modelUser_Role: typeof User_Role,
  ) {}

  async get() {
    return await this.modelUser_Role.findAll();
  }

  async addRole(body: RoleInputAddRole) {
    await this.modelUser_Role.create({ ...body });
    return true;
  }
  async removeRole(id: number) {
    const user = await this.modelUser_Role.findByPk(id);
    await user.destroy();
    return true;
  }
}
