import { InjectModel } from '@sql-tools/nestjs-sequelize';
import { Injectable } from '@nestjs/common';
import { Role } from 'src/Database/Local.database/models/Role.model';
import { User } from 'src/Database/Local.database/models/User.model';
import { User_Role } from 'src/Database/Local.database/models/User_Role.model';
import { GetUsersInput, RoleInputAddRole } from './Role.input';
import { userListColumns } from '../../utils/Columns/UserList';
import Filter from '../../utils/Filter';
import { GridFilterModel, GridSortModel } from '@mui/x-data-grid-premium';
import Sort from '../../utils/Sort';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(User, 'local') private readonly modelUser: typeof User,
    @InjectModel(Role, 'local') private readonly modelRole: typeof Role,
    @InjectModel(User_Role, 'local')
    private readonly modelUser_Role: typeof User_Role,
  ) {}
  async get(body: GetUsersInput) {
    const columns = userListColumns();
    const filter = (filter: GridFilterModel) => Filter(filter, columns);
    const sorter = (sort: GridSortModel) => Sort(sort, columns);
    return await this.modelUser.findAndCountAll({
      include: [
        {
          model: this.modelRole,
        },
      ],
      where: filter(body.filterModel),
      order: sorter(body.sortModel),
      limit: body.pageSize,
      offset: body.page * body.pageSize,
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
}
