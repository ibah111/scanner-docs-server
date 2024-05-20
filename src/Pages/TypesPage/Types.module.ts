import { Module } from '@nestjs/common';
import { TypesController } from './Types.controller';
import { TypesService } from './Type.service';
import { SequelizeModule } from '@sql-tools/nestjs-sequelize';
import { DocTypes } from '../../Database/Local.database/models/DocTypes.model';

@Module({
  imports: [SequelizeModule.forFeature([DocTypes], 'local')],
  controllers: [TypesController],
  providers: [TypesService],
})
export class TypesModule {}
