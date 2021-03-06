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
import { FiwooService } from '../../services/fiwoo.service';

declare var jQuery: any;
var context: any;

@Component({
  selector: 'app-add-roles',
  templateUrl: './add-roles.component.html',
  styleUrls: ['./add-roles.component.scss']
})


export class AddRolesComponent implements OnInit {

  @ViewChild('addRoleModal') addRoleModalRef: ElementRef;

  @Output() onHidden = new EventEmitter<boolean>();

  modal: any;

  role: any = {};
  
  name: string;
  description: string;
  resourceSelected: any;
 
  urlBase: string = 'http://stg-sac-fase-dos.emergyalabs.com:7000/users';

  editedRole:any = null;
  modalTitle: string = "";

  // validations
  nameFormControl = new FormControl('', [Validators.required]);
  descriptionFormControl = new FormControl();
  resourceFormControl = new FormControl();
 
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;

  showValue: boolean = false;

  saved: boolean = false;  

  constructor(private devicesService: DevicesService,
              private http: Http,
              private _fiwooService: FiwooService) {
    context = this;     
    this.getResources();

  
   
  }
 
  
  resources: any[];

    private getResources(){ 
    this._fiwooService.getResources().subscribe( 
      data => {           
        let resources: any[] = data; 
        this.resources = resources;
      },
      err => {
        console.log(err);      
      }
    );  
  } 
 

  compareFn: ((f1: any, f2: any) => boolean)|null = this.compareByValue;

  compareByValue(f1: any, f2: any) { 
    return f1 && f2 && f1.id === f2.id; 
  }


  ngOnInit() {
  }

  cleanValues (){ 

    this.name = "";
    this.description = "";   
    this.resourceSelected = [];  
     
  }


  showModal(role) {
    this.editedRole = role;

    this.configureRoleToEdit();

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

  configureRoleToEdit(){

    if (this.editedRole != null){
      
      this.modalTitle = "Edit Role";
      this.name = this.editedRole.name;
      this.description = this.editedRole.description;
      this.resourceSelected = this.editedRole.resources;   
     }else{
      this.modalTitle = "Add Role"
    }
  }

  hideModal() {
    this.modal.modal('hide');
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.modal = jQuery(this.addRoleModalRef.nativeElement);
  }
  

  sendRole (){    

    if (!this.nameFormControl.hasError('required') &&
        !this.descriptionFormControl.hasError('required')){
        
        let allResources = [];

        if (this.resourceSelected instanceof Array) {
          allResources = this.resourceSelected;
        } else {
          allResources = [this.resourceSelected];
        }        
 
        this.role = {
          name: this.name,
          description: this.description,        
          resources: allResources
        };

        if (this.editedRole != undefined){

          // PUT
          console.log(JSON.stringify(this.role));        
          
          this._fiwooService.updateRol(this.editedRole.id, this.role).subscribe(
            res => {
              console.log(res);
              this.saved = true;              
              this.hideModal();           
          });          

        }else{

          // POST
          this.role = {
            name: this.name,
            description: this.description,        
            resources: allResources 
          };

          console.log(JSON.stringify(this.role));

          this._fiwooService.postRol(this.role).subscribe(
            res => {
              console.log(res);                    
          });         
        
        }

        this.hideModal();


    }
  } 

}



