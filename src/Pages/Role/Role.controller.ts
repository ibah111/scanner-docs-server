import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/Modules/Guards/auth.guard';
import {
  GetUsersInput,
  RoleInputAddRole,
  RoleInputRemoveRole,
} from './Role.input';
import { RoleService } from './Role.service';
import { CanGuard } from '../../Modules/CASL/Can.guard';
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Role')
@Controller('role')
@UseGuards(AuthGuard)
@UseGuards(CanGuard)
@ApiBasicAuth()
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @HttpCode(200)
  @Post('get')
  async get(@Body() body: GetUsersInput) {
    return await this.roleService.get(body);
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

  @Get('getRoles')
  async getRoles() {
    return await this.roleService.getRoles();
  }

  @Get('getUser/:id')
  async getUser(@Param('id') id: number) {
    return await this.roleService.getUser(id);
  }
}
