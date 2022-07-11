import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  Auth,
  AuthGuard,
  AuthUserSuccess,
} from 'src/Modules/Guards/auth.guard';
import { SendInput } from './Send.input';
import { SendService } from './Send.service';

@Controller('send')
@UseGuards(AuthGuard)
export class SendController {
  constructor(private sendService: SendService) {}
  @Post()
  async send(@Body() body: SendInput, @Auth() user: AuthUserSuccess) {
    return await this.sendService.send(body, user);
  }
}
