export interface IProduct {
    _id?: string
    productName: string,
    price: number,
    priceSale: number,
    category: string,
    note: string,
    status: string,
    size: string,
    imgProduct: any,
    createdAt: number,
    updatedAt: number
}

export interface IOrder {
    _id?: string
    idProduct: [],
    totalPrice: number,
    numberPhone: number
    email: string,
    customerName: string,
    address: string,
    status: boolean,
    createdAt: string
}

export interface IUser {
    username: string,
    password: string,
    name: string
    avatar: string
    birthday: string,
    email: string,
    phone: number,
    history: []
}