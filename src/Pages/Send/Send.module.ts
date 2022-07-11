import { SequelizeModule } from '@contact/nestjs-sequelize';
import { Module } from '@nestjs/common';
import { Transmit } from 'src/Database/Local.database/models/Transmit.model';
import { SendController } from './Send.controller';
import { SendService } from './Send.service';

@Module({ 
    imports: [SequelizeModule.forFeature([Transmit])],
    controllers: [SendController],
    providers: [ SendService ],
})
export class SendModule {}
