import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app.routing";

import { AppComponent } from "./app.component";
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { FooterComponent } from "./shared/footer/footer.component";

import { ComponentsModule } from "./components/components.module";
import { ExamplesModule } from "./examples/examples.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { JwtInterceptor } from "./shared/interceptors/interceptor.component";
import { JwtHelperService, JWT_OPTIONS } from "@auth0/angular-jwt";
import { AuthService } from "./shared/auth/auth.service";
import { CookieModule } from "ngx-cookie";
import { en_US, NZ_I18N, NzI18nModule } from 'ng-zorro-antd/i18n';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

@NgModule({
  declarations: [AppComponent, NavbarComponent, FooterComponent],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule,
    ComponentsModule,
    ExamplesModule,
    AppRoutingModule,
    HttpClientModule,
    CookieModule.forRoot(),
    NzIconModule, NzDropDownModule,
  ],
  providers: [
    JwtHelperService,
    AuthService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    { provide: NZ_I18N, useValue: en_US }



  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
