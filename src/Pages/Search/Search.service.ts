import { InjectModel } from '@contact/nestjs-sequelize';
import { Sequelize } from '@contact/sequelize-typescript';
import { Op } from '@contact/sequelize';
import { Injectable } from '@nestjs/common';
import { SearchInput } from './Search.input';
import { Barcode } from 'src/Database/Local.database/models/Barcode.model';
import { Doc } from 'src/Database/Local.database/models/Doc.model';
import { LawAct } from '@contact/models';

@Injectable()
export class SearchService {
  constructor(
    @InjectModel(Barcode) private modelBarcode: typeof Barcode,
    @InjectModel(Doc) private modelDoc: typeof Doc,
    @InjectModel(LawAct) private modelLawAct: typeof LawAct,
  ) {}
  async find(body: SearchInput) {
    const barcode = await this.modelBarcode.findOne({
      where: { code: body.code },
      include: this.modelDoc,
    });
    if (barcode) {
      const result = await this.modelLawAct.findByPk(barcode.Doc.law_act_id);
      return result;
    }
    return barcode;
  }
}
