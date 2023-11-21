import { Controller, HttpCode, Get, UseGuards, Param } from '@nestjs/common';
import { Auth, AuthGuard, AuthResult } from 'src/Modules/Guards/auth.guard';
import { DataService } from './Data.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Data')
@Controller('data')
@UseGuards(AuthGuard)
export class DataController {
  constructor(private dataService: DataService) {}

  @HttpCode(200)
  @Get(':code')
  async get(@Param('code') code: string, @Auth() auth: AuthResult) {
    return await this.dataService.get(code, auth);
  }
}
