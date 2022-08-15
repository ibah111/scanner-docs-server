import { InjectModel } from '@contact/nestjs-sequelize';
import { Injectable } from '@nestjs/common';
import { Doc } from 'src/Database/Local.database/models/Doc.model';
import { GetDocsInput } from './GetDocs.input';
import { FindOptions } from '@contact/sequelize';
import Filter from 'src/utils/Filter';
import TableDocsColumns from 'src/utils/Columns/TableDocs';
import { GridFilterModel, GridSortModel } from '@mui/x-data-grid-premium';
import Sort from 'src/utils/Sort';

@Injectable()
export class GetDocsService {
  constructor(@InjectModel(Doc) private modelDoc: typeof Doc) {}

  async find(body: GetDocsInput) {
    const columns = TableDocsColumns();
    const utils = (filter: GridFilterModel) => Filter(filter, columns);
    const sorts = (sort: GridSortModel) => Sort(sort, columns);
    let limit = body.pageSize;
    let offset = 0 + (body.page - 1) * limit;
    const options: FindOptions<Doc> = {};
    options.limit = limit;
    options.offset = offset;
    options.where = utils(body.filterModel);
    options.order = sorts(body.sortModel);
    return await this.modelDoc.findAndCountAll(options);
  }
}
