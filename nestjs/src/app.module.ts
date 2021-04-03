import { Module, Options } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Auth } from './auth/auth.model';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { configuration } from './configuration/config';
import { DatabaseConfig } from './configuration/database';
import { AppController } from './app.controller';
import { OrderModule } from './order/order.module';
import { MulterModule } from '@nestjs/platform-express';
// console.log(process.env);

@Module({
  imports: [
    AuthModule,
    UserModule,
    ProductModule,
    OrderModule,
    TypegooseModule.forRoot('mongodb://localhost:27017/jandrvn', { useNewUrlParser: true, useUnifiedTopology: true }),
    MulterModule.register({
      dest: './uploads',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
