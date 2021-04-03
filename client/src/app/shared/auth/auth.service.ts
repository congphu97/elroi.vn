import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap, switchMap } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Subject } from "rxjs";
import { AppConfigService } from "app/appConfig.service";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  private api: string = "";
  private resource = 'auth';
  private setConfig() {
    const api = this.appConfig.config["api"];
    this.api = api ? `${api}${this.resource}/` : "";
  }
  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService,
    private appConfig: AppConfigService
  ) {
    this.setConfig();
  }
  public submit$$ = new Subject();
  login(body) {
    return this.http.post(this.api + "login", body).pipe(
      map((token) => {
        console.log("token", token);
        localStorage.setItem("jwtToken", JSON.stringify(token));
        this.setSubmit();
        return token;
      })
    );
  }

  register(body) {
    return this.http.post(this.api + "register", body);
  }

  getUser(body) {
    return this.http.post(this.api + "getUser", body);
  }

  isAuthenticated(): boolean {
    const token = JSON.parse(localStorage.getItem("jwtToken"));
    this.setSubmit();
    return !this.jwtHelper.isTokenExpired(token);
  }

  getAuthenticated() {
    const token = JSON.parse(localStorage.getItem("jwtToken"));
    return this.jwtHelper.decodeToken(token);
  }

  logout() {
    localStorage.removeItem("jwtToken");
    this.setSubmit();
  }

  getSubmit() {
    return this.submit$$.asObservable();
  }

  setSubmit() {
    this.submit$$.next(this.getAuthenticated());
  }
}
