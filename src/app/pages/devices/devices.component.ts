import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
//import { SmartTableService } from '../../../@core/data/smart-table.service';
import { DevicesService } from 'iot_devices_fiwoo';
//import { isDevMode } from '@angular/core';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'ngx-smart-table',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss'],
  providers: [DatePipe]
})
export class DevicesComponent {

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
          var raw = new Date(date);  
          var formatted = this.datePipe.transform(raw, 'dd MMM yyyy');
          return formatted; 
        }
      }, 
      updatedAt: {
        title: 'Updated',
        type: 'number',
        valuePrepareFunction: (date) => { 
          var raw = new Date(date);  
          var formatted = this.datePipe.transform(raw, 'dd MMM yyyy');
          return formatted; 
        }
      }   
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private devicesService: DevicesService,
              private datePipe: DatePipe
             ) {
    this.loadDevices(null);
  }

  private loadDevices(filterData): void{
    if (filterData != undefined && filterData != null){
      const data = this.devicesService.listDevices(filterData.name, filterData.entity_name, filterData.protocol,
                                                   filterData.entity_type, filterData.transportProtocol,
                                                   filterData.isPublic, filterData.attributes, filterData.owner).subscribe(res => {     
        this.source.load(res);
      });
    }else{
      const data = this.devicesService.listDevices().subscribe(res => {     
        this.source.load(res);
      });
    }

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

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      // event.confirm.resolve();
      //Call service to delete this device
      this.devicesService.deleteDevice(event.data.entity_name).subscribe(res => {
        console.log(res);
        this.loadDevices(null);
      });
    } else {
      // event.confirm.reject();
    }
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
 