import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/Modules/Guards/auth.guard';
import { RoleInputAddRole, RoleInputRemoveRole } from './Role.input';
import { RoleService } from './Role.service';
import { CanGuard } from '../../Modules/CASL/Can.guard';

@Controller('role')
@UseGuards(CanGuard)
@UseGuards(AuthGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @HttpCode(200)
  @Post('get')
  async get() {
    return await this.roleService.get();
  }
  @HttpCode(200)
  @Post('removeRole')
  async removeRole(@Body() body: RoleInputRemoveRole) {
    return await this.roleService.removeRole(body.id);
  }
  @Post('addRole')
  async addRole(@Body() body: RoleInputAddRole) {
    return await this.roleService.addRole(body);
  }
}
