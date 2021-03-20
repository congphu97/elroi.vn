import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { ComponentsComponent } from "./components/components.component";
import { ProfileComponent } from "./examples/profile/profile.component";
import { SignupComponent } from "./examples/signup/signup.component";
import { LandingComponent } from "./examples/landing/landing.component";
import { NucleoiconsComponent } from "./components/nucleoicons/nucleoicons.component";
import { ProductDetailComponent } from "./examples/product-detail/product-detail.component";
import { AuthGuard } from "./shared/guard/guard.component";
import { ManagerComponent } from "./examples/manager/manager.component";
import { PaymentComponent } from "./examples/payment/payment.component";
import { ProductComponent } from "./examples/product/product.component";
import { SigninComponent } from "./examples/signin/signin.component";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: ComponentsComponent },
  { path: "profile", canActivate: [AuthGuard], component: ProfileComponent },
  { path: "admin", component: ManagerComponent },
  { path: "signup", component: SignupComponent },
  { path: "cart", component: LandingComponent },
  { path: "payment", component: PaymentComponent },
  { path: "product/:id", component: ProductComponent },
  { path: "detail/:id", component: ProductDetailComponent },
  { path: "nucleoicons", component: NucleoiconsComponent },
  { path: 'register', component: SigninComponent },
  { path: 'login', component: SignupComponent },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [],
})
export class AppRoutingModule { }
