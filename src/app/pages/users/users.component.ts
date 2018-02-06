import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { UsersService } from 'um_fiwoo';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'ngx-smart-table',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [DatePipe]
})
export class UsersComponent {


  

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
      id: {
        title: 'User id:',
        type: 'number',
      },
      email: {
        title: 'Email:',
        type: 'string',
      },
      name: {
        title: 'Name',
        type: 'string',
      },
      surname: {
        title: 'Surname',
        type: 'string',
      },
      gender: {
        title: 'Gender',
        type: 'string',
      },      
      date_of_birth: {
        title: 'Birth',
        type: 'string',
        valuePrepareFunction: (date) => { 
          var raw = new Date(date);  
          var formatted = this.datePipe.transform(raw, 'dd MMM yyyy');
          return formatted; 
        }
      },    
      password: {
        title: 'Password',
        type: 'string',
      }, 
      role: {
        title: 'Role',
        type: 'string',
      }   
    }, 
  };

 // users:any[];

  source: LocalDataSource = new LocalDataSource();

  constructor(private _usersService: UsersService,
              private datePipe: DatePipe) {      
        
      const data = this._usersService.getUsers().subscribe(res => {       
      //this.source.prepend(res);
      console.log(res);
    });


    
  }


  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
      //Call service to delete this user
      this._usersService.deleteUser(event.data._id).subscribe(res => {
        console.log(res);
      });
    } else {
      event.confirm.reject();
    }
  }

 
   
  

}
