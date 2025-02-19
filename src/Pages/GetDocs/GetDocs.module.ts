import {
  ConstValue,
  Debt,
  DocAttach,
  LawAct,
  LawExec,
  Person,
  Portfolio,
} from '@contact/models';
import { SequelizeModule } from '@sql-tools/nestjs-sequelize';
import { Module } from '@nestjs/common';
import { Barcode } from 'src/Database/Local.database/models/Barcode.model';
import { Depart } from 'src/Database/Local.database/models/Depart.model';
import { Doc } from 'src/Database/Local.database/models/Doc.model';
import { DocData } from 'src/Database/Local.database/models/DocData.model';
import { Result } from 'src/Database/Local.database/models/Result.model';
import { Transmit } from 'src/Database/Local.database/models/Transmit.model';
import { User } from 'src/Database/Local.database/models/User.model';
import { GetDocsController } from './GetDocs.controller';
import { GetDocsService } from './GetDocs.service';
import { BoxTypes } from 'src/Database/Local.database/models/BoxTypes.model';

@Module({
  imports: [
    SequelizeModule.forFeature(
      [Doc, Transmit, Barcode, User, Depart, DocData, Result, BoxTypes],
      'local',
    ),
    SequelizeModule.forFeature(
      [ConstValue, DocAttach, LawAct, LawExec, Person, Debt, Portfolio],
      'contact',
    ),
  ],
  controllers: [GetDocsController],
  providers: [GetDocsService],
})
export class GetDocsModule {}
