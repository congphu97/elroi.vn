import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { LandingComponent } from "./landing/landing.component";
import { ProfileComponent } from "./profile/profile.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { CookieModule } from "ngx-cookie";
import { ManagerComponent } from "../admin/manager/manager.component";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzModalModule } from "ng-zorro-antd/modal";
import { ProductService } from "../shared/services/product.service";
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NzImageModule } from "ng-zorro-antd/image";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzStepsModule } from "ng-zorro-antd/steps";
import { NzResultModule } from "ng-zorro-antd/result";
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { NzSelectModule } from "ng-zorro-antd/select";
import { OrdersService } from "../shared/services/orders.service";
import { NzSwitchModule } from "ng-zorro-antd/switch";
import { NzMenuModule } from "ng-zorro-antd/menu";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { BackgroundService } from "../shared/services/background.service";
import { ProductComponent } from "./product/product.component";
import { ComponentsComponent } from "./components/components.component";
import { en_US, NZ_I18N } from "ng-zorro-antd/i18n";

import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzCarouselModule } from "ng-zorro-antd/carousel";
import { ExamplesRoutingModule } from "./examples.routing";
import { SharedModule } from "app/shared/shared.module";
import { SignupComponent } from "./signup/signup.component";
import { HomeComponent } from './home/home.component';
import { SigninComponent } from "./signin/signin.component";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    CookieModule.forRoot(),
    NzTableModule,
    NzModalModule,
    HttpClientModule,
    NzImageModule,
    NzStepsModule,
    NzDividerModule,
    NzResultModule,
    NzTabsModule,
    NzSwitchModule,
    NzMenuModule,
    NzSelectModule,
    NzButtonModule,
    NzDescriptionsModule,
    NzNotificationModule,
    NzDropDownModule,
    NzCarouselModule,
    SharedModule,
    ExamplesRoutingModule,

  ],
  declarations: [
    ProductComponent,
    LandingComponent,
    SignupComponent,
    SigninComponent,
    ProfileComponent,
    ProductDetailComponent,
    ComponentsComponent,
    HomeComponent,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },],
})
export class ExamplesModule { }
