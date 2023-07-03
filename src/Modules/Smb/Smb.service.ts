import { ClientGrpc, GrpcOptions } from '@nestjs/microservices';
import { SmbServiceClient } from './smb';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import smb from 'src/config/smb.json';
import { Metadata } from '@grpc/grpc-js';
import { Observable, lastValueFrom, map, tap, toArray } from 'rxjs';
import { Readable } from 'stream';
import { GRPCHealthIndicator } from '@nestjs/terminus';
@Injectable()
export class SmbService implements OnModuleInit {
  private smbClient: SmbServiceClient;
  private meta: Metadata;
  constructor(
    @Inject('SMB_PACKAGE') private readonly client: ClientGrpc,
    private readonly health: GRPCHealthIndicator,
  ) {}
  onModuleInit() {
    this.smbClient = this.client.getService<SmbServiceClient>('SmbService');
    return lastValueFrom(
      this.smbClient.login(smb.credentials).pipe(
        tap((result) => {
          const meta = new Metadata();
          meta.set('token', result.result);
          this.meta = meta;
        }),
      ),
    );
  }
  getHealth(key: string) {
    return this.health.checkService<GrpcOptions>(key, 'SmbService', {
      url: smb.url,
      healthServiceName: 'Health',
      healthServiceCheck: (healthService, service) => {
        return healthService.check({ service }, this.meta).toPromise();
      },
    });
  }

  exists(path: string): Observable<boolean> {
    return this.smbClient
      .exists({ path }, this.meta)
      .pipe(map((res) => res.result));
  }
  mkdir(path: string, mode?: number): Observable<boolean> {
    return this.smbClient
      .mkdir({ path, mode }, this.meta)
      .pipe(map((res) => res.result));
  }
  readFileStream(path: string): Readable {
    const data = new Readable({
      read: () => {
        return;
      },
    });
    this.smbClient
      .readFile({ path }, this.meta)
      .pipe(map((res) => res.result))
      .subscribe({
        next: (value) => {
          data.push(value);
        },
        error: (e) => {
          data.destroy(e);
        },
        complete: () => {
          data.push(null);
        },
      });
    return data;
  }
  readFile(path: string): Observable<Buffer> {
    return this.smbClient.readFile({ path }, this.meta).pipe(
      map((res) => res.result),
      toArray(),
      map((items) => Buffer.concat(items)),
    );
  }
  writeFile(path: string, file: Buffer): Observable<boolean> {
    return this.smbClient
      .writeFile({ path, file }, this.meta)
      .pipe(map((res) => res.result));
  }

  unlink(path: string): Observable<boolean> {
    return this.smbClient
      .unlink({ path }, this.meta)
      .pipe(map((res) => res.result));
  }

  rmdir(path: string): Observable<boolean> {
    return this.smbClient
      .rmdir({ path }, this.meta)
      .pipe(map((res) => res.result));
  }
  readdir(path: string, encoding?: string): Observable<string[]> {
    return this.smbClient
      .readdir({ path, encoding }, this.meta)
      .pipe(map((res) => res.result));
  }
}
