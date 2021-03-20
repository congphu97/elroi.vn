import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "app/shared/auth/auth.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }
  public formLogin = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
  });

  ngOnInit() { }
  public login(formLogin: FormGroup) {
    this.authService
      .login(formLogin.value)
      .subscribe((data) => this.router.navigate(["./home"]));
  }

  public register() {
    this.router.navigate(["./register"])
  }
}
