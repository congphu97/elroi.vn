import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { IProduct } from 'app/shared/interfaces/ui.interfaces';
import { switchMap, tap } from 'rxjs/operators';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {
  public formProduct = new FormGroup({
    productName: new FormControl(''),
    category: new FormControl(''),
    price: new FormControl(''),
    priceSale: new FormControl(''),
    note: new FormControl(''),
    status: new FormControl(''),
    size: new FormControl(''),
    imgProduct: new FormArray([])
  })
  constructor(private productService: ProductService) { }
  public productTable: IProduct[] = []
  ngOnInit(): void {
    this.getAllProduct()
    this.listenSubmit()

  }
  public isVisibleMiddle = false;
  public isVisibleDelete = false;
  public product: IProduct
  public titleModal: string = ''
  public openModalCreate() {
    this.isVisibleMiddle = true;
    this.titleModal = `Tạo mới sản phẩm`
    this.product = null
    this.formProduct.reset()
  }

  checkSale($event) {
    console.log({ $event })
  }
  public openModalUpdate(data: IProduct) {
    this.product = data
    this.titleModal = `Chỉnh sửa thông tin sản phẩm ${data.productName}`
    this.isVisibleMiddle = true;
    Object.keys(this.formProduct.controls).map((key) =>
      this.formProduct.controls[key].setValue(data[key])
    )
  }

  public openModalDelete(data: IProduct) {
    this.product = data
    this.isVisibleDelete = true;
  }

  handleOkMiddle(product) {
    if (product) {
      this.updateProduct(product)
    } else this.createProduct()
  }

  handleCancelMiddle() {
    this.isVisibleMiddle = false;
    this.isVisibleDelete = false
  }

  public getAllProduct() {
    this.productService.getAllProduct().pipe(tap((data: IProduct[]) => this.productTable = data)).subscribe()
  }

  private listenSubmit() {
    this.productService.getSubmit$$().pipe(
      tap((product: IProduct) => this.getAllProduct())
    ).subscribe()
  }
  private createProduct() {
    let { createdAt, updatedAt } = this.formProduct.value
    createdAt = updatedAt = Date.now()
    this.productService.createProduct(this.formProduct.value).subscribe((product: IProduct) => this.productService.setSubmit(product))
    this.handleCancelMiddle()
  }

  public updateProduct(product: IProduct) {
    this.formProduct.value.updatedAt = Date.now()
    this.productService.updateProduct(product._id, this.formProduct.value).subscribe((product: IProduct) => this.productService.setSubmit(product))
    this.handleCancelMiddle()

  }

  public deleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe((product: IProduct) => this.productService.setSubmit(product))
    this.isVisibleDelete = false
  }
}
