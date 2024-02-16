import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { VersionService } from './Modules/Version/version.service';
import { getSwaggerOptions, getSwaggerOptionsCustom } from './utils/swagger';
import client from './utils/client';
import 'colors';
import { CommandFactory } from 'nest-commander';
import './utils/CustomCa';
import https from './utils/https';

const node = process.env.NODE_ENV;
class bootstrapOptions {
  constructor() {
    this.adapter =
      node === 'prod'
        ? new FastifyAdapter({
            https: https()!,
          })
        : new FastifyAdapter();
  }
  adapter: FastifyAdapter;
}

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
async function bootstrapCli() {
  const app = await CommandFactory.createWithoutRunning(AppModule, [
    'warn',
    'error',
  ]);
  await CommandFactory.runApplication(app);
}
async function bootstrap() {
  const opts = new bootstrapOptions();
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    opts.adapter,
  );

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const versionService = app.get(VersionService);
  const config = new DocumentBuilder()
    .setTitle('Получение штрих-кода')
    .setDescription('Введите данные чтобы получить штрих-код')
    .setVersion(versionService.version)
    .addBasicAuth({
      description: 'Введите token в headers',
      name: 'token',
      in: 'header',
      type: 'apiKey',
    })
    .build();

  const document = SwaggerModule.createDocument(
    app,
    config,
    getSwaggerOptions(),
  );
  SwaggerModule.setup('docs', app, document, getSwaggerOptionsCustom());
  await app.listen(client('port'), '0.0.0.0');
  console.log(
    `NODE => ${node}, Server is running on ${await app.getUrl()}/docs`.replace(
      'http',
      node === 'prod' ? 'https' : 'http',
    ).yellow,
  );
}
if (process.env.MODE === 'CLI') {
  bootstrapCli();
} else {
  bootstrap();
}
