import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Output } from '@angular/core/src/metadata/directives';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Http } from '@angular/http';
import { DatePipe } from '@angular/common';
import { FiwooService } from '../services/fiwoo.service';
import swal from "sweetalert2";

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.scss'],
  providers: [DatePipe]
})
export class ModelsComponent  {

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
      id: { 
        title: 'Model Id',
        type: 'string',
      },
      name: {
        title: 'Name',
        type: 'string',
      },
      type: {
        title: 'Type',
        type: 'string',
      },
      default: {
        title: 'Default By',
        type: 'boolean',
      },
      created: {
        title: 'Created',
        type: 'number',
        valuePrepareFunction: (date) => { 
          var raw = new Date(date);  
          var formatted = this.datePipe.transform(raw, 'dd MMM yyyy');
          return formatted; 
        }
      }, 
      updated: {
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

  constructor(private http: Http,
              private datePipe: DatePipe,
              private _fiwooService: FiwooService ) {
    //  this.loadModels();
  }
 

  onModalHidden(reload){   
    if (reload){
      // this.loadModels();
    }
  }

  // private loadModels() {   
  //   this._fiwooService.getModels().subscribe( 
  //     data => {           
  //       this.source.load(data);
  //     },
  //     err => {
  //       console.log(err);      
  //     }
  //   );  
  // } 

  onDeleteConfirm(event): void {
    swal({
      title: 'Are you sure you want to delete the model?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        // this._fiwooService.deleteModel(event.data.id).subscribe(res => {
        //   console.log(res);
        //   this.loadModel();
        // });
        swal(
          'Deleted!',
          'Your model has been deleted.',
          'success'
        )
      }
    });
  }
}
