import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { json, urlencoded } from 'express';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const configService = app.get(ConfigService);
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }))
  await app.listen(3000);
}
bootstrap();
