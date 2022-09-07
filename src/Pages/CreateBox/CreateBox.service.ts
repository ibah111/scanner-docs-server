import { InjectModel } from '@contact/nestjs-sequelize';
import { Injectable } from '@nestjs/common';
import { Barcode } from 'src/Database/Local.database/models/Barcode.model';
import { Box } from 'src/Database/Local.database/models/Box.model';
import { DocData } from 'src/Database/Local.database/models/DocData.model';
import generateRandom from 'src/utils/generateRandom';
import { CreateBoxInput } from './CreateBox.input';

@Injectable()
export class CreateBoxService {
  constructor(
    @InjectModel(Barcode) private modelBarcode: typeof Barcode,
    @InjectModel(Box) private modelBox: typeof Box,
    @InjectModel(DocData) private modelDocData: typeof DocData,
  ) {}
  async find(body: CreateBoxInput) {
    if (!body.create) {
      return 'Ошибка при отправке короба';
    }

    const data_box = this.modelBox.build();
    const data_bar = this.modelBarcode.build();
    const data_doc = await this.modelDocData.findAll({
      where: { status: 1 },
    });

    data_box.type = 2;
    await data_box.save();
    data_bar.item_id = data_box.id;
    data_bar.type = 2;
    data_bar.code = generateRandom(12);
    await data_bar.save();
    for (let i = 0; i < body.codes.length; i++) {
      data_doc[i].status = 2;
      data_doc[i].box_id = data_box.id;
      await data_doc[i].save();
    }

    return data_bar.code;
  }
}
