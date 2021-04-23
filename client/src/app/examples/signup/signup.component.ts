import { Component, OnInit, TemplateRef } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "app/shared/auth/auth.service";
import { NzNotificationService } from "ng-zorro-antd/notification";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router,
    private notification: NzNotificationService
  ) { }
  public formLogin = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
  });

  ngOnInit() { }
  public login(formLogin: FormGroup) {
    this.authService
      .login(formLogin.value)
      .subscribe((data) => {
        if (data) {
          this.router.navigate(["./home"])
          this.notification.create(
            'success',
            'Đăng nhập thành công',
            'Chúc bạn có một ngày mua sắm vui vẻ'
          );
        }
        else {
          this.notification.create(
            'error',
            'Đăng nhập thất bại',
            'Vui lòng thử lại sau'
          );

        }
      });
  }

  public register() {
    this.router.navigate(["./register"])
  }
}
