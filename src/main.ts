import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './errors/handleError';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe())

  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors({
    origin: '*',       
    methods: '*',      
  });

  await app.listen(8000);

  console.log(new Date())
}

bootstrap();
