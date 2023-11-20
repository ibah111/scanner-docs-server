import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import {
  Auth,
  AuthGuard,
  AuthUserSuccess,
} from 'src/Modules/Guards/auth.guard';
import { DataInput } from './Data.input';
import { DataService } from './Data.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Data')
@Controller('data')
@UseGuards(AuthGuard)
export class DataController {
  constructor(private dataService: DataService) {}

  @HttpCode(200)
  @Post()
  async get(@Body() body: DataInput, @Auth() user: AuthUserSuccess) {
    return await this.dataService.get(body, user);
  }
}
