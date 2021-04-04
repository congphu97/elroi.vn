import { Component, OnInit } from "@angular/core";
import { AuthService } from "app/shared/auth/auth.service";
import { IOrder, IProduct, IUser } from "app/shared/interfaces/ui.interfaces";
import { forkJoin } from "rxjs";
import { flatMap, map, tap } from "rxjs/operators";
import { OrdersService } from "../services/orders.service";
import { ProductService } from "../services/product.service";
import * as _ from "lodash";
@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  public user: IUser;
  public historyList;
  public productList: IProduct[] = [];
  public orderList: IOrder[] = [];
  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private orderService: OrdersService
  ) {}

  ngOnInit() {
    this.getUser();
    this.getAllOrder();
    this.getAllProduct();
  }
  private getUser() {
    console.log(this.authService.getAuthenticated());
    const user = this.authService.getAuthenticated();
    if (!user) return;
    this.authService
      .getUser({ username: user.username })
      .pipe(
        tap((user: IUser) => (this.user = user)),
        tap((user: IUser) => console.log(user)),
        map((user: IUser) => user.history),
        flatMap((history: any) => {
          return forkJoin(
            history.map((id) => this.orderService.getOneOrder(id))
          );
        }),
        tap((historyList) => (this.historyList = _.compact(historyList)))
      )
      .subscribe();
    console.log(this.user);
  }
  public getAllProduct() {
    this.productService
      .getAllProduct()
      .pipe(tap((data: IProduct[]) => (this.productList = data)))
      .subscribe();
  }

  public getProduct(id: string) {
    return this.productList.find((product) => product._id === id);
  }

  public getOrder(id: string) {
    return this.orderList.find((order) => order._id === id);
  }

  public getAllOrder() {
    this.orderService
      .getAllOrder()
      .pipe(
        tap((data: IOrder[]) => (this.orderList = data)),
        map((data: IOrder[]) =>
          [].concat(...data.map((order) => order.idProduct))
        ),
        tap((data) => console.log(this.orderList, data))
      )
      .subscribe();
  }
}
