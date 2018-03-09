import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { DatePipe } from '@angular/common';
import swal from "sweetalert2";
import { StatementsService } from '../services/statements.service';
import { FiwooService } from '../services/fiwoo.service';

@Component({
  selector: 'app-statements',
  templateUrl: './statements.component.html',
  styleUrls: ['./statements.component.scss'],
  providers: [DatePipe]
})
export class StatementsComponent  {


  user:any;

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

  constructor(private statementsService: StatementsService,
              private fiwooService: FiwooService) {
     this.loadStatements();
  }
 

  onModalHidden(reload){   
    if (reload){
     this.loadStatements();
    }
  }

  loadStatements (){
    this.fiwooService.getMe().subscribe(user => {
      this.user = user;
      this.statementsService.getUserStatements(user.name).subscribe(data => {
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
        this.statementsService.deleteUserStatements(event.data.rule_name, this.user.name).subscribe(data => {
          if (data.perseo){
            if (data.perseo.error == null){
              swal(
                'Deleted!',
                'Your statement has been deleted.',
                'success'
              )

              this.loadStatements();
            }
          }
        });       
      }
    });
  }
}
