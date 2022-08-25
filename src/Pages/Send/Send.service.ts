import { InjectModel } from '@contact/nestjs-sequelize';
import { Injectable } from '@nestjs/common';
import moment from 'moment';
import { Barcode } from 'src/Database/Local.database/models/Barcode.model';
import { Transmit } from 'src/Database/Local.database/models/Transmit.model';
import { User } from 'src/Database/Local.database/models/User.model';
import { AuthUserSuccess } from 'src/Modules/Guards/auth.guard';
import { SendInput } from './Send.input';

@Injectable()
export class SendService {
  constructor(
    @InjectModel(Transmit) private modelTransmit: typeof Transmit,
    @InjectModel(User) private modelUser: typeof User,
    @InjectModel(Barcode) private modelBarcode: typeof Barcode,
  ) {}
  async send(body: SendInput, user: AuthUserSuccess) {
    const User = await this.modelUser.findOne({
      where: { bitrix_id: user.id },
    });
    const barcode = await this.modelBarcode.findOne({
      where: {
        id: body.id,
      },
    });
    const data_transmit = this.modelTransmit.build();
    data_transmit.barcode = body.id;
    data_transmit.sender = User.id;
    data_transmit.date_send = body.DateSend;
    data_transmit.where_send = body.WhereSend;
    data_transmit.active = true;
    await data_transmit.save();
    if (barcode) {
      barcode.user = User.id;
      barcode.depart = User.depart;
      barcode.status = 3;
      if (barcode)
        await barcode.$create('Log', {
          user: User.id,
          depart: User.depart,
          status: barcode.status,
          transmit: data_transmit.id,
          date: moment().toDate(),
        });
      await barcode.save();
      await barcode.reload();
    }
    return data_transmit;
  }
}
