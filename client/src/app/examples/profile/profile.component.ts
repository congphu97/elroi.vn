import { Component, OnInit } from "@angular/core";
import { AuthService } from "app/shared/auth/auth.service";
import { IOrder, IProduct, IUser } from "app/shared/interfaces/ui.interfaces";
import { forkJoin } from "rxjs";
import { flatMap, map, tap } from "rxjs/operators";
import { OrdersService } from "../../shared/services/orders.service";
import { ProductService } from "../../shared/services/product.service";
import * as _ from "lodash";
import { FormControl, FormGroup, Validators } from "@angular/forms";
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
  public mode: string = 'default'
  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private orderService: OrdersService
  ) { }
  public formProfile = new FormGroup({
    name: new FormControl("", Validators.required),
    birthday: new FormControl("", Validators.required),
    numberPhone: new FormControl("", Validators.required),
  });

  public formPassword = new FormGroup({
    passwordOld: new FormControl("", Validators.required),
    passwordNew: new FormControl("", Validators.required),
    passwordRepeat: new FormControl("", Validators.required),
  });
  ngOnInit() {
    this.getUser();
    this.getAllOrder();
    this.getAllProduct();
  }

  private getUser() {
    const user = this.authService.getAuthenticated();
    if (!user) return;
    this.authService
      .getUser({ username: user.username })
      .pipe(
        tap((user: IUser) => (this.user = user)),
        map((user: IUser) => user?.history),
        tap(() => this.setProfileForm()),
        flatMap((history: any) => {
          return forkJoin(
            history.map((id) => this.orderService.getOneOrder(id))
          );
        }),
        tap((historyList) => (this.historyList = _.compact(historyList)))
      )
      .subscribe();
  }

  private setProfileForm() {
    if (!this.user) return
    Object.keys(this.user).map((key) => this.formProfile.controls[key]?.setValue(this.user[key]))
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
      )
      .subscribe();
  }

  public updateProfile(form: FormGroup) {
    this.authService.updateUser(this.user['_id'], form.value).pipe(
      tap(() => this.mode = 'default'),
      tap(() => this.getUser())
    ).subscribe()


  }
  public changePassword(form: FormGroup) {
  }

}
