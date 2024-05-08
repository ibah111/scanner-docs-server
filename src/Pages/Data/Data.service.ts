import { InjectModel } from '@sql-tools/nestjs-sequelize';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Doc } from 'src/Database/Local.database/models/Doc.model';
import { Transmit } from 'src/Database/Local.database/models/Transmit.model';
import { AuthResult } from 'src/Modules/Guards/auth.guard';
import { User } from 'src/Database/Local.database/models/User.model';
import { DocData } from 'src/Database/Local.database/models/DocData.model';
import { Barcode } from 'src/Database/Local.database/models/Barcode.model';
import { Depart } from 'src/Database/Local.database/models/Depart.model';
import { Log } from 'src/Database/Local.database/models/Log.model';
import { Result } from 'src/Database/Local.database/models/Result.model';
import moment from 'moment';
import { Results } from './Data.output';
import { BoxTypes } from 'src/Database/Local.database/models/BoxTypes.model';
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
    @InjectModel(Result, 'local') private modelResult: typeof Result,
    @InjectModel(BoxTypes, 'local') private modelBoxTypes: typeof BoxTypes,
  ) {}
  /**
   * @TODO переделать сканирование
   */
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
          /**
           * Параметры документа с почты (Do-mail)
           */
          model: this.modelDoc,
          include: [
            {
              model: this.modelDocData,
              include: [
                {
                  model: this.modelUser,
                },
                {
                  model: this.modelDepart,
                },
                {
                  model: this.modelResult,
                },
              ],
            },
          ],
        },
        {
          model: this.modelBoxTypes,
        },
      ],
    });
    const barcode_transmit = await this.modelTransmit.findOne({
      where: {
        doc_data_id: barcode!.Doc!.DocData!.id,
        active: true,
      },
    });
    /** ищу лог */
    const barcode_log = await this.modelLog.findOne({
      where: {
        doc_data_id: barcode!.Doc!.DocData!.id,
        status: 3,
      },
    });

    if (barcode_transmit) {
      barcode_transmit.active = false;
      barcode_transmit.date_return = moment().toDate();
      await barcode_transmit.save();
      barcode_log!.status = 4;
      await barcode_log!.save();
    }

    barcode.Doc!.DocData!.user = User!.id;
    barcode.Doc!.DocData!.depart = User!.depart;
    barcode.Doc!.DocData!.status = 2;
    if (barcode.Doc!.DocData!.changed()) {
      await barcode!.Doc!.DocData!.$create('Log', {
        user: User!.id,
        depart: User!.depart,
        status: barcode!.Doc!.DocData!.status,
        date: moment().toDate(),
      });
    }
    await barcode.Doc!.DocData!.save();
    const UserOld = barcode.Doc!.DocData!.User;
    const DepartOld = barcode.Doc!.DocData!.Depart;
    await barcode.Doc!.DocData!.reload();
    const result: Results[] = [];
    result.push({
      ...JSON.parse(JSON.stringify(barcode.Doc!)),
      DocData: {
        ...JSON.parse(JSON.stringify(barcode.Doc!.DocData)),
        UserOld,
        DepartOld,
      },
      BoxType: {
        ...JSON.parse(JSON.stringify(barcode.BoxType)),
      },
    });
    const data = result as unknown as Doc;
    const response = JSON.parse(JSON.stringify(data));
    return response;
  }
}
