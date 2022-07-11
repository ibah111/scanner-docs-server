import { InjectModel } from '@contact/nestjs-sequelize';
import { Injectable } from '@nestjs/common';

import { Transmit } from 'src/Database/Local.database/models/Transmit.model';
import { SendInput } from './Send.input';

@Injectable()
export class SendService {
  constructor(@InjectModel(Transmit) private modelTransmit: typeof Transmit) {}
  async send(body: SendInput) {
    const data_transmit = this.modelTransmit.build();
    data_transmit.date_send = body.DateSend;
    data_transmit.where_send = body.WhereSend;
    data_transmit.active = true;
    await data_transmit.save();
  }
}
