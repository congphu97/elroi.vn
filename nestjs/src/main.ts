import { NestFactory } from '@nestjs/core';
import { join } from 'lodash';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as path from 'path';
var express = require("express");
async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync(path.resolve('../../demo/ssl_jandr/privkey.pem')),
    cert: fs.readFileSync(path.resolve('../../demo/ssl_jandr/cert.pem')),
  }
  const app = await NestFactory.create(AppModule, {
    httpsOptions
  });
  app.enableCors();
  app.use('/uploads', express.static(join(__dirname, 'uploads')));
  await app.listen(3000);
}
bootstrap();
