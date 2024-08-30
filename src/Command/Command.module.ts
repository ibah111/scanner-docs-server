import { Module } from '@nestjs/common';
import { AdminCommand } from './Admin.command';
import { SequelizeModule } from '@sql-tools/nestjs-sequelize';
import { User } from '../Database/Local.database/models/User.model';
import { Role } from '../Database/Local.database/models/Role.model';
import { User_Role } from '../Database/Local.database/models/User_Role.model';
import { SearchCommand } from './Search.command';
import { Person, Debt, DebtCalc, LawCourt, Portfolio } from '@contact/models';
import { DocMailCommand } from './DocMail.command';
import { Doc_DocMail } from '../Database/DoMail.database/models/Doc_DocMail.model';
import { RospCommand } from './Rosp.command';
import { PravezhCommand } from './Pravezh.command';
import { ArchiveCommand } from './Archive.command';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Role, User_Role], 'local'),
    SequelizeModule.forFeature(
      [Person, Debt, DebtCalc, LawCourt, Portfolio],
      'contact',
    ),
    SequelizeModule.forFeature([Doc_DocMail], 'docmail'),
  ],
  providers: [
    AdminCommand,
    SearchCommand,
    DocMailCommand,
    RospCommand,
    PravezhCommand,
    ArchiveCommand,
  ],
})
export class CommandModule {}
