import { Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Template } from 'iot_devices_fiwoo';

import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { DevicesService } from '../../services/devices.service';

declare var jQuery: any;
var context: any;

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

@Component({
  selector: 'app-edit-devices',
  templateUrl: './edit-devices.component.html',
  styleUrls: ['./edit-devices.component.scss']
})
export class EditDevicesComponent implements OnInit, AfterViewInit {

  @ViewChild('editDeviceModal') editDeviceModalRef: ElementRef;

  @Output() onHidden = new EventEmitter<boolean>();

  modal: any;

  template: any;
  template_name: string;
  entity_name: string;

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

  properties: any[] = [
    {type: "command", showValue: false, prop: this.commands},
    {type: "internal attribute", showValue: false, prop: this.internalAttrs},
    {type: "attribute", showValue: false, prop: this.attributes},
    {type: "lazy", showValue: false, prop: this.lazy},
    {type: "static attribute", showValue: true, prop: this.statics},
  ];

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
  propertyTypeFormControl = new FormControl('', [
    Validators.required
  ]);

  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;

  selectedProperty: string = "command";
  showValue: boolean = false;

  saved: boolean = false;

  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];

  data:any = { selectedProperty: this.selectedProperty, showValue: this.showValue, name: "", formType: "", value: "" }

  constructor(private devicesService: DevicesService) {

    context = this;

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
    this.configureForm(null, false);
    this.currentAttributeToCreate = null;
  }

  addObject(object): void {
    // this.configureDialog(object.type, object.showValue);
    this.insertProperty(object);
  }

  configureForm(prop: string, show: boolean): void {
    this.selectedProperty = prop;
    this.showValue = show;
    this.data = { selectedProperty: this.selectedProperty, showValue: this.showValue, name: "", formType: "", value: "" }
  }

  onAttributeChanged (): void{
    this.configureForm(this.currentAttributeToCreate.type, this.currentAttributeToCreate.showValue);
  }

  insertProperty (result): void {
    if (result != undefined){

      if (!this.propertyNameFormControl.hasError('required') &&
       (!this.propertyNameFormControl.hasError('required') || !result.showValue) &&
        !this.propertyTypeFormControl.hasError('required')){

        switch (result.selectedProperty){
          case "command":
            this.commands.push({name : result.name, formType: result.formType});
          break;
          case "internal attribute":
            this.internalAttrs.push({name : result.name, formType: result.formType});
          break;
          case "attribute":
            this.attributes.push({name : result.name, formType: result.formType});
          break;
          case "lazy":
            this.lazy.push({name : result.name, formType: result.formType});
          break;
          case "static attribute":
            this.statics.push({name : result.name, formType: result.formType, value: result.value});
          break;
        }

        this.restart();
      }

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
    this.entity_name = "";
    this.isPublic = false;
    this.protocolSelected = null;
    this.transportSelected = null;
    // owner: "";
    this.attributes = [];
    this.lazy = [];
    this.statics = [];
    this.commands = [];
    this.internalAttrs = [];

    this.properties = [
      {type: "command", showValue: false, prop: this.commands},
      {type: "internal attribute", showValue: false, prop: this.internalAttrs},
      {type: "attribute", showValue: false, prop: this.attributes},
      {type: "lazy", showValue: false, prop: this.lazy},
      {type: "static attribute", showValue: true, prop: this.statics},
    ];
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
      this.entity_name = this.editedTemplate.entity_name;
      this.isPublic = this.editedTemplate.public;
      this.setCurrentProtocolFromId(this.editedTemplate.protocol);
      this.setCurrentTransportProtocolFromId(this.editedTemplate.transport_protocol);
      // owner: "";
      this.attributes = this.editedTemplate.attributes;
      this.lazy = this.editedTemplate.lazy;
      this.statics = this.editedTemplate.static_attributes;
      this.commands = this.editedTemplate.commands;
      this.internalAttrs = this.editedTemplate.internal_attributes;
      this.properties = [
        {type: "command", showValue: false, prop: this.commands},
        {type: "internal attribute", showValue: false, prop: this.internalAttrs},
        {type: "attribute", showValue: false, prop: this.attributes},
        {type: "lazy", showValue: false, prop: this.lazy},
        {type: "static attribute", showValue: true, prop: this.statics},
      ];
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
    this.modal = jQuery(this.editDeviceModalRef.nativeElement);
  }

  onChangeProtocol(event): void {
    console.log(event);
    this.transportSelected = null;
    this.transportProtocols = event.transportProtocols;
  }

  onChangeTransportProtocol(event): void {
    console.log(event);
  }

  sendTemplate (){
    //TODO VALIDATIONS

    if (!this.templateNameFormControl.hasError('required') &&
        !this.transportProtocolFormControl.hasError('required') &&
        !this.protocolFormControl.hasError('required')){

        this.template = {
          name: this.template_name,
          entity_name: this.entity_name,
          entity_type: this.editedTemplate.entity_type,
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
          this.devicesService.updateDevice(this.editedTemplate.entity_name, this.template).subscribe(res => {
            console.log(res);
            this.saved = true;
            this.hideModal();
          });
        }
    }
  }
}
