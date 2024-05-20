import { Module } from '@nestjs/common';
import { BoxController } from './Box.controller';
import { BoxService } from './Box.service';
import { SequelizeModule } from '@sql-tools/nestjs-sequelize';
import { BoxTypes } from 'src/Database/Local.database/models/BoxTypes.model';
import { Barcode } from 'src/Database/Local.database/models/Barcode.model';

@Module({
  imports: [SequelizeModule.forFeature([BoxTypes, Barcode], 'local')],
  controllers: [BoxController],
  providers: [BoxService],
})
export class BoxModule {}
