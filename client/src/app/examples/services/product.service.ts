import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppConfigService } from "app/appConfig.service";
import { IProduct } from "app/shared/interfaces/ui.interfaces";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private api: string = "";
  private resource = "product";
  private setConfig() {
    const api = this.appConfig.config["api"];
    this.api = api ? `${api}${this.resource}/` : "";
  }
  private product = new Subject();
  constructor(private http: HttpClient, private appConfig: AppConfigService) {
    this.setConfig();
  }
  public createProduct(product: IProduct) {
    return this.http.post(this.api , product);
  }

  public updateProduct(id: string, product: IProduct) {
    return this.http.put(this.api + id, product);
  }

  public getAllProduct() {
    return this.http.get(this.api );
  }

  public getOneProduct(id: string) {
    return this.http.get(this.api  + id);
  }

  public deleteProduct(id: string) {
    return this.http.delete(this.api  + id);
  }

  public setSubmit(product) {
    this.product.next(product);
  }

  public getSubmit$$() {
    return this.product.asObservable();
  }

  public uploadFile(image: any) {
    return this.http.post(this.api + "upload", image);
  }

  public getProductQuery(key: string, value: string) {
    return this.http.get(this.api  + key + "=" + value);
  }
}
