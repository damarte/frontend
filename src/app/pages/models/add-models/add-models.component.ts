import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';

declare var jQuery: any;
var context: any;

@Component({
  selector: 'app-add-models',
  templateUrl: './add-models.component.html',
  styleUrls: ['./add-models.component.scss']
})

export class AddModelsComponent implements OnInit, AfterViewInit {

  @ViewChild('addModelModal') addModelModalRef: ElementRef;

  @Output() onHidden = new EventEmitter<boolean>();

  modal: any;

  name: string;
  modelType: string;
  modelLanguage: string;
  // image: ?
  format: string;
  type: string;

  editedModel: any;
  modelTypeSelected: string;
  modelLanguageSelected: string;
  modalTitle: any;
  model: any = [];

  outputs: any = {};
  output: string;
  createdOutputs: Array<any> = [];


  // validations
  nameFormControl = new FormControl('');
  modelTypeFormControl = new FormControl();
  modelLanguageFormControl = new FormControl();
  // imageFormControl = new FormControl();
  formatFormControl = new FormControl();
  typeFormControl = new FormControl();
  // parameterFormControl = new FormControl();


  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;

  showValue: boolean = false;
  saved: boolean = false;

  separatorKeysCodes = [ENTER, COMMA];

  // remove when the ws is up
  modelTypes: any = ['Glucose', 'Traffic'];
  modelLanguages: any = ['Python', 'Java'];

  parameters: any = [
    { name: 'user' },
    { name: 'pwd' },
    { name: 'Parameter3=DefaultValue' },
  ];


  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    // Add our parameters
    if ((value || '').trim()) {
      this.parameters.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    console.log(value);
  }

  remove(parameter: any): void {
    let index = this.parameters.indexOf(parameter);
    if (index >= 0) {
      this.parameters.splice(index, 1);
    }
  }


  constructor() {
    context = this;
  }

  // resources: any[];

  // private getResources() {
  //   this._fiwooService.getResources().subscribe(
  //     data => {
  //       let resources: any[] = data;
  //       this.resources = resources;
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   );
  // }


  // compareFn: ((f1: any, f2: any) => boolean) | null = this.compareByValue;

  // compareByValue(f1: any, f2: any) {
  //   return f1 && f2 && f1.id === f2.id;
  // }


  ngOnInit() {

  }


  onOutputCreated(event): void {

    this.createOutput();

  }

  private createOutput(){

    this.outputs = {
      format: this.format,
      type: this.type
    }

    this.createdOutputs.push(this.outputs);

    return this.createdOutputs;


  }

  removeCreatedOutput(createdOutput): void {
    console.log(createdOutput);
    var index = this.createdOutputs.indexOf(createdOutput);
    if (index > -1) {
      this.createdOutputs.splice(index, 1);
    }
  }


  cleanValues() {

    this.name = null;
    this.modelType = null;
    this.modelLanguage = null;
    // image: ?
    this.format = null;
    this.type = null;

  }


  showModal(model) {

    this.editedModel = model;
    this.configureModelToEdit();

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

  configureModelToEdit() {

    if (this.editedModel != null) {

      this.modalTitle = "Edit Model";

      this.name = this.editedModel.name;
      this.modelTypeSelected = this.editedModel.modelType;
      this.modelLanguageSelected = this.editedModel.modelLanguage;
      // image: ?
      this.format = this.editedModel.format;
      this.type = this.editedModel.type;

    } else {
      this.modalTitle = "Register Model"
    }
  }

  hideModal() {
    this.modal.modal('hide');
  }


  ngAfterViewInit() {
    this.modal = jQuery(this.addModelModalRef.nativeElement);
  }


  sendModel() {

    if (!this.nameFormControl.hasError('required')) {

      if (this.editedModel != undefined) {

        this.model = {
          name: this.name,
          modelType: this.modelTypeSelected,
          modelLanguage: this.modelLanguageSelected,
          format: this.format,
          type: this.type
        };

      } else {

        // POST
        this.model = {
          name: this.name,
          modelType: this.modelTypeSelected,
          modelLanguage: this.modelLanguageSelected,
          format: this.format,
          type: this.type
        };
      }

      this.hideModal();


    }
  }
}