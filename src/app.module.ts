import { Module } from '@nestjs/common';
import { DatabaseModule } from './Database/Database.module';
import { ModulesModule } from './Modules/Modules.module';
import { PagesModule } from './Pages/Pages.module';
import { RoleModule } from './Pages/Role/Role.module';
import { ServicesModule } from './Services/Services.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule,
    ModulesModule,
    ServicesModule,
    PagesModule,
    RoleModule,
    ConfigModule.forRoot({
      load: [],
      envFilePath: '',
    }),
  ],
})
export class AppModule {}
