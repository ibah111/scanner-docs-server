import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { ToolsTerminusModule } from '@tools/terminus-indicators';
import { HealthController } from './Health.controller';
import { HealthService } from './Health.service';
import config from '../../config/smb.json';
import { SmbModule } from '@tools/nestjs-smb2';

@Module({
  imports: [HttpModule, TerminusModule, ToolsTerminusModule],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
