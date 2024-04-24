import { SequelizeModule } from '@sql-tools/nestjs-sequelize';
import { Module } from '@nestjs/common';
import { Barcode } from 'src/Database/Local.database/models/Barcode.model';
import { Box } from 'src/Database/Local.database/models/Box.model';
import { Doc } from 'src/Database/Local.database/models/Doc.model';
import { DocData } from 'src/Database/Local.database/models/DocData.model';
import { User } from 'src/Database/Local.database/models/User.model';
import { CreateBoxController } from './CreateBox.controller';
import { CreateBoxService } from './CreateBox.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Barcode, Box, DocData, Doc, User], 'local'),
  ],
  controllers: [CreateBoxController],
  providers: [CreateBoxService],
})
/**
 * @deprecated
 */
export class CreateBoxModule {}
