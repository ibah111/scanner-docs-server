import { Command, CommandRunner } from 'nest-commander';
import { InjectModel } from '@sql-tools/nestjs-sequelize';
import { Debt, DebtCalc, Person } from '@contact/models';
@Command({
  name: 'search',
  description: 'Insert login after command',
})
export class SearchCommand extends CommandRunner {
  constructor(
    @InjectModel(Person, 'contact') private readonly modelPerson: typeof Person,
    @InjectModel(Debt, 'contact') private readonly modelDebt: typeof Debt,
    @InjectModel(DebtCalc, 'contact')
    private readonly modelDebtCalc: typeof DebtCalc,
  ) {
    super();
  }
  async run(): Promise<void> {
    console.log('run');
    await this.main();
  }

  async main(): Promise<void> {
    const debts = await this.modelDebt.findAll({
      //   limit: 1,
      attributes: ['id'],
      include: [
        {
          attributes: ['parent_id', 'id'],
          model: this.modelDebtCalc,
        },
      ],
    });
    for (const debt of debts) {
      if (debt.DebtCalcs?.length === 0) console.log(debt.id);
    }
  }
}
