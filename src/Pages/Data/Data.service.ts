import { InjectModel } from '@sql-tools/nestjs-sequelize';
import { Injectable } from '@nestjs/common';
import { Doc } from 'src/Database/Local.database/models/Doc.model';
import { DataInput } from './Data.input';
import { Transmit } from 'src/Database/Local.database/models/Transmit.model';
import { AuthUserSuccess } from 'src/Modules/Guards/auth.guard';
import { User } from 'src/Database/Local.database/models/User.model';
import moment from 'moment';
import { DocData } from 'src/Database/Local.database/models/DocData.model';
import { Barcode } from 'src/Database/Local.database/models/Barcode.model';
import { Depart } from 'src/Database/Local.database/models/Depart.model';
import { Box } from 'src/Database/Local.database/models/Box.model';
import { Results } from './Data.output';
import { Log } from 'src/Database/Local.database/models/Log.model';
import { Result } from 'src/Database/Local.database/models/Result.model';
import { SMBService } from '@tools/nestjs-smb2';
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
    @InjectModel(Log) private modelLog: typeof Log,
    @InjectModel(Box) private modelBox: typeof Box,
    @InjectModel(Result) private modelResult: typeof Result,
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
                    { model: this.modelResult, required: false },
                  ],
                },
                {
                  model: this.modelBox,
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
                { model: this.modelResult, required: false },
              ],
            },
          ],
        },
      ],
    });
    const data_transmit = await this.modelTransmit.findOne({
      where: { doc_data_id: barcode!.Doc!.DocData!.id, active: true },
    });

    const data_log = await this.modelLog.findOne({
      where: { doc_data_id: barcode!.Doc!.DocData!.id, status: 3 },
    });
    const data_box = await this.modelBox.findOne({
      where: { id: barcode!.item_id },
    });

    if (barcode!.type == 1 && data_transmit) {
      data_transmit.active = false;
      data_transmit.date_return = moment().toDate();
      await data_transmit.save();
      data_log!.status = 4;
      await data_log!.save();
    }
    if (barcode!.type == 2) {
      data_box!.user = User!.id;
      data_box!.depart = User!.depart;
      await data_box!.save();
      data_box!.user = User!.id;
      data_box!.depart = User!.depart;
      await data_box!.reload();
    }

    const result: Results[] = [];
    let doc_data: Doc[] = [];
    if (barcode!.type == 1) {
      doc_data = [barcode!.Doc!];
    } else {
      doc_data = barcode!.Box!.Docs!;
    }

    for (const Doc of doc_data) {
      Doc.DocData!.user = User!.id;
      Doc.DocData!.depart = User!.depart;
      Doc.DocData!.status = 2;

      if (Doc.DocData!.changed()) {
        await Doc.DocData!.$create('Log', {
          user: User!.id,
          depart: User!.depart,
          status: Doc.DocData!.status,
          date: moment().toDate(),
        });
      }

      await Doc.DocData!.save();

      const UserOld = Doc.DocData!.User;
      const DepartOld = Doc.DocData!.Depart;
      await Doc.DocData!.reload();
      result.push({
        ...JSON.parse(JSON.stringify(Doc)),
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
}
