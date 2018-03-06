import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FiwooService } from '../../services/fiwoo.service';
import { StatementsService } from '../../services/statements.service';
import swal from "sweetalert2";

declare var jQuery: any;

var context;

@Component({
  selector: 'app-expert',
  templateUrl: './expert.component.html',
  styleUrls: ['./expert.component.scss']
})
export class ExpertComponent implements OnInit, AfterViewInit {

  @ViewChild('expertStatementModal') expertStatementModalRef: ElementRef;

  @Output() onHidden = new EventEmitter<boolean>();

  modal: any;
  statementField: any;

  description: string;
  statement: string;
  editedStatement: any = [];
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
  user_id: string;


  

  constructor(private _fiwooService: FiwooService,
    private statementsService: StatementsService) {

      context = this;

      this._fiwooService.getMe().subscribe(user => {
        this.user_id = user.user_name;
      });

      //TEST

      this.description = `Sets isHigh to false if temperature is lower than 21`;

      this.statement = `{
          "name": "rule_temperature_update_lower",
          "text": "select *,\"rule_temperature_update_lower\" as ruleName from pattern [every ev=iotEvent(cast(cast(temperature?,String),float)<=21 and type=\"temperature_entity\" and cast(id?,String)=\"temp1\")]",
          "action": {
              "type": "update",
              "parameters": {
              "id" : "temp1",
              "type" : "temperature_entity",
                  "attributes": [
                      {
                          "name": "isHigh",
                          "value": "false",
                          "type": "boolean"
                      }]
              }
          }
      }`;
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
      this.description = this.editedStatement.rule_description;
      this.statement = this.editedStatement.rule;
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

      this.statements = {
        rule: this.statement,
        description: this.description,
        user_id: this.user_id
      };

      if (this.editedStatement != undefined) {

        // PUT
        console.log(this.statement);
      } else {

        // POST
        console.log(this.statements);

        this.statementsService.postUserStatement(this.statements).subscribe(data => {
          console.log(data);

          this.hideModal();
        },
        error => {
          swal(
            'Error!',
            'An error has ocurred',
            'error'
          )
        });

      }
      
    }
  }
}
