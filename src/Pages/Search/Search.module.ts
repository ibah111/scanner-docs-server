import { LawAct, Person } from '@contact/models';
import { SequelizeModule } from '@contact/nestjs-sequelize';
import { Module } from '@nestjs/common';
import { Barcode } from 'src/Database/Local.database/models/Barcode.model';
import { Doc } from 'src/Database/Local.database/models/Doc.model';
import { SearchController } from './Search.controller';
import { SearchService } from './Search.service';

@Module({
  imports: [SequelizeModule.forFeature([Barcode, Doc])],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
