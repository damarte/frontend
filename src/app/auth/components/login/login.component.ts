import { Component, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { NB_AUTH_OPTIONS_TOKEN } from "../../auth.options";
import { getDeepFromObject } from "../../helpers";
import { NbAuthResult, NbAuthService } from "../../services/auth.service";
import { NgForm } from "@angular/forms";
import { UsersService, UserLogin } from "um_fiwoo";

import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import "rxjs/Rx";
import sweetAlert from "sweetalert2";

@Component({
  selector: "nb-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  providers: [UsersService]
})
export class NbLoginComponent {
  rememberMe: boolean = false;

  redirectDelay: number = 0;
  showMessages: any = {};
  provider: string = "";

  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;

  form: NgForm;

  constructor(
    protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS_TOKEN) protected config = {},
    protected router: Router,
    protected _usersService: UsersService,
    private http: Http
  ) {
    this.redirectDelay = this.getConfigValue("forms.login.redirectDelay");
    this.showMessages = this.getConfigValue("forms.login.showMessages");
    this.provider = this.getConfigValue("forms.login.provider");
  }

  username: string;
  password: string;
  grant_type: string;

  login(form: NgForm) {
    this.form = form;
    if (form.invalid) {
      return;
    }

    this.username = form.value.username;
    this.password = form.value.password;

    this.doLogin();
  }

  private doLogin() {
    let url: string =
      "http://stg-sac-fase-dos.emergyalabs.com:7000/users/login";
    let grant_type: string = "grant_type";
    let username: string = "username";
    let password: string = "password";

    var body = new URLSearchParams();
    body.append(grant_type, "password");
    body.append(username, this.form.value.username);
    body.append(password, this.form.value.password);

    let headers = new Headers();
    headers.append(
      "Authorization",
      "Basic c2VsZWN0NGNpdGllczp3LUB5N0ZDKX55IzlLdWouYkBfTHRyM24mYW1G"
    );

    let options = new RequestOptions({ headers: headers });

    this.http.post(url, body, options).subscribe(
      data => {
        console.log("Login Data: ", data);
        
        let user_login = data.json();
        let token = user_login.access_token;
        localStorage.setItem('access_token', JSON.stringify(token));
        
        sweetAlert({
          title: "OK!",
          text: "You have logged in!",
          type: "success"
        }).then(okay => {
          if (okay) {
            window.location.href = "/#/pages/dashboard";
          }
        });
      },
      err => {
        // uncomment this lines when the ws is ok
        console.error(err);
        sweetAlert("Oops!", "Something went wrong!", "error");

        // remove this lines when the ws is ok
        // get the email user and save it in to the localstorage
        /*localStorage.setItem('email', JSON.stringify(this.username));
        sweetAlert("Ok!", "You are login!", "success")
        .then((result) => {
          this.router.navigate(['../pages/dashboard']);          
        })     */
      }
    );
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.config, key, null);
  }
}
