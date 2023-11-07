import { InjectModel } from '@sql-tools/nestjs-sequelize';
import { Op } from '@sql-tools/sequelize';
import { Injectable } from '@nestjs/common';
import { Barcode } from 'src/Database/Local.database/models/Barcode.model';
import { Box } from 'src/Database/Local.database/models/Box.model';
import { Doc } from 'src/Database/Local.database/models/Doc.model';
import { DocData } from 'src/Database/Local.database/models/DocData.model';
import { User } from 'src/Database/Local.database/models/User.model';
import { AuthUserSuccess } from 'src/Modules/Guards/auth.guard';
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
  async find(body: CreateBoxInput, user: AuthUserSuccess) {
    if (!body.create) {
      return 'Ошибка при отправке короба';
    }
    const User = await this.modelUser.findOne({
      where: { bitrix_id: user.id },
    });

    const data_box = this.modelBox.build();
    const data_bar = this.modelBarcode.build();
    const data_docs = await this.modelDocData.findAll({
      where: { status: 1 },
    });
    const data_doc = await this.modelDoc.findAll({
      where: { box_id: { [Op.is]: null } },
    });

    data_box.type = 2;
    data_box.user = User!.id;
    data_box.depart = User!.depart;
    await data_box.save();
    data_bar.item_id = data_box.id;
    data_bar.type = 2;
    data_bar.code = generateRandom(12);
    await data_bar.save();
    for (let i = 0; i < data_docs.length; i++) {
      data_docs[i].status = 2;
      await data_docs[i].save();
    }
    for (let i = 0; i < data_doc.length; i++) {
      data_doc[i].box_id = data_box.id;
      await data_doc[i].save();
    }

    return data_bar.code;
  }
}
