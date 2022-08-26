import { InjectModel } from '@contact/nestjs-sequelize';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Barcode } from 'src/Database/Local.database/models/Barcode.model';
import { Doc } from 'src/Database/Local.database/models/Doc.model';
import { DataInput } from './Data.input';
import axios from 'axios';
import { Transmit } from 'src/Database/Local.database/models/Transmit.model';
import { AuthUserSuccess } from 'src/Modules/Guards/auth.guard';
import { User } from 'src/Database/Local.database/models/User.model';
import moment from 'moment';
import { ConstValue, DocAttach } from '@contact/models';
import { Result } from 'src/Schemas/Result.model';
import { SMBService } from 'src/Modules/Smb/Smb.service';

@Injectable()
export class DataService {
  constructor(
    private readonly SMB: SMBService,
    @InjectModel(Barcode) private modelBarcode: typeof Barcode,
    @InjectModel(Doc) private modelDoc: typeof Doc,
    @InjectModel(Transmit) private modelTransmit: typeof Transmit,
    @InjectModel(User) private modelUser: typeof User,
    @InjectModel(DocAttach) private modelDocAttach: typeof DocAttach,
    @InjectModel(ConstValue) private modelConstValue: typeof ConstValue,
  ) {}
  async get(body: DataInput, user: AuthUserSuccess) {
    const save_path: string = (
      await this.modelConstValue.findOne({
        where: { name: 'DocAttach.SavePath' },
      })
    ).value;
    const client = this.SMB.get();

    const User = await this.modelUser.findOne({
      where: { bitrix_id: user.id },
    });

    const barcode = await this.modelBarcode.findOne({
      where: { code: body.code },
      include: [{ model: this.modelDoc, required: false }, 'User', 'Depart'],
    });
    const data_transmit = await this.modelTransmit.findOne({
      where: { barcode: barcode.id, active: true },
    });

    if (data_transmit) {
      data_transmit.active = false;
      data_transmit.date_return = moment().toDate();
      await data_transmit.save();
    } else {
    }

    if (barcode) {
      barcode.user = User.id;
      barcode.depart = User.depart;
      barcode.status = 2;

      if (barcode.changed())
        await barcode.$create('Log', {
          user: User.id,
          depart: User.depart,
          status: barcode.status,
          date: moment().toDate(),
        });
      await barcode.save();
      const UserOld = barcode.User;
      const DepartOld = barcode.Depart;
      await barcode.reload();
      const result = await axios.post<Result>(
        'https://apps.usb.ru:3001/getDocs',
        {
          token: body.token,
          docs: [barcode.Doc.mail_id],
        },
      );

      // TODO
      const doc = await this.modelDocAttach.findByPk(barcode.Doc.law_act_id);
      const tmp = save_path.split('\\');
      const dir = tmp[tmp.length - 1];

      const path = `${dir}${doc.REL_SERVER_PATH}${doc.FILE_SERVER_NAME}`;
      const file_data = await client.readFile(path);

      if (result.data)
        return {
          ...JSON.parse(JSON.stringify(barcode)),
          doc: result.data[0],
          UserOld,
          DepartOld,
          file: { name: doc.name, data: file_data },
        };
    }
    throw new NotFoundException('Данные не найдены');
  }
}
