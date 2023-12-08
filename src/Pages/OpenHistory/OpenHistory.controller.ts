import {
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { OpenHistoryService } from './OpenHistory.service';
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger';
import { CanGuard } from '../../Modules/CASL/Can.guard';
import { AuthGuard } from '../../Modules/Guards/auth.guard';

@ApiTags('OpenHistory')
@Controller('openHistory')
@UseGuards(AuthGuard)
@UseGuards(CanGuard)
@ApiBasicAuth()
export class OpenHistoryController {
  constructor(private openHistoryService: OpenHistoryService) {}

  @HttpCode(200)
  @Get(':code')
  async openHistory(@Param('code', ParseIntPipe) code: number) {
    return await this.openHistoryService.openHistory(code);
  }
}
