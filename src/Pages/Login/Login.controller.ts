import { Controller, Post, UseGuards } from '@nestjs/common';
import {
  Auth,
  AuthGuard,
  AuthUserSuccess,
} from 'src/Modules/Guards/auth.guard';
import { Role, RolesGuard, RoleSuccess } from 'src/Modules/Guards/Roles.guard';
import { LoginService } from './Login.service';

@Controller('login')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard)
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @Post()
  login(@Auth() user: AuthUserSuccess, @Role() roles: RoleSuccess) {
    return this.loginService.login(user, roles);
  }
}
