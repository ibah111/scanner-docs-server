import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from 'src/Modules/Guards/auth.guard';
import { DocumentsService } from './Documents.service';
import { ApiBasicAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { CanGuard } from '../../Modules/CASL/Can.guard';
import { IsNumber } from 'class-validator';

class bodyModel {
  @ApiProperty()
  @IsNumber()
  id: number;
}
@ApiTags('Documents')
@Controller('documents')
@UseGuards(AuthGuard)
@UseGuards(CanGuard)
@ApiBasicAuth()
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}
  @Post()
  async get(@Body() body: bodyModel) {
    return this.documentsService.rxjsGet(body.id);
  }
}
