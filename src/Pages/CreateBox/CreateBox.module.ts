import { SequelizeModule } from '@contact/nestjs-sequelize';
import { Module } from '@nestjs/common';
import { Barcode } from 'src/Database/Local.database/models/Barcode.model';
import { Box } from 'src/Database/Local.database/models/Box.model';
import { CreateBoxController } from './CreateBox.controller';
import { CreateBoxService } from './CreateBox.service';

@Module({
  imports: [SequelizeModule.forFeature([Barcode, Box])],
  controllers: [CreateBoxController],
  providers: [CreateBoxService],
})
export class CreateBoxModule {}
