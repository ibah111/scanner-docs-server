import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@sql-tools/nestjs-sequelize';
import { DocumentsToBoxInput } from './Box.inputs';
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
    return await this.modelBoxTypes.findAll();
  }

  async addDocumentsToBox(body: DocumentsToBoxInput) {
    const docList = body.list;
    for (const id of docList) {
      const barcode = await this.modelBarcode.findOne({
        where: {
          id,
        },
        rejectOnEmpty: new NotFoundException('Такой документ не найден'),
      });
      barcode.update({
        box_type_id: body.box_type_id,
      });
    }
  }

  async deleteDocumentsBoxType(list: number[]) {
    for (const id of list) {
      const barcode = await this.modelBarcode.findOne({
        where: {
          id,
        },
        rejectOnEmpty: new NotFoundException('Документ не найден'),
      });
      barcode?.update({
        box_type_id: null,
      });
    }
  }

  async deleteBoxType(id: number) {
    console.log('id', id);
    return this.modelBoxTypes.destroy({
      where: {
        id,
      },
    });
  }

  async restoreBoxType(id: number) {
    return this.modelBoxTypes.restore({
      where: {
        id,
      },
    });
  }
}
