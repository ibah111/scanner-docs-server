import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { TestInput } from './Test.input';
import { TestService } from './Test.service';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}
  @HttpCode(200)
  @Post()
  async getting(@Body() body: TestInput) {
    return await this.testService.getting(body);
  }
}
