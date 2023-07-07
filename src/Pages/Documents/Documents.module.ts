import { ConstValue, DocAttach } from '@contact/models';
import { SequelizeModule } from '@sql-tools/nestjs-sequelize';
import { Module } from '@nestjs/common';
import { DocumentsController } from './Documents.controller';
import { DocumentsService } from './Documents.service';
@Module({
  imports: [SequelizeModule.forFeature([DocAttach, ConstValue])],
  controllers: [DocumentsController],
  providers: [DocumentsService],
})
export class DocumentsModule {}
