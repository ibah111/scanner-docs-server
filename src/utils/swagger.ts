import {
    FastifySwaggerCustomOptions,
    SwaggerDocumentOptions,
  } from '@nestjs/swagger';
  import {CreateModule} from 'src/Pages/Create/Create.module'
import client from './client';

export function getSwaggerOptions() {
    const options: SwaggerDocumentOptions = {};
    if (!client('demo')) {
      options.include = [CreateModule];
    }
    return options;
  }
  export function getSwaggerOptionsCustom() {
    const options: FastifySwaggerCustomOptions = { uiConfig: {} };
    options.uiConfig.validatorUrl = null;
    return options;
  }
  