import { InjectModel } from '@contact/nestjs-sequelize';
import { Injectable } from '@nestjs/common';
import { Barcode } from 'src/Database/Local.database/models/Barcode.model';
import { Box } from 'src/Database/Local.database/models/Box.model';
import generateRandom from 'src/utils/generateRandom';
import { CreateBoxInput } from './CreateBox.input';

@Injectable()
export class CreateBoxService {
  constructor(
    @InjectModel(Barcode) private modelBarcode: typeof Barcode,
    @InjectModel(Box) private modelBox: typeof Box,
  ) {}
  async find(body: CreateBoxInput) {
    if (!body.create) {
      return 'Ошибка при отправке короба';
    }
    const data_box = this.modelBox.build();
    const data_bar = await this.modelBarcode.build();

    data_bar.type = 2;
    data_bar.code = generateRandom(12);
    await data_bar.save();
    data_box.code = data_bar.id;
    data_box.type = 2;
    await data_box.save();

    return data_bar.code;
  }
}
