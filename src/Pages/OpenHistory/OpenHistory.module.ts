import { SequelizeModule } from '@contact/nestjs-sequelize';
import { Module } from '@nestjs/common';
import { Barcode } from 'src/Database/Local.database/models/Barcode.model';
import { Depart } from 'src/Database/Local.database/models/Depart.model';
import { Log } from 'src/Database/Local.database/models/Log.model';
import { Status } from 'src/Database/Local.database/models/Status.model';
import { Transmit } from 'src/Database/Local.database/models/Transmit.model';
import { User } from 'src/Database/Local.database/models/User.model';
import { OpenHistoryController } from './OpenHistory.controller';
import { OpenHistoryService } from './OpenHistory.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Barcode, Transmit, User, Depart, Status, Log]),
  ],
  controllers: [OpenHistoryController],
  providers: [OpenHistoryService],
})
export class OpenHistoryModule {}
