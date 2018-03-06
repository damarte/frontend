import { Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DevicesService, Devices, DevicesDevice } from 'iot_devices_fiwoo';

declare var jQuery: any;

var context: any;

@Component({
  selector: 'app-add-devices',
  templateUrl: './add-devices.component.html',
  styleUrls: ['./add-devices.component.scss']
})
export class AddDevicesComponent implements OnInit, AfterViewInit {

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
  modalTitle: string = "";

  editedDevice:any = null;

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

  showModal(device) {
    this.editedDevice = device;

    this.configureDeviceToEdit();

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

  configureDeviceToEdit(){
    if (this.editedDevice != null){
      this.modalTitle = "Edit device"
      this.currentTemplate = {};
      this.currentTemplateName = "";
      this.currentTemplateId = this.editedDevice.entity_type;
      this.device_name = this.editedDevice.name;
      this.entity_type = this.editedDevice.entity_name;
    }else{
      this.modalTitle = "Add device"
    }
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

  public sendDevices (){
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
