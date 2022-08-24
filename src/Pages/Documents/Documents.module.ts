import { ConstValue, DocAttach } from '@contact/models';
import { SequelizeModule } from '@contact/nestjs-sequelize';
import { Module } from '@nestjs/common';
import { SmbModule } from 'src/Modules/Smb/Smb.module';
import { DocumentsController } from './Documents.controller';
import { DocumentsService } from './Documents.service';

@Module({
  imports: [SequelizeModule.forFeature([DocAttach, ConstValue]), SmbModule],
  controllers: [DocumentsController],
  providers: [DocumentsService],
})
export class DocumentsModule {}
