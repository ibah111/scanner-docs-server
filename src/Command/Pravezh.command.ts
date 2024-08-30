import { Command, CommandRunner } from 'nest-commander';
import { InjectModel } from '@sql-tools/nestjs-sequelize';
import { Debt, Person } from '@contact/models';
import fs from 'fs';

@Command({
  name: 'pravezh',
  description: '',
})
export class PravezhCommand extends CommandRunner {
  constructor(
    @InjectModel(Person, 'contact') private readonly modelPerson: typeof Person,
    @InjectModel(Debt, 'contact') private readonly modelDebt: typeof Debt,
  ) {
    super();
  }

  folderName = `PravezhFolders`;
  filePath = `${__dirname.replace('dist\\Command', '')}\\${this.folderName}`;
  svd = `${this.filePath}\\СВД`;
  pkb = `${this.filePath}\\ПКБ`;
  smsfinans = `${this.filePath}\\СМСФИНАНС`;

  async run(): Promise<void> {
    // this.renamer(this.pkb, 'ПКБ');
    // this.renamer(this.svd, 'СВД');
    this.renamer(this.smsfinans, 'СМСФИНАНС');
  }

  async renamer(path: string, folder_name: string) {
    const mkdir_path = `${this.filePath}\\renamed_${folder_name}`;
    fs.rmdir(mkdir_path, () => console.log('dir removed'.yellow));
    fs.mkdir(mkdir_path, () => console.log('dir created'.green));
    //
    fs.readdir(path, async (err, files) => {
      let copied: number = 0;
      console.log(folder_name, files.length);
      for await (const file of files) {
        const split = file.replace('.pdf', '').split(' ');
        const debt_id = Number(split[0]);
        const debt = await this.modelDebt.findOne({
          where: {
            id: debt_id,
          },
          rejectOnEmpty: true,
        });
        const old_contract = debt.contract as string;
        const contract = old_contract.replace(/\//g, '_');
        const src = `${path}\\${file}`;
        const dest = `${mkdir_path}\\${contract}.pdf` as string;
        fs.copyFile(src, dest, () => {
          copied++;
        });
      }
      console.log(folder_name, 'copied:'.yellow, copied);
    });
  }
}
