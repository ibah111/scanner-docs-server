import { Module } from '@nestjs/common';
import { CreateController } from './Create.controller';
import { CreateService } from './Create.service';
import { SequelizeModule } from '@contact/nestjs-sequelize';
import { Barcode } from 'src/Database/Local.database/models/Barcode.model';
import { Log } from 'src/Database/Local.database/models/Log.model';
import { Doc } from 'src/Database/Local.database/models/Doc.model';
import { Depart } from 'src/Database/Local.database/models/Depart.model';
import { User } from 'src/Database/Local.database/models/User.model';
import { DocData } from 'src/Database/Local.database/models/DocData.model';
import { Result } from 'src/Database/Local.database/models/Result.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Barcode,
      Log,
      Depart,
      Doc,
      User,
      DocData,
      Result,
    ]),
  ],
  controllers: [CreateController],
  providers: [CreateService],
})
export class CreateModule {}
