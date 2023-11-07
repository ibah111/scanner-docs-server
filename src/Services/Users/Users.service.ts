import { InjectModel } from '@sql-tools/nestjs-sequelize';
import { Injectable } from '@nestjs/common';
import { Role } from 'src/Database/Local.database/models/Role.model';
import { User } from 'src/Database/Local.database/models/User.model';
import { User_Role } from 'src/Database/Local.database/models/User_Role.model';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User_Role, 'local') private modelUser_Role: typeof User_Role,
    @InjectModel(User, 'local') private modelUser: typeof User,
    @InjectModel(Role, 'local') private modelRole: typeof Role,
  ) {}
  async group(login: string) {
    const data = await this.modelUser.findOne({
      where: { login },
      include: [this.modelRole],
    });
    if (data) {
      return data.Roles!.map((value) => value.name);
    } else {
      return [];
    }
  }
}
