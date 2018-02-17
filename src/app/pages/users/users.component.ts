import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { UsersService } from 'um_fiwoo';
import { DatePipe } from '@angular/common';
import { Http, RequestOptions, Headers } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'ngx-smart-table',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [DatePipe]
})
export class UsersComponent {
  router: any;

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
      id: {
        title: 'User id:',
        type: 'number',
      },
      email: {
        title: 'Email:',
        type: 'string',
      },
      username: {
        title: 'Username:',
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
      password: {
        title: 'Password',
        type: 'string'
      },
      gender: {
        title: 'Gender',
        type: 'string'
      },   
      date_of_birth: {
        title: 'Date of birth',
        type: 'string',
        valuePrepareFunction: (date) => { 
          var raw = new Date(date);  
          var formatted = this.datePipe.transform(raw, 'dd MMM yyyy');
          return formatted; 
        }
      },              
    }, 
  };



 // users:any[];

  source: LocalDataSource = new LocalDataSource();
  urlBase: string = 'http://stg-sac-fase-dos.emergyalabs.com:7000/users';

  constructor(private _usersService: UsersService,
              private datePipe: DatePipe,
              private http: Http) { 
        
      /* Connect with SDK
      const data = this._usersService.getUsers().subscribe(res => {       
      this.source.prepend(res);
      console.log(res);
      });*/

       this.getUsers();  
  }

  

  private getUsers(){
  
    this.http.get(`${this.urlBase}/users`).subscribe(
      data => {
          
          let users: any[] = data.json(); 

          users.forEach(element => {
            this.source.prepend(element);   
          });                      

          console.log('getUsers: ', users);      

        },
      err => {        
        console.log(err);          
      } 
    );  
  } 

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete the user: '+event.data.name+' ?')) {
      event.confirm.resolve();
      //Call service to delete this user
      this.http.delete(`${this.urlBase}/users/${event.data.id}`).subscribe(res => {
        console.log(res);
      },
    );
    } else {
      event.confirm.reject();
    }
  }



  // ADD
  onCreateConfirm(event) {
    if (window.confirm('Are you sure you want to create?')) {
      //event.newData['name'] += ' + added in code'; 
      
      let body = {  
        "name": event.newData.name,
        "surname": event.newData.surname,
        "email": event.newData.email,
        "password": event.newData.password,
        "gender": event.newData.gender,
        "username":event.newData.username,
        "assets": [],
        "roles": [],
        "enabled": true,
        "accountNonExpired": true,
        "accountNonLocked": true,
        "credentialsNonExpired": true,
        "authorities": [],
      }

      this.http.post(`${this.urlBase}/users`, body).subscribe(res => {
        
        event.confirm.resolve(event.newData);
      });

    } else {
      event.confirm.reject();
    }
  }




  // UPDATE
  onSaveConfirm(event) {
    
    let body = {  
      "name": event.newData.name,
      "surname": event.newData.surname,
      "email": event.newData.email,
      "password": event.newData.password,
      "gender": event.newData.gender,
      "username": event.newData.username,
      "assets": [],
      "roles": [],
      "enabled": true,
      "accountNonExpired": true,
      "accountNonLocked": true,
      "credentialsNonExpired": true,
      "authorities": [],
    }

  this.http.put(`${this.urlBase}/users/${event.data.id}`, body).subscribe(
        res => {
          console.log(res);
          event.confirm.resolve(event.newData);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
      });
  }
 

}
