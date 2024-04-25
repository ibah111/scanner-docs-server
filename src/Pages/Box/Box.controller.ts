import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BoxService } from './Box.service';
import { DocumentsBoxTypeDeleteInput, DocumentsToBoxInput } from './Box.inputs';

@ApiTags('Box')
@Controller('Box')
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
    console.log('Body: '.yellow, body);
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
}
