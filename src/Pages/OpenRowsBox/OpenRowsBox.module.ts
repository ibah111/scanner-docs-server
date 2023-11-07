import { SequelizeModule } from '@sql-tools/nestjs-sequelize';
import { Module } from '@nestjs/common';
import { Barcode } from 'src/Database/Local.database/models/Barcode.model';
import { Doc } from 'src/Database/Local.database/models/Doc.model';
import { DocData } from 'src/Database/Local.database/models/DocData.model';
import { Result } from 'src/Database/Local.database/models/Result.model';
import { OpenRowsBoxController } from './OpenRowsBox.controller';
import { OpenRowsBoxService } from './OpenRowsBox.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Doc, DocData, Result, Barcode], 'local'),
  ],
  controllers: [OpenRowsBoxController],
  providers: [OpenRowsBoxService],
})
export class OpenRowsBoxModule {}
