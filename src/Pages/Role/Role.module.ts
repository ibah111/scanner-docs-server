import { SequelizeModule } from '@contact/nestjs-sequelize';
import { Module } from '@nestjs/common';
import { User_Role } from 'src/Database/Local.database/models/User_Role.model';
import { RoleController } from './Role.controller';
import { RoleService } from './Role.service';

@Module({
  imports: [SequelizeModule.forFeature([User_Role])],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
