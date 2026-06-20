import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import {
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app =
    await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const config =
    new DocumentBuilder()
      .setTitle(
        'Limited Product Drop API',
      )
      .setDescription(
        'Reservation and checkout system for limited inventory products',
      )
      .setVersion('1.0')
      .build();

      const document =
      SwaggerModule.createDocument(
        app,
        config,
      );
    
      SwaggerModule.setup(
        'api-docs',
        app,
        document,
      );
      
      console.log(
        'Swagger running at http://localhost:3000/api-docs',
      );

      await app.listen(3000, '0.0.0.0');
}

bootstrap();