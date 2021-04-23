import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";
import { ComponentsComponent } from "./components/components.component";
import { AuthGuard } from "app/shared/guard/guard.component";
import { ProfileComponent } from "./profile/profile.component";
import { ManagerComponent } from "../admin/manager/manager.component";
import { LandingComponent } from "./landing/landing.component";
import { ProductComponent } from "./product/product.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";
import { HomeComponent } from "./home/home.component";



const routes: Routes = [
    {
        path: '', component: ComponentsComponent, children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: "home", component: HomeComponent },
            { path: "profile", canActivate: [AuthGuard], component: ProfileComponent },
            { path: "login", component: SignupComponent },
            { path: "register", component: SigninComponent },
            { path: "cart", component: LandingComponent },
            { path: "product/:id", component: ProductComponent },
            { path: "detail/:id", component: ProductDetailComponent },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ExamplesRoutingModule { }
