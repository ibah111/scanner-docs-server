import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BoxService } from './Box.service';
import { DocumentsBoxTypeDeleteInput, DocumentsToBoxInput } from './Box.inputs';

@ApiTags('Box')
@Controller('Box')
export class BoxController {
  constructor(private boxService: BoxService) {}

  @ApiOperation({
    description: 'Отдает все типы коробов',
  })
  @Get('getAllBoxTypes')
  async getAllBoxTypes() {
    return await this.boxService.getBoxTypes();
  }

  @ApiOperation({
    description: 'Присваивает тип короба всем документам в массиве',
  })
  @Post('addDocumentToBox')
  async addDocumentsToBox(@Body() body: DocumentsToBoxInput) {
    console.log('Body: '.yellow, body);
    return await this.boxService.addDocumentsToBox(body);
  }

  @ApiOperation({
    description: 'Удаляет тип короба в текущего документа',
  })
  @Delete('deleteDocumentsFromBox')
  async deleteDocumentBoxType(@Body() body: DocumentsBoxTypeDeleteInput) {
    return this.boxService.deleteDocumentsBoxType(body.list);
  }
}
