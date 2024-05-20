import { Injectable } from '@nestjs/common';
import { InjectModel } from '@sql-tools/nestjs-sequelize';
import { DocTypes } from '../../Database/Local.database/models/DocTypes.model';

@Injectable()
export class TypesService {
  constructor(
    @InjectModel(DocTypes, 'local')
    private readonly modelDocTypes: typeof DocTypes,
  ) {}

  async getAllDocTypes() {
    return await this.modelDocTypes.findAll({});
  }
}
