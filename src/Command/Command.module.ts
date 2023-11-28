import { Module } from '@nestjs/common';
import { BasicCommand } from './Admin.command';

@Module({
  providers: [BasicCommand],
})
export class CommandModule {}
