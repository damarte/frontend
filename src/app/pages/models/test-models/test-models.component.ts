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
  selector: 'app-test-models',
  templateUrl: './test-models.component.html',
  styleUrls: ['./test-models.component.scss']
})

export class TestModelsComponent implements OnInit {

  @ViewChild('testModelModal') testModelModalRef: ElementRef;

  @Output() onHidden = new EventEmitter<boolean>();

  modal: any;  
  modalTitle: string = "";

  model: string;   
  editedModel: any = null;
  modelSelected: string;
  

  // validations
  modelFormControl = new FormControl('');  

  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;

  showValue: boolean = false;
  saved: boolean = false;
  separatorKeysCodes = [ENTER, COMMA];

  // Change this when the ws is up
  models: any = ['one', 'two'];
  parameters: any = [{key:'user', value:'user1'}, {key:'pwd', value:'nde19038sdui'}]; 

  

  constructor(private http: Http,
    private _fiwooService: FiwooService) {

    // context = this;
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


  ngOnInit() {

  }

  cleanValues() {   

  }

  runModel() {
    console.log('run model not implemented');
  }


  showModal(testModel) {

    this.editedModel = testModel;
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
      this.modelSelected = this.editedModel.model;
    
    } else {
      this.modalTitle = "Test Model"
    }
  }

  hideModal() {
    this.modal.modal('hide');
  }
 
  ngAfterViewInit() {
    this.modal = jQuery(this.testModelModalRef.nativeElement);
  }


  sendRole() {

    if (!this.modelFormControl.hasError('required')) {

     
      this.models = {
        model: this.model        
      };

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
        this.models = {
          model: this.model        
        };

        console.log(JSON.stringify(this.model));

        // this._fiwooService.postRol(this.model).subscribe(
        //   res => {
        //     console.log(res);
        //   });

      }

      this.hideModal();


    }
  }

}