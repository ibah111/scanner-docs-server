import { InjectModel } from '@contact/nestjs-sequelize';
import { Injectable } from '@nestjs/common';
import { Log } from 'src/Database/Local.database/models/Log.model';
import { Transmit } from 'src/Database/Local.database/models/Transmit.model';
import { User } from 'src/Database/Local.database/models/User.model';
import { AuthUserSuccess } from 'src/Modules/Guards/auth.guard';
import { SendInput } from './Send.input';

@Injectable()
export class SendService {
  constructor(
    @InjectModel(Transmit) private modelTransmit: typeof Transmit,
    @InjectModel(Log) private modelLog: typeof Log,
    @InjectModel(User) private modelUser: typeof User,
  ) {}
  async send(body: SendInput, user: AuthUserSuccess) {
    if (!(body.WhereSend || body.DateSend)) return 'Введите все поля';
    const User = await this.modelUser.findOne({
      where: { bitrix_id: user.id },
    });
    const data_transmit = this.modelTransmit.build();
    data_transmit.barcode = body.id;
    data_transmit.sender = User.id;
    data_transmit.date_send = body.DateSend;
    data_transmit.where_send = body.WhereSend;
    data_transmit.active = true;
    await data_transmit.save();
  }
}
