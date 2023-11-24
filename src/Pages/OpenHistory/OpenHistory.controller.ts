import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
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
  @Post()
  async openHistory(@Body() code: string) {
    return await this.openHistoryService.openHistory(code);
  }
}
