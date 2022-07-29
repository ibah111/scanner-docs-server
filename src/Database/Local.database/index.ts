import { SequelizeModule } from '@contact/nestjs-sequelize';
import { Module } from '@nestjs/common';
import { LocalService } from './Local.service';
import { LocalModels } from './models';

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
