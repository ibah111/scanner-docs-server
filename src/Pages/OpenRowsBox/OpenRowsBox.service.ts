import { InjectModel } from '@sql-tools/nestjs-sequelize';
import { Doc } from 'src/Database/Local.database/models/Doc.model';
import { DocData } from 'src/Database/Local.database/models/DocData.model';
import { OpenRowsBoxInput } from './OpenRowsBox.input';
import { Result } from 'src/Database/Local.database/models/Result.model';
import { Barcode } from 'src/Database/Local.database/models/Barcode.model';
import { getTableUtils } from '../../utils/getTableUtils';
import { Injectable } from '@nestjs/common';
import { OpenRowsBoxColumns } from '../../utils/Columns/OpenRowsBoxColumns';

@Injectable()
export class OpenRowsBoxService {
  constructor(
    @InjectModel(Doc, 'local') private modelDoc: typeof Doc,
    @InjectModel(DocData, 'local') private modelDocData: typeof DocData,
    @InjectModel(Result, 'local') private modelResult: typeof Result,
    @InjectModel(Barcode, 'local') private modelBarcode: typeof Barcode,
  ) {}

  async find({ filterModel, paginationModel, sortModel }: OpenRowsBoxInput) {
    const columns = OpenRowsBoxColumns();
    const util = getTableUtils(columns);
    const where = util.getFilter('Docs', filterModel);
    const order = util.getSort(sortModel);
    return await this.modelDoc.findAndCountAll({
      order,
      where,
      limit: paginationModel.pageSize,
      offset: paginationModel.pageSize * paginationModel.page,
      subQuery: false,
      include: [
        {
          model: this.modelDocData,
          where: {
            status: 1,
          },
          required: true,
          include: [{ model: this.modelResult, required: true }],
        },
        { model: this.modelBarcode, required: true },
      ],
    });
  }
}
