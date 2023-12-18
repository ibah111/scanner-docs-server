import { InjectModel } from '@sql-tools/nestjs-sequelize';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Doc } from 'src/Database/Local.database/models/Doc.model';
import { Transmit } from 'src/Database/Local.database/models/Transmit.model';
import { AuthResult } from 'src/Modules/Guards/auth.guard';
import { User } from 'src/Database/Local.database/models/User.model';
import moment from 'moment';
import { DocData } from 'src/Database/Local.database/models/DocData.model';
import { Barcode } from 'src/Database/Local.database/models/Barcode.model';
import { Depart } from 'src/Database/Local.database/models/Depart.model';
import { Box } from 'src/Database/Local.database/models/Box.model';
import { Results } from './Data.output';
import { Log } from 'src/Database/Local.database/models/Log.model';
import { Result } from 'src/Database/Local.database/models/Result.model';
@Injectable()
export class DataService {
  constructor(
    @InjectModel(Doc, 'local') private modelDoc: typeof Doc,
    @InjectModel(Depart, 'local') private modelDepart: typeof Depart,
    @InjectModel(Barcode, 'local') private modelBarcode: typeof Barcode,
    @InjectModel(Transmit, 'local') private modelTransmit: typeof Transmit,
    @InjectModel(User, 'local') private modelUser: typeof User,
    @InjectModel(DocData, 'local') private modelDocData: typeof DocData,
    @InjectModel(Log, 'local') private modelLog: typeof Log,
    @InjectModel(Box, 'local') private modelBox: typeof Box,
    @InjectModel(Result, 'local') private modelResult: typeof Result,
  ) {}
  async getScan(code: string, auth: AuthResult) {
    /**
     * Auth
     */
    const User = await this.modelUser.findOne({
      where: { bitrix_id: auth.user.id },
    });
    /**
     * Search barcode
     */
    const barcode = await this.modelBarcode.findOne({
      where: { code },
      rejectOnEmpty: new NotFoundException('Такой баркод не найден'),
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
    /**
     * Поиск перемещения
     */
    const data_transmit = await this.modelTransmit.findOne({
      where: { doc_data_id: barcode!.Doc!.DocData!.id, active: true },
    });
    /**
     * Поиск логов
     */
    const data_log = await this.modelLog.findOne({
      where: { doc_data_id: barcode!.Doc!.DocData!.id, status: 3 },
    });
    /**
     * Поиск баркода короба
     */
    const box_code = await this.modelBox.findOne({
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
      box_code!.user = User!.id;
      box_code!.depart = User!.depart;
      await box_code!.save();
      box_code!.user = User!.id;
      box_code!.depart = User!.depart;
      await box_code!.reload();
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
