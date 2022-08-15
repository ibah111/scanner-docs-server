import { InjectModel } from '@contact/nestjs-sequelize';
import { Injectable } from '@nestjs/common';
import { Doc } from 'src/Database/Local.database/models/Doc.model';
import { GetDocsInput } from './GetDocs.input';
import { FindOptions } from '@contact/sequelize';
import Filter from 'src/utils/Filter';
import { changeFilter } from 'src/utils/Filter/changeFilter';
import TableDocsColumns from 'src/utils/Columns/TableDocs';
import { GridFilterModel } from '@mui/x-data-grid-premium';

@Injectable()
export class GetDocsService {
  constructor(@InjectModel(Doc) private modelDoc: typeof Doc) {}

  async find(body: GetDocsInput) {
    const columns = TableDocsColumns();
    const utils = (filter: GridFilterModel) => Filter(filter, columns);
    let limit = body.pageSize;
    let offset = 0 + (body.page - 1) * limit;
    const options: FindOptions<Doc> = {};
    options.limit = limit;
    options.offset = offset;
    options.where = utils(body.filterModel);
    console.log(options.where);
    return await this.modelDoc.findAndCountAll(options);
  }
}
