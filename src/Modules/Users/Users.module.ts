import { SequelizeModule } from '@sql-tools/nestjs-sequelize';
import { Module } from '@nestjs/common';
import { User } from 'src/Database/Local.database/models/User.model';
import { UsersService } from './Users.service';
import { Department } from '@contact/models';
import { Depart } from '../../Database/Local.database/models/Depart.model';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Depart], 'local'),
    SequelizeModule.forFeature([Department], 'contact'),
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
