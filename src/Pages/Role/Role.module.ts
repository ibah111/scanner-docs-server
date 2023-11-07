import { SequelizeModule } from '@sql-tools/nestjs-sequelize';
import { Module } from '@nestjs/common';
import { Role } from 'src/Database/Local.database/models/Role.model';
import { User } from 'src/Database/Local.database/models/User.model';
import { User_Role } from 'src/Database/Local.database/models/User_Role.model';
import { RoleController } from './Role.controller';
import { RoleService } from './Role.service';

@Module({
  imports: [SequelizeModule.forFeature([User_Role, Role, User], 'local')],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
