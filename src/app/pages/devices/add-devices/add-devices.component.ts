import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';


declare var jQuery: any;

@Component({
  selector: 'app-add-devices',
  templateUrl: './add-devices.component.html',
  styleUrls: ['./add-devices.component.scss']
})
export class AddDevicesComponent implements OnInit {



  @ViewChild('addDeviceModal') addDeviceModalRef: ElementRef;

  modal: any;

  constructor() { }

  ngOnInit() {
  }

  showModal() {    
    this.modal.modal('show');
  }

  ngAfterViewInit() {
    this.modal = jQuery(this.addDeviceModalRef.nativeElement);
  }
}
