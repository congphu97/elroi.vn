import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { AppConfigService } from "app/appConfig.service";
import { BackgroundService } from "app/shared/services/background.service";
import { ProductService } from "app/shared/services/product.service";
import { AuthService } from "app/shared/auth/auth.service";
import { IBackground, IProduct } from "app/shared/interfaces/ui.interfaces";
import { concat } from "rxjs";
import { tap } from "rxjs/operators";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public listBackground: IBackground[] = []
  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private appConfig: AppConfigService,
    private backgroundService: BackgroundService
  ) { }
  public apiImg = this.appConfig.config.api;
  public listData: IProduct[] = [];
  public isVisibleMiddle = true;
  ngOnInit() {
    this.getAllProduct();
    this.getAllBackground()
  }
  public addCart(product: IProduct) {
    const listLocal = JSON.parse(localStorage.getItem("cart") || "[]");
    listLocal.push(product._id);
    localStorage.setItem("cart", JSON.stringify(listLocal));
    this.authService.setSubmit();
  }

  public getAllProduct() {
    this.productService
      .getAllProduct()
      .pipe(tap((data: IProduct[]) => (this.listData = data)))
      .subscribe();
  }


  public getAllBackground() {
    this.backgroundService
      .getProductQuery('category', 'trang-chu')
      .pipe(tap((data: IBackground[]) => {
        const a = data.map((bg: IBackground) => [...bg.imgBackground]);
        this.listBackground = [].concat.apply([], a)
      }))
      .subscribe();
  }


  public calculatorSale(product: IProduct) {
    const priceSale = product.priceSale || 0;
    return (product.price * (100 - priceSale)) / 100;
  }

  public getBaseImg(img: string) {
    return `${this.apiImg}product/img/${img}`
  }

  handleCancelMiddle(): void {
    this.isVisibleMiddle = false;
  }

}
