/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Command, CommandRunner } from 'nest-commander';
import { InjectModel } from '@sql-tools/nestjs-sequelize';
import { Debt } from '@contact/models';
import fs from 'fs';
import { Workbook } from 'exceljs';

class Archive {
  row_id: unknown;
  id: number;
  fio: string;
  kd: string;
  date: Date;
  cession_num: string;
  cedent: string;
  first_creditor: string;
}

@Command({
  name: 'archive',
  description: '',
})
export class ArchiveCommand extends CommandRunner {
  constructor(
    @InjectModel(Debt, 'contact') private readonly modelDebt: typeof Debt,
  ) {
    super();
  }

  async run(): Promise<void> {
    await this.m();
  }

  arhiveFolderPath = __dirname.replace('\\dist\\Command', '\\PravezhArchive');

  async m() {
    let broker_ka_2021: number = 0;
    let broker_ka_2023: number = 0;
    let bistro_bank_2018: number = 0;
    let bistro_bank_2022: number = 0;
    let broker: number = 0;
    let dolgovoe_agenstvo: number = 0;
    let econ_prof: number = 0;
    let agenstvo_plus: number = 0;

    const broker_ka_2021_pathSrc = `${this.arhiveFolderPath}\\ДУПТ Брокер КА- СВД 26.01.21.pdf`;
    const broker_ka_2023_pathSrc = `${this.arhiveFolderPath}\\ДУПТ Брокер-КА- СВД 22.11.23`;
    const bistro_bank_2018_pathSrc = `${this.arhiveFolderPath}\\ДУПТ Быстробанк-СВД 25.10.18.pdf`;
    const bistro_bank_2022_pathSrc = `${this.arhiveFolderPath}\\ДУПТ Быстробанк-СВД 20.07.22.pdf`;
    const broker_pathSrc = `${this.arhiveFolderPath}\\ДУПТ Брокер- СВД.pdf`;
    const dolgovoe_agenstvo_pathSrc = `${this.arhiveFolderPath}\\ДУПТ Долговое Агенство + -СВД.pdf`;
    const agenstvo_plus_pathSrc = `${this.arhiveFolderPath}\\ДУПТ между Агенство+ - СВД.pdf`;
    const econ_prof_pathSrc = `${this.arhiveFolderPath}\\ДУПТ Экон-Проф-СВД.pdf`;

    console.log('folder path'.yellow, this.arhiveFolderPath);
    const folder_name = 'СВД ДУПТы';
    const folder_path = `${this.arhiveFolderPath}\\${folder_name}`;
    fs.rmdir(folder_path, () => console.log('dir removed'.red));
    fs.mkdir(folder_path, () => console.log('dir created'.green));

    const workbook = new Workbook();
    try {
      const file = await workbook.xlsx.readFile(
        `${this.arhiveFolderPath}\\Данные по цессиям (1).xlsx`,
      );
      const worksheet = file.worksheets.filter(
        (worksheet) => worksheet.name === 'Лист1',
      )[0];
      const rows = worksheet.getRows(2, worksheet.rowCount) || [];
      for (const row of rows) {
        const arch = new Archive();
        //@ts-ignore
        arch.id = row.values[1];
        //@ts-ignore
        arch.fio = row.values[2];
        //@ts-ignore
        arch.kd = row.values[3];
        //@ts-ignore
        arch.date = row.values[4];
        //@ts-ignore
        arch.cession_num = row.values[5];
        //@ts-ignore
        arch.cedent = row.values[6];
        //@ts-ignore
        arch.first_creditor = row.values[7];

        //ООО «Брокер-КА»
        if (arch.cedent === 'ООО «Брокер-КА»') {
          const broker_ka_year = arch.date.getFullYear();
          if (broker_ka_year === 2021) {
            broker_ka_2021++;
            await this.createPDF(broker_ka_2021_pathSrc, folder_path, arch.kd);
          }
          if (broker_ka_year === 2023) {
            broker_ka_2023++;
            await this.createPDF(broker_ka_2023_pathSrc, folder_path, arch.kd);
          }
        }
        if (arch.cedent === 'ПАО «БыстроБанк»') {
          const bistro_bank_year = arch.date.getFullYear();
          if (bistro_bank_year === 2022) {
            bistro_bank_2022++;
            await this.createPDF(
              bistro_bank_2022_pathSrc,
              folder_path,
              arch.kd,
            );
          }
          if (bistro_bank_year === 2018) {
            await this.createPDF(
              bistro_bank_2018_pathSrc,
              folder_path,
              arch.kd,
            );
            bistro_bank_2018++;
          }
        }
        if (arch.cedent === 'ООО «Брокер»') {
          await this.createPDF(broker_pathSrc, folder_path, arch.kd);
          broker++;
        }
        if (arch.cedent === 'ООО «Долговое агентство»') {
          await this.createPDF(dolgovoe_agenstvo_pathSrc, folder_path, arch.kd);
          dolgovoe_agenstvo++;
        }
        if (arch.cedent === 'ООО «Агентство+»') {
          await this.createPDF(agenstvo_plus_pathSrc, folder_path, arch.kd);
          agenstvo_plus++;
        }
        if (arch.cedent === 'ООО «Экон-проф»') {
          await this.createPDF(econ_prof_pathSrc, folder_path, arch.kd);
          econ_prof++;
        }
      }

      console.log('broker', broker);
      console.log('broker_ka_2021', broker_ka_2021);
      console.log('broker_ka_2023', broker_ka_2023);
      console.log('bistro_bank_2018', bistro_bank_2018);
      console.log('bistro_bank_2022', bistro_bank_2022);
      console.log('dolgovoe_agenstvo', dolgovoe_agenstvo);
      console.log('agenstvo_plus', agenstvo_plus);
      console.log('econ_prof', econ_prof);
      console.log(
        'total',
        broker +
          broker_ka_2021 +
          broker_ka_2023 +
          bistro_bank_2018 +
          bistro_bank_2022 +
          dolgovoe_agenstvo +
          agenstvo_plus +
          econ_prof,
      );

      fs.readdir(folder_path, (err, files) => {
        console.log('total docs: ', files.length);
      });
    } catch (error) {
      console.log(error);
      throw Error();
    }
  }
  async createPDF(src: string, dest: string, filename: string) {
    fs.copyFile(src, `${dest}\\${filename}.pdf`.replace(/\//g, '_'), () => {});
  }
}
