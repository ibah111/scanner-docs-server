import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Auth, AuthGuard, AuthResult } from 'src/Modules/Guards/auth.guard';
import { CreateBoxService } from './CreateBox.service';
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger';
import { CanGuard } from '../../Modules/CASL/Can.guard';
import { CreateBoxInput } from './CreateBox.input';

@ApiTags('CreateBox')
@Controller('createBox')
@UseGuards(AuthGuard)
@UseGuards(CanGuard)
@ApiBasicAuth()
export class CreateBoxController {
  constructor(private createBoxService: CreateBoxService) {}
  @Post()
  async find(
    @Body() { list, boxTitle }: CreateBoxInput,
    @Auth() auth: AuthResult,
  ) {
    return await this.createBoxService.find(
      {
        list,
        boxTitle,
      },
      auth,
    );
  }
}
