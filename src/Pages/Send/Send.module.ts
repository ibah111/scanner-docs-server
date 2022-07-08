import { Module } from '@nestjs/common';
import { SendController } from './Send.controller';

@Module({ controllers: [SendController] })
export class SendModule {}
