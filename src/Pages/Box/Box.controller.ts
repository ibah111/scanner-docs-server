import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BoxService } from './Box.service';
import { AddDocumentToBoxInput } from './Box.inputs';

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
  async addDocumentsToBox(@Body() body: AddDocumentToBoxInput) {
    console.log('Body: '.yellow, body);
    return await this.boxService.addDocumentsToBox(body);
  }
}
