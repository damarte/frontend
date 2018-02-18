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
  selector: 'app-add-assets',
  templateUrl: './add-assets.component.html',
  styleUrls: ['./add-assets.component.scss']
})


export class AddAssetsComponent implements OnInit {

  @ViewChild('addAssetsModal') addAssetsModalRef: ElementRef;

  @Output() onHidden = new EventEmitter<boolean>();

  modal: any;

  asset: any = {};
  
  name: string;
  description: string;
  type: string;
  assetParentSelected: any = [];
  assetChildrenSelected: any = [];
  
  urlBase: string = 'http://stg-sac-fase-dos.emergyalabs.com:7000/users';

  editedAsset:any = null;
  modalTitle: string = "";

  nameFormControl = new FormControl('', [
    Validators.required
  ]);
  descriptionFormControl = new FormControl('', [
    Validators.required
  ]);
  typeFormControl = new FormControl('', [
    Validators.required
  ]);
  assetChildrenFormControl = new FormControl('', [
    Validators.required
  ]);
  assetParentFormControl = new FormControl('', [
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
    this.getAssets();
  }

  
  genders:any = ['Male', 'Female'];
 

  roles: any[];
  assets: any[];

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
    this.description = "";
    this.type = "";
  
    this.assetChildrenSelected = [];
    this.assetParentSelected = [];
     
  }


  showModal(asset) {
    this.editedAsset = asset;

    this.configureAssetToEdit();

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

  configureAssetToEdit(){

    if (this.editedAsset != null){
      
      this.modalTitle = "Edit Asset";      
      this.name = this.editedAsset.name;
      this.description = this.editedAsset.description;     
      this.type = this.editedAsset.type; 
      this.assetChildrenSelected = this.editedAsset.childrens;
      this.assetParentSelected= this.editedAsset.parents;
    }else{
      this.modalTitle = "Add Asset"
    }
  }

  hideModal() {
    this.modal.modal('hide');
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.modal = jQuery(this.addAssetsModalRef.nativeElement);
  }
  

  sendAsset (){
    //TODOD VALIDATIONS

    if (!this.nameFormControl.hasError('required') &&
        !this.descriptionFormControl.hasError('required') &&
        !this.typeFormControl.hasError('required')){
        
        let assetsChildren = [];
        let assetsParent = [];

        if (this.assetChildrenSelected instanceof Array) {
          assetsChildren = this.assetChildrenSelected;
        } else {
          assetsChildren = [this.assetChildrenSelected];
        }

        let allAssets = [];

        if (this.assetParentSelected instanceof Array) {
          assetsParent = this.assetParentSelected;
        } else {
          assetsParent = [this.assetParentSelected];
        }
 
        this.asset = {
          name: this.name,
          description: this.description,
          type: this.type,         
          parents: assetsParent,
          childrens: assetsChildren    
        };

        if (this.editedAsset != undefined){

          // PUT
          console.log(JSON.stringify(this.asset));

          this.http.put(`${this.urlBase}/assets/${this.editedAsset.id}`, this.asset).subscribe(
            res => {
              console.log(res);
              this.saved = true;              
              this.hideModal();         
          });        

        }else{

          console.log(JSON.stringify(this.asset));
    
          this.http.post(`${this.urlBase}/assets`, this.asset).subscribe(res => {            
                 
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



