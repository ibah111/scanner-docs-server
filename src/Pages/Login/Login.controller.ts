import { Controller, Post, UseGuards } from '@nestjs/common';
import {
  Auth,
  AuthGuard,
  AuthUserSuccess,
} from 'src/Modules/Guards/auth.guard';
import { LoginService } from './Login.service';

@Controller('login')
@UseGuards(AuthGuard)
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @Post()
  login(@Auth() user: AuthUserSuccess) {
    return this.loginService.login(user);
  }
}
