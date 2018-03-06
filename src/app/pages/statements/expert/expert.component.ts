import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

declare var jQuery: any;

@Component({
  selector: 'app-expert',
  templateUrl: './expert.component.html',
  styleUrls: ['./expert.component.scss']
})
export class ExpertComponent implements OnInit, AfterViewInit {

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

  constructor() {

  }

  ngOnInit() {

  }

  showModal(statement) {

    this.editedStatement = statement;
    this.configureStatementToEdit();

    this.saved = false;
    this.modal.modal({
      closable: true,
      onHidden: function () {
        this.context.cleanValues();
        this.context.onHidden.emit(true);
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
