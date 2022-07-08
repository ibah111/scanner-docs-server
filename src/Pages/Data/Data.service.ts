import { InjectModel } from '@contact/nestjs-sequelize';
import { Injectable } from '@nestjs/common';
import { Barcode } from 'src/Database/Local.database/models/Barcode.model';
import { Doc } from 'src/Database/Local.database/models/Doc.model';
import { DataInput } from './Data.input';
import axios from 'axios';
import { Transmit } from 'src/Database/Local.database/models/Transmit.model';

@Injectable()
export class DataService {
  constructor(
    @InjectModel(Barcode) private modelBarcode: typeof Barcode,
    @InjectModel(Doc) private modelDoc: typeof Doc,
    @InjectModel(Transmit) private modelTransmit: typeof Transmit,
  ) {}
  async get(body: DataInput) {
    const barcode = await this.modelBarcode.findOne({
      where: { code: body.code },
      include: [
        { model: this.modelDoc, required: false },
        { model: this.modelTransmit, required: false, where: { active: true } },
        'User',
        'Depart',
      ],
    });
    if (barcode) {
      const result = await axios.post('https://apps.usb.ru:3001/getDocs', {
        token: body.token,
        docs: [barcode.Doc.mail_id],
      });
      
      if (result.data)
        return { ...JSON.parse(JSON.stringify(barcode)), doc: result.data[0] };
    }
    return barcode;
  }
}
