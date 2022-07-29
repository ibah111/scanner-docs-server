import { SequelizeModule } from '@contact/nestjs-sequelize';
import { Global, Module } from '@nestjs/common';
import { User } from 'src/Database/Local.database/models/User.model';
import { Role } from 'src/Database/Local.database/models/Role.model';
import { User_Role } from 'src/Database/Local.database/models/User_Role.model';
import { UsersService } from './Users.service';

@Global()
@Module({
  imports: [SequelizeModule.forFeature([User_Role, User, Role])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
