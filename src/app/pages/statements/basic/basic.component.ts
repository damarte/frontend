import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

declare var jQuery: any;
var context: any;


@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit, AfterViewInit {

  @ViewChild('basicStatementModal') basicStatementModalRef: ElementRef;

  @Output() onHidden = new EventEmitter<boolean>();

  modal: any;
  name: string;
  description: string;
  modalTitle: string = "";

  // validations
  nameFormControl = new FormControl('');
  descriptionFormControl = new FormControl('');
  deviceFormControl = new FormControl('');
  conditionFormControl = new FormControl('');
  firstFormControl = new FormControl('');
  filterFormControl = new FormControl('');
  secondFormControl = new FormControl('');
  attributeFormControl = new FormControl('');
  smsFormControl = new FormControl('');
  emailFormControl = new FormControl('');
  makepostFormControl = new FormControl('');
  twitterFormControl = new FormControl('');

  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  showValue: boolean = false;
  saved: boolean = false;
  separatorKeysCodes = [ENTER, COMMA];
  editedStatement: any;
  statement: any;
  deviceSelected: string;
  firstSelected: string;
  filterSelected: string;
  conditions: any = {};
  condition: string;
  first: string = this.firstSelected;
  filter: string = this.filterSelected;
  second: string;
  createdConditions: Array<any> = [];
  attribute: string;
  sms: string;
  email: string;
  makepost: string;
  twitter: string;



  // Change this when the ws is up
  devices: any = ['one', 'two'];
  firsts: any = ['ESTIMATE AIC', 'two'];
  filters: any = ['> More than', '> Less than'];


  constructor() {
    context = this;
  }

  onConditionCreated(event): void {

    this.createCondition();

  }

  private createCondition(){

    this.conditions = {
      condition: this.condition,
      first: this.firstSelected,
      filter: this.filterSelected,
      second: this.second
    }

    this.createdConditions.push(this.conditions);

    return this.createdConditions;


  }

  removeCreatedCondition(createdCondition): void {
    console.log(createdCondition);
    var index = this.createdConditions.indexOf(createdCondition);
    if (index > -1) {
      this.createdConditions.splice(index, 1);
    }
  }



  ngOnInit() { }

  cleanValues() {
    this.name = null;
    this.description = null;
    this.deviceSelected = null;
    this.condition = null;
    this.firstSelected = null;
    this.filterSelected = null;
    this.second = null;
    this.createdConditions = [];
    this.attribute = null;
    this.sms = null;
    this.email = null;
    this.makepost = null;
    this.twitter = null;
  }


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

  configureStatementToEdit() {

    if (this.editedStatement != null) {

      this.modalTitle = "Edit statement (Basic Mode)";
      this.name = this.editedStatement.name;
      this.description = this.editedStatement.description;
      this.deviceSelected = this.editedStatement.devices;
      // complete all fields
    } else {
      this.modalTitle = "Add statement (Basic Mode)"
    }
  }

  hideModal() {
    this.modal.modal('hide');
    this.cleanValues();
  }


  ngAfterViewInit() {
    this.modal = jQuery(this.basicStatementModalRef.nativeElement);
  }


  sendStatement() {

    if (!this.nameFormControl.hasError('required') &&
      !this.descriptionFormControl.hasError('required')) {


      this.statement = {
        name: this.name,
        description: this.description,
        devices: this.deviceSelected
      };

      if (this.editedStatement != undefined) {

        // PUT
        console.log(JSON.stringify(this.statement));

        // this._fiwooService.updateStatement(this.editedStatement.id, this.statement).subscribe(
        //   res => {
        //     console.log(res);
        //     this.saved = true;
        //     this.hideModal();
        //   });

      } else {

        // POST
        this.statement = {
          name: this.name,
          description: this.description,
          devices: this.deviceSelected
        };

        console.log(JSON.stringify(this.statement));

        // this._fiwooService.postStatement(this.statement).subscribe(
        //   res => {
        //     console.log(res);
        //   });

      }

      this.hideModal();


    }
  }

}
