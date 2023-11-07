import { User } from '@contact/models';
import { SequelizeModule } from '@sql-tools/nestjs-sequelize';
import { Module } from '@nestjs/common';
import { LoginController } from './Login.controller';
import { LoginService } from './Login.service';

@Module({
  imports: [SequelizeModule.forFeature([User], 'local')],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
