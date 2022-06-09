import { Module } from '@nestjs/common';
import { DatabaseModule } from './Database';
import { PagesModule } from './Pages/Pages.module';

@Module({
  imports: [DatabaseModule, PagesModule],
})
export class AppModule {}
