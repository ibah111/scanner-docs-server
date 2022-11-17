import { Injectable } from '@nestjs/common';
import { HealthCheckService, HttpHealthIndicator } from '@nestjs/terminus';
import {
  SequelizeHealthIndicator,
  SmbIndicator,
} from '@tools/terminus-indicators';

@Injectable()
export class HealthService {
  constructor(
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
    private readonly db: SequelizeHealthIndicator,
    private readonly smb: SmbIndicator,
  ) {}
  check() {
    return this.health.check([
      () => this.db.pingCheck('local-database'),
      () => this.db.pingCheck('contact-database', { connection: 'contact' }),
      () => this.http.pingCheck('bitrix', 'https://chat.nbkfinance.ru'),
      () => this.smb.check('smb', 'Luxbase'),
    ]);
  }
}
