import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger';
import { CodesService } from './Codes.service';
import { CanGuard } from '../../Modules/CASL/Can.guard';
import { AuthGuard } from '../../Modules/Guards/auth.guard';
import { DeleteBarcodeInput } from './Codes.input';

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

  @Delete('deleteCode')
  async deleteCode(
    @Body() body: DeleteBarcodeInput,
    @Headers() headers: Record<string, string>,
  ) {
    const token = headers.token;
    return this.codesService.deleteCode(body, token);
  }
}
