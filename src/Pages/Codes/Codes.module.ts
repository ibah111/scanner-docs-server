import { Module } from '@nestjs/common';
import { CodesController } from './Codes.controller';
import { CodesService } from './Codes.service';
import { SequelizeModule } from '@sql-tools/nestjs-sequelize';
import { Barcode } from '../../Database/Local.database/models/Barcode.model';
import { Doc } from '../../Database/Local.database/models/Doc.model';

@Module({
  imports: [SequelizeModule.forFeature([Barcode, Doc], 'local')],
  controllers: [CodesController],
  providers: [CodesService],
})
export class CodesModule {}
