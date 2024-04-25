import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateInput } from './Create.input';
import { CreateService } from './Create.service';
import { Auth, AuthGuard, AuthResult } from 'src/Modules/Guards/auth.guard';
import { ApiBasicAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CanGuard } from '../../Modules/CASL/Can.guard';
@ApiTags('Create')
@Controller('create')
@UseGuards(AuthGuard)
@UseGuards(CanGuard)
@ApiBasicAuth()
export class CreateController {
  constructor(private createService: CreateService) {}
  @ApiOperation({
    summary: 'Это апи вызывается при добавлении документа в DO-Mail-e',
    description:
      'В DocAdder при добавлении указываются данные для почты. Если при добавлении был распевчатан баркод, то при получении сигнала, почта общается с данной АПИ, и данная АПИ создает баркод на отслеживание',
  })
  @Post()
  async create(@Body() body: CreateInput, @Auth() auth: AuthResult) {
    return await this.createService.create(body, auth);
  }
}
