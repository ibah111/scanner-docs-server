import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Auth, AuthGuard, AuthResult } from 'src/Modules/Guards/auth.guard';
import { SendInput } from './Send.input';
import { SendService } from './Send.service';
import { CanGuard } from '../../Modules/CASL/Can.guard';
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Send')
@Controller('send')
@UseGuards(AuthGuard)
@UseGuards(CanGuard)
@ApiBasicAuth()
export class SendController {
  constructor(private sendService: SendService) {}
  @Post()
  async send(@Body() body: SendInput, @Auth() auth: AuthResult) {
    return await this.sendService.send(body, auth);
  }
}
