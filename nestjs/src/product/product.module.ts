
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypegooseModule } from 'nestjs-typegoose';
import { ProductController } from './product.controller';
import { Product } from './product.model';
import { ProductService } from './product.service';


@Module({
    imports: [TypegooseModule.forFeature([Product]),
],
    providers: [ProductService],
    controllers: [ProductController]
})
export class ProductModule { }