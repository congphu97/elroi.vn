import { createParamDecorator, Get, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { User } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';
import { Order } from './order.model';
@Injectable()
export class OrderService {
  constructor(
    private userService: UserService,
    @InjectModel(Order) private orderModel: ReturnModelType<typeof Order>
  ) {}
  async createOrder(body) {
    const order = new this.orderModel(body.order);
    order.save();
    if (order._id) {
      const user = await this.userService.getUser({ username: body.username });
      user.history.push(order._id);
      this.userService.updateUser(user['_id'], user);
      return body;
    } else return '';
  }

  async getOrder(): Promise<Order[]> {
    return await this.orderModel.find().exec();
  }

  async getOne(id: string): Promise<Order> {
    return await this.orderModel.findOne({ _id: id });
  }

  async updateOrder(id: string, order: Order): Promise<Order> {
    const newOrder = this.orderModel.findByIdAndUpdate(id, order);
    return newOrder;
  }

  async deleteOrder(id: string): Promise<Order> {
    const newOrder = this.orderModel.findByIdAndDelete(id);
    return newOrder;
  }
}
