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
import https from './utils/https';
import 'colors';
import { CommandFactory } from 'nest-commander';

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
async function bootstrapCli() {
  await CommandFactory.run(AppModule);
}
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ https: https()! }),
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
    `Server is running on ${(await app.getUrl()).replace('http', 'https')}/docs`
      .yellow,
  );
}
if (process.env.MODE === 'CLI') {
  bootstrapCli();
} else {
  bootstrap();
}
