import { SequelizeModule } from '@contact/nestjs-sequelize';
import { Module } from '@nestjs/common';
import { Doc } from 'src/Database/Local.database/models/Doc.model';
import { DocData } from 'src/Database/Local.database/models/DocData.model';
import { Result } from 'src/Database/Local.database/models/Result.model';
import { SmbModule } from 'src/Modules/Smb/Smb.module';
import { OpenRowsBoxController } from './OpenRowsBox.controller';
import { OpenRowsBoxService } from './OpenRowsBox.service';

@Module({
  imports: [SequelizeModule.forFeature([Doc, DocData, Result]), SmbModule],
  controllers: [OpenRowsBoxController],
  providers: [OpenRowsBoxService],
})
export class OpenRowsBoxModule {}
