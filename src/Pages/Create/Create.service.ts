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
import { LawAct, LawExec } from '@contact/models';

@Injectable()
export class CreateService {
  constructor(
    @InjectModel(Barcode, 'local') private modelBarcode: typeof Barcode,
    @InjectModel(Log, 'local') private modelLog: typeof Log,
    @InjectModel(Doc, 'local') private modelDoc: typeof Doc,
    @InjectModel(DocData, 'local') private modelDocData: typeof DocData,
    @InjectModel(Result, 'local') private modelResult: typeof Result,
    @InjectModel(LawAct, 'contact') private modelLawAct: typeof LawAct,
    @InjectModel(LawExec, 'contact') private modelLawExec: typeof LawExec,
    private readonly eventsGateway: EventsGateway,
  ) {}
  async create(body: CreateInput, auth: AuthResult) {
    console.log('create: ', body);
    try {
      if (!(body.law_act_id || body.law_exec_id))
        throw Error('Заполните поле law_act или law_exec');

      const User = auth.userLocal;
      const doc = await this.modelDoc.create({
        contact_doc_id: body.contact_doc_id,
        date: moment().toDate(),
        doc_type: body.doc_type,
        title: body.title,
        mail_id: body.mail_id,
        law_act_id: body.law_act_id,
        law_exec_id: body.law_exec_id,
      });

      const barcode = await this.modelBarcode.create({
        item_id: doc.id,
        code: generateRandom(12),
      });

      /**
       * @returns url зависящий от переменной Node_env
       */
      // const url =
      //   process.env.NODE_ENV === 'prod'
      //     ? 'https://apps.usb.ru:3001/getDocs'
      //     : 'http://192.168.1.43:3001/getDocs';
      const url = 'https://apps.usb.ru:3001/getDocs';
      const requestDoMail = await axios.post(
        url,
        {
          docs: [doc.mail_id],
        },
        { headers: { token: auth.token } },
      );

      const responseDoMail = await this.modelResult.create({
        st_pnkt: requestDoMail.data[0].st_pnkt || 'Статья и пункт не заполнены',
        date_post: requestDoMail.data[0].date_post,
        kd: requestDoMail.data[0].kd,
        reestr: requestDoMail.data[0].reestr || 'Реестр с почты не заполнен',
        fio_dol: requestDoMail.data[0].fio_dol,
      });
      const doc_data = await this.modelDocData.create({
        depart: User!.depart,
        user: User!.id,
        status: 1,
        parent_id: doc.id,
        result: responseDoMail.id,
      });
      await this.modelLog.create({
        date: moment().toDate(),
        depart: doc_data.depart,
        doc_data_id: doc_data.id,
        user: doc_data.user,
        status: doc_data.status,
      });
      this.eventsGateway.addItemBox(barcode.id);
      return barcode.code;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
