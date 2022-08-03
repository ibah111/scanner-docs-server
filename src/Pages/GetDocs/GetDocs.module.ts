import { ConstValue, DocAttach } from '@contact/models';
import { SequelizeModule } from '@contact/nestjs-sequelize';
import { Module } from '@nestjs/common';
import { Doc } from 'src/Database/Local.database/models/Doc.model';
import { SmbModule } from 'src/Modules/smb';
import { GetDocsController } from './GetDocs.controller';
import { GetDocsService } from './GetDocs.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Doc, DocAttach, ConstValue]),
    SmbModule,
  ],
  controllers: [GetDocsController],
  providers: [GetDocsService],
})
export class GetDocsModule {}
