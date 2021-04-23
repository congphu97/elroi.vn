import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { CookieModule } from "ngx-cookie";
import { ManagerComponent } from "./manager/manager.component";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzModalModule } from "ng-zorro-antd/modal";

import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { NzImageModule } from "ng-zorro-antd/image";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzStepsModule } from "ng-zorro-antd/steps";
import { NzResultModule } from "ng-zorro-antd/result";
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { NzSelectModule } from "ng-zorro-antd/select";

import { NzSwitchModule } from "ng-zorro-antd/switch";

import { NzMenuModule } from "ng-zorro-antd/menu";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzNotificationModule } from 'ng-zorro-antd/notification';


import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzCarouselModule } from "ng-zorro-antd/carousel";
import { SharedModule } from "app/shared/shared.module";
import { ProductService } from "app/shared/services/product.service";
import { OrdersService } from "app/shared/services/orders.service";
import { BackgroundService } from "app/shared/services/background.service";
import { AdminRoutingModule } from "./admin.routing";
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from "./products/products.component";
import { BackgroundsComponent } from "./backgrounds/backgrounds.component";
import { PromoCodeComponent } from './promo-code/promo-code.component';

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
        AdminRoutingModule,
        SharedModule
    ],
    declarations: [

        ManagerComponent,
        ProductsComponent,
        OrdersComponent,
        BackgroundsComponent,
        PromoCodeComponent,
        // SignupComponent, SigninComponent

    ],
    providers: [ProductService, OrdersService, BackgroundService,
    ],
})
export class AdminModule { }
