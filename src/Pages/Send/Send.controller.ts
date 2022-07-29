import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  Auth,
  AuthGuard,
  AuthUserSuccess,
} from 'src/Modules/Guards/auth.guard';
import { Roles, RolesGuard } from 'src/Modules/Guards/Roles.guard';
import { SendInput } from './Send.input';
import { SendService } from './Send.service';

@Controller('send')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard)
export class SendController {
  constructor(private sendService: SendService) {}
  @Roles('sender')
  @Post()
  async send(@Body() body: SendInput, @Auth() user: AuthUserSuccess) {
    return await this.sendService.send(body, user);
  }
}
