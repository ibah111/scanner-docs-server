import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@sql-tools/nestjs-sequelize';
import { node } from 'src/main';
import { AddDocumentToBoxInput } from './Box.inputs';
import { BoxTypes } from 'src/Database/Local.database/models/BoxTypes.model';
import { Barcode } from 'src/Database/Local.database/models/Barcode.model';

@Injectable()
export class BoxService {
  constructor(
    @InjectModel(BoxTypes, 'local')
    private readonly modelBoxTypes: typeof BoxTypes,
    @InjectModel(Barcode, 'local')
    private readonly modelBarcode: typeof Barcode,
  ) {}

  async getBoxTypes() {
    return await this.modelBoxTypes.findAll({
      logging: node === 'dev' ? true : false,
    });
  }

  async addDocumentsToBox(body: AddDocumentToBoxInput) {
    const docList = body.list;
    const boxType = await this.modelBoxTypes.findOne({
      where: {
        id: body.box_type,
      },
      rejectOnEmpty: new NotFoundException('Такой тип короба не найден'),
    });
    for (const id of docList) {
      const barcode = await this.modelBarcode.findOne({
        where: {
          id,
        },
        rejectOnEmpty: new NotFoundException('Такой документ не найден'),
      });
      barcode
        .update({
          box_type: body.box_type,
        })
        .then(() => console.log(`Document ${id}, added to ${boxType.title}`));
    }
  }
}
