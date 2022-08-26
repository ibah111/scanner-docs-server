import { SequelizeModule } from '@contact/nestjs-sequelize';
import { Module } from '@nestjs/common';
import { Barcode } from 'src/Database/Local.database/models/Barcode.model';
import { Depart } from 'src/Database/Local.database/models/Depart.model';
import { Transmit } from 'src/Database/Local.database/models/Transmit.model';
import { User } from 'src/Database/Local.database/models/User.model';
import { OpenHistoryController } from './OpenHistory.controller';
import { OpenHistoryService } from './OpenHistoryService';

@Module({
  imports: [SequelizeModule.forFeature([Barcode, Transmit, User, Depart])],
  controllers: [OpenHistoryController],
  providers: [OpenHistoryService],
})
export class OpenHistoryModule {}
