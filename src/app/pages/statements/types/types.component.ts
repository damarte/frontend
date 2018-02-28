import { Component, ViewChild, ElementRef, NgModule, Inject, Output, Input, EventEmitter } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


declare var jQuery: any;
var context: any;

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.scss']
})
export class TypesComponent  {

  @ViewChild('typeStatementModal') typeStatementModal: ElementRef;
  @Output() onModalHidden = new EventEmitter<boolean>();

  modal: any;
  
  constructor() {} 
 

  showModal() {   
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
  }
 

}