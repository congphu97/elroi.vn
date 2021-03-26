import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "app/shared/auth/auth.service";
import { IProduct } from "app/shared/interfaces/ui.interfaces";
import { tap } from "rxjs/operators";
import { ProductService } from "../services/product.service";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private activeRoute: ActivatedRoute,
    private productService: ProductService
  ) {}
  public product: IProduct;
  public arrayNumber = [1, 2, 3, 4, 5];
  public selectedDefault = 1;
  public priceTotal: number = 0;
  ngOnInit(): void {
    const id = this.activeRoute.snapshot.params["id"];
    this.productService
      .getOneProduct(id)
      .pipe(
        tap((data: IProduct) => {
          this.product = data;
          this.priceTotal = this.product.price;
        })
      )
      .subscribe();
  }

  addCart() {
    const listLocal = JSON.parse(localStorage.getItem("cart") || "[]");
    const valueItem = {
      _id: this.product._id,
      number: this.selectedDefault,
    };
    listLocal.push(valueItem);
    console.log({ listLocal });
    localStorage.setItem("cart", JSON.stringify(listLocal));
    this.authService.setSubmit();
  }

  changeSelect(value: number) {
    this.selectedDefault = value;
    return this.calculatorSale(this.product) * value;
  }

  public calculatorSale(product: IProduct) {
    return (product.price * (100 - product.priceSale)) / 100;
  }
}
