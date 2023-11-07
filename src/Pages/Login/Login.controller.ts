import { Controller, Post, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../Modules/Guards/Roles.guard';
import { Auth, AuthGuard, AuthResult } from '../../Modules/Guards/auth.guard';
import { LoginOutput } from './Login.output';

@Controller('login')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard)
export class LoginController {
  @Post()
  login(@Auth() auth: AuthResult): LoginOutput {
    return {
      ...auth.user,
      local_id: auth.userLocal?.id as number,
      roles: auth.userLocal?.Roles?.map((Role) => Role.name) as string[],
    };
  }
}
