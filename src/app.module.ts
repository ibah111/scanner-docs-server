import { Module } from '@nestjs/common';
import { DatabaseModule } from './Database';
import { ModulesModule } from './Modules/Modules.module';
import { PagesModule } from './Pages/Pages.module';
import { ServicesModule } from './Services/Services.module';

@Module({
  imports: [DatabaseModule, ModulesModule, ServicesModule, PagesModule],
})
export class AppModule {}
