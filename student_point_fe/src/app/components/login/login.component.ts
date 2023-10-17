import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { AccountLogin } from "src/app/commons/account-login";
import { AccountService } from "src/app/services/account.service";
import { JwtResponse } from "./../../commons/response/jwt-response";
import { AuthService } from "./../../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  accountLogin: AccountLogin = new AccountLogin();
  jwtResponse: JwtResponse = new JwtResponse();
  staticAlertClosed!: boolean;
  error!: string;

  constructor(
    private authService: AuthService,
    private accountService: AccountService,
    private notification: NzNotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.staticAlertClosed = true;
    if (this.authService.isLoggedIn()) this.router.navigate([""]);
  }

  async authentication() {
    this.accountService.authentication(this.accountLogin).subscribe(
      (data) => {
        console.log(data)
        this.jwtResponse = data;
        sessionStorage.setItem("jwtToken", JSON.stringify(this.jwtResponse));
        this.router.navigate([""]);
        console.log("success", "Đăng nhập thành công!!");
        setTimeout(() => location.reload(), 800);
      }, error => {
        this.notification.create(
          'error',
          'Lỗi máy chủ',
          'Tài khoản hoặc mật khẩu không chính xác'
        );
      }
    );
  }

  onSubmit() {
    if (this.accountLogin.username.toLowerCase() == "admin" && this.accountLogin.password.toLowerCase() == "admin") {
      sessionStorage.setItem("jwtToken", JSON.stringify("admin"));
      this.router.navigate(["admin"]);
    }
    else this.authentication();
  }

  validate() {
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    if (form.checkValidity() === false) {
      // event.preventDefault();
      // event.stopPropagation();
    }
    form.classList.add('was-validated');
  }
}
