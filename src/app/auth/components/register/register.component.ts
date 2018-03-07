/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NB_AUTH_OPTIONS_TOKEN } from '../../auth.options';
import { getDeepFromObject } from '../../helpers';
import { NbAuthService } from '../../services/auth.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from "../User";
import sweetAlert from 'sweetalert2';
import { FiwooService } from '../../../pages/services/fiwoo.service';



@Component({
  selector: 'nb-register',
  styleUrls: ['./register.component.scss'],
  templateUrl: './register.component.html'
})
export class NbRegisterComponent implements OnInit {

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
    private fb: FormBuilder,
    private userService: FiwooService) {

    this.redirectDelay = this.getConfigValue('forms.register.redirectDelay');
    this.showMessages = this.getConfigValue('forms.register.showMessages');
    this.provider = this.getConfigValue('forms.register.provider');
  }

  urlBase: string = 'https://platform.fiwoo.eu/api/user-management/users';

  //Property for the user
  private user: User;

  //Gender list for the select control element
  genderList: string[];
  signupForm: FormGroup;


  ngOnInit() {

    this.genderList = ['Male', 'Female'];

    // Use the formbuilder to build the Form model
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      gender: ['', Validators.required],
      terms: ['', Validators.requiredTrue]
    })

  }
  get name() { return this.signupForm.get('name'); }
  get surname() { return this.signupForm.get('surname'); }
  get username() { return this.signupForm.get('username'); }
  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }
  get gender() { return this.signupForm.get('gender'); }
  get terms() { return this.signupForm.get('terms'); }

  public onFormSubmit() {
    if (this.signupForm.valid) {
      this.user = this.signupForm.value;
      console.log('User: ', this.user);

      this.userService.doRegister(this.user).subscribe( 
        res => {
           console.log('Register post: ', res); 
           sweetAlert({
            title: "OK!",
            text: "You have registered!",
            type: "success"
          }).then(okay => {
            if (okay) {
              window.location.href = "/#/auth/login";
            }
          });
          },
        err => { 
           console.error(err);   
           sweetAlert("Oops!", "Something went wrong!", "error");           
        }
      );
    }
  }




  /*register(): void {
    this.errors = this.messages = [];
    this.submitted = true;

    this.service.register(this.provider, this.user).subscribe((result: NbAuthResult) => {
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


  /*form: NgForm;

  doRegister() {

    let name: string;
    let surname: string;
    let email: string;
    let password: string;

    var body = new URLSearchParams();
    body.append(name, this.form.value.name);
    body.append(surname, this.form.value.surname);
    body.append(email, this.form.value.email);
    body.append(password, this.form.value.password);


    this.http.post(`${this.urlBase}/users`, body).subscribe(
      res => {
         console.log('Register post: ', res);
        },
      err => { // console.log(err);
        //TODO QUITAR DE AQUI
        this.router.navigate(['../auth/login']);
      }
    );
  }*/

  getConfigValue(key: string): any {
    return getDeepFromObject(this.config, key, null);
  }
}
