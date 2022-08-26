import { User } from '@contact/models';
import { InjectModel } from '@contact/nestjs-sequelize';
import { Injectable } from '@nestjs/common';
import { Barcode } from 'src/Database/Local.database/models/Barcode.model';
import { Transmit } from 'src/Database/Local.database/models/Transmit.model';
import { OpenHistoryInput } from './OpenHistoryInput';
import { Depart } from 'src/Database/Local.database/models/Depart.model';

@Injectable()
export class OpenHistoryService {
  constructor(
    @InjectModel(Transmit) private modelTransmit: typeof Transmit,
    @InjectModel(Barcode) private modelBarcode: typeof Barcode,
    @InjectModel(User) private modelUser: typeof User,
    @InjectModel(Depart) private modelDepart: typeof Depart,
  ) {}
  async find(body: OpenHistoryInput) {
    const barcode = await this.modelTransmit.findAll({
      where: { barcode: body.code, active: false },

      include: [
        {
          model: this.modelBarcode,
          required: false,
          include: [
            {
              model: this.modelTransmit,
              required: false,
              where: { active: true },
              order: ['id'],
            },
            { model: this.modelUser, required: false },
            { model: this.modelDepart, required: false },
          ],
        },
      ],
    });
    return barcode;
  }
}
