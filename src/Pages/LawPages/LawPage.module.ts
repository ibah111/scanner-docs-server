import { LawAct, LawExec } from '@contact/models';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@sql-tools/nestjs-sequelize';
import { LawPageController } from './LawPage.controller';
import { LawPageService } from './LawPage.service';

@Module({
  imports: [SequelizeModule.forFeature([LawAct, LawExec], 'contact')],
  controllers: [LawPageController],
  providers: [LawPageService],
})
export class LawPageModule {}
