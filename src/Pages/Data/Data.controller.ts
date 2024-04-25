import { Controller, HttpCode, Get, UseGuards, Param } from '@nestjs/common';
import { Auth, AuthGuard, AuthResult } from 'src/Modules/Guards/auth.guard';
import { DataService } from './Data.service';
import { ApiBasicAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CanGuard } from '../../Modules/CASL/Can.guard';

@ApiTags('Data')
@Controller('data')
@UseGuards(AuthGuard)
@UseGuards(CanGuard)
@ApiBasicAuth()
export class DataController {
  constructor(private dataService: DataService) {}

  @ApiOperation({
    summary: 'АПИ сканирования',
    description:
      'Клиент при сканировании обращается по этому АПИ, отдавая последовательность баркода',
  })
  @HttpCode(200)
  @Get(':code')
  async scan(@Param('code') code: string, @Auth() auth: AuthResult) {
    return await this.dataService.getScan(code, auth);
  }
}
