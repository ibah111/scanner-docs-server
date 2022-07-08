import { Body, Controller, Post } from '@nestjs/common';
import { SendInput } from './Send.input';

@Controller('send')
export class SendController {
  @Post()
  send(@Body() body: SendInput) {
    return 'Данные успешно отправлены';
  }
}
