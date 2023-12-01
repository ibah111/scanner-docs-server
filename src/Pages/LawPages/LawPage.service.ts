import { LawAct, LawExec } from '@contact/models';
import { InjectModel } from '@sql-tools/nestjs-sequelize';
import { LawPageInput } from './LawPage.input';
import {
  GridColumns,
  GridFilterModel,
  GridSortModel,
} from '@mui/x-data-grid-premium';
import Filter from '../../utils/Filter';
import Sort from '../../utils/Sort';

export class LawPageService {
  constructor(
    @InjectModel(LawAct, 'contact') private readonly modelLawAct: typeof LawAct,
    @InjectModel(LawExec, 'contact')
    private readonly modelLawExec: typeof LawExec,
  ) {}

  async findAllLawAct({
    filterModel,
    page,
    pageSize,
    sortModel,
  }: LawPageInput) {
    const lawActColumns: GridColumns = [];
    const filters = (filter: GridFilterModel) => Filter(filter, lawActColumns);
    const sorts = (sort: GridSortModel) => Sort(sort, lawActColumns);
    return await this.modelLawAct.findAll({
      attributes: [],
      limit: pageSize,
      offset: page * pageSize,
      where: filters(filterModel),
      order: sorts(sortModel),
    });
  }

  async findAllLawExec({
    filterModel,
    page,
    pageSize,
    sortModel,
  }: LawPageInput) {
    const lawExecColumns: GridColumns = [];
    const filters = (filter: GridFilterModel) => Filter(filter, lawExecColumns);
    const sorts = (sort: GridSortModel) => Sort(sort, lawExecColumns);
    return await this.modelLawExec.findAll({
      attributes: [],
      limit: pageSize,
      offset: page * pageSize,
      where: filters(filterModel),
      order: sorts(sortModel),
    });
  }
}
