import { Module } from '@nestjs/common';
import { EventsModule } from './Events/events.module';
import { HealthModule } from './Health/Health.module';
import { VersionModule } from './Version/version.module';
import { SmbModule } from '@tools/nestjs-smb2';
import smb from '../config/smb.json';
import { CaslModule } from './CASL/Casl.module';
import { UsersModule } from './Users/Users.module';

@Module({
  imports: [
    SmbModule.register({ server: smb.url, ...smb.credentials, isGlobal: true }),
    VersionModule,
    EventsModule,
    HealthModule,
    CaslModule,
    UsersModule,
  ],
})
export class ModulesModule {}
