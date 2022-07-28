import { InjectModel } from '@contact/nestjs-sequelize';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/Database/Local.database/models/User.model';
import { AuthUserSuccess } from 'src/Modules/Guards/auth.guard';

@Injectable()
export class LoginService {
  constructor(@InjectModel(User) private modelUser: typeof User) {}
  async login(user: AuthUserSuccess) {
    const login = await this.modelUser.findOne({
      where: { email: user.login },
    });
    if (login) {
      return 'OK';
    }
    throw new UnauthorizedException({
      message: 'Вас нет в контакте',
    });
  }
}
