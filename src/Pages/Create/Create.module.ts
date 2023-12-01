import { Module } from '@nestjs/common';
import { CreateController } from './Create.controller';
import { CreateService } from './Create.service';
import { SequelizeModule } from '@sql-tools/nestjs-sequelize';
import { Barcode } from 'src/Database/Local.database/models/Barcode.model';
import { Log } from 'src/Database/Local.database/models/Log.model';
import { Doc } from 'src/Database/Local.database/models/Doc.model';
import { Depart } from 'src/Database/Local.database/models/Depart.model';
import { User } from 'src/Database/Local.database/models/User.model';
import { DocData } from 'src/Database/Local.database/models/DocData.model';
import { Result } from 'src/Database/Local.database/models/Result.model';
import { EventsModule } from 'src/Modules/Events/events.module';
import { LawAct, LawExec } from '@contact/models';

@Module({
  imports: [
    EventsModule,
    SequelizeModule.forFeature(
      [Barcode, Log, Depart, Doc, User, DocData, Result],
      'local',
    ),
    SequelizeModule.forFeature([LawAct, LawExec], 'contact'),
  ],
  controllers: [CreateController],
  providers: [CreateService],
})
export class CreateModule {}
