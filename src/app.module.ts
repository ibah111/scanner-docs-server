import { Module } from '@nestjs/common';
import { DatabaseModule } from './Database';
import { ModulesModule } from './Modules/Modules.module';
import { PagesModule } from './Pages/Pages.module';

@Module({
  imports: [DatabaseModule, PagesModule, ModulesModule],
})
export class AppModule {}
