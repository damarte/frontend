import { Component, OnInit, ViewChild, ElementRef, NgModule, Inject, Output, Input, EventEmitter } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, Validators } from '@angular/forms';
import { DxSelectBoxModule, DxTextBoxModule, DxTemplateModule } from 'devextreme-angular';
import { validateConfig } from '@angular/router/src/config';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { Http } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';
import { FiwooService } from '../../services/fiwoo.service';


declare var jQuery: any;
var context: any;

@Component({
  selector: 'app-add-models',
  templateUrl: './add-models.component.html',
  styleUrls: ['./add-models.component.scss']
})

export class AddModelsComponent implements OnInit {

  @ViewChild('addModelModal') addModelModalRef: ElementRef;

  @Output() onHidden = new EventEmitter<boolean>();

  modal: any;
  name: string;
  description: string;
  editedModel: any;
  modalTitle: any;
  model: any = [];


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

  separatorKeysCodes = [ENTER, COMMA];

  // remove when the ws is up
  types = ['Glucose', 'Traffic'];
  languages = ['Python', 'Java'];
  parameters = [
    { name: 'user' },
    { name: 'pwd' },
    { name: 'Parameter3=DefaultValue' },
  ];


  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.parameters.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(parameter: any): void {
    let index = this.parameters.indexOf(parameter);
    if (index >= 0) {
      this.parameters.splice(index, 1);
    }
  }


  constructor(private http: Http,
    private _fiwooService: FiwooService) {
    context = this;
    // this.getResources();
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

  cleanValues() {

    this.name = "";
    this.description = "";
    // this.resourceSelected = [];

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
      this.description = this.editedModel.description;

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

    if (!this.nameFormControl.hasError('required') &&
      !this.descriptionFormControl.hasError('required')) {

      // let allResources = [];

      // if (this.resourceSelected instanceof Array) {
      //   allResources = this.resourceSelected;
      // } else {
      //   allResources = [this.resourceSelected];
      // }


      if (this.editedModel != undefined) {

        // PUT
        console.log(JSON.stringify(this.model));

        // this._fiwooService.updateModel(this.editedModel.id, this.model).subscribe(
        //   res => {
        //     console.log(res);
        //     this.saved = true;
        //     this.hideModal();
        //   });

      } else {

        // POST
        this.model = {
          name: this.name,
          description: this.description
        };

        console.log(JSON.stringify(this.model));

        // this._fiwooService.postModel(this.model).subscribe(
        //   res => {
        //     console.log(res);
        //   });

      }

      this.hideModal();


    }
  }

}