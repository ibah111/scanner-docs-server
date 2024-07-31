import { Module } from '@nestjs/common';
import { CodesController } from './Codes.controller';
import { CodesService } from './Codes.service';
import { SequelizeModule } from '@sql-tools/nestjs-sequelize';
import { Barcode } from '../../Database/Local.database/models/Barcode.model';
import { Doc } from '../../Database/Local.database/models/Doc.model';
import { DocData } from 'src/Database/Local.database/models/DocData.model';
import { Transmit } from 'src/Database/Local.database/models/Transmit.model';
import { Result } from 'src/Database/Local.database/models/Result.model';

@Module({
  imports: [
    SequelizeModule.forFeature(
      [Barcode, Doc, DocData, Result, Transmit],
      'local',
    ),
  ],
  controllers: [CodesController],
  providers: [CodesService],
})
export class CodesModule {}
