import { Component } from '@angular/core';
import { DevicesService } from 'iot_devices_fiwoo';
import { LocalDataSource } from 'ng2-smart-table';
import swal from "sweetalert2";

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})


export class TemplatesComponent {

  outputs: string;

  settings = {
    mode: 'external',
    actions: {
      add: false
    },

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

  constructor(private _templatesService: DevicesService) {
    this.loadTemplates(null);
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
    this.loadTemplates(filterData);
  }
  onResetFilters(){
    this.filterData = {};
    this.loadTemplates(null);
  }

  onModalHidden(reload){
    //Recargamos los templates
    if (reload){
     this.loadTemplates(this.filterData);
    }
  }

  private loadTemplates(filterData):void{
    if (filterData != undefined && filterData != null){
      this._templatesService.getTemplates(filterData.name, filterData.protocol,
                                                   filterData.entity_type, filterData.transportProtocol,
                                                   filterData.isPublic, filterData.attributes, filterData.owner).subscribe(res => {
        this.source.load(res);
      });
    }else{
      this._templatesService.getTemplates().subscribe(res => {
        this.source.load(res);
      });
    }

  }

  onDeleteConfirm(event): void {
    swal({
      title: 'Are you sure you want to delete this template?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this._templatesService.deleteTemplateById(event.data._id).subscribe(res => {
          //console.log(res);
          this.loadTemplates(null);
        });
        swal(
          'Deleted!',
          'Your template has been deleted.',
          'success'
        )
      }
    });
  }

  onSaveConfirm(event) {
    if (window.confirm('Are you sure you want to save?')) {
      // event.newData['name'] += ' + added in code';
      this._templatesService.createTemplate(event.newData._id, event.newData).subscribe(res => {
        console.log(res);
      });
      // event.confirm.resolve(event.newData);
    } else {
      // event.confirm.reject();
    }
  }

  onCreateConfirm(event) {
    if (window.confirm('Are you sure you want to create?')) {
      //event.newData['name'] += ' + added in code';
      this._templatesService.addTemplate(event.newData);
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }
}
