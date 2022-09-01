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
        model: this.modelBarcode,
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
        ],
      },
    ];
    return await this.modelDoc.findAndCountAll(options);
  }
}
