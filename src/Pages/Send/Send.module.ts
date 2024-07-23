import { SequelizeModule } from '@sql-tools/nestjs-sequelize';
import { Module } from '@nestjs/common';
import { Doc } from 'src/Database/Local.database/models/Doc.model';
import { DocData } from 'src/Database/Local.database/models/DocData.model';
import { Transmit } from 'src/Database/Local.database/models/Transmit.model';
import { User } from 'src/Database/Local.database/models/User.model';
import { SendController } from './Send.controller';
import { SendService } from './Send.service';
import { BoxTypes } from 'src/Database/Local.database/models/BoxTypes.model';
import { Barcode } from 'src/Database/Local.database/models/Barcode.model';

@Module({
  imports: [
    SequelizeModule.forFeature(
      [Transmit, User, Doc, DocData, BoxTypes, Barcode],
      'local',
    ),
  ],
  controllers: [SendController],
  providers: [SendService],
})
export class SendModule {}
