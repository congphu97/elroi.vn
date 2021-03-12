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