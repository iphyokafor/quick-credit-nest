import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { ValidateInputPipe } from './core/pipes/validate.pipe';

dotenv.config();
const port = process.env.PORT || 8000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidateInputPipe());

  const config = new DocumentBuilder()
    .setTitle('Quick-credit API')
    .setDescription('All API endpoints for quick credit app.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/api/v1', app, document);

  app.enableCors();
  await app.listen(port);

  Logger.log(
    `Server running on http://localhost:${port} in ${process.env.NODE_ENV} mode \nPress CTRL-C to stop`,
    'Bootstrap',
  );
}
bootstrap();
