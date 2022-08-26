import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { OpenHistoryInput } from './OpenHistory.input';
import { OpenHistoryService } from './OpenHistoryService';

@Controller('openHistory')
export class OpenHistoryController {
  constructor(private openHistoryService: OpenHistoryService) {}

  @HttpCode(200)
  @Post()
  async find(@Body() body: OpenHistoryInput) {
    return await this.openHistoryService.find(body);
  }
}
