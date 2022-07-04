import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { tz } from 'moment-timezone';
import { AppModule } from './app.module';
import { LocalService } from './Database/Local.database/Local.service';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { VersionService } from './Modules/Version/version.service';
import { getSwaggerOptions, getSwaggerOptionsCustom } from './utils/swagger';
import client from './utils/client';
import https from './utils/https';

tz.setDefault('GMT');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ https }),
  );
  
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const versionService = app.get(VersionService);
  const config = new DocumentBuilder()
    .setTitle('Получение штрих-кода')
    .setDescription('Введите данные чтобы получить штрих-код')
    .setVersion(versionService.version)
    .build();

  const document = SwaggerModule.createDocument(
    app,
    config,
    getSwaggerOptions(),
  );
  SwaggerModule.setup('api', app, document, getSwaggerOptionsCustom());
  await app.listen(client('port'), '0.0.0.0');
  // await app.listen(3001);
}
bootstrap();
