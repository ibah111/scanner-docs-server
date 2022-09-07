import { ConstValue, DocAttach } from '@contact/models';
import { SequelizeModule } from '@contact/nestjs-sequelize';
import { Module } from '@nestjs/common';
import { Barcode } from 'src/Database/Local.database/models/Barcode.model';
import { Depart } from 'src/Database/Local.database/models/Depart.model';
import { Doc } from 'src/Database/Local.database/models/Doc.model';
import { DocData } from 'src/Database/Local.database/models/DocData.model';
import { Log } from 'src/Database/Local.database/models/Log.model';
import { Transmit } from 'src/Database/Local.database/models/Transmit.model';
import { User } from 'src/Database/Local.database/models/User.model';
import { SmbModule } from 'src/Modules/Smb/Smb.module';
import { DataController } from './Data.controller';
import { DataService } from './Data.service';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Barcode,
      DocData,
      Doc,
      Transmit,
      User,
      DocAttach,
      ConstValue,
      Depart,
      Log,
    ]),
    SmbModule,
  ],
  controllers: [DataController],
  providers: [DataService],
})
export class DataModule {}
