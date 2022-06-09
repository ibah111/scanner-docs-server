import { LawAct, Person } from '@contact/models';
import { SequelizeModule } from '@contact/nestjs-sequelize';
import { Module } from '@nestjs/common';
import { TestController } from './Test.controller';
import { TestService } from './Test.service';

@Module({
  imports: [SequelizeModule.forFeature([LawAct, Person])],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}
