import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateInput } from './Create.input';
import { CreateService } from './Create.service';
import { ApiTags } from '@nestjs/swagger';
import {
  Auth,
  AuthGuard,
  AuthUserSuccess,
} from 'src/Modules/Guards/auth.guard';

@Controller('create')
@ApiTags('creates')
@UseGuards(AuthGuard)
export class CreateController {
  constructor(private createService: CreateService) {}
  @Post()
  async find(@Body() body: CreateInput, @Auth() user: AuthUserSuccess) {
    return await this.createService.find(body, user);
  }
}
