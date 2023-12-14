import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CodesService } from './Codes.service';

@ApiTags('Codes')
@Controller('codes')
// @ApiBasicAuth()
export class CodesController {
  constructor(private codesService: CodesService) {}

  @Get(':id')
  async getCodes(@Param('id') id: number) {
    return this.codesService.getCodes(id);
  }
}
