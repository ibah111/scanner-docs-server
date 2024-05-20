import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBasicAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CanGuard } from '../../Modules/CASL/Can.guard';
import { AuthGuard } from '../../Modules/Guards/auth.guard';
import { TypesService } from './Type.service';

@ApiTags('Types')
@Controller('types')
@UseGuards(CanGuard)
@UseGuards(AuthGuard)
@ApiBasicAuth()
export class TypesController {
  constructor(private typesService: TypesService) {}

  @ApiOperation({
    deprecated: false,
    summary: 'Типы документов',
  })
  @Get('getDocTypes')
  async getDocTypes() {
    return await this.typesService.getAllDocTypes();
  }

  @ApiOperation({
    summary: 'Типы баркодов',
    deprecated: true,
  })
  @Get('getBarcodeTypes')
  async getBarcodeTypes() {
    throw Error('End point no longer exist');
  }
}
