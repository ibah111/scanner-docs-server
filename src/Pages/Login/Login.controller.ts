import { Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../Modules/Guards/Roles.guard';
import { Auth, AuthGuard, AuthResult } from '../../Modules/Guards/auth.guard';

@Controller('login')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard)
export class LoginController {
  @HttpCode(200)
  @Post()
  login(@Auth() auth: AuthResult) {
    return {
      ...auth.user,
      local_id: auth.userLocal?.id as number,
      roles: auth.userLocal.Roles?.map((r) => r.name) || [],
    };
  }
}
