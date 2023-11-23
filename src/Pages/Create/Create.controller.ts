import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateInput } from './Create.input';
import { CreateService } from './Create.service';
import { Auth, AuthGuard, AuthResult } from 'src/Modules/Guards/auth.guard';
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger';
import { CanGuard } from '../../Modules/CASL/Can.guard';
@ApiTags('Create')
@Controller('create')
@UseGuards(AuthGuard)
@UseGuards(CanGuard)
@ApiBasicAuth()
export class CreateController {
  constructor(private createService: CreateService) {}
  @Post()
  async find(@Body() body: CreateInput, @Auth() auth: AuthResult) {
    return await this.createService.create(body, auth);
  }
}
