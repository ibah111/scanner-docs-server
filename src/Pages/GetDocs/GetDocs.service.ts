import { InjectModel } from '@contact/nestjs-sequelize';
import { Injectable } from '@nestjs/common';
import { Doc } from 'src/Database/Local.database/models/Doc.model';
import { GetDocsInput } from './GetDocs.input';
import { FindOptions } from '@contact/sequelize';
import Filter from 'src/utils/Filter';
import TableDocsColumns from 'src/utils/Columns/TableDocs';
import { GridFilterModel, GridSortModel } from '@mui/x-data-grid-premium';
import Sort from 'src/utils/Sort';
import { Transmit } from 'src/Database/Local.database/models/Transmit.model';
import { Barcode } from 'src/Database/Local.database/models/Barcode.model';
import { User } from 'src/Database/Local.database/models/User.model';
import { Depart } from 'src/Database/Local.database/models/Depart.model';
import { DocData } from 'src/Database/Local.database/models/DocData.model';
import { Result } from 'src/Database/Local.database/models/Result.model';
import { LawAct, Person, Debt, Portfolio, LawExec } from '@contact/models';

@Injectable()
export class GetDocsService {
  constructor(
    @InjectModel(Doc) private modelDoc: typeof Doc,
    @InjectModel(Transmit) private modelTransmit: typeof Transmit,
    @InjectModel(Barcode) private modelBarcode: typeof Barcode,
    @InjectModel(User) private modelUser: typeof User,
    @InjectModel(Depart) private modelDepart: typeof Depart,
    @InjectModel(DocData) private modelDocData: typeof DocData,
    @InjectModel(Result) private modelResult: typeof Result,
    @InjectModel(LawAct) private modelLawAct: typeof LawAct,
    @InjectModel(Person) private modelPerson: typeof Person,
    @InjectModel(Debt) private modelDebt: typeof Debt,
    @InjectModel(Portfolio) private modelPortfolio: typeof Portfolio,
    @InjectModel(LawExec) private modelLawExec: typeof LawExec,
  ) {}

  async find(body: GetDocsInput) {
    const columns = TableDocsColumns();
    const filters = (filter: GridFilterModel) => Filter(filter, columns);
    const sorts = (sort: GridSortModel) => Sort(sort, columns);
    const limit = body.pageSize;
    const offset = body.page * limit;
    const options: FindOptions<Doc> = {};
    options.limit = limit;
    options.offset = offset;
    options.subQuery = false;
    options.where = filters(body.filterModel);
    options.order = sorts(body.sortModel);
    options.include = [
      {
        model: this.modelDocData,
        required: true,
        include: [
          {
            model: this.modelUser,
            required: true,
          },
          {
            model: this.modelDepart,
            required: true,
          },
          {
            model: this.modelTransmit,
            where: { active: true },
            required: false,
          },
          {
            model: this.modelResult,
            required: true,
          },
        ],
      },
      { model: this.modelBarcode, required: true },
    ];

    const doc_data = await this.modelDoc.findAndCountAll(options);
    for (const docData of doc_data.rows) {
      const data_result = await this.modelResult.findAll();
      if (docData.law_act_id != null) {
        const docLawAct = await this.modelLawAct.findOne({
          where: { id: docData.law_act_id },
          include: [
            { model: this.modelPerson, required: false },
            { model: this.modelPortfolio, required: false },
            {
              model: this.modelDebt,
              required: false,
            },
          ],
        });
        for (const res of data_result) {
          if (docData.DocData.result == res.id) {
            res.kd = docLawAct.Debt.contract;
            res.reestr = docLawAct.Portfolio.name;
            res.fio_dol =
              docLawAct.Person.f +
              ' ' +
              docLawAct.Person.i +
              ' ' +
              docLawAct.Person.o;
            res.date_post = docLawAct.Portfolio.load_dt;

            await res.save();
          }
        }
      } else {
        const docLawExec = await this.modelLawExec.findOne({
          where: { id: docData.law_act_id },
          include: [
            { model: this.modelPerson, required: false },
            { model: this.modelPortfolio, required: false },
            {
              model: this.modelDebt,
              required: false,
            },
          ],
        });
        for (const res of data_result) {
          if (docData.DocData.result == res.id) {
            res.kd = docLawExec.Debt.contract;
            res.reestr = docLawExec.Portfolio.name;
            res.fio_dol =
              docLawExec.Person.f +
              ' ' +
              docLawExec.Person.i +
              ' ' +
              docLawExec.Person.o;
            res.date_post = docLawExec.Portfolio.load_dt;
            await res.save();
          }
        }
      }
    }
    return await this.modelDoc.findAndCountAll(options);
  }
}
