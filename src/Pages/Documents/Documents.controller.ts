import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/Modules/Guards/auth.guard';
import { DocumentsService } from './Documents.service';
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger';
import { CanGuard } from '../../Modules/CASL/Can.guard';

@ApiTags('Documents')
@Controller('documents')
@UseGuards(AuthGuard)
@UseGuards(CanGuard)
@ApiBasicAuth()
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}
  @Post()
  async get(@Param() id: number) {
    return this.documentsService.get(id);
  }
}
