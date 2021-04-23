import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "app/shared/auth/auth.service";
import { IOrder, IProduct, IUser } from "app/shared/interfaces/ui.interfaces";
import { forkJoin, from, of } from "rxjs";
import { flatMap, tap } from "rxjs/operators";
import { OrdersService } from "../../shared/services/orders.service";
import { ProductService } from "../../shared/services/product.service";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"],
})
export class LandingComponent implements OnInit {
  count: number = 0;
  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private OrdersService: OrdersService
  ) { }
  private listData$ = (id: string) => this.productService.getOneProduct(id);
  ngOnInit() {
    this.configCart();
    this.getUser();
  }
  public listOfData = [];
  public listCart;
  public totalPrice: number = 0;
  public user: IUser;
  public orderForm = new FormGroup({
    username: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required),
    numberPhone: new FormControl("", Validators.required),
    address: new FormControl("", Validators.required),
  });
  configCart() {
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
  pre(): void {
    this.current -= 1;
  }

  next(): void {
    this.totalPrice = 0;
    this.current += 1;
    this.listOfData.map(
      (item) => (this.totalPrice += this.calculatorSale(item.product))
    );
  }

  done(): void {
    console.log("done");
  }

  complete() {
    this.current += 1;
    const idProduct = this.listOfData.map((item) => ({
      id: item.product._id,
      number: item.number,
    }));
    this.orderForm.value.idProduct = idProduct;
    this.orderForm.value.totalPrice = this.totalPrice;
    this.orderForm.value.status = false;
    this.orderForm.value.customerName = this.user.name;
    this.orderForm.value.createdAt = Date.now();
    const formData = Object.assign({}, this.orderForm.value);
    this.OrdersService.createOrder(formData, this.user.username)
      .pipe(
        tap((order: IOrder) => {
          localStorage.removeItem("cart");
          this.authService.setSubmit();
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
}
