
import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';
import { OrderController } from './order.controller';
import { Order } from './order.model';
import { OrderService } from './order.service';



@Module({
    imports: [TypegooseModule.forFeature([Order,User])],
    providers: [OrderService,UserService],
    controllers: [OrderController]
})
export class OrderModule { }