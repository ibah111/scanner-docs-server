import { InjectModel } from '@contact/nestjs-sequelize';
import { Sequelize } from '@contact/sequelize-typescript';
import { Op } from '@contact/sequelize';
import { Injectable } from '@nestjs/common';
import { SearchInput } from './Search.input';
import { Barcode } from 'src/Database/Local.database/models/Barcode.model';
import { Doc } from 'src/Database/Local.database/models/Doc.model';

@Injectable()
export class SearchService {
  constructor(
    @InjectModel(Barcode) private modelBarcode: typeof Barcode,
    @InjectModel(Doc) private modelDoc: typeof Doc,
  ){}
  async find(body: SearchInput) {
    const result = await this.modelDoc.findAll({
      where: {id: body.code}
    }
    )
    return result;
  }
}