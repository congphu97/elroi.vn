export interface IProduct {
  _id?: string;
  productName: string;
  price: number;
  priceSale: number;
  category: string;
  note: string;
  status: string;
  size: string;
  imgProduct: any;
  createdAt: string;
  updatedAt: string;
}

export interface IOrder {
  _id?: string;
  idProduct: [];
  totalPrice: number;
  numberPhone: number;
  email: string;
  customerName: string;
  address: string;
  status: boolean;
  createdAt: string;
}

export interface IUser {
  username: string;
  password: string;
  name: string;
  avatar: string;
  birthday: string;
  phone: number;
  history: [];
  role: string;
}


export interface IBackground {
  imgBackground: [];
  category: string;
}

export interface IPromo {
  code: string;
  discountPercent: number;
  discountPrice: number;
  exprireDate: string;
  condition: string;
}