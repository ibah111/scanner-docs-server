import { Module } from '@nestjs/common';
import { BasicCommand } from './Admin.command';
import { SequelizeModule } from '@sql-tools/nestjs-sequelize';
import { User } from '../Database/Local.database/models/User.model';
import { Role } from '../Database/Local.database/models/Role.model';
import { User_Role } from '../Database/Local.database/models/User_Role.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Role, User_Role], 'local')],
  providers: [BasicCommand],
})
export class CommandModule {}
