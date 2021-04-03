import { NestFactory } from '@nestjs/core';
import { join } from 'lodash';
import { AppModule } from './app.module';
var express = require("express");
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use('/uploads', express.static(join(__dirname, 'uploads')));
  await app.listen(3000);
}
bootstrap();
