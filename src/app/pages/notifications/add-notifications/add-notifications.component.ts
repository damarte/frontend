import { NgModule, Inject, Output, Input, EventEmitter } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { validateConfig } from '@angular/router/src/config';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { Http } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';
import { FiwooService } from '../../services/fiwoo.service';

declare var jQuery: any;
var context: any;

@Component({
  selector: 'app-add-notifications',
  templateUrl: './add-notifications.component.html',
  styleUrls: ['./add-notifications.component.scss']
})
export class AddNotificationsComponent implements OnInit {

  @ViewChild('addNotificationModal') addNotificationModalRef: ElementRef;

  @Output() onHidden = new EventEmitter<boolean>();

  modal: any;

  notifications: any = {};

  subject: string;
  message: string;
  rolesSelected: any = [];
  contactsSelected: any = [];
  vias: any = ['SMS', 'Email', 'Fiwoo'];  
  public selectedMoment = new Date();


  editedNotification: any = null;
  modalTitle: string = "";

  subjectFormControl = new FormControl('');
  messageFormControl = new FormControl('');
  rolesFormControl = new FormControl('');
  contactsFormControl = new FormControl('');
  viaFormControl = new FormControl('');
  public selectedMoment2 = new FormControl(new Date());

  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;

  showValue: boolean = false;

  saved: boolean = false;

  constructor(private http: Http,
    private _fiwooService: FiwooService) {

    context = this;
    // this.getRoles();
  }

  // change this when the ws is up
  // roles: any[];
  // contacts: any[];
  roles: any = ['Administrator', 'Citizen', 'Medical'];
  contacts: any = ['Jhon Doe', 'Mark Peter', 'Lisa Simpson'];

  

  compareFn: ((f1: any, f2: any) => boolean) | null = this.compareByValue;

  compareByValue(f1: any, f2: any) {
    return f1 && f2 && f1.id === f2.id;
  }


  //  private getRoles(){   

  //   this._fiwooService.getRoles().subscribe( 
  //     data => {           
  //       let roles: any[] = data; 
  //       this.roles = roles;
        
  //       console.log(this.roles);
  //     },
  //     err => {
  //       console.log(err);      
  //     }
  //   );    
  // } 

  ngOnInit() {
  }

  cleanValues() {

    this.subject = "";
    this.message = "";
    this.rolesSelected = [];
    this.contactsSelected = [];

  }


  showModal(notification) {
    this.editedNotification = notification;

    this.configureNotificationToEdit();

    this.saved = false;
    this.modal.modal({
      closable: true,
      onHidden: function () {
        context.cleanValues();
        context.onHidden.emit(true);
      }
    })
      .modal('show');
  }

  configureNotificationToEdit() {

    if (this.editedNotification != null) {

      this.modalTitle = "Edit Notification";
      this.subject = this.editedNotification.subject;
      this.message = this.editedNotification.message;
      this.rolesSelected = this.editedNotification.rol instanceof Array && this.editedNotification.roles.length ? this.editedNotification.roles[0] : this.editedNotification.roles;
      this.contactsSelected =  this.editedNotification.contact instanceof Array && this.editedNotification.contacts.length ? this.editedNotification.contacts[0] : this.editedNotification.contacts;

    } else {
      this.modalTitle = "Add Notification"
    }
  }

  hideModal() {
    this.modal.modal('hide');
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.modal = jQuery(this.addNotificationModalRef.nativeElement);
  }


  sendAsset() {

    if (!this.subjectFormControl.hasError('required') &&
      !this.messageFormControl.hasError('required')) {

      let allRoles = [];

      if (this.rolesSelected instanceof Array) {
        allRoles = this.rolesSelected;
      } else {
        allRoles = [this.rolesSelected];
      }

      let allContacts = [];

      if (this.contactsSelected instanceof Array) {
        allContacts = this.contactsSelected;
      } else {
        allContacts = [this.contactsSelected];
      }



      this.notifications = {
        subject: this.subject,
        message: this.message,      
        roles: allRoles,
        contacts: allContacts
      };

      if (this.editedNotification != undefined) {

        // PUT
        console.log(JSON.stringify(this.notifications));

        // this._fiwooService.updateNotification(this.editedNotification.id, this.notifications).subscribe(
        //   res => {
        //     console.log(res);
        //     this.saved = true;
        //     this.hideModal();
        //   });

      } else {

        this.notifications = {
          subject: this.subject,
          message: this.message,      
          roles: allRoles,
          contacts: allContacts
        };

        console.log(JSON.stringify(this.notifications));

        // this._fiwooService.postNotifications(this.notifications).subscribe(
        //   res => {
        //     console.log(res);
        //   });

      }

      this.hideModal();


    }
  }


  private changeDate(date: Date) {
    var days: string;
    var months: string;
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();

    days = dd + '';
    months = mm + '';

    if (dd < 10) {
      days = '0' + dd;
    }

    if (mm < 10) {
      months = '0' + mm;
    }
    return yyyy + '-' + months + '-' + days;
  }

}




