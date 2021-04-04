
import { Get, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { Product } from './product.model';
@Injectable()
export class ProductService {
    constructor(@InjectModel(Product) private productModel: ReturnModelType<typeof Product>) { }
    async createProduct(Product: Product) {
        const newProduct = new this.productModel(Product);
        return await newProduct.save();
    }

    async getProduct(): Promise<Product[]> {
        return await this.productModel.find().exec();
    }


    async updateProduct(id: string, product: Product): Promise<Product> {
        const newProduct = this.productModel.findByIdAndUpdate(id, product)
        return newProduct;
    }

    async deleteProduct(id: string): Promise<Product> {
        const newProduct = this.productModel.findByIdAndDelete(id)
        return newProduct;
    }

    async upLoad(id: string): Promise<Product> {
        const newProduct = this.productModel.findByIdAndDelete(id)
        return newProduct;
    }

    async getOneProduct(id: string): Promise<Product> {
        const newProduct = this.productModel.findOne({ _id: id })
        return newProduct;
    }
}