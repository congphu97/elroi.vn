import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppConfigService } from 'app/appConfig.service';
import { IProduct } from 'app/shared/interfaces/ui.interfaces';
import { OrdersService } from 'app/shared/services/orders.service';
import { ProductService } from 'app/shared/services/product.service';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  private filesToUpload: Array<File> = [];

  @ViewChild("UploadFileInput", { static: false }) uploadFileInput: ElementRef;
  public urls = new Array<string>();
  public apiImg = this.appConfig.config.api;
  public formProduct = new FormGroup({
    productName: new FormControl(""),
    category: new FormControl(""),
    price: new FormControl(""),
    priceSale: new FormControl(0),
    note: new FormControl(""),
    status: new FormControl(""),
    size: new FormControl(""),
    imgProduct: new FormControl(""),
  });
  public productTable: IProduct[] = [];
  public isVisibleDelete = false;
  public isVisibleMiddle = false;
  public product: IProduct
  public titleModal: string = ''
  constructor(private productService: ProductService,
    private appConfig: AppConfigService,
  ) { }

  ngOnInit(): void {
    this.getAllProduct()
    this.listenSubmit()
  }

  public getAllProduct() {
    this.productService
      .getAllProduct()
      .pipe(tap((data: IProduct[]) => (this.productTable = data)))
      .subscribe();
  }


  private listenSubmit() {
    this.productService
      .getSubmit$$()
      .pipe(
        tap((product: IProduct) => {
          this.getAllProduct();
        })
      )
      .subscribe();
  }

  public fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    if (this.filesToUpload) {
      for (let file of this.filesToUpload) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  public createProduct() {
    let { createdAt, updatedAt } = this.formProduct.value;
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    for (let i = 0; i < files.length; i++) {
      formData.append("files[]", files[i], files[i]["name"]);
    }
    createdAt = updatedAt = Date.now();
    this.productService
      .uploadFile(formData)
      .pipe(
        switchMap((response: any[]) => {
          this.formProduct.value.imgProduct = response.map(
            (file) => file.originalname
          );
          return this.productService
            .createProduct(this.formProduct.value)
        }),
        tap((product) => this.productService.setSubmit(product))
      )
      .subscribe();
    this.handleCancelMiddle();
  }

  public updateProduct(product: IProduct) {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    for (let i = 0; i < files.length; i++) {
      formData.append("files[]", files[i], files[i]["name"]);
    }
    this.formProduct.value.updatedAt = Date.now();
    this.productService
      .uploadFile(formData)
      .pipe(
        switchMap((response: any[]) => {
          console.log(this.formProduct.value, response);
          this.formProduct.value.imgProduct = response.map(
            (file) => file.originalname
          );
          return this.productService.updateProduct(
            product._id,
            this.formProduct.value
          );
        }),
        tap((product) => this.productService.setSubmit(product))
      )
      .subscribe();

    this.handleCancelMiddle();
  }

  public deleteProduct(id: string) {
    this.productService
      .deleteProduct(id)
      .subscribe((product: IProduct) => this.productService.setSubmit(product));
    this.isVisibleDelete = false;
  }

  public handleCancelMiddle() {
    this.isVisibleMiddle = false;
    this.isVisibleDelete = false;
  }

  public getBaseImg(img: string) {
    return `${this.apiImg}product/img/${img}`;
  }
  public openModalCreate() {
    this.isVisibleMiddle = true;
    this.titleModal = `Tạo mới sản phẩm`;
    this.product = null;
    this.formProduct.reset();
  }
  
  public openModalUpdate(data: IProduct) {
    this.product = data;
    this.titleModal = `Chỉnh sửa thông tin sản phẩm ${data.productName}`;
    this.isVisibleMiddle = true;
    Object.keys(this.formProduct.controls).map((key) =>
      this.formProduct.controls[key].setValue(data[key])
    );
  }

  public handleOkMiddle(product: IProduct) {
    if (product) {
      this.updateProduct(product);
    } else this.createProduct();
  }
}
