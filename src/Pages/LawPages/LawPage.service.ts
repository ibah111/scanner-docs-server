/* eslint-disable @typescript-eslint/no-unused-vars */
import { LawAct, LawExec } from '@contact/models';
import { InjectModel } from '@sql-tools/nestjs-sequelize';
import { LawPageInput } from './LawPage.input';

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
    return await this.modelLawAct.findAll({
      attributes: ['id'],
      limit: pageSize,
      offset: page * pageSize,
    });
  }

  async findAllLawExec({
    filterModel,
    page,
    pageSize,
    sortModel,
  }: LawPageInput) {
    return await this.modelLawExec.findAll({
      attributes: ['id'],
      limit: pageSize,
      offset: page * pageSize,
    });
  }
}
