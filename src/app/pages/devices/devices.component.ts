import { Component, EventEmitter, Input, Output, OnInit, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { DevicesService } from 'iot_devices_fiwoo';
import swal from "sweetalert2";
import { ViewCell } from 'ng2-smart-table/components/cell/cell-view-mode/view-cell';
import { SendCommandComponent } from './send-command/send-command.component';

declare var require: any;
const moment = require('moment');


@Component({
  selector: 'button-view',
  template: `
    <button *ngIf="value" mat-raised-button color="primary" (click)="onClick()">{{ renderValue }}</button>
  `,
})
export class ButtonViewComponent implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  @Output() sendCommand: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }

  onClick() {
    this.sendCommand.emit(this.rowData);
  }
}

var context: any;


@Component({
  selector: 'ngx-smart-table',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss'],
  providers: []
})


export class DevicesComponent {

  @ViewChild('sendCommandModal') sendCommandModalRef: SendCommandComponent;

  modal: any;

  settings = {
    actions: {
      add: false
    },
    mode: 'external',
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      _id: {
        title: 'Device id:',
        type: 'number',
      },
      name: {
        title: 'Name',
        type: 'string',
      },
      protocol: {
        title: 'Protocol',
        type: 'string',
      },
      entity_type: {
        title: 'Entity Type',
        type: 'string',
      },     
      transport_protocol: {
        title: 'Transport Protocol',
        type: 'string',
      }, 
      owner: {
        title: 'Owner',
        type: 'string',
      },    
      createdAt: {
        title: 'Created',
        type: 'number',
        valuePrepareFunction: (date) => {
          var formatted = moment(date).format('DD MMM YYYY');
          return formatted; 
        }
      }, 
      updatedAt: {
        title: 'Updated',
        type: 'number',
        valuePrepareFunction: (date) => { 
          var formatted = moment(date).format('DD MMM YYYY');
          return formatted; 
        }
      },
      command: {
        title: null,
        type: 'custom',
        filter: false,
        renderComponent: ButtonViewComponent,
        onComponentInitFunction(instance) {
          instance.sendCommand.subscribe(row => {
            context.showModal(row);
          });
        }
      },   
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private devicesService: DevicesService) {
    this.loadDevices(null);

    context = this;
  }

  private loadDevices(filterData): void{
    if (filterData != undefined && filterData != null){
      this.devicesService.listDevices(filterData.name, filterData.entity_name, filterData.protocol,
                                                   filterData.entity_type, filterData.transportProtocol,
                                                   filterData.isPublic, filterData.attributes, filterData.owner).subscribe(res => {     
        this.source.load(this.addCommand(res));
      });
    }else{
      this.devicesService.listDevices().subscribe(res => {     
        this.source.load(this.addCommand(res));
      });
    }

  }

  private addCommand(data){
    data.forEach(device => {
      if (device.commands.length){
        device.command = "Send Command";
      }
      
    });

    return data;
  }

  filterData: any = {};

  getActiveFilters(){
    if (this.filterData != undefined && this.filterData != null){
      return Object.keys(this.filterData).length
    }
    return 0;
  }

  onApplyFilters(filterData){
    this.filterData = filterData;
    this.loadDevices(filterData);
  }
  onResetFilters(){
    this.filterData = {};
    this.loadDevices(null);
  }

  onModalHidden(reload){
    //Recargamos los templates
    if (reload){
      this.loadDevices(this.filterData);
    }
  }

  showModal(device) {
    if (device.commands.length){
      this.sendCommandModalRef.showModal(device);
    }
    
  }

  onDeleteConfirm(event): void {
    swal({
      title: 'Are you sure you want to delete this device?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.devicesService.deleteDevice(event.data.entity_name).subscribe(res => {
          console.log(res);
          this.loadDevices(null);
        });
        swal(
          'Deleted!',
          'Your device has been deleted.',
          'success'
        )
      }
    });
  }


  onSaveConfirm(event) {
    if (window.confirm('Are you sure you want to save?')) {
      // event.newData['name'] += ' + added in code';
      this.devicesService.updateDevice(event.newData._id, event.newData).subscribe(res => {
        console.log(res);
      });
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }
}
 
