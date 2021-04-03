
import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { AuthController } from './auth.controller';
import { Auth } from './auth.model';
import { AuthService } from './auth.service';


@Module({
    imports: [TypegooseModule.forFeature([Auth])],
    providers: [AuthService],
    controllers: [AuthController]
})
export class AuthModule { }