import { NgModule, Output, EventEmitter } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {MatSelectModule} from '@angular/material/select';

import {FormControl, Validators} from '@angular/forms';

import { DxSelectBoxModule,
         DxTextBoxModule,
         DxTemplateModule } from 'devextreme-angular';

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DevicesService } from '../../services/devices.service';


declare var jQuery: any;

var context: any;


@Component({
  selector: 'app-send-command',
  templateUrl: './send-command.component.html',
  styleUrls: ['./send-command.component.scss']
})
export class SendCommandComponent implements OnInit {

  saved: boolean = false;

  @Output() onHidden = new EventEmitter<boolean>();

  @ViewChild('sendCommandModal') sendCommandModalRef: ElementRef;

  modal: any;

  commands: any[];
  currentCommand: any;
  commandValue: string;

  modalTitle: string = "";

  editedDevice:any = null;

  commandValueFormControl = new FormControl('', [
    Validators.required
  ]);
  commandSelectedFormControl = new FormControl('', [
    Validators.required
  ]);


  constructor(private devicesService: DevicesService) { 

    context = this;

  }

  ngOnInit() {
  }

  public showModal(device) {
    this.editedDevice = device;

    console.log(device);
    
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
      this.modalTitle = "Send command for " + this.editedDevice.name;
      this.commands = this.editedDevice.commands;
  }
  
  cleanFields(){
    this.editedDevice = null;
    this.currentCommand = null;
    this.commandValue = null;
  }

  hideModal() {
    this.modal.modal('hide');
  }

  ngAfterViewInit() {
    this.modal = jQuery(this.sendCommandModalRef.nativeElement);
  }

  sendCommand(event): void {
    if (!this.commandValueFormControl.hasError('required') &&
        !this.commandSelectedFormControl.hasError('required')){

        var body = { value: this.commandValue };
      
        this.devicesService.updateAttribute(this.editedDevice.entity_name, this.currentCommand.name, body).subscribe(data => {
           context.hideModal();
        });
    }

   
  }
}
