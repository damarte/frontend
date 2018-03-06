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

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

declare var jQuery: any;
var context: any;

@Component({
  selector: 'app-add-template',
  templateUrl: './add-template.component.html',
  styleUrls: ['./add-template.component.scss']
})


export class AddTemplateComponent implements OnInit {

  @ViewChild('addTemplateModal') addTemplateModalRef: ElementRef;

  @Output() onHidden = new EventEmitter<boolean>();

  modal: any;

  template: any;
  template_name: string;
  entity_type: string;

  currentAttributeToCreate: any;
  isPublic: boolean = false;

  protocolSelected: Protocol;
  transportSelected: TransportProtocol;

  protocols: Protocol[];
  transportProtocols: TransportProtocol[];
  
  commands: any[] = [];
  internalAttrs: any[] = [];
  attributes: any[] = [];
  lazy: any[] = [];
  statics: any[] = [];

  editedTemplate:any = null;
  modalTitle: string = "";

  properties: any[];
  propertiesSelect = [];

  templateNameFormControl = new FormControl('', [
    Validators.required
  ]);
  entityTypeFormControl = new FormControl('', [
    Validators.required
  ]);
  transportProtocolFormControl = new FormControl('', [
    Validators.required
  ]);
  protocolFormControl = new FormControl('', [
    Validators.required
  ]);


  //Property Validators
  propertyNameFormControl = new FormControl('', [
    Validators.required
  ]);
  propertyValueFormControl = new FormControl('', [
    Validators.required
  ]);
  propertyObjectIdFormControl = new FormControl('', [
    Validators.required
  ]);
  propertyTypeFormControl = new FormControl('', [
    Validators.required
  ]);
 
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;

  selectedProperty: string = "command";
  showValue: boolean = false;
  showObjectId: boolean = false;

