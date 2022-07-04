import { Body, Controller, HttpCode, Get, Post } from '@nestjs/common';
import { CreateInput } from './Create.input';
import { CreateService } from './Create.service';
import { ApiTags } from '@nestjs/swagger';


@Controller('create')
@ApiTags('creates')
export class CreateController {
  constructor(private createService: CreateService) {}

  @HttpCode(200)
  @Post()
  async find(@Body() body: CreateInput) {
    return await this.createService.find(body);
  }
}
