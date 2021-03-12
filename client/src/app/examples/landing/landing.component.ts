import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { forkJoin, from } from 'rxjs';
import { flatMap, map, switchMap, tap } from 'rxjs/operators';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
  count: number = 0
  constructor(private productService: ProductService) { }
  private validateForm: FormGroup
  ngOnInit() {
    this.configCart()

  }
  listOfData: any[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }
  ];

  configCart() {
    const listCart = JSON.parse(localStorage.getItem("cart"));
    listCart.map((item) => this.count += item.number)
    from(listCart).pipe(
      switchMap((item: any) => this.productService.getOneProduct(item._id)),
      map((data) =>   (data)),
      tap((data) => console.log({ data }))

    ).subscribe()
    console.log({ listCart }, this.count, this.listOfData)
  }

  // item.map((pro:any) => forkJoin(this.productService.getOneProduct(pro._id)))
  current = 0;

  index = 'First-content';

  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next(): void {
    this.current += 1;
    this.changeContent();
  }

  done(): void {
    console.log('done');
  }

  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.index = 'First-content';
        break;
      }
      case 1: {
        this.index = 'Second-content';
        break;
      }
      case 2: {
        this.index = 'third-content';
        break;
      }
      default: {
        this.index = 'error';
      }
    }
  }
}
