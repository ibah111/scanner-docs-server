import { InjectModel } from '@contact/nestjs-sequelize';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Role } from 'src/Database/Local.database/models/Role.model';
import { User } from 'src/Database/Local.database/models/User.model';
import { User_Role } from 'src/Database/Local.database/models/User_Role.model';
import server from 'src/utils/server';
import { RoleInputAddRole, RoleInputAddUser } from './Role.input';

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
  async addUser(body: RoleInputAddUser) {
    const data_user = await this.modelUser;
    const res = (
      await axios({
        method: 'post',
        url: `${server()}/scripts/structure.php`,
        data: { action: 'user', token: server('token') },
      })
    ).data;
    const data = res?.result;
    const tmp = {};
    const users = await this.modelUser.findAll();
    const user_ids = users.map((user) => user.bitrix_id);

    for (const user of data) {
      if (user.login == body.login && !user_ids.includes(Number(user.id))) {
        data_user.create({
          bitrix_id: user.id,
          f: user.f,
          i: user.i,
          o: user.o,
          login: user.login,
          depart: Number(tmp[user.depart]),
          position: user.position,
        });
      }
    }
    return true;
  }
  async removeUser(id: number) {
    const user = await this.modelUser.findOne({
      where: { id },
      include: [this.modelUser_Role],
    });
    for (const value of user.Users_Roles) {
      await value.destroy();
    }
    await user.destroy();
    return true;
  }
}
