import { Module } from '@nestjs/common';
import { SMBService } from './Smb.service';

@Module({
  providers: [SMBService],
  exports: [SMBService],
})
export class SmbModule {}
