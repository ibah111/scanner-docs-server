import { InjectModel } from '@sql-tools/nestjs-sequelize';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Doc } from 'src/Database/Local.database/models/Doc.model';
import { Transmit } from 'src/Database/Local.database/models/Transmit.model';
import { AuthResult } from 'src/Modules/Guards/auth.guard';
import { User } from 'src/Database/Local.database/models/User.model';
import { DocData } from 'src/Database/Local.database/models/DocData.model';
import { Barcode } from 'src/Database/Local.database/models/Barcode.model';
import { Depart } from 'src/Database/Local.database/models/Depart.model';
import { Box } from 'src/Database/Local.database/models/Box.model';
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
    return [barcode, User];
  }
}
