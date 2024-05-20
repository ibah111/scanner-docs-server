import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/Modules/Guards/auth.guard';
import { GetDocsInput } from './GetDocs.input';
import { GetDocsService } from './GetDocs.service';
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger';
import { CanGuard } from '../../Modules/CASL/Can.guard';

@ApiTags('GetDocs')
@Controller('getDocs')
@UseGuards(AuthGuard)
@UseGuards(CanGuard)
@ApiBasicAuth()
export class GetDocsController {
  constructor(private readonly getDocsService: GetDocsService) {}
  @HttpCode(200)
  @Post()
  /**
   * get documents page
   */
  async getDocs(@Body() body: GetDocsInput) {
    return await this.getDocsService.getDocs(body);
  }
}
