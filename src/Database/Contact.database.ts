import { SequelizeModule } from '@sql-tools/nestjs-sequelize';
import { Module } from '@nestjs/common';
import models from '@contact/models';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mssql',
      name: 'contact',
      host: 'newct.usb.ru',
      username: 'contact',
      password: 'contact',
      database: 'i_collect',
      logging: false,
      repositoryMode: true,
      models,
    }),
  ],
})
export class ContactDatabase {}
