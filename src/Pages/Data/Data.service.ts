import { InjectModel } from '@contact/nestjs-sequelize';
import { Injectable } from '@nestjs/common';
import { Barcode } from 'src/Database/Local.database/models/Barcode.model';
import { Doc } from 'src/Database/Local.database/models/Doc.model';
import { DataInput } from './Data.input';
import axios from 'axios';

@Injectable()
export class DataService {
  constructor(
    @InjectModel(Barcode) private modelBarcode: typeof Barcode,
    @InjectModel(Doc) private modelDoc: typeof Doc,
  ) {}
  async get(body: DataInput) {
    const barcode = await this.modelBarcode.findOne({
      where: { code: body.code },
      include: this.modelDoc,
    });
    if (barcode) {
      const result = await axios.post('https://apps.usb.ru:3001/getDocs', {
        token: body.token, docs:[25]
      })} 
        const result = await axios({
        method: "POST",
        url: 'https://apps.usb.ru:3001/getDocs',
        data: {token: body.token, 
        docs:[25] }});   
    
    return result.data
    return barcode;
  }
}
