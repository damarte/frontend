import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Output } from '@angular/core/src/metadata/directives';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Http } from '@angular/http';
import { DatePipe } from '@angular/common';
import { FiwooService } from '../services/fiwoo.service';
import swal from "sweetalert2";
import { StatementsService } from '../services/statements.service';

@Component({
  selector: 'app-statements',
  templateUrl: './statements.component.html',
  styleUrls: ['./statements.component.scss'],
  providers: [DatePipe]
})
export class StatementsComponent  {

  outputs: string;

  settings = {
    mode: 'external',
    actions: {
      add: false,
      edit: true
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
      rule_id: { 
        title: 'Rule Id',
        type: 'text',
      },
      user_id: {
        title: 'User Name',
        type: 'text',
      },
      rule_name: {
        title: 'Rule Name',
        type: 'text',
      },
      rule_description: {
        title: 'Rule Description',
        type: 'text',
      },
      rule: {
        title: 'Rule',
        type: 'text',
      }, 
      orion_id: {
        title: 'Orion Id',
        type: 'text',
      }   
    },   
  };


  source: LocalDataSource = new LocalDataSource();

  constructor(private http: Http,
              private datePipe: DatePipe,
              private statementsService: StatementsService,
              private fiwooService: FiwooService) {
     this.loadStatements();
  }
 

  onModalHidden(reload){   
    if (reload){
     this.loadStatements();
    }
  }

  loadStatements (){
    var context = this;
    this.fiwooService.getMe().subscribe(user => {
      this.statementsService.getUserStatements("select4cities").subscribe(data => {
        this.source.load(data);
      });
    });
  }

  onDeleteConfirm(event): void {
    swal({
      title: 'Are you sure you want to delete the statement?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        console.log(event);
        this.statementsService.deleteUserStatements(event.data.rule_name).subscribe(data => {
          if (data.perseo.length){
            if (data.perseo.error.length && data.perseo.error == null){
              swal(
                'Deleted!',
                'Your statement has been deleted.',
                'success'
              )
            }
          }
        });       
      }
    });
  }
}
