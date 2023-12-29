import { Module } from '@nestjs/common';
import { DatabaseModule } from './Database/Database.module';
import { ModulesModule } from './Modules/Modules.module';
import { PagesModule } from './Pages/Pages.module';
import { RoleModule } from './Pages/Role/Role.module';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { CommandModule } from './Command/Command.module';
@Module({
  imports: [
    DatabaseModule,
    ModulesModule,
    PagesModule,
    RoleModule,
    ConfigModule.forRoot({
      load: [databaseConfig],
      envFilePath: process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env.dev',
      isGlobal: true,
    }),
    CommandModule,
  ],
})
export class AppModule {}
