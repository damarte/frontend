import { Component } from '@angular/core';
import { DevicesService, Template } from 'iot_devices_fiwoo';
import { LocalDataSource } from 'ng2-smart-table';
import { Output } from '@angular/core/src/metadata/directives';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Http } from '@angular/http';
import { DatePipe } from '@angular/common';
import { FiwooService } from '../services/fiwoo.service';
import swal from "sweetalert2";


@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
  providers: [DatePipe]
})


export class RolesComponent {

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
      name: {
        title: 'Name:',
        type: 'string',
      },
      description: {
        title: 'Description:',
        type: 'string',
      },
      resources: {
        title: 'Resources',
        type: 'string',
      },            
    }, 
  };


  source: LocalDataSource = new LocalDataSource();

  constructor(private _templatesService: DevicesService,              
              private http: Http,
              private datePipe: DatePipe,
              private _fiwooService: FiwooService ) {
    this.loadRoles();
  }
 

  onModalHidden(reload){   
    if (reload){
     this.loadRoles();
    }
  }

  private loadRoles() {   
    this._fiwooService.getRoles().subscribe( 
      data => {           
        this.source.load(data);
      },
      err => {
        console.log(err);      
      }
    );  
} 

  onDeleteConfirm(event): void {
    swal({
      title: 'Are you sure you want to delete the role?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this._fiwooService.deleteRol(event.data.id).subscribe(res => {
          console.log(res);
          this.loadRoles();
        });
        swal(
          'Deleted!',
          'Your role has been deleted.',
          'success'
        )
      }
    });
  }
}
