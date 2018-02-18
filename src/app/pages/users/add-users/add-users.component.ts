import { NgModule, Inject, Output, Input, EventEmitter } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatSelectModule} from '@angular/material/select';
import {FormControl, Validators} from '@angular/forms';
import { DxSelectBoxModule,
         DxTextBoxModule,
         DxTemplateModule } from 'devextreme-angular';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Template, DevicesService, Device, Devices, DevicesDevice, TemplateAttributes, TemplateCommands, TemplateInternalAttributes, TemplateLazy, TemplateStaticAttributes } from 'iot_devices_fiwoo';
import { validateConfig } from '@angular/router/src/config';

import {ENTER, COMMA} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { Http } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';

declare var jQuery: any;
var context: any;

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})


export class AddUsersComponent implements OnInit {

  @ViewChild('addTemplateModal') addTemplateModalRef: ElementRef;

  @Output() onHidden = new EventEmitter<boolean>();

  modal: any;

  user: any = {};
  
  name: string;
  surname: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  genderSelected: string;
  roleSelected: any;
  assetSelected: any;
  date_of_birth: Date;
  urlBase: string = 'http://stg-sac-fase-dos.emergyalabs.com:7000/users';

  editedUser:any = null;
  modalTitle: string = "";

  nameFormControl = new FormControl('', [
    Validators.required
  ]);
  surnameFormControl = new FormControl('', [
    Validators.required
  ]);
  usernameFormControl = new FormControl('', [
    Validators.required
  ]);
  emailFormControl = new FormControl('', [
    Validators.required
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required
  ]);
  confirmPasswordFormControl = new FormControl('', [
    Validators.required
  ]);
  genderFormControl = new FormControl('', [
    Validators.required
  ]);
  roleFormControl = new FormControl('', [
    Validators.required
  ]);
  assetFormControl = new FormControl('', [
    Validators.required
  ]);
  birthFormControl = new FormControl('', [
    Validators.required
  ]);


 
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;

  showValue: boolean = false;

  saved: boolean = false;  

  constructor(private devicesService: DevicesService,
              private http: Http) {
    context = this;     
    this.getRoles();
    this.getAssets();
  }

  
  genders:any = ['Male', 'Female'];
 

  roles: any[];
  assets: any[];

  private getRoles(){ 
    this.http.get(`${this.urlBase}/roles`).subscribe( data => {          
          let roles: any[] = data.json(); 
          this.roles = roles;
        },
      err => {        
        console.log(err);          
      } 
    );  
  } 


  private getAssets(){     
    this.http.get(`${this.urlBase}/assets`).subscribe(
      data => {
          
          let assets: any[] = data.json(); 
          this.assets = assets;
          console.log('getAssets: ', assets);
        },
      err => {        
        console.log(err);          
      } 
    );  
  } 

  ngOnInit() {
  }

  cleanValues (){ 

    this.name = "";
    this.surname = "";
    this.email = "";
    this.username = "";
    this.password = "";
    this.confirmPassword = "";
    this.genderSelected = "";
    this.roleSelected = [];
    this.assetSelected = [];
    this.date_of_birth = new Date();
     
  }


  showModal(user) {
    this.editedUser = user;

    this.configureUserToEdit();

    this.saved = false;
    this.modal.modal({
      closable  : true,
      onHidden  : function(){
        context.cleanValues();
        context.onHidden.emit(context.saved);
      }
    })
    .modal('show');
  }

  configureUserToEdit(){

    if (this.editedUser != null){
      
      this.modalTitle = "Edit User";      
      this.name = this.editedUser.name;
      this.surname = this.editedUser.surname;
      this.username = this.editedUser.username;
      this.email = this.editedUser.email;
      this.password = this.editedUser.password;
      this.confirmPassword = this.editedUser.confirmPassword;
      this.genderSelected = this.editedUser.gender;
      this.roleSelected = this.editedUser.roles;
      this.assetSelected= this.editedUser.assets;
      this.date_of_birth = this.editedUser.date_of_birth;

    }else{
      this.modalTitle = "Add User"
    }
  }

  hideModal() {
    this.modal.modal('hide');
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.modal = jQuery(this.addTemplateModalRef.nativeElement);
  }
  

  sendTemplate (){
    //TODOD VALIDATIONS
    console.log('sendTemplate');

    if (!this.nameFormControl.hasError('required') &&
        !this.surnameFormControl.hasError('required') &&
        !this.usernameFormControl.hasError('required') &&
        !this.emailFormControl.hasError('required') &&
        !this.passwordFormControl.hasError('required')){
        
        let allRoles = [];

        if (this.roleSelected instanceof Array) {
          allRoles = this.roleSelected;
        } else {
          allRoles = [this.roleSelected];
        }

        let allAssets = [];

        if (this.assetSelected instanceof Array) {
          allAssets = this.assetSelected;
        } else {
          allAssets = [this.assetSelected];
        }
 
        this.user = {
          name: this.name,
          surname: this.surname,
          username: this.username,
          email: this.email,
          password: this.password,
          roles: allRoles,
          assets: allAssets,
          gender: this.genderSelected,
          date_of_birth: this.changeDate(this.date_of_birth)   
          // date_of_birth: this.date_of_birth     
        };

        if (this.editedUser != undefined){

          // PUT
          console.log(JSON.stringify(this.user));

          this.http.put(`${this.urlBase}/users/${this.editedUser.id}`, this.user).subscribe(
            res => {
              console.log(res);
              this.saved = true;              
              this.hideModal();         
          });        

        }else{

          // POST
          this.user = {
            name: this.name,
            surname: this.surname,
            username: this.username,
            email: this.email,
            password: this.password,
            roles: allRoles,
            assets: allAssets,
            gender: this.genderSelected,
            date_of_birth: this.changeDate(this.date_of_birth)
            // date_of_birth: this.date_of_birth
          };

          console.log(JSON.stringify(this.user));
    
          this.http.post(`${this.urlBase}/users`, this.user).subscribe(res => {            
            console.log('Add User',res);            
          });    
        
        }

        this.hideModal();


    }
  }


  private changeDate (date: Date){
    var days:string;
    var months:string;
    var dd = date.getDate();
    var mm = date.getMonth()+1; 
    var yyyy = date.getFullYear();
    
    days = dd + '';
    months = mm + '';

    if(dd<10){
        days ='0'+ dd;
    }

    if(mm<10){
        months = '0'+ mm;
    }
    return yyyy + '-' + months + '-' + days;
}

}



