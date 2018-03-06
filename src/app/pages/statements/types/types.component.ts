import { Component, ViewChild, ElementRef, NgModule, Inject, Output, Input, EventEmitter } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ExpertComponent } from '../expert/expert.component';
import { BasicComponent } from '../basic/basic.component';


declare var jQuery: any;
var context: any;

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.scss']
})
export class TypesComponent  {

  @ViewChild('typeStatementModal') typeStatementModal: ElementRef;
  @ViewChild('expertStatementModal') expertStatementModalRef: ExpertComponent;
  @ViewChild('basicStatementModal') basicStatementModalRef: BasicComponent;
  @Output() onModalHidden = new EventEmitter<boolean>();

  modal: any;
  expertModal: any;
  basicModal: any;
  
  constructor() {} 
 
  statementToUse: any;

  showModal(statementToUse) {   

    this.statementToUse = statementToUse;

    this.modal.modal({
      closable: true,
      // onModalHidden: function () {        
      //   context.onHidden.emit(true);
      // }
    }).modal('show');
  }

  

  hideModal() {
    this.modal.modal('hide');
  }
  
  ngAfterViewInit() {
    this.modal = jQuery(this.typeStatementModal.nativeElement);
    this.expertModal = jQuery(this.expertStatementModalRef);
    this.basicModal = jQuery(this.basicStatementModalRef);
  }

  openMode(modal){
    modal.showModal(this.statementToUse);
  }
 
  showExpertMode(){
    this.expertModal.showModal(this.statementToUse);
  }

  showBasicMode (){
    this.basicModal.showModal(this.statementToUse);
  }

}