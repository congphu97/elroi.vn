import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "app/shared/auth/auth.service";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }
  public formLogin = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
    name: new FormControl("", Validators.required),
    avatar: new FormControl("", Validators.required),
    birthday: new FormControl("", Validators.required),
    phone: new FormControl("", Validators.required),
    history: new FormControl([], Validators.required),
  });

  public register(formLogin: FormGroup) {
    formLogin.value.role = "customer";
    this.authService
      .register(formLogin.value)
      .subscribe((data) => this.router.navigate(["./login"]));
  }


  ngOnInit() { }
}
