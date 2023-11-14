import { Module } from '@nestjs/common';
import { SequelizeModule } from '@sql-tools/nestjs-sequelize';
import { models } from './models';
import { LocalDatabaseSeed } from './seed';
import { ConfigType } from '@nestjs/config';
import databaseConfig from '../../config/database.config';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      name: 'local',
      useFactory: (config: ConfigType<typeof databaseConfig>) => {
        console.log(config);
        return {
          dialect: 'mssql',
          username: config.username,
          password: config.password,
          host: config.host,
          database: config.database,
          port: config.port,
          logging: console.log,
          models,
        };
      },
      inject: [databaseConfig.KEY],
    }),
  ],
  providers: [LocalDatabaseSeed],
})
export default class LocalDatabase {}
