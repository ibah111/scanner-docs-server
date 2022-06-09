import { SequelizeModule } from '@contact/nestjs-sequelize';
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
      database: 'i_collect_test',
      models,
    }),
  ],
})
export class ContactDatabase {}
