import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private cookieService: CookieService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // const token = this.cookieService.get("auth");
    // console.log(this.cookieService.getAll());
    const token = localStorage.getItem('jwtToken')
    if (token) {
      const clonedReq = request.clone({
        headers: request.headers.set("Authorization", "Bearer " + token),
      });
      return next.handle(clonedReq);
    } else {
      return next.handle(request);
    }
  }
}
