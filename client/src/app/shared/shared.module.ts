import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BackgroundService } from './services/background.service';
import { OrdersService } from './services/orders.service';
import { ProductService } from './services/product.service';


@NgModule({
    imports: [CommonModule, RouterModule,
        NzDropDownModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),],
    declarations: [NavbarComponent, FooterComponent],
    exports: [
        NavbarComponent, FooterComponent,ProductService, OrdersService, BackgroundService],
    providers: [ProductService, OrdersService, BackgroundService]
})
export class SharedModule { }
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http);
}
