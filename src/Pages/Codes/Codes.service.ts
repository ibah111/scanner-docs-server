import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@sql-tools/nestjs-sequelize';
import { Doc } from '../../Database/Local.database/models/Doc.model';
import { Barcode } from '../../Database/Local.database/models/Barcode.model';
import { DocData } from 'src/Database/Local.database/models/DocData.model';
import { Transmit } from 'src/Database/Local.database/models/Transmit.model';
import { Result } from 'src/Database/Local.database/models/Result.model';
import { DeleteBarcodeInput } from './Codes.input';
import { Log } from 'src/Database/Local.database/models/Log.model';
import axios from 'axios';
import moment from 'moment';

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

  async deleteCode(body: DeleteBarcodeInput, token: string) {
    const user = await axios.get('https://apps.usb.ru:3008/oauth/login', {
      headers: {
        token,
      },
    });
    const user_data: {
      output: string;
      id: string;
      login_result: boolean;
      login: string;
      birthdate: string;
      department: string;
      position: string;
      firstname: string;
      secondname: string;
      thirdname: string;
    } = user.data;
    const barcode = await this.modelBarcode.findOne({
      logging: console.log,
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
    const deleteLog = this.modelLog.build();
    deleteLog.description = `Штрихкод '${
      barcode.code
    }' удалено пользователем (${user_data.id}) ${
      user_data.secondname +
      ' ' +
      user_data.firstname +
      ' ' +
      user_data.thirdname +
      ' '
    }, Департамент: ${user_data.department}, Время: ${moment().toDate()} `;
    deleteLog.user = barcode.Doc!.DocData!.User!.id;
    deleteLog.depart = barcode.Doc!.DocData!.User!.depart;
    deleteLog.status = 5;
    deleteLog.doc_data_id = barcode.Doc!.DocData!.id;
    deleteLog.date = moment().toDate();
    deleteLog.save().then(() => {
      barcode.destroy();
    });
  }
}
