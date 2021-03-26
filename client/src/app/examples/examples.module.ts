import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { LandingComponent } from "./landing/landing.component";
import { ProfileComponent } from "./profile/profile.component";
import { SignupComponent } from "./signup/signup.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { CookieModule } from "ngx-cookie";
import { ManagerComponent } from "./manager/manager.component";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzModalModule } from "ng-zorro-antd/modal";
import { ProductService } from "./services/product.service";
import { HttpClientModule } from "@angular/common/http";
import { PaymentComponent } from "./payment/payment.component";
import { NzImageModule } from "ng-zorro-antd/image";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzStepsModule } from "ng-zorro-antd/steps";
import { NzResultModule } from "ng-zorro-antd/result";
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { NzSelectModule } from "ng-zorro-antd/select";
import { OrdersService } from "./services/orders.service";
import { NzSwitchModule } from "ng-zorro-antd/switch";
import { SigninComponent } from "./signin/signin.component";
import { NzMenuModule } from "ng-zorro-antd/menu";
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
  ],
  declarations: [
    LandingComponent,
    SignupComponent,
    ProfileComponent,
    ProductDetailComponent,
    ManagerComponent,
    PaymentComponent,
    SigninComponent,
  ],
  providers: [ProductService, OrdersService],
})
export class ExamplesModule {}
