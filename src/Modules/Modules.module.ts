import { Module } from '@nestjs/common';
import { SmbModule } from './smb';
import { VersionModule } from './Version/version.module';

@Module({ imports: [VersionModule, SmbModule] })
export class ModulesModule {}
