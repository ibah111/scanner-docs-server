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
import Operators from 'src/utils/Filter/Operator';

@Injectable()
export class GetDocsService {
  constructor(
    @InjectModel(Doc) private modelDoc: typeof Doc,
    @InjectModel(Transmit) private modelTransmit: typeof Transmit,
    @InjectModel(Barcode) private modelBarcode: typeof Barcode,
    @InjectModel(User) private modelUser: typeof User,
    @InjectModel(Depart) private modelDepart: typeof Depart,
  ) {}

  async find(body: GetDocsInput) {
    const columns = TableDocsColumns();
    const filters = (filter: GridFilterModel) => Filter(filter, columns);
    const sorts = (sort: GridSortModel) => Sort(sort, columns);
    let limit = body.pageSize;
    const offset = 0 + (body.page - 1) * limit;
    const options: FindOptions<Doc> = {};

    let whereSend = '';
    let requiredSend = false;
    let operatorWS = 'contains';
    let dateSend = '';
    let operatorDS = 'before';

    for (const item of body.filterModel.items) {
      switch (item.columnField) {
        case 'where_send':
          if (item.value) {
            whereSend = item.value;
            operatorWS = item.operatorValue;
            requiredSend = true;
            limit = (await this.modelDoc.findAndCountAll(options)).count;
          }
          break;
        case 'date_send':
          if (item.value) {
            dateSend = item.value;
            operatorDS = item.operatorValue;
            requiredSend = true;
            limit = (await this.modelDoc.findAndCountAll(options)).count;
          }
          break;
      }
    }
    options.limit = limit;
    options.offset = offset;
    options.where = filters(body.filterModel);
    options.order = sorts(body.sortModel);
    options.include = [
      {
        model: this.modelBarcode,
        required: false,
        include: [
          {
            model: this.modelTransmit,
            required: requiredSend,
            where: {
              active: true,
              where_send: Operators(operatorWS, whereSend, 'string'),
              date_send: Operators(operatorDS, dateSend, 'date'),
            },
          },
          {
            model: this.modelUser,
            required: true,
          },
          {
            model: this.modelDepart,
            required: true,
          },
        ],
      },
    ];

    return await this.modelDoc.findAndCountAll(options);
  }
}
