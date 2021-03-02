import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { LandingComponent } from "./landing/landing.component";
import { ProfileComponent } from "./profile/profile.component";
import { SignupComponent } from "./signup/signup.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { CookieModule } from "ngx-cookie";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    CookieModule.forRoot(),
  ],
  declarations: [
    LandingComponent,
    SignupComponent,
    ProfileComponent,
    ProductDetailComponent,
  ],
})
export class ExamplesModule {}
