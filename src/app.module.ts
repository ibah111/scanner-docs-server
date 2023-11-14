import { Module } from '@nestjs/common';
import { DatabaseModule } from './Database/Database.module';
import { ModulesModule } from './Modules/Modules.module';
import { PagesModule } from './Pages/Pages.module';
import { RoleModule } from './Pages/Role/Role.module';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';
@Module({
  imports: [
    DatabaseModule,
    ModulesModule,
    PagesModule,
    RoleModule,
    ConfigModule.forRoot({
      load: [databaseConfig],
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
