import { Component, OnInit } from '@angular/core';
import { IOrder, IProduct } from 'app/shared/interfaces/ui.interfaces';
import { OrdersService } from 'app/shared/services/orders.service';
import { ProductService } from 'app/shared/services/product.service';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  public isOrderDetail = false;
  public isOrderDelete = false
  public orderTable: IOrder[] = [];
  public order: IOrder
  constructor(private productService: ProductService,
    private ordersService: OrdersService,) { }

  ngOnInit(): void {
    this.getAllOrder();
    this.listenSubmit();
  }
  public getAllOrder() {
    this.ordersService
      .getAllOrder()
      .pipe(
        tap((data: IOrder[]) => (this.orderTable = data)),
        map((data: IOrder[]) =>
          [].concat(...data.map((order) => order.idProduct))
        ),
      )
      .subscribe();
  }
  public openModelDetail(order: IOrder) {
    this.isOrderDetail = true;
    this.order = order;
  }

  public openDeleteOrder(order: IOrder) {
    this.order = order;
    this.isOrderDelete = true;
  }

  public deleteOrder(id: string) {
    this.ordersService
      .deleteOrder(id)
      .pipe(
        tap(() => {
          this.productService.setSubmit(null);
          this.handleCancelMiddle();
        })
      )
      .subscribe();
  }


  public handleCancelMiddle() {
    this.isOrderDelete = false;
    this.isOrderDetail = false;
  }

  private listenSubmit() {
    this.productService
      .getSubmit$$()
      .pipe(
        tap(() => {
          this.getAllOrder();
        })
      )
      .subscribe();
  }

}
