import { InjectModel } from '@sql-tools/nestjs-sequelize';
import { Injectable } from '@nestjs/common';
import moment from 'moment';
import { Doc } from 'src/Database/Local.database/models/Doc.model';
import { DocData } from 'src/Database/Local.database/models/DocData.model';
import { Transmit } from 'src/Database/Local.database/models/Transmit.model';
import { AuthResult } from 'src/Modules/Guards/auth.guard';
import { SendInput } from './Send.input';
import { BoxTypes } from 'src/Database/Local.database/models/BoxTypes.model';
import { Barcode } from 'src/Database/Local.database/models/Barcode.model';

@Injectable()
export class SendService {
  constructor(
    @InjectModel(Transmit, 'local') private modelTransmit: typeof Transmit,
    @InjectModel(Doc, 'local') private modelDoc: typeof Doc,
    @InjectModel(DocData, 'local') private modelDocData: typeof DocData,
    @InjectModel(BoxTypes, 'local') private modelBoxType: typeof BoxTypes,
    @InjectModel(Barcode, 'local') private modelBarcode: typeof Barcode,
  ) {}
  async send(body: SendInput, auth: AuthResult) {
    const User = auth.userLocal;
    console.log(body);
    const barcode = await this.modelDoc.findOne({
      where: {
        id: body.id,
      },
      include: [
        { model: this.modelDocData, required: false },
        { model: this.modelBarcode },
      ],
    });

    if (barcode?.Barcode) {
      if (body.BoxTypeId > 0) {
        barcode.Barcode.update({
          box_type_id: body.BoxTypeId,
        });
      } else {
        const sendedBoxType = await this.modelBoxType.findOne({
          where: {
            title: 'Подано',
            who_added_type: 'Добавлено скриптом/разработчиком',
          },
          rejectOnEmpty: true,
        });
        barcode.Barcode.update({
          box_type_id: sendedBoxType.id,
        });
      }
    }

    const data_transmit = this.modelTransmit.build();
    data_transmit.doc_data_id = body.id;
    data_transmit.sender = User!.id;
    data_transmit.date_send = body.DateSend;
    data_transmit.where_send = body.WhereSend;
    data_transmit.active = true;
    await data_transmit.save();
    if (barcode?.DocData) {
      barcode.DocData.user = User!.id;
      barcode.DocData.depart = User!.depart;
      barcode.DocData.status = 3;
      if (barcode)
        await barcode.DocData.$create('Log', {
          user: User!.id,
          depart: User!.depart,
          status: barcode.DocData.status,
          transmit: data_transmit.id,
          date: moment().toDate(),
        });
      await barcode.save();
      await barcode.reload();
    }
    return data_transmit;
  }
}
