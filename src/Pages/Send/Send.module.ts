import { SequelizeModule } from '@contact/nestjs-sequelize';
import { Module } from '@nestjs/common';
import { Log } from 'src/Database/Local.database/models/Log.model';
import { Transmit } from 'src/Database/Local.database/models/Transmit.model';
import { User } from 'src/Database/Local.database/models/User.model';
import { SendController } from './Send.controller';
import { SendService } from './Send.service';

@Module({
  imports: [SequelizeModule.forFeature([Transmit, Log, User])],
  controllers: [SendController],
  providers: [SendService],
})
export class SendModule {}
