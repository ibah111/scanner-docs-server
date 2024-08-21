import { Command, CommandRunner } from 'nest-commander';
import { Workbook } from 'exceljs';
import { InjectModel } from '@sql-tools/nestjs-sequelize';
import { LawCourt } from '@contact/models';
import { Op } from '@sql-tools/sequelize';

@Command({
  name: 'rosp',
  description: 'Insert login after command',
})
export class RospCommand extends CommandRunner {
  constructor(
    @InjectModel(LawCourt, 'contact')
    private readonly modelLawCourt: typeof LawCourt,
  ) {
    super();
  }

  filePath = `${__dirname.replace('dist\\Command', '')}\\xlsx\\`;

  async run(): Promise<void> {
    console.log('run');
    await this.main();
  }

  async main(): Promise<void> {
    const filePath = `${__dirname.replace(
      'dist\\Command',
      '',
    )}\\xlsx\\ROSP.xlsx`;
    const rosp_workbook = new Workbook();
    const file = await rosp_workbook.xlsx.readFile(filePath);
    const reestr = file.worksheets.filter(
      (worksheet) => worksheet.name === 'Реестр',
    )[0];
    const rows = reestr.getRows(2, reestr.rowCount) || [];

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');
    worksheet.columns = [
      {
        header: 'contact_id',
        key: 'contact_id',
        width: 35,
        style: {
          alignment: {
            horizontal: 'center',
          },
        },
      },
      {
        header: 'index_code',
        key: 'index_code',
        width: 35,
        style: {
          alignment: {
            horizontal: 'center',
          },
        },
      },
      {
        header: 'old_name',
        key: 'old_name',
        width: 90,
      },
      {
        header: 'old_address',
        key: 'old_address',
        width: 90,
      },
      {
        header: 'new_name',
        key: 'new_name',
        width: 90,
      },
      {
        header: 'new_address',
        key: 'new_address',
        width: 90,
      },
    ];

    for (const row of rows) {
      const new_name = row.getCell(1).value as string;
      const new_address = row.getCell(2).value as string;

      if (new_name !== null && new_address !== null) {
        const new_address_index_code = new_address.split(', ')[0];

        const law_court = await this.modelLawCourt.findOne({
          attributes: ['id', 'index_code', 'name', 'address', 'typ'],
          where: {
            address: {
              [Op.like]: `${new_address_index_code}%`,
            },
          },
        });
        const contact_id =
          law_court?.id || `По индексу ${new_address_index_code} - не найдено`;
        const index_code = law_court?.index_code
          ? `DB: ${law_court!.index_code}`
          : `Excel:${new_address_index_code}`;

        if (law_court) {
          await law_court.update({
            index_code: new_address_index_code,
            address: new_address,
            name: new_name,
          });
        }

        if (law_court === null || undefined) {
          await this.modelLawCourt.create({
            name: new_name,
            index_code: new_address_index_code,
            address: new_address,
            typ: 2,
            court_typ: null,
          });
        }

        worksheet.addRow({
          contact_id,
          index_code,
          old_name: law_court?.dataValues.name,
          old_address: law_court?.address,
          new_name,
          new_address,
        });
        console.log(law_court?.dataValues);
        console.log(`-------------`.yellow);
      }
    }
    const path = `${this.filePath}${this.fileName}`;
    return await workbook.xlsx
      .writeFile(path)
      .then(() =>
        console.log(
          'Выполнено. Файл находится в директории'.green,
          `${path}`.yellow,
        ),
      );
  }

  first_row_array = [
    'contact_id',
    'index_code',
    'old_name',
    'new_name',
    'old_adress',
    'new_adress',
  ];
  fileName = 'backup.xlsx';
}
