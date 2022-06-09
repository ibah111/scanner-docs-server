import { LawAct, Person } from '@contact/models';
import { InjectModel } from '@contact/nestjs-sequelize';
import { Sequelize } from '@contact/sequelize-typescript';
import { Op } from '@contact/sequelize';
import { Injectable } from '@nestjs/common';
import { TestInput } from './Test.input';

@Injectable()
export class TestService {
  constructor(
    @InjectModel(LawAct) private modelLawAct: typeof LawAct,
    @InjectModel(Person) private modelPerson: typeof Person,
  ) {}
  async getting(body: TestInput) {
    const result = await this.modelLawAct.findAll({
      include: [
        {
          model: this.modelPerson,
          where: Sequelize.where(
            Sequelize.fn(
              'concat',
              Sequelize.col('f'),
              ' ',
              Sequelize.col('i'),
              ' ',
              Sequelize.col('o'),
            ),
            {
              [Op.like]: '%Иванов Иван%',
            },
          ),
        },
      ],
      limit: 25,
    });
    return result;
  }
}
