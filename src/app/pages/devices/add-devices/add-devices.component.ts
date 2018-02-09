import { NgModule, Output, EventEmitter } from '@angular/core';
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
  selector: 'app-add-devices',
  templateUrl: './add-devices.component.html',
  styleUrls: ['./add-devices.component.scss']
})
export class AddDevicesComponent implements OnInit {

  saved: boolean = false;

  @Output() onHidden = new EventEmitter<boolean>();

  @ViewChild('addDeviceModal') addDeviceModalRef: ElementRef;

  modal: any;

  templates: any[];
  currentTemplate: any;
  currentTemplateName: string;
  currentTemplateId: string;
  device_name: string;
  entity_type: string;
  device: Devices = {};

  createdDevices: Array<any> = [];

  deviceNameFormControl = new FormControl('', [
    Validators.required
  ]);
  entityNameFormControl = new FormControl('', [
    Validators.required
  ]);
  templateFormControl = new FormControl('', [
    Validators.required
  ]);

  constructor(private devicesService: DevicesService) { 

    context = this;

    this.devicesService.getTemplates().subscribe(res => {
      console.log(res); 
      this.templates = res;
    });
  }

  ngOnInit() {
  }

  showModal() {
    this.saved = false;
    this.modal.modal({
      allowMultiple: true,
      closable  : true,
      onHidden  : function(){
        context.cleanFields();
        context.onHidden.emit(context.saved);
      }
    })
    .modal('show');
  }
  
  cleanFields(){
    this.createdDevices = [];

    this.currentTemplate = null;
    this.device_name = null;
    this.entity_type = null;
  }

  hideModal() {
    this.modal.modal('hide');
  }

  ngAfterViewInit() {
    this.modal = jQuery(this.addDeviceModalRef.nativeElement);
  }

  onDeviceCreated(event): void {
    if (!this.deviceNameFormControl.hasError('required') &&
        !this.entityNameFormControl.hasError('required') &&
        !this.templateFormControl.hasError('required')){

        this.createDevice();
    }

   
  }

  removeCreatedDevice(createdDevice): void {
    console.log(createdDevice);
    var index = this.createdDevices.indexOf(createdDevice);
    if (index > -1) {
      this.createdDevices.splice(index, 1);
    }
  }


  private createDevice (){
    var deviceWrapper:any = {};
    deviceWrapper.templateName = this.currentTemplate.name;
    this.device = this.generateDevice();
    deviceWrapper.device = this.device;
    this.createdDevices.push(deviceWrapper);
    

    //Delete data
    this.device_name = null;
    this.entity_type = null;
  }

  private generateDevice(): Devices {
    var deviceDevice: Devices = {};
    deviceDevice.templateId = this.currentTemplate._id;
    var device: DevicesDevice = {};
    device.deviceId = this.entity_type;
    device.name = this.device_name;
    deviceDevice.device = new Array<DevicesDevice>();
    deviceDevice.device.push(device);

    return deviceDevice;
  }

  private sendDevices (){
    if (this.createdDevices != null && this.createdDevices.length > 0){
      this.createdDevices.forEach(element => {
        var device = element.device;
        this.devicesService.addDevices(device).subscribe(res => {
          console.log(res);
        });
      });

      this.saved = true;

      this.hideModal();
    }    
  }
}
