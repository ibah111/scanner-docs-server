import { InjectModel } from '@sql-tools/nestjs-sequelize';
import { Op } from '@sql-tools/sequelize';
import { Injectable } from '@nestjs/common';
import { Barcode } from 'src/Database/Local.database/models/Barcode.model';
import { Box } from 'src/Database/Local.database/models/Box.model';
import { Doc } from 'src/Database/Local.database/models/Doc.model';
import { DocData } from 'src/Database/Local.database/models/DocData.model';
import { User } from 'src/Database/Local.database/models/User.model';
import { AuthResult } from 'src/Modules/Guards/auth.guard';
import generateRandom from 'src/utils/generateRandom';
import { CreateBoxInput } from './CreateBox.input';

@Injectable()
export class CreateBoxService {
  constructor(
    @InjectModel(Barcode, 'local') private modelBarcode: typeof Barcode,
    @InjectModel(Box, 'local') private modelBox: typeof Box,
    @InjectModel(DocData, 'local') private modelDocData: typeof DocData,
    @InjectModel(Doc, 'local') private modelDoc: typeof Doc,
    @InjectModel(User, 'local') private modelUser: typeof User,
  ) {}
  async find({ list, boxTitle }: CreateBoxInput, user: AuthResult) {
    if (list.length === 0) {
      throw Error('Массив короба пуст');
    }
    const User = user.userLocal;

    const docs = await this.modelDoc.findAll({
      include: [
        {
          model: this.modelBarcode,
        },
      ],
      where: {
        id: {
          [Op.in]: list,
        },
      },
    });
    const docs_data = await this.modelDocData.findAll({
      where: {
        parent_id: {
          [Op.in]: list,
        },
        status: 1,
      },
    });
    const box = await this.modelBox.create({
      type: 2,
      user: User!.id,
      depart: User!.depart,
      boxTitle: boxTitle,
    });
    const box_barcode = await this.modelBarcode.create({
      item_id: box.id,
      type: 2,
      code: generateRandom(12),
    });

    for (const doc of docs) {
      doc.update({
        box_id: box.id,
      });
    }
    for (const doc_data of docs_data) {
      doc_data.update({
        status: 2,
      });
    }
    console.log(box_barcode.code);
    return box_barcode.code;
  }
}
