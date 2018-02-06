import { Component } from '@angular/core';
import { DevicesService, Template } from 'iot_devices_fiwoo';
import { LocalDataSource } from 'ng2-smart-table';
import { Output } from '@angular/core/src/metadata/directives';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})


export class TemplatesComponent {

  outputs: string;

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      _id: {
        title: 'Template id:',
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
      /*attributes: {
        title: 'Attribute Name',
        valuePrepareFunction: (attributes) => {
          var output = "";
          var outputs = "";
          attributes.forEach(function (item) {
            output = item.name
          })
          return output + outputs;
        }
      },*/
    }
  };





  source: LocalDataSource = new LocalDataSource();

  constructor(private _templatesService: DevicesService, private _http: HttpClient) {
    const data = this._templatesService.getMyTemplates().subscribe(res => {
      this.source.load(res);
    })
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
      //Call service to delete this device
      this._templatesService.deleteTemplateById(event.data._id).subscribe(res => {
        //console.log(res);
      });
    } else {
      event.confirm.reject();
    }
  }

  onSaveConfirm(event) {
    if (window.confirm('Are you sure you want to save?')) {
      event.newData['name'] += ' + added in code';
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }


  onCreateConfirm(event) {
    if (window.confirm('Are you sure you want to create?')) {
      //event.newData['name'] += ' + added in code';      
      this._templatesService.createTemplate(event.data.id, event.data);
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }

}