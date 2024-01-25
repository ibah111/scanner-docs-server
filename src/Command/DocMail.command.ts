import { InjectModel } from '@sql-tools/nestjs-sequelize';
import { Command, CommandRunner } from 'nest-commander';
import { Doc_DocMail } from '../Database/DoMail.database/models/Doc_DocMail.model';

@Command({
  name: 'docmail',
  description: 'Insert login after command',
})
export class DocMailCommand extends CommandRunner {
  constructor(
    @InjectModel(Doc_DocMail, 'docmail')
    private readonly modelDoc_Docmail: typeof Doc_DocMail,
  ) {
    super();
  }

  async run(): Promise<void> {
    console.log('doc mail command run');
    await this.main();
  }

  async main() {
    const docs = await this.modelDoc_Docmail.findAll();
    console.log(docs);
  }
}
