import { Module } from '@nestjs/common';
import { DatabaseModule } from './Database';
import { ModulesModule } from './Modules/Modules.module';
import { OpenHistoryModule } from './Pages/OpenHistory/OpenHistory.module';
import { PagesModule } from './Pages/Pages.module';
import { RoleModule } from './Pages/Role/Role.module';
import { ServicesModule } from './Services/Services.module';

@Module({
  imports: [
    DatabaseModule,
    ModulesModule,
    ServicesModule,
    PagesModule,
    RoleModule,
    OpenHistoryModule,
  ],
})
export class AppModule {}
