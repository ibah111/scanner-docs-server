import { SequelizeModule } from '@sql-tools/nestjs-sequelize';
import { Module } from '@nestjs/common';
import { docModels as models } from './models';
@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mssql',
      name: 'docmail',
      host: 'newct.usb.ru',
      username: 'USB/Баледин',
      password: 'GeForce2060++',
      database: process.env.NODE_ENV === 'prod' ? 'docmail' : 'docmail_test',
      logging: true,
      repositoryMode: true,
      models,
    }),
  ],
})
export class DocMailDatabase {}
