import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { GetDocsService } from './GetDocs.service';

@Controller('getDocs')
// @UseGuards(AuthGuard)
export class GetDocsController {
  constructor(private readonly getDocsService: GetDocsService) {}
  @HttpCode(200)
  @Post()
  async findAll(): Promise<any[]> {
    return await this.getDocsService.findAll();
  }
}
