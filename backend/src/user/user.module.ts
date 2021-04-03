
import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserController } from './user.controller';
import { User } from './user.model';
import { UserService } from './user.service';


@Module({
    imports: [TypegooseModule.forFeature([User])],
    providers: [UserService],
    controllers: [UserController]
})
export class UserModule { }