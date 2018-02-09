import { NgModule, Output, Input, EventEmitter } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {MatSelectModule} from '@angular/material/select';

import {FormControl, Validators} from '@angular/forms';

import { DxSelectBoxModule,
         DxTextBoxModule,
         DxTemplateModule } from 'devextreme-angular';

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Template, DevicesService, Device, Devices, DevicesDevice } from 'iot_devices_fiwoo';


declare var jQuery: any;

var context: any;

@Component({
  selector: 'app-devices-filter',
  templateUrl: './devices-filter.component.html',
  styleUrls: ['./devices-filter.component.scss']
})
export class DevicesFilterComponent implements OnInit {

  saved: boolean = false;

  @Input() title: string;
  @Input() showEntityName: boolean = false;
  @Input() filtersApplied: string = "0";

  @Output() onApplyFilters = new EventEmitter<any>();
  @Output() onResetFilters = new EventEmitter();


  formData: any = {};
 

  constructor() { 
    context = this;
  }

  ngOnInit() {
  }

  resetFilters(): void{
    this.cleanFields();
    this.onResetFilters.emit(); 
  }

  applyFilters(): void{
    this.onApplyFilters.emit(this.formData); 
  }

  getActiveFilters(){
   return this.filtersApplied;
  }

  
  cleanFields(){
    this.formData = {};
  }

}
