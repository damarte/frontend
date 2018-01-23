import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
//import { SmartTableService } from '../../../@core/data/smart-table.service';
import { DevicesService } from 'iot_devices_fiwoo';
import { isDevMode } from '@angular/core';





@Component({
  selector: 'ngx-smart-table',
  templateUrl: './devices.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class DevicesComponent {

  settings = {
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
      }, 
      updatedAt: {
        title: 'Updated',
        type: 'number',
      }   
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private devicesService: DevicesService) {
    //const data = this.service.getData();
    const data = this.devicesService.listDevices().subscribe(res => {     
      this.source.load(res);
      //console.log(res);
    });   
    //console.log(isDevMode());
  } 

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
      //Call service to delete this device
      this.devicesService.deleteDevice(event.data._id).subscribe(res => {
        console.log(res);
      });
    } else {
      event.confirm.reject();
    }
  }
}
 