import { SequelizeModule } from '@sql-tools/nestjs-sequelize';
import { Module } from '@nestjs/common';
import { LocalService } from './Local.service';
import { LocalModels } from './models';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      name: 'local',
      storage: 'database.sqlite',
      logging: false,
      models: LocalModels,
    }),
    SequelizeModule.forFeature(LocalModels, 'local'),
  ],
  providers: [LocalService],
})
export class LocalDatabase {}
