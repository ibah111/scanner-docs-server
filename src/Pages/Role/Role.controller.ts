import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/Modules/Guards/auth.guard';
import { Roles, RolesGuard } from 'src/Modules/Guards/Roles.guard';
import { RoleInputAddRole, RoleInputRemoveRole } from './Role.input';
import { RoleService } from './Role.service';

@Controller('role')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  @Roles('admin')
  @HttpCode(200)
  @Post('get')
  async get() {
    return await this.roleService.get();
  }
  @Roles('admin')
  @HttpCode(200)
  @Post('removeRole')
  async removeRole(@Body() body: RoleInputRemoveRole) {
    return await this.roleService.removeRole(body.id);
  }
  @Roles('admin')
  @Post('addRole')
  async addRole(@Body() body: RoleInputAddRole) {
    return await this.roleService.addRole(body);
  }
}
