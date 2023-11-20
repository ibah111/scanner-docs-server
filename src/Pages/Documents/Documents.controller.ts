import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/Modules/Guards/auth.guard';
import { DocumentsInput } from './Documents.input';
import { DocumentsService } from './Documents.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Documents')
@Controller('documents')
@UseGuards(AuthGuard)
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}
  @Post()
  async get(@Body() body: DocumentsInput) {
    return await this.documentsService.get(body);
  }
}
