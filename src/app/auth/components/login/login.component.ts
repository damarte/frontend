import { Component, Inject, OnInit } from "@angular/core";
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { NB_AUTH_OPTIONS_TOKEN } from "../../auth.options";
import { getDeepFromObject } from "../../helpers";
import { NbAuthService, NbAuthResult } from "../../services/auth.service";
import { UsersService } from "um_fiwoo";
import { HttpParams } from '@angular/common/http';
import "rxjs/Rx";
import sweetAlert from "sweetalert2";

@Component({
  selector: "nb-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  providers: [UsersService]
})
export class NbLoginComponent implements OnInit {

  rememberMe: boolean = false;
  redirectDelay: number = 0;
  showMessages: any = {};
  provider: string = "";
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;
  form: NgForm;

  username: string;
  password: string;
  grant_type: string;

  constructor(
    protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS_TOKEN) protected config = {},
    protected router: Router,
    protected _usersService: UsersService,
  ) {
    this.redirectDelay = this.getConfigValue("forms.login.redirectDelay");
    this.showMessages = this.getConfigValue("forms.login.showMessages");
    this.provider = this.getConfigValue("forms.login.provider");
  }

  login(form: NgForm): void {

    this.form = form;
    if (form.invalid) {
      return;
    }

    this.username = form.value.username;
    this.password = form.value.password;

    this.doLoginAuth();
  }

  private doLoginAuth(){

    let grant_type: string = "grant_type";
    let username: string = "username";
    let password: string = "password";

    const body = new HttpParams()
    .set(grant_type, "password")
    .set(password, this.form.value.password)
    .set(username, this.form.value.username);

    this.errors = this.messages = [];
    this.submitted = true;

    this.service.authenticate(this.provider, body.toString()).subscribe((result: NbAuthResult) => {
      this.submitted = false;

      if (result.isSuccess()) {
        this.messages = result.getMessages();
      } else {
        this.errors = result.getErrors();
      }

      const redirect = result.getRedirect();
      if (redirect) {
        sweetAlert({
          title: "OK!",
          text: "You have logged in!",
          timer: 3000,
          onOpen: () => {
            sweetAlert.showLoading();
            this.router.navigateByUrl(redirect);
          }
        }).then((res) => {
          sweetAlert.close();
        });
      }
    });
  }

  ngOnInit() {

  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.config, key, null);
  }
}
