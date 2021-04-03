import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Query, Req, Res } from '@nestjs/common';
import { Order } from './order.model';
import { OrderService } from './order.service';


@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService) { }

    @Get()
    async listOrders(@Res() res): Promise<Order[] | null> {
        const orders = await this.orderService.getOrder();
        return res.status(HttpStatus.OK).json(orders);
    }

    @Post()
    async createOrder(@Res() res, @Body() order: Order): Promise<Order> {
        const newOrder = await this.orderService.createOrder(order);
        if (!newOrder) throw new NotFoundException('Create fail');
        return res.status(HttpStatus.OK).json(newOrder);
    }

    @Put('/:id')
    async updateOrder(@Res() res, @Body() order: Order, @Param('id') id): Promise<Order> {
        const newOrder = await this.orderService.updateOrder(id, order);
        if (!newOrder) throw new NotFoundException('Update fail');
        return res.status(HttpStatus.OK).json(newOrder);
    }


    @Delete('/:id')
    async deleteOrder(@Res() res, @Param('id') id): Promise<Order> {
        const newOrder = await this.orderService.deleteOrder(id);
        if (!newOrder) throw new NotFoundException('Update fail');
        return res.status(HttpStatus.OK).json(newOrder);
    }
}