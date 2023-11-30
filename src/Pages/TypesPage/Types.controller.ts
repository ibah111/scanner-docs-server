import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger';
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

  @Get('getDocTypes')
  async getDocTypes() {
    return await this.typesService.getAllDocTypes();
  }

  @Get('getBarcodeTypes')
  async getBarcodeTypes() {
    return await this.typesService.getAllBarcodeTypes();
  }
}
