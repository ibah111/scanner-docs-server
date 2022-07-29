import { Body, Controller, Post } from '@nestjs/common';
import { CreateInput } from './Create.input';
import { CreateService } from './Create.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('create')
@ApiTags('creates')
export class CreateController {
  constructor(private createService: CreateService) {}
  @Post()
  async find(@Body() body: CreateInput) {
    return await this.createService.find(body);
  }
}
