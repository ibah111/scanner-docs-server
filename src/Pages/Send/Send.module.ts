import { SequelizeModule } from '@sql-tools/nestjs-sequelize';
import { Module } from '@nestjs/common';
import { Doc } from 'src/Database/Local.database/models/Doc.model';
import { DocData } from 'src/Database/Local.database/models/DocData.model';
import { Transmit } from 'src/Database/Local.database/models/Transmit.model';
import { User } from 'src/Database/Local.database/models/User.model';
import { SendController } from './Send.controller';
import { SendService } from './Send.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Transmit, User, Doc, DocData], 'local'),
  ],
  controllers: [SendController],
  providers: [SendService],
})
export class SendModule {}
