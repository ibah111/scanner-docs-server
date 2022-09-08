import { InjectModel } from '@contact/nestjs-sequelize';
import { Injectable, NotFoundException } from '@nestjs/common';
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
import { DocData } from 'src/Database/Local.database/models/DocData.model';
import { Barcode } from 'src/Database/Local.database/models/Barcode.model';
import { Log } from 'src/Database/Local.database/models/Log.model';
import { Depart } from 'src/Database/Local.database/models/Depart.model';
import { Op } from '@contact/sequelize';
import { Box } from 'src/Database/Local.database/models/Box.model';

@Injectable()
export class DataService {
  constructor(
    private readonly SMB: SMBService,
    @InjectModel(Doc) private modelDoc: typeof Doc,
    @InjectModel(Depart) private modelDepart: typeof Depart,
    @InjectModel(Barcode) private modelBarcode: typeof Barcode,
    @InjectModel(Transmit) private modelTransmit: typeof Transmit,
    @InjectModel(User) private modelUser: typeof User,
    @InjectModel(DocAttach) private modelDocAttach: typeof DocAttach,
    @InjectModel(ConstValue) private modelConstValue: typeof ConstValue,
    @InjectModel(DocData) private modelDocData: typeof DocData,
    @InjectModel(Log) private modelLog: typeof Log,
    @InjectModel(Box) private modelBox: typeof Box,
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
      include: [
        {
          model: this.modelBox,
          required: false,
          include: [
            {
              model: this.modelDoc,
            },
          ],
        },
        {
          model: this.modelDoc,
          required: false,
          include: [
            {
              model: this.modelDocData,
              required: false,
              include: [
                {
                  model: this.modelUser,
                  required: false,
                },
                { model: this.modelDepart, required: false },
              ],
            },
          ],
        },
      ],
    });

    const data_transmit = await this.modelTransmit.findOne({
      where: { doc_data_id: barcode.Doc.DocData.id, active: true },
    });
    if (barcode.type == 1 && data_transmit) {
      data_transmit.active = false;
      data_transmit.date_return = moment().toDate();
      await data_transmit.save();
    }

    if (barcode.type == 1) {
      barcode.Doc.DocData.user = User.id;
      barcode.Doc.DocData.depart = User.depart;
      barcode.Doc.DocData.status = 2;

      if (barcode.Doc.DocData.changed()) {
        await barcode.Doc.DocData.$create('Log', {
          user: User.id,
          depart: User.depart,
          status: barcode.Doc.DocData.status,
          date: moment().toDate(),
        });
      }
      await barcode.save();
      const UserOld = barcode.Doc.DocData.User;
      const DepartOld = barcode.Doc.DocData.Depart;
      await barcode.reload();
      const result = await axios.post<Result>(
        'https://apps.usb.ru:3001/getDocs',
        {
          token: body.token,
          docs: [barcode.Doc.mail_id],
        },
      );

      // TODO
      const doc = await this.modelDocAttach.findByPk(
        barcode.Doc.contact_doc_id,
      );
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
    if ((barcode.type = 2)) {
      return barcode;
    }
    throw new NotFoundException('Данные не найдены');
  }
}
