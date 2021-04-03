
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { Auth } from './auth.model';
import { AuthService } from './auth.service';


@Module({
    imports: [TypegooseModule.forFeature([User]),
    JwtModule.register({
        secretOrPrivateKey: 'secret12356789'
    })],
    providers: [UserService,AuthService],
    controllers: [AuthController]
})
export class AuthModule { }