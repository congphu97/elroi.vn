import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "app/shared/auth/auth.service";
import { IOrder, IProduct, IPromo, IUser } from "app/shared/interfaces/ui.interfaces";
import { PromoService } from "app/shared/services/promo.service";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { forkJoin, from, of } from "rxjs";
import { flatMap, map, tap } from "rxjs/operators";
import { OrdersService } from "../../shared/services/orders.service";
import { ProductService } from "../../shared/services/product.service";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"],
})
export class LandingComponent implements OnInit {
  count: number = 0;
  public discountCode: string = ''
  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private OrdersService: OrdersService,
    private promoService: PromoService,
    private notification: NzNotificationService
  ) { }
  private listData$ = (id: string) => this.productService.getOneProduct(id);
  ngOnInit() {
    this.configCart();
    this.getUser();
  }
  private promo
  public listOfData = [];
  public listCart;
  public totalPrice: number = 0;
  public user: IUser;
  public orderForm = new FormGroup({
    username: new FormControl("", Validators.required),
    numberPhone: new FormControl("", Validators.required),
    address: new FormControl("", Validators.required),
  });

  public configCart() {
    this.listCart = JSON.parse(localStorage.getItem("cart"));
    if (!this.listCart) return;
    this.listCart.map((item) => (this.count += item.number));
    from(this.listCart)
      .pipe(
        flatMap((item: any) =>
          forkJoin(this.listData$(item._id), of(item.number), of(item.size))
        ),
        tap((data) => {
          if (!data[0]) return
          this.listOfData.push({
            product: data[0],
            number: data[1],
            size: data[2]
          });
        })
      )
      .subscribe();
  }

  current = 0;
  private getUser() {
    const user = this.authService.getAuthenticated();
    if (!user) return;
    this.authService
      .getUser({ username: user.username })
      .pipe(
        tap((user: IUser) => (this.user = user)),
        tap((user: IUser) => this.setFormValue(user))
      )
      .subscribe();
  }

  private setFormValue(value: IUser) {
    Object.keys(this.orderForm.controls).map((key) =>
      this.orderForm.controls[key].setValue(value[key])
    );
  }

  public checkDisable(key: string) {
    if (!this.user) return
    return this.user[key] ? true : false;
  }
  public pre(): void {
    this.current -= 1;
  }

  public next(): void {
    this.totalPrice = 0;
    this.current += 1;
    this.listOfData.map(
      (item) => (this.totalPrice += this.calculatorSale(item.product))
    );
  }

  public done(): void {
    console.log("done");
  }

  public complete() {
    this.current += 1;
    const idProduct = this.listOfData.map((item) => ({
      id: item.product._id,
      number: item.number,
    }));
    this.orderForm.value.idProduct = idProduct;
    this.orderForm.value.totalPrice = this.promo ? this.promo : this.totalPrice;
    this.orderForm.value.status = false;
    this.orderForm.value.customerName = this.user.name;
    this.orderForm.value.createdAt = Date.now();
    const formData = Object.assign({}, this.orderForm.value);
    this.OrdersService.createOrder(formData, this.user.username)
      .pipe(
        tap((order: IOrder) => {
          localStorage.removeItem("cart");
          this.authService.setSubmit();
          this.notification.create(
            'success',
            'Đặt hàng thành công',
            'Cảm ơn bạn đã ủng hộ Shop ^^'
          );
        })
      )
      .subscribe();
  }

  public calculatorSale(product: IProduct) {
    const priceSale = product.priceSale || 0;
    return (product.price * (100 - priceSale)) / 100;
  }

  public changeSelect(product: IProduct, value: number) {
    return this.calculatorSale(product) * value
  }

  public discountPromoCode(totalPrice, code) {
    this.promoService.getPromoQuery('code', code).pipe(
      map((data: IPromo) => data[0].discountPercent ? totalPrice * (100 - data[0].discountPercent) / 100 : totalPrice - data[0].discountPrice),
      tap((data) => this.promo = data)
    ).subscribe()
  }
}
