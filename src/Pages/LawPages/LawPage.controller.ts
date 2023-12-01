import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger';
import { CanGuard } from '../../Modules/CASL/Can.guard';
import { AuthGuard } from '../../Modules/Guards/auth.guard';
import { LawPageService } from './LawPage.service';
import { LawPageInput } from './LawPage.input';

@ApiTags('LawPage')
@Controller('lawPage')
@UseGuards(CanGuard)
@UseGuards(AuthGuard)
@ApiBasicAuth()
export class LawPageController {
  constructor(private lawPageService: LawPageService) {}

  @Post('/getLawExec')
  async getLawExec(@Body() body: LawPageInput) {
    return this.lawPageService.findAllLawExec(body);
  }

  @Post('/getLawAct')
  async getLawAct(@Body() body: LawPageInput) {
    return this.lawPageService.findAllLawAct(body);
  }
}
