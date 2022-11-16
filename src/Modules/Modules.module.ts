import { Module } from '@nestjs/common';
import { EventsModule } from './Events/events.module';
import { VersionModule } from './Version/version.module';

@Module({ imports: [VersionModule, EventsModule] })
export class ModulesModule {}
