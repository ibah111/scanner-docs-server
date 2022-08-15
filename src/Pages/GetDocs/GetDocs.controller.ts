import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/Modules/Guards/auth.guard';
import { GetDocsInput } from './GetDocs.input';
import { GetDocsService } from './GetDocs.service';

@Controller('getDocs')
@UseGuards(AuthGuard)
export class GetDocsController {
  constructor(private readonly getDocsService: GetDocsService) {}
  @HttpCode(200)
  @Post()
  async find(@Body() body: GetDocsInput) {
    return await this.getDocsService.find(body);
  }
}
