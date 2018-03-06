import { Component, ViewChild, ElementRef, Output, EventEmitter, AfterViewInit } from '@angular/core';

declare var jQuery: any;

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.scss']
})
export class TypesComponent implements AfterViewInit {

  @ViewChild('typeStatementModal') typeStatementModal: ElementRef;
  @Output() onModalHidden = new EventEmitter<boolean>();

  modal: any;
  
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
  }

  openMode(modal){
    modal.showModal(this.statementToUse);
  }

}
