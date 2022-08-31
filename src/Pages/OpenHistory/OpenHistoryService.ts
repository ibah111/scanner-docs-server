import { User } from '@contact/models';
import { InjectModel } from '@contact/nestjs-sequelize';
import { Injectable } from '@nestjs/common';
import { Barcode } from 'src/Database/Local.database/models/Barcode.model';
import { Transmit } from 'src/Database/Local.database/models/Transmit.model';
import { Depart } from 'src/Database/Local.database/models/Depart.model';
import { OpenHistoryInput } from './OpenHistory.input';
import { Log } from 'src/Database/Local.database/models/Log.model';
import { Status } from 'src/Database/Local.database/models/Status.model';

@Injectable()
export class OpenHistoryService {
  constructor(
    @InjectModel(Transmit) private modelTransmit: typeof Transmit,
    @InjectModel(Barcode) private modelBarcode: typeof Barcode,
    @InjectModel(User) private modelUser: typeof User,
    @InjectModel(Depart) private modelDepart: typeof Depart,
    @InjectModel(Log) private modelLog: typeof Log,
    @InjectModel(Status) private modelStatus: typeof Status,
  ) {}
  async find(body: OpenHistoryInput) {
    const result = await this.modelLog.findAll({
      where: { barcode: body.code },

      include: [
        {
          model: this.modelBarcode,
          required: false,
        },
        {
          model: this.modelTransmit,
          required: true,
          where: { active: false },
        },
        { model: this.modelUser, required: false },
        { model: this.modelDepart, required: false },
        { model: this.modelStatus, required: false },
      ],
    });
    return result;
  }
}
