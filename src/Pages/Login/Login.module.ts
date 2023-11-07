import { User } from '@contact/models';
import { SequelizeModule } from '@sql-tools/nestjs-sequelize';
import { Module } from '@nestjs/common';
import { LoginController } from './Login.controller';

@Module({
  imports: [SequelizeModule.forFeature([User], 'local')],
  controllers: [LoginController],
})
export class LoginModule {}
