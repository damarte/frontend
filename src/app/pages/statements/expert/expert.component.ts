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
  selector: 'app-expert',
  templateUrl: './expert.component.html',
  styleUrls: ['./expert.component.scss']
})
export class ExpertComponent implements OnInit {

  @ViewChild('expertStatementModal') expertStatementModalRef: ElementRef;

  @Output() onHidden = new EventEmitter<boolean>();

  modal: any;

  description: string;
  statement: string;
  editedStatement:any = [];
  statements: any = {};

  modalTitle: string = "";

  // validations  
  descriptionFormControl = new FormControl();
  statementFormControl = new FormControl();

  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  showValue: boolean = false;
  saved: boolean = false;
  separatorKeysCodes = [ENTER, COMMA];


  constructor(private http: Http,
    private _fiwooService: FiwooService) {   
    
  }
 
  ngOnInit() { }

  


  showModal(statement) {

    this.editedStatement = statement;
    this.configureStatementToEdit();

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

  cleanValues() {

    this.description = null;
    this.statement = null;
  }

  configureStatementToEdit() {

    if (this.editedStatement != null) {

      this.modalTitle = "Edit statement (Expert Mode)";      
      this.description = this.editedStatement.description;
      this.statement = this.editedStatement.statement;
    } else {
      this.modalTitle = "Add statement (Expert Mode)"
    }
  }

  hideModal() {
    this.modal.modal('hide');
  }

  
  ngAfterViewInit() {
    this.modal = jQuery(this.expertStatementModalRef.nativeElement);
  }


  sendStatement() {

    if (!this.statementFormControl.hasError('required') &&
      !this.descriptionFormControl.hasError('required')) {      

      if (this.editedStatement != undefined) {

        this.statements = {
          statement: this.statement,
          description: this.description,         
        };

        // PUT
        console.log(this.statement);

        // this._fiwooService.updateStatement(this.editedStatement.id, this.statements).subscribe(
        //   res => {
        //     console.log(res);
        //     this.saved = true;
        //     this.hideModal();
        //   });

      } else {

        // POST
        this.statements = {
          statement: this.statement,
          description: this.description,         
        };

        console.log(this.statements);

        // this._fiwooService.postStatement(this.statements).subscribe(
        //   res => {
        //     console.log(res);
        //   });

      }

      this.hideModal();


    }
  }

}