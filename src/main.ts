import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { tz } from 'moment-timezone';
import { AppModule } from './app.module';
import { LocalService } from './Database/Local.database/Local.service';
tz.setDefault('GMT');
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const localService = app.get(LocalService);
  await localService.init();
  await localService.migrate();
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
