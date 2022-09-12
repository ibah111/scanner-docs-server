import { InjectModel } from '@contact/nestjs-sequelize';
import { Injectable } from '@nestjs/common';
import { Doc } from 'src/Database/Local.database/models/Doc.model';
import { FindOptions } from '@contact/sequelize';
import Filter from 'src/utils/Filter';
import TableDocsColumns from 'src/utils/Columns/TableDocs';
import { GridFilterModel, GridSortModel } from '@mui/x-data-grid-premium';
import Sort from 'src/utils/Sort';
import { DocData } from 'src/Database/Local.database/models/DocData.model';
import { OpenRowsBoxInput } from './OpenRowsBox.input';
import { Result } from 'src/Database/Local.database/models/Result.model';

@Injectable()
export class OpenRowsBoxService {
  constructor(
    @InjectModel(Doc) private modelDoc: typeof Doc,
    @InjectModel(DocData) private modelDocData: typeof DocData,
    @InjectModel(Result) private modelResult: typeof Result,
  ) {}

  async find(body: OpenRowsBoxInput) {
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
        where: {
          status: 1,
        },
        required: true,
        include: [{ model: this.modelResult, required: true }],
      },
    ];

    return await this.modelDoc.findAndCountAll(options);
  }
}
