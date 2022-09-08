import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/Modules/Guards/auth.guard';
import { OpenRowsBoxInput } from './OpenRowsBox.input';
import { OpenRowsBoxService } from './OpenRowsBox.service';

@Controller('openRowsBox')
@UseGuards(AuthGuard)
export class OpenRowsBoxController {
  constructor(private readonly openRowsBoxService: OpenRowsBoxService) {}
  @HttpCode(200)
  @Post()
  async find(@Body() body: OpenRowsBoxInput) {
    return await this.openRowsBoxService.find(body);
  }
}
