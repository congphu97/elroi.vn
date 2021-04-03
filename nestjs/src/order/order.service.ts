
import { Get, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { Order } from './order.model';
@Injectable()
export class OrderService {
    constructor(@InjectModel(Order) private orderModel: ReturnModelType<typeof Order>) { }
    async createOrder(order: Order) {
        const newOrder = new this.orderModel(order);
        return await newOrder.save();
    }

    async getOrder(): Promise<Order[]> {
        console.log(process.env.HOST)
        return await this.orderModel.find().exec();
    }


    async updateOrder(id: string, order: Order): Promise<Order> {
        const newOrder = this.orderModel.findByIdAndUpdate(id, order)
        return newOrder;
    }

    async deleteOrder(id: string): Promise<Order> {
        const newOrder = this.orderModel.findByIdAndDelete(id)
        return newOrder;
    }
}