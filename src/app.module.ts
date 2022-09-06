import { Module } from '@nestjs/common';
import { DatabaseModule } from './Database';
import { ModulesModule } from './Modules/Modules.module';
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
  ],
})
export class AppModule {}
