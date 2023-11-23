import { InjectModel } from '@sql-tools/nestjs-sequelize';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import moment from 'moment';
import { Barcode } from 'src/Database/Local.database/models/Barcode.model';
import { Doc } from 'src/Database/Local.database/models/Doc.model';
import { DocData } from 'src/Database/Local.database/models/DocData.model';
import { Log } from 'src/Database/Local.database/models/Log.model';
import { Result } from 'src/Database/Local.database/models/Result.model';
import { EventsGateway } from 'src/Modules/Events/events.gateway';
import { AuthResult } from 'src/Modules/Guards/auth.guard';
import generateRandom from 'src/utils/generateRandom';
import { CreateInput } from './Create.input';

@Injectable()
export class CreateService {
  constructor(
    @InjectModel(Barcode, 'local') private modelBarcode: typeof Barcode,
    @InjectModel(Log, 'local') private modelLog: typeof Log,
    @InjectModel(Doc, 'local') private modelDoc: typeof Doc,
    @InjectModel(DocData, 'local') private modelDocData: typeof DocData,
    @InjectModel(Result, 'local') private modelResult: typeof Result,
    private readonly eventsGateway: EventsGateway,
  ) {}
  async find(body: CreateInput, auth: AuthResult) {
    if (!(body.law_act || body.law_exec))
      return 'Ошибка law_act или law_exec не заполнено';

    try {
      const User = auth.userLocal;
      const doc = await this.modelDoc.create({
        barcode_type: 1,
        contact_doc_id: body.doc_id,
        date: moment().toDate(),
        doc_type: body.type,
        title: body.title,
        mail_id: body.mail_id,
        law_act_id: body.law_act,
        law_exec_id: body.law_exec,
      });
      doc.save();

      const barcode = await this.modelBarcode.create({
        type: 1,
        item_id: doc.id,
        code: generateRandom(12),
      });
      barcode.save();

      const result = await axios.post(
        'https://apps.usb.ru:3001/getDocs',
        {
          docs: [doc.mail_id],
        },
        { headers: { token: auth.token } },
      );
      const m_result = await this.modelResult.create({
        st_pnkt: result.data[0].st_pnkt,
        date_post: result.data[0].date_post,
        kd: result.data[0].kd,
        reestr: result.data[0].reestr,
        fio_dol: result.data[0].fio_dol,
      });
      m_result.save();

      const doc_data = await this.modelDocData.create({
        depart: User!.depart,
        user: User!.id,
        status: 1,
        parent_id: doc.id,
        result: m_result.id,
      });
      doc_data.save();

      const log = await this.modelLog.create({
        date: moment().toDate(),
        depart: doc_data.depart,
        doc_data_id: doc_data.id,
        user: doc_data.user,
        status: doc_data.status,
      });
      log.save();

      this.eventsGateway.addItemBox(barcode.id);
      return barcode.code;
    } catch (error) {
      console.log(error);
      throw Error();
    }
  }
}
