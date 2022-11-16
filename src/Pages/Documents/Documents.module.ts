import { ConstValue, DocAttach } from '@contact/models';
import { SequelizeModule } from '@contact/nestjs-sequelize';
import { Module } from '@nestjs/common';
import { DocumentsController } from './Documents.controller';
import { DocumentsService } from './Documents.service';
import config from '../../config/smb.json';
import { SmbModule } from '@tools/nestjs-smb2';
@Module({
  imports: [
    SequelizeModule.forFeature([DocAttach, ConstValue]),
    SmbModule.register(config),
  ],
  controllers: [DocumentsController],
  providers: [DocumentsService],
})
export class DocumentsModule {}
