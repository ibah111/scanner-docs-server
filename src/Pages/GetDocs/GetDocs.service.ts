import { InjectModel } from '@sql-tools/nestjs-sequelize';
import { Doc } from 'src/Database/Local.database/models/Doc.model';
import { GetDocsInput } from './GetDocs.input';
import { Transmit } from 'src/Database/Local.database/models/Transmit.model';
import { Barcode } from 'src/Database/Local.database/models/Barcode.model';
import { User } from 'src/Database/Local.database/models/User.model';
import { Depart } from 'src/Database/Local.database/models/Depart.model';
import { DocData } from 'src/Database/Local.database/models/DocData.model';
import { Result } from 'src/Database/Local.database/models/Result.model';
import { LawAct, Person, Debt, Portfolio, LawExec } from '@contact/models';
import { Injectable } from '@nestjs/common';
import { TableDocsColumns } from '../../utils/Columns/TableDocs';
import { getTableUtils } from '../../utils/getTableUtils';
import { BoxTypes } from 'src/Database/Local.database/models/BoxTypes.model';

@Injectable()
export class GetDocsService {
  constructor(
    @InjectModel(Doc, 'local') private modelDoc: typeof Doc,
    @InjectModel(Transmit, 'local') private modelTransmit: typeof Transmit,
    @InjectModel(Barcode, 'local') private modelBarcode: typeof Barcode,
    @InjectModel(User, 'local') private modelUser: typeof User,
    @InjectModel(Depart, 'local') private modelDepart: typeof Depart,
    @InjectModel(DocData, 'local') private modelDocData: typeof DocData,
    @InjectModel(Result, 'local') private modelResult: typeof Result,
    @InjectModel(LawAct, 'contact') private modelLawAct: typeof LawAct,
    @InjectModel(Person, 'contact') private modelPerson: typeof Person,
    @InjectModel(Debt, 'contact') private modelDebt: typeof Debt,
    @InjectModel(Portfolio, 'contact') private modelPortfolio: typeof Portfolio,
    @InjectModel(LawExec, 'contact') private modelLawExec: typeof LawExec,
    @InjectModel(BoxTypes, 'local') private modelBoxTypes: typeof BoxTypes,
  ) {}

  async getDocs({ filterModel, paginationModel, sortModel }: GetDocsInput) {
    const columns = TableDocsColumns();
    const util = getTableUtils(columns);
    const docFilter = util.getFilter('Docs', filterModel);
    const resultFilter = util.getFilter('Result', filterModel);
    const docDataFilter = util.getFilter('DocData', filterModel);
    const userFilter = util.getFilter('Users', filterModel);
    const departFilter = util.getFilter('Depart', filterModel);
    const barcodesFilter = util.getFilter('Barcodes', filterModel);
    const transmitFilter = util.getFilter('Transmit', filterModel);
    const transmitKeys = Reflect.ownKeys(transmitFilter);
    const order = util.getSort(sortModel);
    const docs = await this.modelDoc.findAndCountAll({
      limit: paginationModel.pageSize,
      offset: paginationModel.page * paginationModel.pageSize,
      where: docFilter,
      order,
      include: [
        {
          where: barcodesFilter,
          model: this.modelBarcode,
          required: true,
          include: [
            {
              model: this.modelBoxTypes,
            },
          ],
        },
        {
          where: docDataFilter,
          model: this.modelDocData,
          include: [
            {
              where: userFilter,
              model: this.modelUser,
              required: true,
            },
            {
              where: departFilter,
              model: this.modelDepart,
              required: true,
            },
            {
              separate: transmitKeys.length === 0 ? true : false,
              required: transmitKeys.length === 0 ? false : true,
              where: transmitFilter,
              model: this.modelTransmit,
              order: [['id', 'desc']],
              limit: 1,
            },
            {
              where: resultFilter,
              model: this.modelResult,
              required: true,
            },
          ],
        },
      ],
    });
    for (const doc of docs.rows) {
      const data_result = await this.modelResult.findAll({
        where: {
          id: doc.DocData?.result,
        },
      });
      const include = [
        { model: this.modelPerson, required: false },
        { model: this.modelPortfolio, required: false },
        {
          model: this.modelDebt,
          required: false,
        },
      ];
      const type = doc.doc_type;
      console.log(type);
      switch (type) {
        case 1: {
          /**
           * Поиск по law_act
           */
          const docLawAct = await this.modelLawAct.findOne({
            where: {
              id: doc.law_case_id!,
            },
            include,
          });
          for (const res of data_result) {
            if (doc.DocData!.result == res.id) {
              res.kd = docLawAct!.Debt!.contract;
              res.reestr = docLawAct!.Portfolio!.name;
              res.fio_dol =
                docLawAct!.Person!.f +
                ' ' +
                docLawAct!.Person!.i +
                ' ' +
                docLawAct!.Person!.o;
              res.date_post = docLawAct!.Portfolio!.load_dt;
              await res.save();
            }
          }
        }
        case 2: {
          /**
           * Поиск по law_exec
           */
          const docLawExec = await this.modelLawExec.findOne({
            where: {
              id: doc.law_case_id!,
            },
            include,
          });
          for (const res of data_result) {
            if (doc.DocData!.result == res.id) {
              res.kd = docLawExec!.Debt!.contract;
              res.reestr = docLawExec!.Portfolio!.name;
              res.fio_dol =
                docLawExec!.Person!.f +
                ' ' +
                docLawExec!.Person!.i +
                ' ' +
                docLawExec!.Person!.o;
              res.date_post = docLawExec!.Portfolio!.load_dt;
              await res.save();
            }
          }
        }
      }
    }
    return docs;
  }
}
