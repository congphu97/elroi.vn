import { Component, OnInit, Renderer2 } from "@angular/core";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { AppConfigService } from "app/appConfig.service";
import { ProductService } from "app/examples/services/product.service";
import { AuthService } from "app/shared/auth/auth.service";
import { IProduct } from "app/shared/interfaces/ui.interfaces";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-components",
  templateUrl: "./components.component.html",
})
export class ComponentsComponent implements OnInit {
  model: NgbDateStruct;
  array = [1, 2, 3, 4];
  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private appConfig: AppConfigService
  ) {}
  public listData: IProduct[] = [];

  ngOnInit() {
    this.getAllProduct();
  }
  addCart(product: IProduct) {
    const listLocal = JSON.parse(localStorage.getItem("cart") || "[]");
    console.log({ listLocal });
    listLocal.push(product._id);
    localStorage.setItem("cart", JSON.stringify(listLocal));
    this.authService.setSubmit();
  }

  getAllProduct() {
    this.productService
      .getAllProduct()
      .pipe(tap((data: IProduct[]) => (this.listData = data)))
      .subscribe();
  }
  calculatorSale(product) {
    return (product.price * (100 - product.priceSale)) / 100;
  }
}
