import { prop, } from '@typegoose/typegoose';
export class Product {
  
    @prop()
    productName: string


    @prop()
    category: string
    
    @prop()
    note: string

    @prop()
    status: string
    @prop()
    imgProduct: []

    @prop()
    price: number


    @prop()
    priceSale: number

    @prop()
    size: string

    @prop()
    createdAt: string

    @prop()
    updatedAt: string
}
