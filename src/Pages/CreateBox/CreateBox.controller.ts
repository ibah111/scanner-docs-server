import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/Modules/Guards/auth.guard';
import { CreateBoxInput } from './CreateBox.input';
import { CreateBoxService } from './CreateBox.service';

@Controller('createBox')
@UseGuards(AuthGuard)
export class CreateBoxController {
  constructor(private createBoxService: CreateBoxService) {}
  @Post()
  async find(@Body() body: CreateBoxInput) {
    return await this.createBoxService.find(body);
  }
}
