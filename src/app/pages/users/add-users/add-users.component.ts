import { Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FiwooService } from '../../services/fiwoo.service';

declare var jQuery: any;
var context: any;

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})


export class AddUsersComponent implements OnInit {

  @ViewChild('addUserModal') addUserModalRef: ElementRef;

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
  // passwordFormControl = new FormControl('', [
  //   Validators.required
  // ]);
  // confirmPasswordFormControl = new FormControl('', [
  //   Validators.required
  // ]);
  roleFormControl = new FormControl('', [
    Validators.required
  ]);
  genderFormControl = new FormControl();
  assetFormControl = new FormControl();
  birthFormControl = new FormControl();



  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;

  showValue: boolean = false;

  saved: boolean = false;

  constructor(private _fiwooService: FiwooService ) {

    context = this;
    this.getRoles();
    this.getAssets();
  }


  genders:any = ['Male', 'Female'];

  compareFn: ((f1: any, f2: any) => boolean)|null = this.compareByValue;

  compareByValue(f1: any, f2: any) {
    return f1 && f2 && f1.id === f2.id;
  }



  roles: any[];
  assets: any[];

  private getRoles(){
    this._fiwooService.getRoles().subscribe(
      data => {
        let roles: any[] = data;
        this.roles = roles;
      },
      err => {
        console.log(err);
      }
    );
  }


  private getAssets(){
     this._fiwooService.getAssets().subscribe(
      data => {
        let assets: any[] = data;
        this.assets = assets;
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
    this.roleSelected = {};
    this.assetSelected = [];
    this.date_of_birth = null;

  }

  showModal(user) {
    this.editedUser = user;

    this.configureUserToEdit();

    this.saved = false;
    this.modal.modal({
      closable  : true,
      onHidden  : function(){
        context.cleanValues();
        context.onHidden.emit(true);
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
      this.password = "";
      this.confirmPassword = "";
      this.genderSelected = this.editedUser.gender;
      this.roleSelected = this.editedUser.roles instanceof Array && this.editedUser.roles.length ? this.editedUser.roles[0] : this.editedUser.roles;
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
    this.modal = jQuery(this.addUserModalRef.nativeElement);
    // select multiple
    jQuery('.dropdown1').dropdown();
  }


  sendUser (){
    console.log('Edited User: ', this.editedUser);

    if (!this.nameFormControl.hasError('required') &&
        !this.surnameFormControl.hasError('required') &&
        !this.usernameFormControl.hasError('required') &&
        !this.emailFormControl.hasError('required') &&
        !this.roleFormControl.hasError('required') &&
        this.password == this.confirmPassword) {

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
          // password: this.password,
          roles: allRoles,
          assets: allAssets,
          gender: this.genderSelected,
          date_of_birth: this.date_of_birth
        };

        if (this.password !== ''){
          this.user.password = this.password;
        }

        if (this.editedUser != undefined){

          // PUT
          console.log(JSON.stringify(this.user));

          this._fiwooService.updateUser(this.editedUser.id, this.user).subscribe(
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
            date_of_birth: this.date_of_birth
          };

          console.log(JSON.stringify(this.user));

          this._fiwooService.postUser(this.user).subscribe(
            res => {
              console.log(res);
          });


        }

        this.hideModal();


    }
  }
}
