import { Injectable } from '@nestjs/common';
import { BarcodeTypes } from '../../Database/Local.database/models/BarcodeTypes.model';
import { InjectModel } from '@sql-tools/nestjs-sequelize';
import { DocTypes } from '../../Database/Local.database/models/DocTypes.model';

@Injectable()
export class TypesService {
  constructor(
    @InjectModel(BarcodeTypes, 'local')
    private readonly modelBarcodeTypes: typeof BarcodeTypes,
    @InjectModel(DocTypes, 'local')
    private readonly modelDocTypes: typeof DocTypes,
  ) {}

  async getAllBarcodeTypes() {
    return await this.modelBarcodeTypes.findAll({});
  }
  async getAllDocTypes() {
    return await this.modelDocTypes.findAll({});
  }
}
