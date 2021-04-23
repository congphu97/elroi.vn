import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppConfigService } from 'app/appConfig.service';
import { IBackground, IProduct } from 'app/shared/interfaces/ui.interfaces';
import { BackgroundService } from 'app/shared/services/background.service';
import { ProductService } from 'app/shared/services/product.service';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-backgrounds',
  templateUrl: './backgrounds.component.html',
  styleUrls: ['./backgrounds.component.scss']
})
export class BackgroundsComponent implements OnInit {
  private filesToUpload: Array<File> = [];
  public apiImg = this.appConfig.config.api;
  public backgroundTable: IBackground[] = [];
  public isVisibleBackground = false
  public background: IBackground
  public titleModal: string = "";
  urls = new Array<string>();
  public backgroundForm = new FormGroup({
    imgBackground: new FormControl(""),
    category: new FormControl("")
  })
  constructor(
    private appConfig: AppConfigService,
    private productService: ProductService,

    private backgroundService: BackgroundService
  ) { }

  ngOnInit(): void {
    this.getAllBackground()
    this.listenSubmit()
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
  public getAllBackground() {
    this.backgroundService
      .getAllBackground()
      .pipe(tap((data: IBackground[]) => (this.backgroundTable = data)))
      .subscribe();
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

  public getBaseImg(img: string) {
    return `${this.apiImg}product/img/${img}`;
  }

  public handleCancelMiddle() {
    this.isVisibleBackground = false

  }
  private listenSubmit() {
    this.productService
      .getSubmit$$()
      .pipe(
        tap(() => {
          this.getAllBackground();
        })
      )
      .subscribe();
  }
}
