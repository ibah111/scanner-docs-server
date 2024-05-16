import { SequelizeModule } from '@sql-tools/nestjs-sequelize';
import { Module } from '@nestjs/common';
import { docModels as models } from './models';
@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mssql',
      /**
       * имя подключения, которое иницилизируется в проекте nest'a
       */
      name: 'docmail',
      /**
       * параметры подключения
       */
      host: 'newct.usb.ru',
      username: 'ibah_dev',
      password: 'GeForce2060ti++',
      database: 'docmail',
      logging: false,
      repositoryMode: true,
      models,
    }),
  ],
})
export class DocMailDatabase {}
