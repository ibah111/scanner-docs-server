import { Body, Controller, Post } from '@nestjs/common';
import { SendInput } from './Send.input';
import { SendService } from './Send.service'

@Controller('send')
export class SendController {
  constructor(private sendService: SendService) {}
  @Post()
  async send(@Body() body: SendInput) {
    return await this.sendService.send(body)
  }
}
