import { SequelizeModule } from '@contact/nestjs-sequelize';
import { Module } from '@nestjs/common';
import { Barcode } from 'src/Database/Local.database/models/Barcode.model';
import { Doc } from 'src/Database/Local.database/models/Doc.model';
import { EventsGateway } from './events.gateway';

@Module({
  imports: [SequelizeModule.forFeature([Barcode, Doc])],
  providers: [EventsGateway],
  exports: [EventsGateway],
})
export class EventsModule {}
