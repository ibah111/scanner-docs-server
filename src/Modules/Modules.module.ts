import { Module } from '@nestjs/common';
import { EventsModule } from './Events/events.modele';
import { SmbModule } from './smb';
import { VersionModule } from './Version/version.module';

@Module({ imports: [VersionModule, SmbModule, EventsModule] })
export class ModulesModule {}
