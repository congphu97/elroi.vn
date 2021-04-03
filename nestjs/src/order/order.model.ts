import { prop, } from '@typegoose/typegoose';
export class Order {
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
    size: string

    @prop()
    password: number

}