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
import { SMB } from 'src/Modules/smb';
import { ConstValue, DocAttach } from '@contact/models';
import { Result } from 'src/Schemas/Result.model';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class DataService {
  constructor(
    private readonly SMB: SMB,
    @InjectModel(Barcode) private modelBarcode: typeof Barcode,
    @InjectModel(Doc) private modelDoc: typeof Doc,
    @InjectModel(Transmit) private modelTransmit: typeof Transmit,
    @InjectModel(User) private modelUser: typeof User,
    @InjectModel(DocAttach) private modelDocAttach: typeof DocAttach,
    @InjectModel(ConstValue) private modelConstValue: typeof ConstValue,
  ) {}
  async get(body: DataInput, user: AuthUserSuccess) {
    const save_path: string = (
      (await this.modelConstValue.findOne({
        where: { name: 'DocAttach.SavePath' },
      })) as any
    ).value;
    const client = this.SMB.get();

    const User = await this.modelUser.findOne({
      where: { bitrix_id: user.id },
    });
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
      barcode.user = User.id;
      barcode.depart = User.depart;
      await barcode.save();
      await barcode.$create('Log', {
        user: User.id,
        depart: User.depart,
        status: barcode.status,
        date: moment().toDate(),
      });
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
      const data = plainToInstance(Result, result.data);
      // TODO
      const doc = await this.modelDocAttach.findByPk(1381265);
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
