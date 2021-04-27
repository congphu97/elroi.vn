import { prop, } from '@typegoose/typegoose';
export class Promo {
    @prop()
    code: string


    @prop()
    discountPercent: number

    @prop()
    discountPrice: number


    @prop()
    exprireDate: string

    @prop()
    condition: string

}

