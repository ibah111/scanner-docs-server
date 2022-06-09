import { SequelizeModule } from '@contact/nestjs-sequelize';
import { Sequelize } from '@contact/sequelize-typescript';
import { Module } from '@nestjs/common';
import { LocalService } from './Local.service';
import { LocalModels } from './models';
import { Barcode } from './models/Barcode.model';
import { Depart } from './models/Depart.model';
import { Log } from './models/Log.model';
import { Status } from './models/Status.model';
import { User } from './models/User.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: 'database.sqlite',
      models: LocalModels,
    }),
    SequelizeModule.forFeature(LocalModels),
  ],
  providers: [LocalService],
})
export class LocalDatabase {}
