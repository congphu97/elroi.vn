import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Query, Req, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Product } from './product.model';
import { ProductService } from './product.service';
import { editFileName, imageFileFilter } from 'src/utils/file-upload.utils';
import * as path from 'path';
import { diskStorage } from 'multer';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) { }

    @Get('/:id')
    async getOneProduct(@Res() res, @Param('id') id): Promise<Product[] | null> {
        const products = await this.productService.getOneProduct(id);
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
    @UseInterceptors(FilesInterceptor('files[]', 20,
        {
            storage: diskStorage({
                destination: './uploads/',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter
        }))
    async logFiles(@UploadedFiles() images, @Body() fileDto: any, @Res() res) {
        return res.send(images);

    }


    @Get()
    async listProducts(@Query() query, @Res() res): Promise<Product[] | null> {
        console.log({query})
        const products = await this.productService.getProduct(query);
        return res.status(HttpStatus.OK).json(products);
    }

    @Get('/img/:imgpath')
    async seeUploadedFile(@Param('imgpath') image, @Res() res) {
        return res.sendFile(image, { root: './uploads' });
    }
}