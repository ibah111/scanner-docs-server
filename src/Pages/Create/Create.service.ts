import { InjectModel } from '@contact/nestjs-sequelize';
import { Injectable } from '@nestjs/common';
import moment from 'moment';
import { Barcode } from 'src/Database/Local.database/models/Barcode.model';
import { Doc } from 'src/Database/Local.database/models/Doc.model';
import { DocData } from 'src/Database/Local.database/models/DocData.model';
import { Log } from 'src/Database/Local.database/models/Log.model';
import { User } from 'src/Database/Local.database/models/User.model';
import { AuthUserSuccess } from 'src/Modules/Guards/auth.guard';
import generateRandom from 'src/utils/generateRandom';
import { CreateInput } from './Create.input';

@Injectable()
export class CreateService {
  constructor(
    @InjectModel(Barcode) private modelBarcode: typeof Barcode,
    @InjectModel(Log) private modelLog: typeof Log,
    @InjectModel(User) private modelUser: typeof User,
    @InjectModel(Doc) private modelDoc: typeof Doc,
    @InjectModel(DocData) private modelDocData: typeof DocData,
  ) {}
  async find(body: CreateInput, user: AuthUserSuccess) {
    if (!(body.law_act || body.law_exec))
      return 'Ошибка law_act или law_exec не заполнено';
    const data_bar = this.modelBarcode.build();
    const data_log = this.modelLog.build();
    const data_doc = this.modelDoc.build();
    const docData = this.modelDocData.build();
    const User = await this.modelUser.findOne({
      where: { bitrix_id: user.id },
    });

    if (user === null) {
      return 'Пользователь не существует';
    }

    data_doc.title = body.title;
    data_doc.law_act_id = body.law_act;
    data_doc.mail_id = body.mail_id;
    data_doc.law_exec_id = body.law_exec;
    data_doc.contact_doc_id = body.doc_id;
    data_doc.date = moment().toDate();
    await data_doc.save();
    data_bar.type = 1;
    data_bar.doc_id = data_doc.id;
    data_bar.code = generateRandom(11);
    await data_bar.save();
    docData.user = User.id;
    docData.depart = User.depart;
    docData.status = 1;
    docData.doc_id = data_doc.id;
    await docData.save();
    data_log.doc_data_id = data_bar.id;
    data_log.user = docData.user;
    data_log.depart = docData.depart;
    data_log.status = docData.status;
    data_log.date = moment().toDate();
    await data_log.save();
    return data_bar.code;
  }
}
