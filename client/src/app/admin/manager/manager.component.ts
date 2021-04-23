import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { AppConfigService } from "app/appConfig.service";
import { IBackground, IOrder, IProduct as IProduct } from "app/shared/interfaces/ui.interfaces";
import { flatMap, map, switchMap, tap } from "rxjs/operators";
import { BackgroundService } from "../../shared/services/background.service";
import { OrdersService } from "../../shared/services/orders.service";
import { ProductService } from "../../shared/services/product.service";

@Component({
  selector: "app-manager",
  templateUrl: "./manager.component.html",
  styleUrls: ["./manager.component.scss"],
})
export class ManagerComponent implements OnInit {
  urls = new Array<string>();
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

  public backgroundForm = new FormGroup({
    imgBackground: new FormControl(""),
    category: new FormControl("")
  })


  constructor(
    private productService: ProductService,
    private ordersService: OrdersService,
    private appConfig: AppConfigService,
    private backgroundService: BackgroundService
  ) { }
  ngOnInit(): void {
    this.getAllProduct();
    this.getAllOrder();
    this.getAllBackground()
    this.listenSubmit();
  }
  @ViewChild("UploadFileInput", { static: false }) uploadFileInput: ElementRef;
  public productTable: IProduct[] = [];
  public backgroundTable: IBackground[] = [];
  public orderTable: IOrder[] = [];
  public isVisibleMiddle = false;
  public isVisibleDelete = false;
  public isVisibleBackground = false
  public isOrderDelete = false;
  public isOrderDetail = false;
  public product: IProduct;
  public order: IOrder;
  public background: IBackground
  public titleModal: string = "";
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

  public openModalDelete(data: IProduct) {
    this.product = data;
    this.isVisibleDelete = true;
  }

  public handleOkMiddle(product) {
    if (product) {
      this.updateProduct(product);
    } else this.createProduct();
  }

  public handleCancelMiddle() {
    this.isVisibleMiddle = false;
    this.isVisibleDelete = false;
    this.isOrderDelete = false;
    this.isOrderDetail = false;
    this.isVisibleBackground = false
  }

  public getAllProduct() {
    this.productService
      .getAllProduct()
      .pipe(tap((data: IProduct[]) => (this.productTable = data)))
      .subscribe();
  }



  public getAllBackground() {
    this.backgroundService
      .getAllBackground()
      .pipe(tap((data: IBackground[]) => (this.backgroundTable = data)))
      .subscribe();
  }


  private listenSubmit() {
    this.productService
      .getSubmit$$()
      .pipe(
        tap((product: IProduct) => {
          this.getAllProduct();
          this.getAllOrder();
        })
      )
      .subscribe();
  }
  private createProduct() {
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

  public changeStatus(order: IOrder) {
    this.ordersService.updateOrder(order._id, order).subscribe();
  }

  private filesToUpload: Array<File> = [];

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

  public getDetailProductOrder(id: string) {
    return this.productTable.find((product) => product._id === id);
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

  public openDeleteOrder(order: IOrder) {
    this.order = order;
    this.isOrderDelete = true;
  }

  public getBaseImg(img) {
    return `${this.apiImg}product/img/${img}`;
  }

  public openModelDetail(order: IOrder) {
    this.isOrderDetail = true;
    this.order = order;
  }

  private createBackground() {
    let { createdAt, updatedAt } = this.backgroundForm.value;
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    for (let i = 0; i < files.length; i++) {
      formData.append("files[]", files[i], files[i]["name"]);
    }
    createdAt = updatedAt = Date.now();
    this.backgroundService
      .uploadFile(formData)
      .pipe(
        switchMap((response: any[]) => {
          this.backgroundForm.value.imgBackground = response.map(
            (file) => file.originalname
          );
          return this.backgroundService
            .createBackground(this.backgroundForm.value)
        }),
        tap((background) => this.productService.setSubmit(background))
      )
      .subscribe();
    this.handleCancelMiddle();
  }

  public updateBackground(background: IProduct) {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    for (let i = 0; i < files.length; i++) {
      formData.append("files[]", files[i], files[i]["name"]);
    }
    this.backgroundForm.value.updatedAt = Date.now();
    this.backgroundService
      .uploadFile(formData)
      .pipe(
        switchMap((response: any[]) => {
          this.backgroundForm.value.imgBackground = response.map(
            (file) => file.originalname
          );
          return this.backgroundService.updateBackground(
            background._id,
            this.backgroundForm.value
          );
        }),
        tap((background) => this.productService.setSubmit(background))
      )
      .subscribe();

    this.handleCancelMiddle();
  }

  public handleOkBackground(background: IProduct) {
    if (background) {
      this.updateBackground(background);
    } else this.createBackground();
  }
  public openModalUpdateBackground(background: IBackground) {
    this.background = background;
    this.titleModal = `Chỉnh sửa ảnh bìa`;
    this.isVisibleBackground = true;
    Object.keys(this.backgroundForm.controls).map((key) =>
      this.backgroundForm.controls[key].setValue(background[key])
    );
  }

  public openModalDeleteBackground(data: IBackground) {
    this.background = data;
    this.isVisibleBackground = true;
  }
}
