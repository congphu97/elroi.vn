import { BrowserModule } from "@angular/platform-browser";
import { APP_INITIALIZER, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app.routing";

import { AppComponent } from "./app.component";
import { ExamplesModule } from "./examples/examples.module";
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { JwtInterceptor } from "./shared/interceptors/interceptor.component";
import { JwtHelperService, JWT_OPTIONS } from "@auth0/angular-jwt";
import { AuthService } from "./shared/auth/auth.service";
import { CookieModule } from "ngx-cookie";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzMenuModule } from "ng-zorro-antd/menu";
import { AppConfigService, initializerFn } from "./appConfig.service";
import { NzSelectModule } from "ng-zorro-antd/select";
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    NzSelectModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule,
    ExamplesModule,
    AppRoutingModule,
    HttpClientModule,
    NzMenuModule,
    CookieModule.forRoot(),
    NzIconModule,


  ],
  providers: [
    JwtHelperService,
    AuthService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    {
      provide: APP_INITIALIZER,
      useFactory: initializerFn,
      deps: [AppConfigService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

