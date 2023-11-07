import { InjectModel } from '@sql-tools/nestjs-sequelize';
import { Injectable } from '@nestjs/common';
import moment from 'moment';
import { Doc } from 'src/Database/Local.database/models/Doc.model';
import { DocData } from 'src/Database/Local.database/models/DocData.model';
import { Transmit } from 'src/Database/Local.database/models/Transmit.model';
import { User } from 'src/Database/Local.database/models/User.model';
import { AuthUserSuccess } from 'src/Modules/Guards/auth.guard';
import { SendInput } from './Send.input';

@Injectable()
export class SendService {
  constructor(
    @InjectModel(Transmit, 'local') private modelTransmit: typeof Transmit,
    @InjectModel(User, 'local') private modelUser: typeof User,
    @InjectModel(Doc, 'local') private modelDoc: typeof Doc,
    @InjectModel(DocData, 'local') private modelDocData: typeof DocData,
  ) {}
  async send(body: SendInput, user: AuthUserSuccess) {
    const User = await this.modelUser.findOne({
      where: { bitrix_id: user.id },
    });
    const barcode = await this.modelDoc.findOne({
      where: {
        id: body.id,
      },
      include: [{ model: this.modelDocData, required: false }],
    });
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
