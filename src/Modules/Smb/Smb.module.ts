import { Module } from '@nestjs/common';
import { SmbService } from './Smb.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import smb from '../../config/smb.json';
import { TerminusModule } from '@nestjs/terminus';
@Module({
  imports: [
    TerminusModule,
    ClientsModule.register([
      {
        name: 'SMB_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'smb',
          protoPath: 'src/Modules/Smb/smb.proto',
          url: smb.url,
        },
      },
    ]),
  ],
  providers: [SmbService],
  exports: [SmbService],
})
export class SmbModule {}
