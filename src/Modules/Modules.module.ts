import { Module } from '@nestjs/common';
import { VersionModule } from './Version/version.module';

@Module({ imports: [VersionModule] })
export class ModulesModule {}
