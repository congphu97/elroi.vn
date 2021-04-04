import { prop } from '@typegoose/typegoose';
export class Order {
  @prop()
  customerName: string;

  @prop()
  category: string;
  
  @prop()
  address: string;

  @prop()
  email: string;

  @prop()
  idProduct: [];

  @prop()
  numberPhone: number;

  @prop()
  status: boolean;

  @prop()
  totalPrice: number;

  @prop()
  createdAt: string;

  @prop()
  updateAt: string;
}
