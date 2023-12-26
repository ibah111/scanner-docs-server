import { InjectModel } from '@sql-tools/nestjs-sequelize';
import { Role } from 'src/Database/Local.database/models/Role.model';
import { User } from 'src/Database/Local.database/models/User.model';
import { User_Role } from 'src/Database/Local.database/models/User_Role.model';
import { GetUsersInput, RoleInputAddRole } from './Role.input';
import { userListColumns } from '../../utils/Columns/UserList';
import { getTableUtils } from '../../utils/getTableUtils';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(User, 'local') private readonly modelUser: typeof User,
    @InjectModel(Role, 'local') private readonly modelRole: typeof Role,
    @InjectModel(User_Role, 'local')
    private readonly modelUser_Role: typeof User_Role,
  ) {}
  async get({ filterModel, paginationModel, sortModel }: GetUsersInput) {
    const columns = userListColumns();
    const util = getTableUtils(columns);
    const where = util.getFilter('Users', filterModel);
    const order = util.getSort(sortModel);
    const whereRoles = util.getFilter('Roles', filterModel);
    const roleKeys = Reflect.ownKeys(whereRoles);
    return await this.modelUser.findAndCountAll({
      include: [
        {
          model: this.modelRole,
          required: roleKeys.length === 0 ? false : true,
          where: whereRoles,
        },
      ],
      where,
      order,
      limit: paginationModel.pageSize,
      offset: paginationModel.page * paginationModel.pageSize,
    });
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

  async getRoles() {
    return await this.modelRole.findAll();
  }

  async getUser(id: number) {
    const user = await this.modelUser.findOne({
      where: {
        id,
      },
      include: [
        {
          model: this.modelRole,
        },
      ],
    });
    const user_roles = user?.Roles?.map((i) => i.id);
    const notInRoles = await this.modelRole.findAll({
      where: {
        id: {
          [Op.notIn]: user_roles,
        },
      },
    });
    return {
      user,
      notInRoles,
    };
  }
}
