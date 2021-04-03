import { Module, Options } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from '../app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Auth } from './auth/auth.model';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { configuration } from './configuration/config';
import { DatabaseConfig } from './configuration/database';
console.log(process.env);

@Module({
  imports: [
    AuthModule,
    UserModule,
    ProductModule,
    TypegooseModule.forRoot('mongodb://localhost:27017/jandrvn', { useNewUrlParser: true, useUnifiedTopology: true }),

    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
