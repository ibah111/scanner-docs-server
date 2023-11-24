import { User } from '@contact/models';
import { InjectModel } from '@sql-tools/nestjs-sequelize';
import { Injectable } from '@nestjs/common';
import { Barcode } from 'src/Database/Local.database/models/Barcode.model';
import { Transmit } from 'src/Database/Local.database/models/Transmit.model';
import { Depart } from 'src/Database/Local.database/models/Depart.model';
import { Log } from 'src/Database/Local.database/models/Log.model';
import { Status } from 'src/Database/Local.database/models/Status.model';

@Injectable()
export class OpenHistoryService {
  constructor(
    @InjectModel(Transmit, 'local') private modelTransmit: typeof Transmit,
    @InjectModel(Barcode, 'local') private modelBarcode: typeof Barcode,
    @InjectModel(User, 'local') private modelUser: typeof User,
    @InjectModel(Depart, 'local') private modelDepart: typeof Depart,
    @InjectModel(Log, 'local') private modelLog: typeof Log,
    @InjectModel(Status, 'local') private modelStatus: typeof Status,
  ) {}
  async openHistory(code: string) {
    const result = await this.modelLog.findAll({
      where: { doc_data_id: code },
      include: [
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
