import { NgModule } from "@angular/core";

import { Routes, RouterModule } from "@angular/router";
import { BackgroundsComponent } from "./backgrounds/backgrounds.component";
import { ManagerComponent } from "./manager/manager.component";
import { OrdersComponent } from "./orders/orders.component";
import { ProductsComponent } from "./products/products.component";
import { PromoCodeComponent } from "./promo-code/promo-code.component";





const routes: Routes = [
    { path: "", redirectTo: "dashboard", pathMatch: "full" },
    {
        path: "dashboard", component: ManagerComponent, children: [
            { path: "orders", component: OrdersComponent },
            { path: "backgrounds", component: BackgroundsComponent },
            { path: "products", component: ProductsComponent },
            { path: 'promos', component: PromoCodeComponent },
        ],
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule { }
