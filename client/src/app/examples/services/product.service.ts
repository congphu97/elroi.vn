import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from 'app/shared/interfaces/ui.interfaces';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:3000/'
  private product = new Subject()
  constructor(private http: HttpClient) { }
  public createProduct(product: IProduct) {
    return this.http.post(this.baseUrl + "product", product)
  }

  public updateProduct(id: string, product: IProduct) {
    return this.http.put(this.baseUrl + "product/" + id, product)
  }

  public getAllProduct() {
    return this.http.get(this.baseUrl + "product")
  }

  public getOneProduct(id: string) {
    return this.http.get(this.baseUrl + "product/" + id)
  }

  public deleteProduct(id: string) {
    return this.http.delete(this.baseUrl + "product/" + id)
  }

  public setSubmit(product) {
    this.product.next(product)
  }

  public getSubmit$$() {
    return this.product.asObservable()
  }
}
