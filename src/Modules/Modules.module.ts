import { Module } from '@nestjs/common';
import { EventsModule } from './Events/events.module';
import { HealthModule } from './Health/Health.module';
import { VersionModule } from './Version/version.module';

@Module({ imports: [VersionModule, EventsModule, HealthModule] })
export class ModulesModule {}
