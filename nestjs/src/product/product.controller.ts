import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Query, Req, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Product } from './product.model';
import { ProductService } from './product.service';
import { Express } from 'express';



@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) { }

    @Get()
    async listProducts(@Res() res): Promise<Product[] | null> {
        const products = await this.productService.getProduct();
        return res.status(HttpStatus.OK).json(products);
    }

    @Post()
    async createProduct(@Res() res, @Body() product: Product): Promise<Product> {
        const newProduct = await this.productService.createProduct(product);
        if (!newProduct) throw new NotFoundException('Create fail');
        return res.status(HttpStatus.OK).json(newProduct);
    }

    @Put('/:id')
    async updateProduct(@Res() res, @Body() product: Product, @Param('id') id): Promise<Product> {
        const newProduct = await this.productService.updateProduct(id, product);
        if (!newProduct) throw new NotFoundException('Update fail');
        return res.status(HttpStatus.OK).json(newProduct);
    }


    @Delete('/:id')
    async deleteProduct(@Res() res, @Param('id') id): Promise<Product> {
        const newProduct = await this.productService.deleteProduct(id);
        if (!newProduct) throw new NotFoundException('Update fail');
        return res.status(HttpStatus.OK).json(newProduct);
    }

    @Post('upload')
  async testUpload(@Res() res, @Req() req, @Body('data') data) {
    console.log(req.body);
    console.log(data);
    res.status(HttpStatus.OK).json({data: 'success'});
  }
}