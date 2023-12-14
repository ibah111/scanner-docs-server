import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger';
import { CodesService } from './Codes.service';
import { CanGuard } from '../../Modules/CASL/Can.guard';
import { AuthGuard } from '../../Modules/Guards/auth.guard';

@ApiTags('Codes')
@Controller('codes')
@UseGuards(AuthGuard)
@UseGuards(CanGuard)
@ApiBasicAuth()
export class CodesController {
  constructor(private codesService: CodesService) {}

  @Get(':id')
  async getCodes(@Param('id') id: number) {
    return this.codesService.getCodes(id);
  }
}
