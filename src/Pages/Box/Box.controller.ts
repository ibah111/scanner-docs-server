import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBasicAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BoxService } from './Box.service';
import {
  IdBoxTypeInput,
  DocumentsBoxTypeDeleteInput,
  DocumentsToBoxInput,
  AddTypeInput,
} from './Box.inputs';
import { Auth, AuthGuard, AuthResult } from 'src/Modules/Guards/auth.guard';
import { CanGuard } from 'src/Modules/CASL/Can.guard';

@ApiTags('Box')
@Controller('Box')
@UseGuards(AuthGuard)
@UseGuards(CanGuard)
@ApiBasicAuth()
export class BoxController {
  constructor(private boxService: BoxService) {}

  @ApiOperation({
    summary: 'Типы короба',
    description: 'Отдает все типы коробов',
  })
  @Get('getAllBoxTypes')
  async getAllBoxTypes() {
    return await this.boxService.getBoxTypes();
  }

  @ApiOperation({
    summary: 'Присваивает тип короба всем документам в массиве',
    description: 'Принимает массив ID-шек, присваивает им статус короба',
  })
  @Post('addDocumentToBox')
  async addDocumentsToBox(@Body() body: DocumentsToBoxInput) {
    return await this.boxService.addDocumentsToBox(body);
  }

  @ApiOperation({
    summary: 'Удаляет тип короба в текущего документа',
    description: 'Принимает массив ID-шек, и удаляет у них статус короба',
  })
  @Delete('deleteDocumentsFromBox')
  async deleteDocumentBoxType(@Body() body: DocumentsBoxTypeDeleteInput) {
    return this.boxService.deleteDocumentsBoxType(body.list);
  }

  @ApiOperation({
    description: 'Передает id короба, удаляет короб',
    summary: 'Удаляет тип короба',
  })
  @Delete('deleteBoxType')
  async deleteBoxType(@Body() { id }: IdBoxTypeInput) {
    return this.boxService.deleteBoxType(id);
  }

  @ApiOperation({
    summary: 'Восстанавливает удаленный тип короба',
    description: 'Передает id, восстаналивает тип короба',
  })
  @Put('restoreBoxType')
  async restoreBoxType(@Body() { id }: IdBoxTypeInput) {
    return this.boxService.restoreBoxType(id);
  }
}
