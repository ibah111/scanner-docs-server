import { InjectModel } from '@sql-tools/nestjs-sequelize';
import { Injectable, NotFoundException } from '@nestjs/common';
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
    console.log(body);
    try {
      if (!(body.law_act_id || body.law_exec_id))
        throw Error('Заполните поле law_act или law_exec');
      /** */

      switch (body.law_act_id || body.law_exec_id) {
        case body.law_act_id: {
          return await this.modelLawAct
            .findOne({
              where: {
                id: body.law_act_id,
              },
              rejectOnEmpty: new NotFoundException(
                'Судебный иск/приказ по такому id не найден',
              ),
              attributes: ['id'],
            })
            .then(() => console.log('LawAct валиден'));
        }
        case body.law_act_id: {
          return await this.modelLawExec
            .findOne({
              attributes: ['id'],
              rejectOnEmpty: new NotFoundException('ИД по такому id не найден'),
              where: {
                id: body.law_exec_id,
              },
            })
            .then(() => console.log('LawExec валиден'));
        }
        default:
          console.log('default');
      }

      /**
       *
       */
      const User = auth.userLocal;
      const doc = await this.modelDoc.create({
        barcode_type: 1,
        contact_doc_id: body.contact_doc_id,
        date: moment().toDate(),
        doc_type: body.doc_type,
        title: body.title,
        mail_id: body.mail_id,
        law_act_id: body.law_act_id,
        law_exec_id: body.law_exec_id,
      });
      const barcode = await this.modelBarcode.create({
        type: 1,
        item_id: doc.id,
        code: generateRandom(12),
      });
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
        reestr: result.data[0].reestr || 'Реестр с почты не заполнен',
        fio_dol: result.data[0].fio_dol,
      });
      const doc_data = await this.modelDocData.create({
        depart: User!.depart,
        user: User!.id,
        status: 1,
        parent_id: doc.id,
        result: m_result.id,
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
