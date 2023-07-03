import { InjectModel } from '@sql-tools/nestjs-sequelize';
import { Injectable } from '@nestjs/common';
import { Role } from 'src/Database/Local.database/models/Role.model';
import { User } from 'src/Database/Local.database/models/User.model';
import { User_Role } from 'src/Database/Local.database/models/User_Role.model';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User_Role) private modelUser_Role: typeof User_Role,
    @InjectModel(User) private modelUser: typeof User,
    @InjectModel(Role) private modelRole: typeof Role,
  ) {}
  async group(login: string) {
    const data = await this.modelUser.findOne({
      where: { login },
      include: [{ model: this.modelUser_Role, include: [this.modelRole] }],
    });
    if (data) {
      return data.Users_Roles!.map((value) => value.Role!.name);
    } else {
      return [];
    }
  }
}
