/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NB_AUTH_OPTIONS_TOKEN } from '../../auth.options';
import { getDeepFromObject } from '../../helpers';

import { NbAuthResult, NbAuthService } from '../../services/auth.service';
import { Http } from '@angular/http';
import { NgForm, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from "../User";
import sweetAlert from 'sweetalert2';

@Component({
  selector: 'nb-reset-password-page',
  styleUrls: ['./reset-password.component.scss'],
  templateUrl: './reset-password.component.html'  
})
export class NbResetPasswordComponent {

  redirectDelay: number = 0;
  showMessages: any = {};
  provider: string = '';

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  // user: any = {};

  constructor(protected service: NbAuthService,
              @Inject(NB_AUTH_OPTIONS_TOKEN) protected config = {},
              protected router: Router,
              private http: Http,
              private fb: FormBuilder) {

    this.redirectDelay = this.getConfigValue('forms.resetPassword.redirectDelay');
    this.showMessages = this.getConfigValue('forms.resetPassword.showMessages');
    this.provider = this.getConfigValue('forms.resetPassword.provider');
  }

  
  
  
  

  //Property for the user
  private user: User; 
  signupForm: FormGroup;
  private id: number = 3;

  ngOnInit() {

   
    // Use the formbuilder to build the Form model
    this.signupForm = this.fb.group({     
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(8)]],

    })

  }
  
  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }



  getUserId() {

    this.user = this.signupForm.value;
    let userEmail: string = this.user.email;

    // Check

    // Get the ID and the old password


    
  }


  public onFormSubmit() {

    let urlBase: string = 'http://stg-sac-fase-dos.emergyalabs.com:7000/users';
    let old_password: string;
    let new_password: string;
    let new_password2: string;

    var body = new URLSearchParams();
    body.append(old_password, '');
    body.append(new_password, this.user.password);
    body.append(new_password2, this.user.password)

    if (this.signupForm.valid) {

      this.user = this.signupForm.value;      
      console.log('User: ', this.user);  

      /*this.http.put(`${this.urlBase}/users/${this.id}/password`, this.user).subscribe( 
        res => {
           console.log('Change password put: ', res); 
           sweetAlert("Ok!", "You have changed your password!", "success");
           this.router.navigate['/login'];
          },
        err => { 
           console.error(err);   
           sweetAlert("Oops!", "Something went wrong!", "error");           
        }
      );  */

    }
  }

  
  
  
  
  
  /*resetPass(): void {
    this.errors = this.messages = [];
    this.submitted = true;

    this.service.resetPassword(this.provider, this.user).subscribe((result: NbAuthResult) => {
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
