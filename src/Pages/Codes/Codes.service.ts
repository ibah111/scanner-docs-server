import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@sql-tools/nestjs-sequelize';
import { Doc } from '../../Database/Local.database/models/Doc.model';
import { Barcode } from '../../Database/Local.database/models/Barcode.model';
import { DocData } from 'src/Database/Local.database/models/DocData.model';
import { Transmit } from 'src/Database/Local.database/models/Transmit.model';
import { Result } from 'src/Database/Local.database/models/Result.model';
import { DeleteBarcodeInput } from './Codes.input';
import { Log } from 'src/Database/Local.database/models/Log.model';

@Injectable()
export class CodesService {
  constructor(
    @InjectModel(Doc, 'local') private readonly modelDoc: typeof Doc,
    @InjectModel(Barcode, 'local')
    private readonly modelBarcode: typeof Barcode,
    @InjectModel(DocData, 'local')
    private readonly modelDocData: typeof DocData,
    @InjectModel(Result, 'local')
    private readonly modelResult: typeof Result,
    @InjectModel(Transmit, 'local')
    private readonly modelTransmit: typeof Transmit,
    @InjectModel(Log, 'local')
    private readonly modelLog: typeof Log,
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

  async deleteCode(body: DeleteBarcodeInput) {
    const barcode = await this.modelBarcode.findOne({
      where: {
        code: body.barcode,
      },
      rejectOnEmpty: Error('Баркод не найден'),
      include: [
        {
          model: this.modelDoc,
          include: [
            {
              model: this.modelDocData,
              include: [
                {
                  model: this.modelResult,
                },
                {
                  model: this.modelTransmit,
                },
              ],
            },
          ],
        },
      ],
    });
    console.log(barcode.dataValues);
  }
}
