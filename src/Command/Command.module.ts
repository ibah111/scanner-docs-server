import { Module } from '@nestjs/common';
import { AdminCommand } from './Admin.command';
import { SequelizeModule } from '@sql-tools/nestjs-sequelize';
import { User } from '../Database/Local.database/models/User.model';
import { Role } from '../Database/Local.database/models/Role.model';
import { User_Role } from '../Database/Local.database/models/User_Role.model';
import { SearchCommand } from './EmptyDC.command';
import { Person, Debt, DebtCalc } from '@contact/models';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Role, User_Role], 'local'),
    SequelizeModule.forFeature([Person, Debt, DebtCalc], 'contact'),
  ],
  providers: [AdminCommand, SearchCommand],
})
export class CommandModule {}
