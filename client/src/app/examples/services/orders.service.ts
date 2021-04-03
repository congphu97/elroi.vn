import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppConfigService } from "app/appConfig.service";
import { IOrder } from "app/shared/interfaces/ui.interfaces";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class OrdersService {
  private api: string = "";
  private resource = "order";
  private setConfig() {
    const api = this.appConfig.config["api"];
    this.api = api ? `${api}${this.resource}/` : "";
  }
  private order = new Subject();
  constructor(private http: HttpClient, private appConfig: AppConfigService) {
    this.setConfig();
  }
  public createOrder(order: IOrder, username: string) {
    return this.http.post(this.api + "order", {
      order: order,
      username: username,
    });
  }

  public updateOrder(id: string, order: IOrder) {
    return this.http.put(this.api +  + id, order);
  }

  public getAllOrder() {
    return this.http.get(this.api );
  }

  public getOneOrder(id: string) {
    return this.http.get(this.api  + id);
  }

  public deleteOrder(id: string) {
    return this.http.delete(this.api + id);
  }

  public setSubmit(order) {
    this.order.next(order);
  }

  public getSubmit$$() {
    return this.order.asObservable();
  }
}
