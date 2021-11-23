import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as dotenv from 'dotenv';
import { Logger } from '@nestjs/common';

dotenv.config();
const port = process.env.PORT || 8000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
  await app.listen(port);

  Logger.log(
    `Server running on http://localhost:${port} in ${process.env.NODE_ENV} mode \nPress CTRL-C to stop`,
    'Bootstrap',
  );
}
bootstrap();
