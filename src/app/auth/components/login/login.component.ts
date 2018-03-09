import { Component, Inject, OnInit } from "@angular/core";
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { NB_AUTH_OPTIONS_TOKEN } from "../../auth.options";
import { getDeepFromObject } from "../../helpers";
import { NbAuthService } from "../../services/auth.service";
import { UsersService } from "um_fiwoo";
import { URLSearchParams } from "@angular/http";
import "rxjs/Rx";
import sweetAlert from "sweetalert2";
import { FiwooService } from "../../../pages/services/fiwoo.service";
import { AuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

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

  constructor(
    protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS_TOKEN) protected config = {},
    protected router: Router,
    protected _usersService: UsersService,
    private fiwooService: FiwooService,
    private authService: AuthService
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

    this.doLogin();

    // LOGIN WITH NEBULAR (IN PROCESS)
    // this.doLoginAuth();
  }

  // private doLoginAuth(){

  //   let grant_type: string = "grant_type";
  //   let username: string = "username";
  //   let password: string = "password";

  //   const body = new HttpParams()
  //   .set(grant_type, "password")
  //   .set(password, this.form.value.password)
  //   .set(username, this.form.value.username);

  //   this.errors = this.messages = [];
  //   this.submitted = true;

  //   this.service.authenticate(this.provider, body.toString()).subscribe((result: NbAuthResult) => {
  //     this.submitted = false;

  //     if (result.isSuccess()) {
  //       this.messages = result.getMessages();
  //     } else {
  //       this.errors = result.getErrors();
  //     }

  //     const redirect = result.getRedirect();
  //     if (redirect) {
  //       sweetAlert({
  //         title: "OK!",
  //         text: "You have logged in!",
  //         timer: 5000,
  //         onOpen: () => {
  //           sweetAlert.showLoading();
  //           // window.location.href = "/#/pages/dashboard";
  //           this.router.navigateByUrl(redirect);
  //         }
  //       }).then((res) => {
  //         sweetAlert.close();
  //       });
  //       // setTimeout(() => {
  //       //   return this.router.navigateByUrl(redirect);
  //       // }, this.redirectDelay);
  //     }
  //   });
  // }

  private googleUser: SocialUser;
  private loggedIn: boolean;

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.googleUser = user;
      console.log(user);
      this.loggedIn = (user != null);
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  // signOut(): void {
  //   this.authService.signOut();
  // }


  username: string;
  password: string;
  grant_type: string;

  private doLogin() {
    let grant_type: string = "grant_type";
    let username: string = "username";
    let password: string = "password";

    var body = new URLSearchParams();
    body.append(grant_type, "password");
    body.append(username, this.form.value.username);
    body.append(password, this.form.value.password);

    this.fiwooService.doLogin(body).subscribe(
      data => {
        console.log("Login Data: ", data);

        let user_login = data.json();
        let token = user_login.access_token;
        localStorage.setItem('access_token', JSON.stringify(token));
        localStorage.setItem('email', JSON.stringify(this.form.value.username));

        this.fiwooService.isLoggedIn = true;

        // sweetAlert({
        //   title: "OK!",
        //   text: "You have logged in!",
        //   showLoaderOnConfirm: false,

        //   preConfirm: (email) => {
        //     return new Promise((resolve) => {
        //       window.location.href = "/#/pages/dashboard";
        //       setTimeout(() => {
        //         resolve()
        //       }, 5000)
        //     })
        //   },
        // });

        sweetAlert({
          title: "OK!",
          text: "You have logged in!",
          timer: 5000,
          onOpen: () => {
            sweetAlert.showLoading();
            window.location.href = "/#/pages/dashboard";
          }
        }).then((result) => {
          sweetAlert.close();
        });

      },
      err => {
        console.error(err);
        sweetAlert("Oops!", "Something went wrong!", "error");
      }
    );
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.config, key, null);
  }
}
