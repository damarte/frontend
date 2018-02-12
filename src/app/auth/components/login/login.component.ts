
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NB_AUTH_OPTIONS_TOKEN } from '../../auth.options';
import { getDeepFromObject } from '../../helpers';
import { NbAuthResult, NbAuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { UsersService, UserLogin } from 'um_fiwoo';

import {Http, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import 'rxjs/Rx';

@Component({
  selector: 'nb-login',
  templateUrl: './login.component.html',
  providers: [UsersService]
})
export class NbLoginComponent {

  rememberMe: boolean = false;

  redirectDelay: number = 0;
  showMessages: any = {};
  provider: string = '';

  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;

  form: NgForm;

  constructor(protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS_TOKEN) protected config = {},
    protected router: Router,
    protected _usersService: UsersService,
    private http: Http) {

    this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
    this.showMessages = this.getConfigValue('forms.login.showMessages');
    this.provider = this.getConfigValue('forms.login.provider');
  }

  username : string;
  password: string;


  login(form: NgForm) {
    this.form = form;
    if (form.invalid) {
      return;
    }

    this.username = form.value.username;
    this.password = form.value.password

    // let user: UserLogin = {email: form.value.username, password: form.value.password};

    // this._usersService.login(user)
    //           .subscribe(resp => {
    //             console.log(resp);
    //           });

    this.doLogin();

    console.log(form.valid);
    console.log(form.value);
  }

  private doLogin(){
    let url: string = 'http://us1.fiwoo.eu:7000/users/login';
    let grant_type: string = 'grant_type';
    let username: string = 'username';
    let password: string = 'password';
  
    var body = new URLSearchParams();
    body.append(grant_type, 'password');
    body.append(username, this.form.value.username);
    body.append(password, this.form.value.password);

    let headers = new Headers();
    // headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append("Authorization", "Basic c2VsZWN0NGNpdGllczp3LUB5N0ZDKX55IzlLdWouYkBfTHRyM24mYW1G"); 
    // headers.append("Authorization", "Basic " + btoa(username + ":" + password)); 

    let options = new RequestOptions({headers: headers});

    this.http.post(url, body, options).subscribe(
      data => {
         console.log(data); 
        },
      err => { console.log(err);
      
        //TODO QUITAR DE AQUI
        this.router.navigate(['../pages/dashboard']);
      }
    );  
}


  /*login(): void {
    this.errors = this.messages = [];
    this.submitted = true;

    this.service.authenticate(this.provider, this.user).subscribe((result: NbAuthResult) => {
      this.submitted = false;

      if (result.isSuccess()) {
        this.messages = result.getMessages();
      } else {
        this.errors = result.getErrors();
      }

      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
    });
  }*/

  getConfigValue(key: string): any {
    return getDeepFromObject(this.config, key, null);
  }

}




// export function apiConfigFactory () {
//   const params: ConfigurationParameters = {
//     apiKeys: {
//       key: 'Basic c2VsZWN0NGNpdGllczp3LUB5N0ZDKX55IzlLdWouYkBfTHRyM24mYW1G'
//     },
//     username: this.username,
//     password: this.password

//   };
//   return new Configuration(params);
// }