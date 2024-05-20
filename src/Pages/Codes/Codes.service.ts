import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@sql-tools/nestjs-sequelize';
import { Doc } from '../../Database/Local.database/models/Doc.model';
import { Barcode } from '../../Database/Local.database/models/Barcode.model';

@Injectable()
export class CodesService {
  constructor(
    @InjectModel(Doc, 'local') private readonly modelDoc: typeof Doc,
    @InjectModel(Barcode, 'local')
    private readonly modelBarcode: typeof Barcode,
  ) {}
  async getCodes(id: number) {
    const doc = await this.modelDoc.findOne({
      where: {
        id,
      },
      include: [
        {
          model: this.modelBarcode,
        },
      ],
      rejectOnEmpty: new NotFoundException(),
    });
    const doc_code = doc.Barcode?.code;
    return doc_code;
  }
}
