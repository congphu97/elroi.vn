import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap, switchMap } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Subject } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) { }
  private baseUrl = "http://localhost:8080/";
  public submit$$ = new Subject();
  login(body) {
    return this.http.post(this.baseUrl + "login", body).pipe(
      map((token) => {
        console.log("token", token);
        localStorage.setItem("jwtToken", JSON.stringify(token));
        this.setSubmit();
        return token;
      })
    );
  }

  register(body) {
    return this.http.post(this.baseUrl + "createUser", body);
  }

  getUser(body) {
    return this.http.post(this.baseUrl + "getUser", body);

  }

  isAuthenticated(): boolean {
    const token = JSON.parse(localStorage.getItem("jwtToken"));
    this.setSubmit()
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
