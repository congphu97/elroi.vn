import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'app/shared/interfaces/ui.interfaces';
import { tap } from 'rxjs/operators';
import { ActionSequence } from 'selenium-webdriver';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public productList: IProduct[] = []
  constructor(private activeRoute: ActivatedRoute, private productService: ProductService) {
    this.activeRoute.params.subscribe(params =>
      this.checkParamBeforQuery(params.id)
    );
  }

  ngOnInit(): void {
  }
  private getProductQuery(key: string, value: string) {
    this.productService.getProductQuery(key, value).pipe(
      tap((data: IProduct[]) => {
        this.productList = data
        console.log({ data })
      })
    ).subscribe()

  }
  private checkParamBeforQuery(type: string) {
    switch (type) {
      case 'san-pham-moi':
        this.getProductQuery('category', type)
        break

      case 'khuyen-mai':
        this.getProductQuery('category', type)
        break

      default:
        this.getProductQuery('category', type)
        break
    }
  }

  private calculatorSale(product: IProduct) {
    return product.price * (100 - product.priceSale) / 100;
  }
}
