import { Module } from '@nestjs/common';
import { EventsModule } from './Events/events.module';
import { HealthModule } from './Health/Health.module';
import { VersionModule } from './Version/version.module';
import { SmbModule } from '@tools/nestjs-smb2';
import smb from '../config/smb.json';

@Module({
  imports: [
    SmbModule.register({ server: smb.url, ...smb.credentials, isGlobal: true }),
    VersionModule,
    EventsModule,
    HealthModule,
  ],
})
export class ModulesModule {}
