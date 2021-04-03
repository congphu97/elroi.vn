
import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { OrderController } from './order.controller';
import { Order } from './order.model';
import { OrderService } from './order.service';



@Module({
    imports: [TypegooseModule.forFeature([Order])],
    providers: [OrderService],
    controllers: [OrderController]
})
export class OrderModule { }