  saved: boolean = false;

  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];

  data:any = { selectedProperty: this.selectedProperty, showValue: this.showValue, showObjectId: this.showObjectId, name: "", objectId: "", formType: "", value: "" }

  constructor(private devicesService: DevicesService, public dialog: MatDialog) {

    context = this;

    this.restartProperties();

    var httpTransportProtocol = new TransportProtocol('HTTP', 'HTTP');
    var mqttTransportProtocol = new TransportProtocol('MQTT', 'MQTT');
    var amqpTransportProtocol = new TransportProtocol('AMQP', 'AMQP');
    var udpTransportProtocol = new TransportProtocol('UDP', 'UDP');

    this.protocols = [new Protocol('IoTA-UL', 'IoTA-UL', [httpTransportProtocol, mqttTransportProtocol, amqpTransportProtocol]),
                      new Protocol('COAP', 'CoAP / LWM2M', [udpTransportProtocol]),
                      // new Protocol('LORA', 'LORA', []),
                      new Protocol('SIGFOX', 'SIGFOX', [httpTransportProtocol]),
                      new Protocol('JSON-MQTT', 'JSON-MQTT', [mqttTransportProtocol])];

    this.transportProtocols = [httpTransportProtocol, mqttTransportProtocol, amqpTransportProtocol, udpTransportProtocol];

  }

  restart(): void {
    this.configureForm(null, false, false);
    this.currentAttributeToCreate = null;
  }

  addObject(object): void {
    this.insertProperty(object);
  }

  configureForm(prop: string, showValue: boolean, showObjectId: boolean): void {
    this.selectedProperty = prop;
    this.showValue = showValue;
    this.showObjectId = showObjectId;
    this.data = { selectedProperty: this.selectedProperty, showValue: this.showValue,  showObjectId: this.showObjectId, name: "", objectId: "", formType: "", value: "" }
  }
  onAttributeChanged (): void{
    this.configureForm(this.currentAttributeToCreate.type, this.currentAttributeToCreate.showValue, this.currentAttributeToCreate.showObjectId);
  }

  insertProperty (result): void {
    if (result != undefined){

      if (!this.propertyNameFormControl.hasError('required') &&
         (!this.propertyValueFormControl.hasError('required') || !result.showValue) &&
        //  (!this.propertyObjectIdFormControl.hasError('required') || !result.showObjectId) &&
         !this.propertyTypeFormControl.hasError('required') &&
         !this.checkObjectIdExists(result) && result.objectId){

        switch (result.selectedProperty){
          case "command":
            this.commands.push({name : result.name, id : result.objectId, formType: result.formType});
          break;
          case "internal attribute":
            this.internalAttrs.push({name : result.name, id : result.objectId, formType: result.formType});
          break;
          case "attribute":
            this.attributes.push({name : result.name, id : result.objectId, formType: result.formType});
          break;
          case "lazy":
            this.lazy.push({name : result.name, id : result.objectId, formType: result.formType});
          break;
          case "static attribute":
            this.statics.push({name : result.name, id : result.objectId, formType: result.formType, value: result.value});
          break;
        }

        this.restart();
      }
     
    } 
  }
  private checkObjectIdExists (value){
    var result = false;
    var arrayToCheck = this.getPropertyArray(value.selectedProperty);
    arrayToCheck.forEach(element => {
      if (element.id === value.objectId){
        result = true;
      }
    });
    return result;
  }

  private getPropertyArray(selectedProperty){
    switch (selectedProperty){
      case "command":
        return this.commands;
      case "internal attribute":
        return this.internalAttrs;
      case "attribute":
        return this.attributes;
      case "lazy":
        return this.lazy;
      case "static attribute":
        return this.statics;
    }
  }

  remove(object: any, objects: any[]): void {
    
    let index = objects.indexOf(object);

    if (index >= 0) {
      objects.splice(index, 1);
    }
  }

  ngOnInit() {
  }

  cleanValues (){
    this.currentAttributeToCreate = null;  

    this.template_name = "";
    this.entity_type = "";
    this.isPublic = false;
    this.protocolSelected = null;
    this.transportSelected = null;
    // owner: "";
    this.attributes = [];
    this.lazy = [];
    this.statics = [];
    this.commands = [];
    this.internalAttrs = [];
  }

  private restartProperties(){
    this.properties = [
      {type: "command", showValue: false, showObjectId: true, prop: this.commands},
      {type: "internal attribute", showValue: false, showObjectId: true, prop: this.internalAttrs},
      {type: "attribute", showValue: false, showObjectId: true, prop: this.attributes},
      {type: "lazy", showValue: false, showObjectId: true, prop: this.lazy},
      {type: "static attribute", showValue: true, showObjectId: false, prop: this.statics},
    ];

    //TODO STATIC ATTRIBUTE CAN NOT BE SELECTED
    this.propertiesSelect = this.properties.slice(0, this.properties.length - 1);
  }


  showModal(template) {
    this.editedTemplate = template;

    this.configureTemplateToEdit();

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

  configureTemplateToEdit(){
    if (this.editedTemplate != null){
      this.modalTitle = "Edit template"
      this.currentAttributeToCreate = null;  

      this.template_name = this.editedTemplate.name;
      this.entity_type = this.editedTemplate.entity_type;
      this.isPublic = this.editedTemplate.public;
      this.setCurrentProtocolFromId(this.editedTemplate.protocol);
      this.setCurrentTransportProtocolFromId(this.editedTemplate.transport_protocol);
      // owner: "";
      this.attributes = this.editedTemplate.attributes;
      this.lazy = this.editedTemplate.lazy;
      this.statics = this.editedTemplate.static_attributes;
      this.commands = this.editedTemplate.commands;
      this.internalAttrs = this.editedTemplate.internal_attributes;
      this.restartProperties();
    }else{
      this.modalTitle = "Add template"
    }
  }

  setCurrentProtocolFromId(protocol){
    if (this.protocols != undefined && this.protocols.length > 0){
        this.protocols.forEach(element => {
          if (element.key == protocol){
            this.protocolSelected = element;
          }
        });
    }
  }
  setCurrentTransportProtocolFromId(trProtocol){
    if (this.transportProtocols != undefined && this.transportProtocols.length > 0){
        this.transportProtocols.forEach(element => {
          if (element.key == trProtocol){
            this.transportSelected = element;
          }
        });
    }
  }

  hideModal() {
    this.modal.modal('hide');
  }

  ngAfterViewInit() {
    this.modal = jQuery(this.addTemplateModalRef.nativeElement);
  }

  onChangeProtocol(event): void {
    this.transportProtocols = event.transportProtocols;
    this.transportSelected = this.transportProtocols.length ? this.transportProtocols[0] : null;
  }

  onChangeTransportProtocol(event): void {
    
  }

  sendTemplate (){
    //TODOD VALIDATIONS

    if (!this.templateNameFormControl.hasError('required') &&
        !this.transportProtocolFormControl.hasError('required') &&
        !this.protocolFormControl.hasError('required') &&
        !this.entityTypeFormControl.hasError('required')){

        this.template = {
          name: this.template_name,
          entity_type: this.entity_type,
          public: this.isPublic,
          protocol: this.protocolSelected.key,
          transport_protocol: this.transportSelected.key,
          owner: "507f191e810c19729de860ed", //CAMBIAR
          attributes: this.attributes,
          lazy: this.lazy,
          static_attributes: this.statics,
          commands: this.commands,
          internal_attributes: this.internalAttrs
        };

        if (this.editedTemplate != undefined){
          this.devicesService.createTemplate(this.editedTemplate._id, this.template).subscribe(res => {
            console.log(res);
            this.saved = true;
            this.hideModal();
          });
        }else{
          this.devicesService.addTemplate(this.template).subscribe(res => {
            console.log(res);
            this.saved = true;
            this.hideModal();
          });
        }
    }
  }

}

class Protocol {
  key: Template.ProtocolEnum;
  value: string;
  transportProtocols: TransportProtocol[];
  constructor(key: Template.ProtocolEnum, value: string, transportProtocols: TransportProtocol[]) {
    this.key = key;
    this.value = value;
    this.transportProtocols = transportProtocols;
  }
}

class TransportProtocol {
  key: Template.TransportProtocolEnum;
  value: string;
  constructor(key:  Template.TransportProtocolEnum, value: string) {
    this.key = key;
    this.value = value;
  }
}

