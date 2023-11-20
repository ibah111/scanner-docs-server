import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  Auth,
  AuthGuard,
  AuthUserSuccess,
} from 'src/Modules/Guards/auth.guard';
import { CreateBoxInput } from './CreateBox.input';
import { CreateBoxService } from './CreateBox.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('CreateBox')
@Controller('createBox')
@UseGuards(AuthGuard)
export class CreateBoxController {
  constructor(private createBoxService: CreateBoxService) {}
  @Post()
  async find(@Body() body: CreateBoxInput, @Auth() user: AuthUserSuccess) {
    return await this.createBoxService.find(body, user);
  }
}
