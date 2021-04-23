import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AppConfigService } from "app/appConfig.service";
import { IBackground, IProduct } from "app/shared/interfaces/ui.interfaces";
import { BackgroundService } from "app/shared/services/background.service";
import { tap } from "rxjs/operators";
import { ProductService } from "../../shared/services/product.service";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"],
})
export class ProductComponent implements OnInit {
  public productList: IProduct[] = [];
  public isNotis: boolean = false;
  public title: string = ''
  public apiImg = this.appConfig.config.api;
  public listBackground: IBackground[] = []
  public filterOption: string = ''
  constructor(
    private activeRoute: ActivatedRoute,
    private productService: ProductService,
    private appConfig: AppConfigService,
    private backgroundService: BackgroundService


  ) {
    this.activeRoute.params.subscribe((params) => {
      this.checkParamBeforQuery(params.id)
      this.getTitle(params.id)
    }
    );
  }

  ngOnInit(): void {
    this.isNotis = true;
    this.getAllBackground()

  }
  public getAllBackground() {
    this.backgroundService
      .getProductQuery('category', 'product')
      .pipe(tap((data: IBackground[]) => {
        const a = data.map((bg: IBackground) => [...bg.imgBackground]);
        this.listBackground = [].concat.apply([], a)
      }))
      .subscribe();
  }

  private getProductQuery(key: string, value: string) {
    this.productService
      .getProductQuery(key, value)
      .pipe(
        tap((data: IProduct[]) => {
          this.productList = data;
        })
      )
      .subscribe();
  }
  private checkParamBeforQuery(type: string) {
    switch (type) {
      case "all":
        this.getProductQuery("", type);
        break;
      case "sale":
        this.getProductQuery("status", type);
        break;

      case "new":
        this.getProductQuery("category", type);
        break;

      default:
        this.getProductQuery("category", type);
        break;
    }
  }

  public calculatorSale(product: IProduct) {
    return (product.price * (100 - product.priceSale)) / 100;
  }



  public getBaseImg(img: string) {
    return `${this.apiImg}product/img/${img}`;
  }


  public getTitle(type: string) {
    switch (type) {
      case "all":
        this.title = 'Tát cả sản phẩm'
        break;
      case "new":
        this.title = 'Sản phẩm mới'
        break;
      case "sale":
        this.title = 'Sản phẩm khuyến mãi'
        break;
      case "ao-nam":
        this.title = 'Áo nam'
        break;
      case "ao-khoac-nam":
        this.title = 'Áo khoác nam'
        break;
      case "quan":
        this.title = 'Quần'
        break;
      case "quan-dui-nam":
        this.title = 'Quần'
        break;
      case "quan-dai-nam":
        this.title = 'Áo nam'
        break;
      case "giay-nu":
        this.title = 'Giày nam'
        break;
      case "phu-kien":
        this.title = 'Phụ kiện'
        break;
      case "ao-nu":
        this.title = 'Áo nữ'
        break;
      case "ao-khoac-nu":
        this.title = 'Áo khoác nữ'
        break;
      case "quan":
        this.title = 'Quần nữ'
        break;
      case "quan-dui-nu":
        this.title = 'Quần đùi nữ'
        break;
      case "quan-dai-nu":
        this.title = 'Quần dài nữ'
        break;
      case "giay-nam":
        this.title = 'Giày nữ'
        break;
      case "phu-kien":
        this.title = 'Phụ kiện'
        break;
    }
  }

  public changedSelect(filterOption) {
    switch (filterOption) {
      case "t-c":
        this.toSortTable('price', true)
        break;
      case "c-t":
        this.toSortTable('price', false)
        break;
      case "a-z":
        this.toSortTable('productName', false)

        break;
      case "z-a":
        this.toSortTable('productName', false)

        break;

    }
  }

  private toSortTable(column: string, showIconSort) {
    const signal = showIconSort ? 1 : -1;
    this.productList = this.productList.sort(function (a, b) {
      let str1 = a[column];
      let str2 = b[column];
      if (str1 === str2) {
        return 0;
      } else {
        return str1 < str2 ? -signal : signal;
      }
    });
  }
}
