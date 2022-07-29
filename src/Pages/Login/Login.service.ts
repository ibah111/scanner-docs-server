import { InjectModel } from '@contact/nestjs-sequelize';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/Database/Local.database/models/User.model';
import { AuthUserSuccess } from 'src/Modules/Guards/auth.guard';
import { RoleSuccess } from 'src/Modules/Guards/Roles.guard';

@Injectable()
export class LoginService {
  constructor(@InjectModel(User) private modelUser: typeof User) {}
  async login(user: AuthUserSuccess, roles: RoleSuccess) {
    const login = await this.modelUser.findOne({
      where: { email: user.login },
    });
    if (login) {
      return { ...user, roles };
    }
    throw new UnauthorizedException({
      message: 'Вас нет в контакте',
    });
  }
}
