
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NB_AUTH_OPTIONS_TOKEN } from '../../auth.options';
import { getDeepFromObject } from '../../helpers';
import { NbAuthResult, NbAuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { UsersService, UserLogin } from 'um_fiwoo';


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

  constructor(protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS_TOKEN) protected config = {},
    protected router: Router,
    protected _usersService: UsersService) {

    this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
    this.showMessages = this.getConfigValue('forms.login.showMessages');
    this.provider = this.getConfigValue('forms.login.provider');
  }

  username : string;
  password: string;


  login(form: NgForm) {

    if (form.invalid) {
      return;
    }

    this.username = form.value.username;
    this.password = form.value.password

    let user: UserLogin = {email: form.value.username, password: form.value.password};

    this._usersService.login(user)
              .subscribe(resp => {
                console.log(resp);
              });

    console.log(form.valid);
    console.log(form.value);
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