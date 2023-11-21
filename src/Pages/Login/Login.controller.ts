import { Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { Auth, AuthGuard, AuthResult } from '../../Modules/Guards/auth.guard';
import { CanGuard } from '../../Modules/CASL/Can.guard';
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Login')
@Controller('login')
@UseGuards(AuthGuard)
@UseGuards(CanGuard)
@ApiBasicAuth()
export class LoginController {
  @HttpCode(200)
  @Post()
  login(@Auth() auth: AuthResult) {
    return {
      ...auth.user,
      local_id: auth.userLocal?.id as number,
      roles: auth.userLocal?.Roles?.map((r) => r.name) || [],
    };
  }
}
