import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { IOrder, IProduct } from "app/shared/interfaces/ui.interfaces";
import { flatMap, map, switchMap, tap } from "rxjs/operators";
import { OrdersService } from "../services/orders.service";
import { ProductService } from "../services/product.service";

@Component({
  selector: "app-manager",
  templateUrl: "./manager.component.html",
  styleUrls: ["./manager.component.scss"],
})
export class ManagerComponent implements OnInit {
  urls = new Array<string>();
  public formProduct = new FormGroup({
    productName: new FormControl(""),
    category: new FormControl(""),
    price: new FormControl(""),
    priceSale: new FormControl(""),
    note: new FormControl(""),
    status: new FormControl(""),
    size: new FormControl(""),
    imgProduct: new FormControl(""),
  });
  constructor(
    private productService: ProductService,
    private ordersService: OrdersService
  ) {}
  public productTable: IProduct[] = [];
  public orderTable: IOrder[] = [];
  ngOnInit(): void {
    this.getAllProduct();
    this.getAllOrder();
    this.listenSubmit();
  }
  @ViewChild("UploadFileInput", { static: false }) uploadFileInput: ElementRef;
  public isVisibleMiddle = false;
  public isVisibleDelete = false;
  public isOrderDelete = false;
  public product: IProduct;
  public order: IOrder;
  public titleModal: string = "";
  public openModalCreate() {
    this.isVisibleMiddle = true;
    this.titleModal = `Tạo mới sản phẩm`;
    this.product = null;
    this.formProduct.reset();
  }

  checkSale($event) {
    console.log({ $event });
  }

  public openModalUpdate(data: IProduct) {
    this.product = data;
    this.titleModal = `Chỉnh sửa thông tin sản phẩm ${data.productName}`;
    this.isVisibleMiddle = true;
    Object.keys(this.formProduct.controls).map((key) =>
      this.formProduct.controls[key].setValue(data[key])
    );
  }

  public openModalDelete(data: IProduct) {
    this.product = data;
    this.isVisibleDelete = true;
  }

  handleOkMiddle(product) {
    if (product) {
      this.updateProduct(product);
    } else this.createProduct();
  }

  handleCancelMiddle() {
    this.isVisibleMiddle = false;
    this.isVisibleDelete = false;
    this.isOrderDelete = false;
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
      .pipe(tap((product: IProduct) => {
        this.getAllProduct();
        this.getAllOrder();
      }))
      .subscribe();
  }
  private createProduct() {
    console.log(this.formProduct.value);
    let { createdAt, updatedAt } = this.formProduct.value;
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    for (let i = 0; i < files.length; i++) {
      formData.append("uploads[]", files[i], files[i]["name"]);
    }
    createdAt = updatedAt = Date.now();
    this.productService
      .createProduct(this.formProduct.value)
      .subscribe((product: IProduct) => {
        this.productService.setSubmit(product);
      });
    this.productService.uploadFile(formData).subscribe((response) => {
      console.log(response);
    });
    this.handleCancelMiddle();
  }

  public updateProduct(product: IProduct) {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    for (let i = 0; i < files.length; i++) {
      formData.append("uploads[]", files[i], files[i]["name"]);
    }
    this.formProduct.value.updatedAt = Date.now();
    console.log({ formData, files });
    this.productService
      .uploadFile(formData)
      .pipe(
        switchMap((response: any[]) => {
          console.log(this.formProduct.value, response);
          this.formProduct.value.imgProduct = response.map(
            (file) => file.filename
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

  public getAllOrder() {
    this.ordersService
      .getAllOrder()
      .pipe(
        tap((data: IOrder[]) => (this.orderTable = data)),
        map((data: IOrder[]) =>
          [].concat(...data.map((order) => order.idProduct))
        ),
        tap((data) => console.log(this.orderTable, this.productTable, data))
      )
      .subscribe();
  }

  public changeStatus(order: IOrder) {
    console.log({ order });
    this.ordersService.updateOrder(order._id, order).subscribe();
  }

  private filesToUpload: Array<File> = [];

  fileChangeEvent(fileInput: any) {
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

  public getDetailProductOrder(id: string) {
    return this.productTable.find((product) => product._id === id);
  }

  public deleteOrder(id:string){
    this.ordersService.deleteOrder(id).pipe(
      tap(() => {
        this.productService.setSubmit(null);
        this.handleCancelMiddle()
      })
    ).subscribe()
  }

  public openDeleteOrder(order:IOrder){
    this.order = order;
    this.isOrderDelete = true;
  }
}
