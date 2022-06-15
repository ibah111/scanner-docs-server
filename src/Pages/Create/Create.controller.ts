import { Body, Controller, HttpCode, Get, Post } from '@nestjs/common';
import { CreateInput } from './Create.input';
import { CreateService } from './Create.service';

@Controller('create')
export class CreateController {
  constructor(private createService: CreateService) {}

  @HttpCode(200)
  @Post()
  async find(@Body() body: CreateInput) {
    return await this.createService.find(body);
  }
}
