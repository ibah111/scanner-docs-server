import { InjectModel } from '@contact/nestjs-sequelize';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Doc } from 'src/Database/Local.database/models/Doc.model';
import { DataInput } from './Data.input';
import axios from 'axios';
import { Transmit } from 'src/Database/Local.database/models/Transmit.model';
import { AuthUserSuccess } from 'src/Modules/Guards/auth.guard';
import { User } from 'src/Database/Local.database/models/User.model';
import moment from 'moment';
import { Result } from 'src/Schemas/Result.model';
import { SMBService } from 'src/Modules/Smb/Smb.service';
import { DocData } from 'src/Database/Local.database/models/DocData.model';
import { Barcode } from 'src/Database/Local.database/models/Barcode.model';
import { Depart } from 'src/Database/Local.database/models/Depart.model';
import { Box } from 'src/Database/Local.database/models/Box.model';
import { Results } from './Data.output';

@Injectable()
export class DataService {
  constructor(
    private readonly SMB: SMBService,
    @InjectModel(Doc) private modelDoc: typeof Doc,
    @InjectModel(Depart) private modelDepart: typeof Depart,
    @InjectModel(Barcode) private modelBarcode: typeof Barcode,
    @InjectModel(Transmit) private modelTransmit: typeof Transmit,
    @InjectModel(User) private modelUser: typeof User,
    @InjectModel(DocData) private modelDocData: typeof DocData,

    @InjectModel(Box) private modelBox: typeof Box,
  ) {}
  async get(body: DataInput, user: AuthUserSuccess) {
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
              required: false,
              include: [
                {
                  model: this.modelDocData,
                  required: false,
                  include: [
                    { model: this.modelUser, required: false },
                    { model: this.modelDepart, required: false },
                  ],
                },
              ],
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
      await barcode.Doc.DocData.save();
      const UserOld = barcode.Doc.DocData.User;
      const DepartOld = barcode.Doc.DocData.Depart;
      await barcode.Doc.DocData.reload();
      const result = await axios.post<Result>(
        'https://apps.usb.ru:3001/getDocs',
        {
          token: body.token,
          docs: [barcode.Doc.mail_id],
        },
      );
      if (result.data)
        return {
          ...JSON.parse(JSON.stringify(barcode)),
          doc: result.data[0],
          UserOld,
          DepartOld,
        };
    }
    const result: Results[] = [];
    if (barcode.type == 2) {
      for (const Doc of barcode.Box.Docs) {
        Doc.DocData.user = User.id;
        Doc.DocData.depart = User.depart;
        Doc.DocData.status = 2;
        if (Doc.DocData.changed()) {
          await Doc.DocData.$create('Log', {
            user: User.id,
            depart: User.depart,
            status: Doc.DocData.status,
            date: moment().toDate(),
          });
        }
        await Doc.DocData.save();
        const UserOld = Doc.DocData.User;
        const DepartOld = Doc.DocData.Depart;
        await Doc.DocData.reload();
        result.push({
          ...JSON.parse(JSON.stringify(Doc)),
          doc: (
            await axios.post<Result>('https://apps.usb.ru:3001/getDocs', {
              token: body.token,
              docs: [Doc.mail_id],
            })
          ).data[0],
          DocData: {
            ...JSON.parse(JSON.stringify(Doc.DocData)),
            UserOld,
            DepartOld,
          },
        });
      }
      const data = result as unknown as Doc[];
      return JSON.parse(JSON.stringify(data));
    }

    throw new NotFoundException('Данные не найдены');
  }
}
